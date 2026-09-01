/* ============================================================================
 *  app.jsx — NOT RECOVERED AS CLEAN SOURCE (placeholder)
 * ----------------------------------------------------------------------------
 *  The original ~167 KB dashboard file (Excel import/parse, charts, the four
 *  tab views, PDF export, the config/theme engine, onboarding, and the
 *  multi-team + team-leaderboard + team-lead features) was lost when the working
 *  folder was deleted. It survives only COMPILED inside the deployed build.
 *
 *  The complete, faithful, working app is in:   dist/index.html
 *  (that single self-contained file is the deployable and the source of truth).
 *
 *  Everything else in this repo IS recovered as clean, editable source:
 *      src/auth.jsx        - auth shell, roles, invites, owner console
 *      src/supabase.js     - Supabase client + all data-access helpers
 *      src/styles.css      - full stylesheet (recovered verbatim from the build)
 *      src/index.jsx       - entry point
 *      src/EMPTY_DATA.js   - empty data-model skeleton
 *      build.mjs           - esbuild bundler (src/* -> dist/index.html)
 *      supabase/*.sql      - full schema + roles + RLS + triggers
 *
 *  To build from source again, this file must be reconstructed. Until then,
 *  deploy/redeploy the site by dragging dist/index.html onto Netlify.
 *
 *  If you build with a real app.jsx later, it must default-export the App
 *  component that auth.jsx renders:
 *      export default function App({ session, initialData, onPersist,
 *                                    canEdit, agencyName, editableTeam }) { ... }
 * ========================================================================== */

import React from "react";

export default function App() {
  return (
    <div className="welcome" style={{ padding: "60px 20px", textAlign: "center" }}>
      <div className="w-eyebrow">WEEKLY PERFORMANCE BOOK</div>
      <h1>Source placeholder</h1>
      <p style={{ maxWidth: 560, margin: "12px auto", color: "var(--muted)" }}>
        The dashboard code (<code>app.jsx</code>) was not recovered as clean source.
        The working application is the compiled <code>dist/index.html</code>. See
        <code> RECOVERY.md</code> in this repository.
      </p>
    </div>
  );
}
