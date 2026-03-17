/**
 * One-time migration: move scheduled tasks from legacy SQLite tables
 * (used in the non-openclaw release) into the OpenClaw gateway via CronJobService.
 *
 * Safe to call multiple times — a kv flag prevents re-running.
 */

import type { Database } from 'sql.js';
import type { CronJobService } from './cronJobService';
import type { Schedule, ScheduledTaskDelivery, ScheduledTaskInput } from '../../renderer/types/scheduledTask';

const MIGRATION_KEY = 'scheduled_tasks_migrated_to_openclaw_v1';

// ---------------------------------------------------------------------------
// Legacy types (main branch schema — never changed, only removed)
// ---------------------------------------------------------------------------

interface LegacySchedule {
  type: 'at' | 'interval' | 'cron';
  datetime?: string;
  intervalMs?: number;
  expression?: string;
}

interface LegacyTaskRow {
  id: string;
  name: string;
  description: string;
  enabled: number; // 0 | 1
  schedule_json: string;
  prompt: string;
  notify_platforms_json: string; // JSON string of string[]
}

// ---------------------------------------------------------------------------
// Converters
// ---------------------------------------------------------------------------

function convertSchedule(legacy: LegacySchedule): Schedule | null {
  if (legacy.type === 'at') {
    if (!legacy.datetime) return null;
    return { kind: 'at', at: legacy.datetime };
  }
  if (legacy.type === 'interval') {
    const ms = legacy.intervalMs;
    if (!ms || ms <= 0) return null;
    return { kind: 'every', everyMs: ms };
  }
  if (legacy.type === 'cron') {
    if (!legacy.expression) return null;
    return { kind: 'cron', expr: legacy.expression };
  }
  return null;
}

function convertDelivery(platformsJson: string): ScheduledTaskDelivery {
  let platforms: string[] = [];
  try {
    platforms = JSON.parse(platformsJson);
  } catch {
    // ignore
  }
  if (!Array.isArray(platforms) || platforms.length === 0) {
    return { mode: 'none' };
  }
  // New format supports one delivery target — use the first platform as channel.
  return { mode: 'announce', channel: platforms[0] };
}

function rowToInput(row: LegacyTaskRow): ScheduledTaskInput | null {
  let legacySchedule: LegacySchedule;
  try {
    legacySchedule = JSON.parse(row.schedule_json);
  } catch {
    console.warn(`[MigrateScheduledTasks] Skipping task "${row.name}" — invalid schedule_json`);
    return null;
  }

  const schedule = convertSchedule(legacySchedule);
  if (!schedule) {
    console.warn(`[MigrateScheduledTasks] Skipping task "${row.name}" — cannot convert schedule`, legacySchedule);
    return null;
  }

  return {
    name: row.name,
    description: row.description ?? '',
    enabled: row.enabled === 1,
    schedule,
    // 旧任务都带有 prompt，使用 isolated session + agentTurn。
    // main session 仅支持 systemEvent payload，不适用于迁移场景。
    sessionTarget: 'isolated',
    wakeMode: 'next-heartbeat',
    payload: { kind: 'agentTurn', message: row.prompt },
    delivery: convertDelivery(row.notify_platforms_json ?? '[]'),
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

interface MigrationDeps {
  /** Raw sql.js Database instance for reading legacy tables. */
  db: Database;
  /** Reads a value from the app kv store. */
  getKv: (key: string) => unknown;
  /** Writes a value to the app kv store. */
  setKv: (key: string, value: string) => void;
  /** CronJobService (already constructed, gateway not necessarily ready yet). */
  cronJobService: CronJobService;
}

export async function migrateScheduledTasksToOpenclaw(deps: MigrationDeps): Promise<void> {
  const { db, getKv, setKv, cronJobService } = deps;

  // 1. Idempotency guard
  if (getKv(MIGRATION_KEY) === 'true') return;

  // 2. Check if the legacy table exists (new installs won't have it)
  try {
    const tableCheck = db.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='scheduled_tasks'",
    );
    if (!tableCheck[0]?.values?.length) {
      // Fresh install — nothing to migrate
      setKv(MIGRATION_KEY, 'true');
      return;
    }
  } catch (err) {
    console.warn('[MigrateScheduledTasks] Could not check legacy table existence, skipping:', err);
    return;
  }

  // 3. Read all legacy rows
  let rows: LegacyTaskRow[] = [];
  try {
    const result = db.exec(
      'SELECT id, name, description, enabled, schedule_json, prompt, notify_platforms_json FROM scheduled_tasks',
    );
    if (!result[0]?.values?.length) {
      setKv(MIGRATION_KEY, 'true');
      return;
    }
    const cols = result[0].columns;
    rows = result[0].values.map((vals) => {
      const obj: Record<string, unknown> = {};
      cols.forEach((col, i) => { obj[col] = vals[i]; });
      return obj as unknown as LegacyTaskRow;
    });
  } catch (err) {
    console.warn('[MigrateScheduledTasks] Failed to read legacy tasks, skipping migration:', err);
    return;
  }

  console.log(`[MigrateScheduledTasks] Migrating ${rows.length} task(s) to OpenClaw gateway...`);

  // 4. Push each task to the OpenClaw gateway
  let succeeded = 0;
  let skipped = 0;
  let gatewayErrors = 0;
  for (const row of rows) {
    const input = rowToInput(row);
    if (!input) { skipped++; continue; }

    try {
      await cronJobService.addJob(input);
      console.log(`[MigrateScheduledTasks] Migrated task: "${row.name}"`);
      succeeded++;
    } catch (err) {
      console.error(`[MigrateScheduledTasks] Failed to migrate task "${row.name}":`, err);
      gatewayErrors++;
    }
  }

  console.log(`[MigrateScheduledTasks] Done. succeeded=${succeeded}, skipped=${skipped}, gatewayErrors=${gatewayErrors}`);

  // 5. Mark as done only when there are no gateway errors.
  // Skipped tasks (invalid schedule etc.) are unrecoverable and don't block completion.
  // Gateway errors may be transient, so we leave the flag unset to allow a retry on next launch.
  if (gatewayErrors === 0) {
    setKv(MIGRATION_KEY, 'true');
  }
}
