# app.jsx reconstruction — COMPLETE

`src/app.jsx` was lost and has been fully reconstructed as clean, editable source
from the compiled build, then validated. The whole project now builds from source:

```bash
npm install
npm run build     # -> dist/index.html (2.2 MB, self-contained)
npm test          # logic 15/15 + jsdom render 9/9, 0 React errors
```

## What's in app.jsx (in file order)
- **Config/theme engine** — `getConfig`, `TEMPLATES`, `WIDGET_REGISTRY`, `THEME_FIELDS`,
  `tabOn`/`widgetOn`, `activeBrandName`, `chartColors`, `applyThemeVars`, `C`
- **Helpers** — `sum`, `last`, `deriveTeamGoals`, formatters, field constants
- **Multi-team engine** — `hasTeams`, `teamList`, `sumArrays`, `rollupTeams`, `teamStandings`,
  `TeamLeaderboard`, `pickEditTarget`, `mergeTeamEdit`, `importIntoTeamData`, `resolveTeamData`
- **Week engine** — `addWeek`, `deleteLastWeek`, `recomputeRecruitTotals`
- **Excel** — `buildWorkbook`, `exportToExcel`, `downloadTemplate`, `parseWorkbook`
  (+ `parseRawWorkbook` for raw agency workbooks)
- **UI primitives & charts** — `KPI`, `ProgressRing`, `ProgressCard`, `ChartCard`, `axis`,
  `tip`, `Funnel`, `TouchesDonut`, `SalesFocus`, `Leaderboard`, `useSeries`, `Insights`,
  `PeriodCompare`, `RepProfile`
- **Tab views** — `Overview`, `TeamGoals`, `Recruitment`, `Sales`, `RecruiterScorecard`,
  `RecProfile`, `downloadPDF`, `extractBrandFromLogo`
- **Modals / setup** — `SettingsPanel`, `SetupWizard`, `AddWeekModal`, `NumField`, `TeamManager`
- **`App`** — default export: onboarding, topbar (team/year/week selectors), tabs,
  import/export/PDF, settings, offline (localStorage) + hosted (Supabase) modes

## Validation
- `tests/logic.test.mjs` — `buildWorkbook` ⇄ `parseWorkbook` round-trip + `teamStandings`.
- `tests/render.test.mjs` — mounts `App` in jsdom with real data; asserts the dashboard
  and Sales tab render with **0 React errors**.
- Visually verified in-browser: login shell + Overview + Sales tabs, styled, no console errors.

## Fidelity notes
- Reconstructed from the compiled bundle, so names/comments are new but behavior matches.
- The **raw-workbook import path** (`parseRawWorkbook`) was reconstructed by inspection; the
  export-format round-trip is test-covered, but the many raw-Excel label variants could not be
  tested against real fixtures (lost). Spot-check an import of a real workbook before relying on it.
- The exact original compiled app is still preserved in `recovered/bundle.js`
  (rebuild it into `dist/` with `node scripts/build-from-bundle.mjs` if ever needed).
  `recovered/app_recovered_partial.jsx` is the earlier partial extract, now superseded by `src/app.jsx`.
