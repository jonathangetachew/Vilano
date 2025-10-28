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

### Linting, formatting & tests

- [ ] Run and fix ESLint warnings (client/.eslintrc.cjs)
- [ ] Apply Prettier (client/.prettierrc.cjs)
- [ ] Add/update unit or integration tests for critical components

### TypeScript migration

- [ ] If adopting TS, run setup script and incrementally convert components (client/scripts/setupTypeScript.js)

### Documentation & polish

- [ ] Update this README with final steps/status and screenshots

## Reference files to inspect

- client/package.json
- client/rollup.config.js
- client/src/main.js
- client/src/App.svelte
- client/src/pages/Home.svelte
- client/src/utils/ThemeProvider.svelte
- client/src/utils/ThemeToggle.svelte
- client/src/themes.js
- client/src/components/PasswordForm.svelte
- client/src/components/GeneratedPasswords.svelte
- client/src/components/GeneratedPassword.svelte
- client/src/superFly.js
- client/public/service-worker.js
- client/public/manifest.json
- server/index.js
- server/vercel.json

## Server-side improvement checklist

Use this checklist to harden the server and avoid exposing secrets or sensitive data.

- [ ] Move all secrets to environment variables.
- [ ] Use Helmet (security headers) and set a strict Content Security Policy in Express.
- [ ] Implement rate limiting (express-rate-limit) and request body size limits.
- [ ] Add `.env` to `.gitignore` and ensure no `.env` or secret files are tracked.
- [ ] Use the deployment platform's secret manager (Vercel env vars) for production keys.
- [ ] Replace hard-coded credentials in `server/` with process.env lookups.
- [ ] Add a startup check that fails fast if required env vars are missing.
- [ ] Add `.gitignore` entries for logs, local configs, and other sensitive files.
- [ ] Scan repository for accidentally committed secrets and remove them from history (git filter-repo / BFG).
- [ ] Add pre-commit secret scanning (git-secrets, truffleHog, or similar) and Husky hooks.
- [ ] Validate and sanitize all incoming data (Joi, zod, express-validator) to prevent injection.
- [ ] Enforce HTTPS in production and redirect HTTP → HTTPS.
- [ ] Configure CORS to only allow expected origins.
- [ ] Centralize error handling and avoid leaking stack traces in production responses.
- [ ] Implement graceful shutdown and proper signal handling for the server.
- [ ] Add structured logging and monitoring (e.g., Winston/ Pino + Sentry) and redact sensitive fields.
- [ ] Add health and readiness endpoints for deployment checks.
- [ ] Add CI checks: lint, tests, dependency scan, and secret-scan before merge.
- [ ] Limit filesystem exposure: do not serve repository root or `.git` and verify static file routes.
- [ ] Review file permissions on server artifacts and restrict access to secrets/config files.
- [ ] Add documentation on where secrets live and how to set up local development safely.
