# Weekly Performance Book

A multi-tenant staffing-agency performance dashboard. Front end is a single
self-contained HTML file (React, bundled with esbuild); backend is Supabase
(auth, Postgres, row-level security); hosting is one static file on Netlify.

**Live site:** https://weeklyperformancebook.netlify.app/
**Supabase project:** `ifykttcsgsvrvvyozwog` (free tier — auto-pauses after ~7 days idle; resume from the Supabase dashboard, data is preserved).

## Deploy / redeploy the site
The deployable is a single file. To publish or restore the exact live site:
1. Netlify → your site → **Deploys** → drag **`dist/index.html`** onto the drop zone.
2. Hard-refresh (Ctrl+Shift+R).

## Rebuild the database (only if the Supabase project is ever deleted)
1. Create a new Supabase project.
2. SQL Editor → New query → paste **`supabase/REBUILD_DATABASE.sql`** → Run.
3. Update the URL + anon key in the app and redeploy (see RECOVERY.md).

## Offline demo (no DB, no internet)
**`dist/WPB_OFFLINE_DEMO.html`** runs the dashboard entirely in the browser
(local storage, no login). Open it directly for a self-contained demo.

## Roles
super_admin (owner console) → admin (full editing) → team_lead (edits one
assigned team) → viewer (read-only). Access is invite-only.

## Repo status
See **RECOVERY.md** — this repo was reconstructed after the working folder was
accidentally deleted. The deployable build and most source are recovered; the
one large source file (`src/app.jsx`) survives only inside the compiled build.
