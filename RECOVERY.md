# Recovery status

The working project folder was accidentally deleted. This repo was reassembled
from the live deployment plus the change history — and the whole project now
**builds from clean source** again (`npm install && npm run build`). Status:

## Recovered / safe
- **`src/app.jsx`** — the full dashboard, reconstructed as clean source and validated
  (`npm test`: logic round-trip + jsdom render, 0 React errors). See `RECONSTRUCTION.md`.
- **`dist/index.html`** — the deployable, now built from `src/` via `node build.mjs`
  (self-contained: React app + inlined CSS + Supabase config). The exact original
  compiled build is also preserved in `recovered/bundle.js`.
- **`dist/WPB_OFFLINE_DEMO.html`** — the same build with Supabase disabled, so it
  runs locally with no DB (onboarding/local-storage mode).
- **`src/styles.css`** — recovered verbatim from the live build (unminified, 768 lines,
  includes all recent fixes).
- **`supabase/REBUILD_DATABASE.sql`** — full schema + roles + RLS + first-login trigger
  + invite-eligibility function. Recreates the database from scratch.

## Fidelity note
- `src/app.jsx` was reconstructed from the compiled bundle. The export-format Excel
  round-trip is test-covered; the raw-agency-workbook import path was reconstructed by
  inspection (no real fixtures survived) — spot-check a real import before relying on it.

## To point the app at a different / new Supabase project
Edit `src/supabase.js` (project URL + `sb_publishable_...` key) and rebuild with
`node build.mjs`. (The values are also baked into `dist/index.html` if you need to
patch the built file directly — find `.supabase.co`.)
