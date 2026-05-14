# Changelog

## 2026-05-09

- Resolved upstream merge conflicts while preserving MetroAI local branding and disabled remote service behavior.
- Integrated upstream additions for OpenClaw runtime patches, IM/email platform support, model/provider metadata, app update state handling, and SQLite backup infrastructure.
- Restored MetroAI user-visible strings in renderer settings, i18n, protocol handling, and Windows installer script.

## 2026-05-10

- Built the macOS arm64 package at `release/MetroAI-2026.5.7-arm64.dmg`.
- Added an OpenClaw `v2026.4.14` patch so pnpm native binaries are not executed through Node during runtime builds.
- Updated the macOS packaging hook to verify only required preinstalled OpenClaw plugins, matching the optional plugin behavior in the plugin installer.
- Removed stale Youdao provider references that blocked TypeScript compilation after the upstream provider cleanup.

## 2026-05-14

- Added custom OIDC login with PKCE and blocked app usage before authentication.
- Locked model settings to a single company OpenAI-compatible provider with default model `glm-4.7`.
- Disabled manual MCP server creation and manual Skill imports, leaving marketplace installation as the supported path.
