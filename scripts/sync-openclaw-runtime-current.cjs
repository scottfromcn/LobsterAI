'use strict';

const fs = require('fs');
const path = require('path');

function fail(message) {
  console.error(`[sync-openclaw-runtime-current] ${message}`);
  process.exit(1);
}

const targetId = (process.argv[2] || '').trim();
if (!targetId) {
  fail('Missing target id. Usage: node scripts/sync-openclaw-runtime-current.cjs <target-id>');
}

const rootDir = path.resolve(__dirname, '..');
const runtimeBaseDir = path.join(rootDir, 'vendor', 'openclaw-runtime');
const targetRuntimeDir = path.join(runtimeBaseDir, targetId);
const currentRuntimeDir = path.join(runtimeBaseDir, 'current');

if (!fs.existsSync(targetRuntimeDir)) {
  fail(`Target runtime does not exist: ${targetRuntimeDir}`);
}

fs.rmSync(currentRuntimeDir, { recursive: true, force: true });
fs.cpSync(targetRuntimeDir, currentRuntimeDir, { recursive: true, force: true });

console.log(`[sync-openclaw-runtime-current] Synced ${targetId} -> vendor/openclaw-runtime/current`);

// Extract entry files from gateway.asar if bare files are missing.
// On Windows, Electron's utilityProcess.fork() cannot load ESM from inside .asar archives,
// so bare files must exist on the real filesystem.
const gatewayAsarPath = path.join(currentRuntimeDir, 'gateway.asar');
const bareEntryPath = path.join(currentRuntimeDir, 'openclaw.mjs');
if (fs.existsSync(gatewayAsarPath) && !fs.existsSync(bareEntryPath)) {
  try {
    const asar = require('@electron/asar');
    const entries = asar.listPackage(gatewayAsarPath);
    const toExtract = entries.filter(function (e) {
      const normalized = e.replace(/\\/g, '/');
      return normalized === '/openclaw.mjs' || normalized.startsWith('/dist/');
    });

    for (const entry of toExtract) {
      const normalized = entry.replace(/\\/g, '/').replace(/^\//, '');
      const destPath = path.join(currentRuntimeDir, normalized);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      try {
        const content = asar.extractFile(gatewayAsarPath, normalized);
        fs.writeFileSync(destPath, content);
      } catch (_e) {
        // directory entries, skip
      }
    }

    console.log(`[sync-openclaw-runtime-current] Extracted ${toExtract.length} entry files from gateway.asar`);
  } catch (err) {
    console.warn(`[sync-openclaw-runtime-current] Could not extract from gateway.asar: ${err.message}`);
  }
}
