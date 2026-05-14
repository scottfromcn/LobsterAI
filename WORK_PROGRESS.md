# Work Progress

## 2026-05-09

- Node: resolving upstream merge conflicts after syncing `main`.
- Status: conflict markers removed and all conflicted paths resolved in the working tree.
- Local policy: kept MetroAI branding, disabled remote LobsterAI auth/update endpoints, and preserved local privacy-skip behavior.
- Upstream intake: retained new IM/email platform additions, LM Studio/provider updates, app update runtime state structures, SQLite backup files, and OpenClaw runtime patch updates.
- Validation: conflict list is empty; focused whitespace check on resolved conflict files passes. Full build is blocked because `node_modules` is missing and `tsc` is unavailable.
- Blocker: current sandbox denies writes to `.git`, so final staging update and merge commit could not be completed from this session.

## 2026-05-10

- Node: packaging a macOS arm64 build after upstream merge resolution.
- Status: built `release/MetroAI-2026.5.7-arm64.dmg` and `release/MetroAI-2026.5.7-arm64.dmg.blockmap`.
- OpenClaw runtime: synced `/Users/jqxumbp/workspace/openclaw` to pinned `v2026.4.14` through the local proxy and built `vendor/openclaw-runtime/mac-arm64`.
- Build fixes: added an OpenClaw patch for pnpm native binary runner handling and made the electron-builder plugin check ignore optional OpenClaw plugins.
- Validation: `npm run build`, `npm run compile:electron`, `npm run build:skills`, `npm run openclaw:runtime:mac-arm64`, and direct `electron-builder --mac --config electron-builder.json` completed successfully.
- Packaging note: app signing and notarization were skipped because no local Apple Developer signing identity or notarization credentials were configured.

## 2026-05-14

- Node: applying enterprise access controls for OIDC auth, fixed model provider policy, and marketplace-only MCP/Skill installation.
- Status: implemented login-first renderer gate and main-process Cowork session guard using the custom OIDC authorization code flow.
- Provider policy: locked model management to a single OpenAI-compatible company provider at `http://127.0.0.1:3000/v1`; only the API key remains editable and the default model is `glm-4.7`.
- Marketplace policy: hid manual MCP and Skill add/import entry points; main process rejects manual MCP creation and non-marketplace Skill downloads/upgrades.
- Validation: `npm run build` completed successfully after the changes. Targeted lint for touched files passed.
- Note: full `npm run lint` is still blocked by pre-existing import-sort and warning debt across unrelated files.

## 2026-05-15

- Node: packaging a macOS arm64 build after the enterprise policy changes.
- Status: built `release/MetroAI-2026.5.7-arm64.dmg` and `release/MetroAI-2026.5.7-arm64.dmg.blockmap`.
- Build fix: updated cold-start deep link buffering to preserve OIDC `state` and avoid the stale `pendingAuthCode` reference during Electron compilation.
- Validation: `npm run dist:mac` completed successfully with the configured proxy. Direct `npm run compile:electron` passed before retrying the full package.
- Packaging note: app signing and notarization were skipped because no local Apple Developer signing identity or notarization credentials were configured.
