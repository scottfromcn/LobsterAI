# LobsterAI Project Backlog

This file tracks the development progress, pending tasks, and completed features of the LobsterAI project.

**Last Updated:** 2026-04-20

---

## Project Overview

LobsterAI is an all-in-one personal assistant Agent built by NetEase Youdao, powered by Electron + React + OpenClaw. It provides AI-assisted coding sessions, scheduled tasks, IM integration, and rich artifact previews.

---

## 🚀 In Progress

### Documentation Improvements (2026-04-20)
- [x] Update AGENTS.md with comprehensive architecture documentation
  - [x] Add IM Gateways section
  - [x] Add Scheduled Tasks System section
  - [x] Add MCP Integration section
  - [x] Enhance authentication flow documentation
  - [x] Expand testing guidelines
- [ ] Create BACKLOG.md for project tracking
- [ ] Consider renaming AGENTS.md → CLAUDE.md for consistency

---

## 📋 Pending Tasks

### High Priority
- [ ] **Scheduled Tasks UI Improvements**
  - [ ] Add visual indicator for task status (active/paused/completed)
  - [ ] Show next execution time in task list
  - [ ] Add task execution history view
  - [ ] Implement task pause/resume functionality

- [ ] **IM Gateway Enhancements**
  - [ ] Add connection status indicators for each IM platform
  - [ ] Implement automatic reconnection on connection loss
  - [ ] Add rate limiting for IM message delivery
  - [ ] Support for multiple instances per platform with distinct labels

- [ ] **Memory System Improvements**
  - [ ] Add memory search functionality in Settings panel
  - [ ] Implement memory export/import
  - [ ] Add memory usage statistics
  - [ ] Support for memory tags/categories

### Medium Priority
- [ ] **OpenClaw Integration**
  - [ ] Add OpenClaw version upgrade notification in Settings
  - [ ] Implement graceful fallback when OpenClaw runtime is unavailable
  - [ ] Add OpenClaw logs viewer in Developer panel
  - [ ] Support for custom OpenClaw build configurations

- [ ] **Security & Permissions**
  - [ ] Add "approve all for session" permission option
  - [ ] Implement permission deny reason tracking
  - [ ] Add suspicious activity detection
  - [ ] Support for domain-based permission whitelisting

- [ ] **Artifacts System**
  - [ ] Add artifact sharing functionality (export as HTML/PNG)
  - [ ] Implement artifact version history
  - [ ] Support for interactive artifacts (playgrounds)
  - [ ] Add artifact templates library

### Low Priority
- [ ] **UI/UX Improvements**
  - [ ] Add keyboard shortcuts for common actions
  - [ ] Implement custom theme color picker
  - [ ] Add compact mode for message list
  - [ ] Support for custom CSS injection

- [ ] **Developer Tools**
  - [ ] Add IPC message inspector in DevTools
  - [ ] Implement Redux state time-travel debugging
  - [ ] Add SQLite database viewer panel
  - [ ] Support for extension/plugin system

---

## ✅ Completed Features

### Core Features
- [x] **Cowork System** - AI-assisted coding sessions with OpenClaw engine
- [x] **Multi-Engine Support** - OpenClaw runtime adapter with lifecycle management
- [x] **Permission Control** - Tool execution approval modal with session-level permissions
- [x] **Persistent Memory** - File-based memory system (MEMORY.md, USER.md, SOUL.md)
- [x] **Artifacts Preview** - Rich preview for HTML, SVG, React, Mermaid, code

### IM Integration
- [x] **WeChat** - OpenClaw gateway integration
- [x] **WeCom** - OpenClaw gateway integration
- [x] **DingTalk** - OpenClaw gateway integration
- [x] **Feishu/Lark** - OpenClaw gateway integration
- [x] **QQ** - Official Bot API integration
- [x] **Telegram** - Bot API with webhook and polling
- [x] **Discord** - Bot integration
- [x] **NetEase IM** - Direct SDK integration (P2P messaging)
- [x] **NetEase Bee** - Direct SDK integration
- [x] **NetEase POPO** - OpenClaw gateway integration

### Scheduled Tasks
- [x] **Cron-based Scheduling** - Cron expression support with minute/hourly/daily/weekly/monthly intervals
- [x] **Task Origins** - Manual, Cowork, Migration
- [x] **Session Targets** - Main (shared context), Isolated (fresh context)
- [x] **Wake Modes** - Exact, Lazy (catch-up on missed schedules)
- [x] **Delivery Modes** - Desktop notification, IM push
- [x] **IM Policy** - Route scheduled task results to IM conversations

### Configuration & Storage
- [x] **SQLite Persistence** - All config, sessions, messages, and metadata stored locally
- [x] **Custom Agents** - User-defined agent configurations
- [x] **MCP Server Support** - Model Context Protocol integration
- [x] **i18n** - Chinese (default) and English language support
- [x] **Theme System** - Dark/light mode with Tailwind CSS

### Authentication
- [x] **Dual-Token System** - accessToken (2h) + refreshToken (30d)
- [x] **Automatic Refresh** - Passive (on 401) and proactive (before expiry)
- [x] **Deep Link Login** - lobsterai:// protocol handler
- [x] **Persistent Session** - Auto-restore login state on app restart

### Testing
- [x] **Unit Tests** - 40+ test files covering main process, renderer, and shared code
- [x] **Vitest** - Co-located test files with `.test.ts` extension
- [x] **CI Integration** - Pre-commit hooks and test automation

### Documentation
- [x] **README** - Comprehensive project overview with architecture diagrams
- [x] **AGENTS.md** - Developer guidance for Claude Code with architecture, patterns, and guidelines
- [x] **CLAUDE.md** - Updated with test commands, path aliases, shared directories, husky config
- [x] **Logging Guidelines** - electron-log integration with level-based message format
- [x] **String Constants Pattern** - Centralized constants with `as const` pattern

### Branding
- [x] **Logo** - App logo, build icons (macOS .icns, Windows .ico), tray icons generated from source

---

## 🐛 Bug Fixes

### Recent Fixes (2026)
- [x] **MCP Gateway Restart** - Fix MCP not working after packaging (commit: 64148dc)
- [x] **Build Issues** - Resolved packaging-related problems

### Known Issues
- [ ] **OpenClaw Runtime** - Manual restart required after config changes in some cases
- [ ] **Memory File Sync** - Occasional delay in memory file updates reflecting in UI
- [ ] **IM Webhook Timeouts** - Some IM platforms timeout on long-running tasks
- [ ] **Artifact Preview** - Large Mermaid diagrams may render slowly

---

## 🔧 Technical Debt

### Code Quality
- [ ] Refactor legacy engine cleanup code in `src/main/libs/agentEngine/legacyEngineCleanup.ts`
- [ ] Consolidate duplicate error handling patterns across IM gateways
- [ ] Improve type safety in IPC channel handlers (use proper type guards)
- [ ] Remove unused dependencies in package.json

### Performance
- [ ] Optimize SQLite query performance for large message histories
- [ ] Implement virtual scrolling for message lists
- [ ] Cache OpenClaw config sync results
- [ ] Lazy-load skill definitions on-demand

### Security
- [ ] Audit and update all dependencies to latest secure versions
- [ ] Implement CSP (Content Security Policy) for renderer process
- [ ] Add input sanitization for all user-provided file paths
- [ ] Review and harden IPC message validation

---

## 📊 Project Statistics

- **Total Test Files:** 40+
- **Supported IM Platforms:** 10
- **Built-in Skills:** 29
- **Database Tables:** 11
- **IPC Channels:** 40+
- **Lines of Code:** ~50,000+ (estimated)

---

## 🔄 Release History

### v2026.4.17 (Current)
- OpenClaw v2026.4.8 integration
- Enhanced MCP server support
- Bug fixes and stability improvements

### Previous Releases
- See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes

---

## 📝 Development Guidelines

### Workflow
1. **Task Completion:** Commit after each completed task with descriptive message
2. **Feature Completion:** Push to GitHub after each major feature
3. **Documentation:** Update AGENTS.md and README.md as needed
4. **Testing:** Run `npm test` and `npm run lint` before committing
5. **Code Review:** All PRs should be reviewed before merging

### Commit Message Format
Follow Conventional Commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build/config changes

Example:
```
feat(cowork): add streaming progress indicator

- Show real-time progress bar during long-running tool execution
- Display current tool name and elapsed time
- Add cancel button for in-progress operations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 🎯 Upcoming Milestones

### Q2 2026
- [ ] Enhanced scheduled tasks UI with visual editor
- [ ] Improved IM gateway stability and reconnection
- [ ] Memory system improvements with search and tags
- [ ] OpenClaw runtime upgrade notifications

### Q3 2026
- [ ] Artifact sharing and collaboration features
- [ ] Advanced permission management
- [ ] Performance optimizations for large workspaces
- [ ] Plugin/extension system foundation

---

*This backlog is maintained as part of the project documentation. Update it as features are completed or new tasks are identified.*
