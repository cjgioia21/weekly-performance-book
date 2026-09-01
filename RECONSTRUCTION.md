# app.jsx reconstruction map

`src/app.jsx` is the only file not recovered as clean source. The complete compiled
version is preserved two ways:
- `dist/index.html` (the deployable) and
- `recovered/bundle.js` (the extracted minified bundle).

`recovered/app_recovered_partial.jsx` holds the **clean, readable source of the parts
that were recoverable verbatim** (the multi-team engine, the team-leaderboard feature,
the data/week engine, and the Excel export/template). These are correct — they were read
or authored directly, not de-compiled.

To produce a fully buildable `src/app.jsx`, the remaining pieces below must be
reconstructed from `recovered/bundle.js` (they were never seen in clean form, so they are
NOT in the partial file — do not guess them, translate them from the bundle and validate).

## Recovered clean (in app_recovered_partial.jsx)
- Constants: `ALL_TABS`, `TABS`, `tabOn`, `widgetOn`, `TG_FIELDS`, `REC_FIELDS`,
  `SALES_FIELDS`, `REP_ENTRY_FIELDS`
- Formatters: `pct`, `fmtCur`, `fmtCurK`, `fmtCur0`, `fmtNum`, `fmtPct`, `clamp01`
- Multi-team engine: `hasTeams`, `teamList`, `sumArrays`, `rollupTeams`, `teamStandings`,
  `STATUS_META`, `TeamLeaderboard`, `editingTeam`, `pickEditTarget`, `mergeTeamEdit`,
  `importIntoTeamData`, `resolveTeamData`
- Week engine: `addWeek`, `deleteLastWeek`, `recomputeRecruitTotals`
- Excel out: `buildWorkbook`, `exportToExcel`, `downloadTemplate`, `brandSlug`, `dateStamp`
- Components: `Leaderboard`, `Overview`, `TeamManager`

## Still needs de-compiling from recovered/bundle.js
- **`parseWorkbook`** (Excel import; auto-detects raw agency workbook vs app export — complex)
- Tab components: `TeamGoals` (full), `Recruitment`, `Sales`, `RecruiterScorecard`
- Modals/wizards: `AddWeekModal`, `SettingsPanel`, `SetupWizard`, `RepProfile`, `RecProfile`
- Chart/UI primitives: `KPI`, `Card`, `ChartCard`, `Insights`, `PeriodCompare`,
  `ProgressCard`, `Commission`, and chart constants `C`, `axis`, `tip`
- Config/theme engine: `getConfig`, `DEFAULT_CONFIG`, `applyThemeVars`, `chartColors`,
  `WIDGET_REGISTRY`, `TEMPLATES`, `activeBrandName`, `extractBrandFromLogo`, `deriveTeamGoals`
- Helpers: `sum`, `last`, `slugify`, PDF export `downloadPDF`
- The `App` default export (large): topbar, tabs, week/year/team selectors, add/import
  handlers, render — big portions are recoverable from my reads but interleave with the
  above, so rebuild the whole `App` once the pieces exist.

## Validation when reconstructing
1. `node build.mjs` must succeed and produce a `dist/index.html` that renders.
2. `npm test` (export round-trip + team feature + jsdom mount suites — the test files can
   be re-authored from the bundle-verified behavior).
3. Diff the rebuilt `dist/index.html` behavior against the current known-good one.
