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
