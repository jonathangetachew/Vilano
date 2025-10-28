# Vilano

This is my personal project for generating hashed passwords from one master password for the multiple services I use. Read the checklist below for the list of frameworkds and/or libraries I used.

## Checklist

- [x] Svelte
- [x] nodejs
- [x] express
- [x] jshashes
- [x] clipboard.js
- [x] Vercel

## Svelt Upgrade + UI Overhaul Checklist

### Audit & preparation

- [ ] Inspect repository structure and lockfiles
  - client/package.json
  - client/rollup.config.js
  - server/\* (API compatibility)
- [ ] Create a branch: `feature/svelte-upgrade-ui`

### Dependencies & build tooling

- [ ] Update `svelte` to latest stable (v4+) in `client/package.json`
- [ ] Update Svelte-related plugins (rollup/webpack/vite) to versions compatible with Svelte v4
- [ ] Run package manager and commit updated lockfile (`npm install` / `pnpm install` / `yarn install`)
- [ ] Update build scripts in `client/package.json` if needed

### Rollup / Dev config

- [ ] Update `client/rollup.config.js` for Svelte v4 plugin API
- [ ] Ensure environment replacement and output paths remain correct
- [ ] Verify dev server and build pipeline run locally

### Code migration (Svelte v3 → v4)

- [ ] Search-and-fix breaking changes: lifecycle hooks, transitions, slot API, compiler warnings
- [ ] Fix components:
  - client/src/App.svelte
  - client/src/pages/Home.svelte
  - client/src/components/PasswordForm.svelte
  - client/src/components/GeneratedPasswords.svelte
  - client/src/components/GeneratedPassword.svelte
- [ ] Run the compiler, fix remaining errors

### Replace ClipboardJS

- [ ] Remove ClipboardJS usage and replace with `navigator.clipboard` where applicable
  - client/src/main.js
  - client/src/components/GeneratedPassword.svelte

### Theming, styles & UI overhaul

- [ ] Audit and consolidate theme variables (client/src/themes.js, ThemeProvider)
- [ ] Create new/responsive layout and components:
  - Header (Header.svelte)
  - Theme toggle (ThemeToggle.svelte)
  - Password input (PasswordForm.svelte)
  - Results list (GeneratedPasswords.svelte)
  - Result item (GeneratedPassword.svelte)
- [ ] Replace image icons with optimized inline SVGs
- [ ] Update breakpoints and responsive styles

### Accessibility & semantics

- [ ] Ensure form controls have labels and ARIA where needed
- [ ] Use semantic elements and landmarks (header, main, footer)
- [ ] Verify keyboard navigation and focus states

### Transitions & animations

- [ ] Review and update custom transitions (superFly.js) and built-in transitions
- [ ] Smooth and accessible animation timings

### State, stores & architecture

- [ ] Consider extracting theme and password state into Svelte stores if UI grows

### Network, error handling & environment

- [ ] Harden fetch calls (timeouts, error states) - TanStack query
- [ ] Use environment variable replacement for API URLs in build config
- [ ] Verify server API (server/index.js) works with upgraded client

### PWA & assets

- [ ] Update manifest and service worker to reflect new UI (client/public/manifest.json, client/public/service-worker.js)
- [ ] Optimize static assets
