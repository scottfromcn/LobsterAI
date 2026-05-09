import type { SqliteStore } from '../sqliteStore';

/**
 * Server API base URL.
 * No longer pointing to external auth server — returns empty string.
 */
export const getServerApiBaseUrl = (): string => '';

export function refreshEndpointsTestMode(_store: SqliteStore): void {
  // Remote LobsterAI endpoints are disabled in the MetroAI fork.
}

export const getUpdateCheckUrl = (): string => '';

export const getManualUpdateCheckUrl = (): string => '';

export const getFallbackDownloadUrl = (): string => '';

export const getSkillStoreUrl = (): string => '';
