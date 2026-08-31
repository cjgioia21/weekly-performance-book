# Recovery status

The working project folder was accidentally deleted. This repo was reassembled
from the live deployment plus the change history. Status of each piece:

## Recovered / safe
- **`dist/index.html`** — the exact working live build (self-contained: React app
  + inlined CSS + Supabase config). This is the deployable and the source of truth.
- **`dist/WPB_OFFLINE_DEMO.html`** — the same build with Supabase disabled, so it
  runs locally with no DB (onboarding/local-storage mode).
- **`src/styles.css`** — recovered verbatim from the live build (unminified, 768 lines,
  includes all recent fixes).
- **`supabase/REBUILD_DATABASE.sql`** — full schema + roles + RLS + first-login trigger
  + invite-eligibility function. Recreates the database from scratch.

## Not cleanly recovered
- **`src/app.jsx`** — the ~167 KB dashboard file (Excel parser, charts, tab
  components, PDF export, settings/theme engine). It survives only *compiled* inside
  `dist/index.html`. It cannot be reproduced as clean, hand-written source without
  reconstructing it, so **new feature work on the dashboard requires rebuilding this
  file first**. CSS-only/visual changes can still be made by editing `src/styles.css`
  and re-inlining it into the built HTML.

## To point the app at a different / new Supabase project
The URL + anon key are baked into `dist/index.html`. Find `.supabase.co` in the
file and replace the project ref + the `sb_publishable_...` key with the new ones,
then redeploy. (Or, once `app.jsx` is reconstructed, edit `src/supabase.js` and
rebuild with `node build.mjs`.)
