/* ============================================================================
 *  app_recovered_partial.jsx  —  PARTIAL, but CLEAN and CORRECT
 * ----------------------------------------------------------------------------
 *  These are the parts of the original src/app.jsx that were recovered verbatim
 *  (read or authored directly during development), not de-compiled. They are
 *  accurate. The rest of app.jsx (parser, chart components, settings engine,
 *  tab views) still needs reconstruction from recovered/bundle.js — see
 *  RECONSTRUCTION.md.
 *
 *  External dependencies these blocks assume (NOT yet recovered clean; they exist
 *  in recovered/bundle.js): React/useState/useMemo/useRef/useEffect, XLSX, the
 *  EMPTY skeleton (src/EMPTY_DATA.js), and helpers sum/last/deriveTeamGoals,
 *  chart primitives (KPI, ChartCard, C, axis, tip), config engine
 *  (getConfig, DEFAULT_CONFIG, activeBrandName), LB_COLS, etc.
 * ========================================================================== */

// ---- constants ----
const ALL_TABS = ["Overview", "Team Goals", "Recruitment (Current Team)", "Sales"];
const TABS = ["Overview", "Team Goals", "Recruitment (Current Team)", "Sales"];
const tabOn = (cfg, t) => cfg.tabs[t] !== false;
const widgetOn = (cfg, id) => cfg.widgets[id] !== false;

const TG_FIELDS = ["tempGM", "totalGM", "budget", "revenue", "hours", "peoplePaid", "clientsBilled", "newClients", "newTempOrders", "openTempOrders", "openPerm", "weeklyFill"];
const REC_FIELDS = ["gm", "peoplePaid", "starts", "ends", "interviews", "registered", "submittals", "clientInterviews"];
const SALES_FIELDS = ["totalCalls", "prospectDMCalls", "prospectTouches", "clientTouches", "prospectEmails", "clientEmails", "prospectMeetings", "clientMeetings", "contractsSent", "contractsSigned", "newClients"];
const REP_ENTRY_FIELDS = ["calls", "prospectDMCalls", "prospectMeetings", "clientMeetings", "contracts", "signed", "firstOrder", "newAccounts", "gm", "prospectTouches", "clientTouches"];

// ---- formatters ----
const pct = (cur, prev) =>
  prev == null || prev === 0 || cur == null ? null : ((cur - prev) / Math.abs(prev)) * 100;
const fmtCur = (n) =>
  n == null ? "–" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtCurK = (n) =>
  n == null ? "–" : Math.abs(n) >= 1e6 ? "$" + (n / 1e6).toFixed(1) + "M"
  : Math.abs(n) >= 1e3 ? "$" + Math.round(n / 1e3) + "k" : "$" + Math.round(n);
const fmtCur0 = (n) => (n == null ? "–" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const fmtNum = (n) => (n == null ? "–" : Number.isInteger(+n) ? (+n).toLocaleString() : (+n).toLocaleString("en-US", { maximumFractionDigits: 1 }));
const fmtPct = (n) => (n == null ? "–" : (n * 100).toFixed(2) + "%");
const clamp01 = (x) => Math.max(0, Math.min(1, x || 0));

// ===== MULTI-TEAM SUPPORT =====
// A company may have data.teams = { teamId: { name, teamGoals, recruitment, sales, currentWeek, ... } }.
// When absent, the company is single-team and behaves exactly as before (full backwards-compat).
function hasTeams(d) { return !!(d && d.teams && Object.keys(d.teams).length > 0); }
function teamList(d) { return hasTeams(d) ? Object.keys(d.teams).map((id) => ({ id, name: (d.teams[id] && d.teams[id].name) || id })) : []; }

// Sum index-aligned numeric arrays across teams to length = max team length.
function sumArrays(arrs) {
  const n = arrs.reduce((m, a) => Math.max(m, (a || []).length), 0);
  const out = new Array(n).fill(0);
  for (const a of arrs) for (let i = 0; i < (a || []).length; i++) out[i] += (+a[i] || 0);
  return out;
}

// Build a single combined dataset from all teams (the company roll-up).
function rollupTeams(d) {
  const teams = Object.values(d.teams || {});
  if (!teams.length) return d;
  const maxWeek = teams.reduce((m, t) => Math.max(m, t.currentWeek || (t.teamGoals && t.teamGoals.totalGM ? t.teamGoals.totalGM.length : 0)), 0);
  const ref = teams.slice().sort((a, b) => (b.currentWeek || 0) - (a.currentWeek || 0))[0];
  const tg = { weeks: (ref.teamGoals.weeks || []).slice(), weekDates: (ref.teamGoals.weekDates || []).slice() };
  const tgKeys = new Set(TG_FIELDS);
  for (const t of teams) for (const k in (t.teamGoals || {})) if (Array.isArray(t.teamGoals[k]) && !["weeks","weekDates","gmPerHour","gmPct","cum2026","ytdFill","ytdFillSheet"].includes(k)) tgKeys.add(k);
  for (const f of tgKeys) tg[f] = sumArrays(teams.map((t) => t.teamGoals[f]));
  tg.goals = {};
  for (const t of teams) { const g = (t.teamGoals && t.teamGoals.goals) || {}; for (const k in g) tg.goals[k] = (tg.goals[k] || 0) + (+g[k] || 0); }
  tg.cum2025 = sumArrays(teams.map((t) => t.teamGoals.cum2025));
  deriveTeamGoals(tg); // NOTE: deriveTeamGoals not yet recovered clean — see bundle.js

  const recMap = {};
  for (const t of teams) for (const r of ((t.recruitment && t.recruitment.recruiters) || [])) {
    const key = r.name; const ex = recMap[key] || (recMap[key] = { name: r.name });
    for (const f in r) if (f !== "name" && Array.isArray(r[f])) ex[f] = sumArrays([ex[f], r[f]]);
  }
  const recruitment = { weeks: tg.weeks.slice(0, maxWeek), recruiters: Object.values(recMap), total: {} };

  const sales = { weeks: tg.weeks.slice(0, maxWeek) };
  const salesKeys = new Set();
  for (const t of teams) for (const k in (t.sales || {})) if (k !== "weeks" && k !== "repTotals" && Array.isArray(t.sales[k])) salesKeys.add(k);
  for (const f of salesKeys) sales[f] = sumArrays(teams.map((t) => t.sales && t.sales[f]));
  const repMap = {};
  for (const t of teams) for (const [name, rt] of Object.entries((t.sales && t.sales.repTotals) || {})) {
    const ex = repMap[name] || (repMap[name] = { calls: 0, prospectDMCalls: 0, prospectMeetings: 0, clientMeetings: 0, contracts: 0, signed: 0, firstOrder: 0, newAccounts: 0, gm: 0, meetings: 0, prospectTouches: 0, clientTouches: 0 });
    for (const k of REP_ENTRY_FIELDS) ex[k] = (ex[k] || 0) + (+rt[k] || 0);
    ex.meetings = ex.prospectMeetings + ex.clientMeetings;
  }
  sales.repTotals = repMap;

  const out = { ...d, teamGoals: tg, recruitment, sales, currentWeek: maxWeek, weekEnding: tg.weekDates[maxWeek - 1] || d.weekEnding };
  delete out.teams;
  recomputeRecruitTotals(out);
  return out;
}

// Compute per-team standings: rank by GM, plus goal-pacing (on track / behind / ahead).
export function teamStandings(d) {
  if (!hasTeams(d)) return [];
  const yearWeeks = 52;
  const rows = Object.keys(d.teams).map((id) => {
    const t = d.teams[id]; const tg = (t && t.teamGoals) || {};
    const wk = t.currentWeek || (tg.totalGM ? tg.totalGM.length : 0);
    const sum = (a) => (a || []).slice(0, wk).reduce((s, v) => s + (+v || 0), 0);
    const gm = sum(tg.totalGM);
    const revenue = sum(tg.revenue);
    const goalMargin = (tg.goals && +tg.goals.margin) || 0;
    const goalBill = (tg.goals && +tg.goals.bill) || 0;
    const expGM = goalMargin ? goalMargin * (wk / yearWeeks) : 0;
    const pace = expGM ? gm / expGM : null;
    const projGM = wk ? gm * (yearWeeks / wk) : 0;
    let status = "none";
    if (pace != null) status = pace >= 1.0 ? "ahead" : pace >= 0.9 ? "ontrack" : "behind";
    return { id, name: t.name || id, weeks: wk, gm, revenue, goalMargin, goalBill, expGM, pace, projGM, status };
  });
  rows.sort((a, b) => b.gm - a.gm);
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

// Plain-language label + bucket for a standings row's pacing status.
const STATUS_META = {
  ahead:   { label: "Ahead",    cls: "ahead" },
  ontrack: { label: "On track", cls: "ontrack" },
  behind:  { label: "Behind",   cls: "behind" },
  none:    { label: "No goal",  cls: "none" },
};

// The shared team leaderboard: renders BOTH rank order AND on-track/behind status.
export function TeamLeaderboard({ rows, compact, currentTeam, youTeam, onPick }) {
  if (!rows || !rows.length) return <div className="empty-hint">No teams to rank yet. Add a second team to see the leaderboard.</div>;
  const maxGM = rows.reduce((m, r) => Math.max(m, r.gm || 0), 0) || 1;
  return (
    <div className={"tlb" + (compact ? " compact" : "")}>
      <div className="tlb-head">
        <span className="tlb-c-rank">#</span>
        <span className="tlb-c-team">Team</span>
        <span className="tlb-c-gm">GM$ YTD</span>
        {!compact && <span className="tlb-c-goal">Goal</span>}
        <span className="tlb-c-pace">Pace vs goal</span>
        {!compact && <span className="tlb-c-proj">Proj. year-end</span>}
        <span className="tlb-c-status">Status</span>
      </div>
      {rows.map((r) => {
        const sm = STATUS_META[r.status] || STATUS_META.none;
        const isYou = youTeam && r.id === youTeam;
        const isCur = currentTeam && r.id === currentTeam;
        return (
          <div key={r.id}
            className={"tlb-row" + (isCur ? " current" : "") + (isYou ? " you" : "") + (onPick ? " clickable" : "")}
            onClick={onPick ? () => onPick(r.id) : undefined}
            title={onPick ? "View " + r.name : undefined}>
            <span className="tlb-c-rank"><span className={"tlb-rank r" + r.rank}>{r.rank}</span></span>
            <span className="tlb-c-team">
              <span className="tlb-team-name">{r.name}</span>
              {isYou && <span className="tlb-you">Your team</span>}
              <span className="tlb-weeks">{r.weeks} {r.weeks === 1 ? "week" : "weeks"}</span>
            </span>
            <span className="tlb-c-gm">
              <span className="tlb-gm-val">{fmtCurK(r.gm)}</span>
              <span className="tlb-bar"><span className="tlb-bar-fill" style={{ width: (clamp01(r.gm / maxGM) * 100) + "%" }} /></span>
            </span>
            {!compact && <span className="tlb-c-goal">{r.goalMargin ? fmtCurK(r.goalMargin) : "—"}</span>}
            <span className="tlb-c-pace">{r.pace == null ? "—" : Math.round(r.pace * 100) + "%"}</span>
            {!compact && <span className="tlb-c-proj">{r.projGM ? fmtCurK(r.projGM) : "—"}</span>}
            <span className="tlb-c-status"><span className={"tlb-pill " + sm.cls}>{sm.label}</span></span>
          </div>
        );
      })}
    </div>
  );
}

// EDIT WRITE-BACK helpers (multi-team). Edits target data.teams[teamSel] and merge back
// so sibling teams are untouched. Single-team / roll-up → whole book.
function editingTeam(d, teamSel) {
  return !!(hasTeams(d) && teamSel && teamSel !== "__all__" && d.teams && d.teams[teamSel]);
}
export function pickEditTarget(d, teamSel) {
  return editingTeam(d, teamSel) ? d.teams[teamSel] : d;
}
export function mergeTeamEdit(d, teamSel, ndTarget) {
  return editingTeam(d, teamSel) ? { ...d, teams: { ...d.teams, [teamSel]: ndTarget } } : ndTarget;
}
// Import a parsed workbook into ONE existing team — replaces that team's numbers,
// keeps its name, leaves every other team untouched.
export function importIntoTeamData(d, tid, parsed, fileName) {
  const cur = (d.teams && d.teams[tid]) || {};
  const gNew = (parsed.teamGoals && parsed.teamGoals.goals) || {};
  const goals = Object.values(gNew).some((v) => v) ? gNew : ((cur.teamGoals && cur.teamGoals.goals) || {});
  const t = {
    ...cur, name: cur.name || tid,
    teamGoals: { ...parsed.teamGoals, goals },
    recruitment: parsed.recruitment, sales: parsed.sales,
    currentWeek: parsed.currentWeek, weekEnding: parsed.weekEnding, _year: parsed._year,
    _importMeta: { file: fileName, at: new Date().toISOString() },
  };
  return { ...d, teams: { ...d.teams, [tid]: t } };
}

function resolveTeamData(d, teamSel) {
  if (!hasTeams(d)) return d;
  if (!teamSel || teamSel === "__all__") return rollupTeams(d);
  const t = d.teams[teamSel];
  if (!t) return rollupTeams(d);
  return { ...d, teamGoals: t.teamGoals, recruitment: t.recruitment, sales: t.sales, currentWeek: t.currentWeek, weekEnding: t.weekEnding, _year: t._year || d._year, archive: d.archive };
}

// ---- week engine ----
function addWeek(d, form) {
  const nd = JSON.parse(JSON.stringify(d));
  const tg = nd.teamGoals, rc = nd.recruitment, sa = nd.sales;
  const n = (nd.currentWeek || tg.totalGM.length) + 1;
  (tg.weeks = tg.weeks || []).push("W" + n);
  (tg.weekDates = tg.weekDates || []).push((form.weekDate || "").trim() || "Week " + n);
  for (const f of TG_FIELDS) (tg[f] = tg[f] || []).push(+form.tg[f] || 0);
  tg.cum2025 = tg.cum2025 || [];
  tg.cum2025.push(tg.cum2025.length ? tg.cum2025[tg.cum2025.length - 1] : 0);
  deriveTeamGoals(tg);
  for (const r of (rc.recruiters || [])) {
    const rv = (form.recruiters && form.recruiters[r.name]) || {};
    for (const f of REC_FIELDS) (r[f] = r[f] || []).push(+rv[f] || 0);
  }
  rc.weeks = tg.weeks.slice(0, n);
  const sumAt = (f) => (rc.recruiters || []).reduce((s, r) => s + (+(r[f] || [])[n - 1] || 0), 0);
  const t = rc.total;
  for (const f of ["starts", "ends", "interviews", "registered", "submittals", "clientInterviews"]) (t[f] = t[f] || []).push(sumAt(f));
  const paidRec = sumAt("peoplePaid");
  (t.paidByRecruiter = t.paidByRecruiter || []).push(paidRec);
  (t.paidHouse = t.paidHouse || []).push(Math.max(0, (+form.tg.peoplePaid || 0) - paidRec));
  (t.openOrders = t.openOrders || []).push(+form.openOrders || 0);
  for (const f of SALES_FIELDS) (sa[f] = sa[f] || []).push(+form.sales[f] || 0);
  sa.weeks = tg.weeks.slice(0, n);
  if (form.reps) {
    sa.repTotals = sa.repTotals || {};
    for (const [rep, vals] of Object.entries(form.reps)) {
      const cur = sa.repTotals[rep] || { calls: 0, prospectDMCalls: 0, prospectMeetings: 0, clientMeetings: 0, contracts: 0, signed: 0, firstOrder: 0, newAccounts: 0, gm: 0, meetings: 0, prospectTouches: 0, clientTouches: 0 };
      for (const k of REP_ENTRY_FIELDS) cur[k] = (cur[k] || 0) + (+vals[k] || 0);
      cur.meetings = cur.prospectMeetings + cur.clientMeetings;
      sa.repTotals[rep] = cur;
    }
  }
  nd._weekLedger = nd._weekLedger || [];
  nd._weekLedger.push({ week: n, reps: form.reps ? JSON.parse(JSON.stringify(form.reps)) : {} });
  nd.currentWeek = n;
  nd.weekEnding = tg.weekDates[n - 1];
  return nd;
}

function deleteLastWeek(d) {
  const nd = JSON.parse(JSON.stringify(d));
  const tg = nd.teamGoals, rc = nd.recruitment, sa = nd.sales;
  const n = nd.currentWeek || tg.totalGM.length;
  if (n <= 1) return nd;
  const pop = (o) => { for (const k in o) if (Array.isArray(o[k]) && o[k].length >= n) o[k].pop(); };
  pop(tg);
  (rc.recruiters || []).forEach((r) => pop(r));
  pop(rc.total);
  pop(sa);
  const ledger = nd._weekLedger || [];
  const last = ledger.length ? ledger[ledger.length - 1] : null;
  if (last && last.week === n && last.reps && sa.repTotals) {
    for (const [name, vals] of Object.entries(last.reps)) {
      const t = sa.repTotals[name]; if (!t) continue;
      for (const k of REP_ENTRY_FIELDS) t[k] = (t[k] || 0) - (+vals[k] || 0);
      t.meetings = (t.prospectMeetings || 0) + (t.clientMeetings || 0);
    }
    ledger.pop();
  }
  nd.currentWeek = n - 1;
  nd.weekEnding = tg.weekDates[n - 2];
  return nd;
}

// Rebuild recruitment totals from the current recruiter roster (after add/remove).
function recomputeRecruitTotals(nd) {
  const rc = nd.recruitment, tg = nd.teamGoals;
  const n = nd.currentWeek || (tg.totalGM ? tg.totalGM.length : 0);
  const recs = rc.recruiters || [];
  const sumAt = (f, i) => recs.reduce((s, r) => s + (+(r[f] || [])[i] || 0), 0);
  rc.total = rc.total || {};
  for (const f of ["starts", "ends", "interviews", "registered", "submittals", "clientInterviews"])
    rc.total[f] = Array.from({ length: n }, (_, i) => sumAt(f, i));
  rc.total.paidByRecruiter = Array.from({ length: n }, (_, i) => sumAt("peoplePaid", i));
  rc.total.paidHouse = Array.from({ length: n }, (_, i) => Math.max(0, ((tg.peoplePaid || [])[i] || 0) - rc.total.paidByRecruiter[i]));
}

// ---- Excel export (mirrors the template's label-driven layout) ----
const brandSlug = (d) => (activeBrandName(d) || "Weekly Performance Book").trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "") || "Weekly-Performance-Book";
const dateStamp = () => new Date().toISOString().slice(0, 10);

export function buildWorkbook(d) {
  const tg = d.teamGoals, rc = d.recruitment, sa = d.sales;
  const n = d.currentWeek || tg.totalGM.length;
  const wk = (tg.weeks || []).slice(0, n);
  const dates = (tg.weekDates || []).slice(0, n);
  const row = (label, arr) => [label, ...(arr || []).slice(0, n).map((v) => (v == null ? 0 : v))];
  const g = tg.goals || {};

  const tgRows = [
    ["Week label", ...wk], ["Week ending (text)", ...dates],
    row("Temp GM$ (Margin)", tg.tempGM), row("Total GM$", tg.totalGM), row("Weekly Budget", tg.budget),
    row("Temp Revenue (Bill)", tg.revenue), row("Weekly Hours", tg.hours), row("People Paid (Headcount)", tg.peoplePaid),
    row("Clients Billed", tg.clientsBilled), row("New Clients", tg.newClients), row("Cumulative GM$ 2025", tg.cum2025),
    row("New Temp Orders", tg.newTempOrders), row("Open Temp Orders", tg.openTempOrders), row("Open Perm Orders", tg.openPerm), row("Weekly Fill Rate", tg.weeklyFill),
    row("YTD Temp Order Filled %", tg.ytdFillSheet || tg.ytdFill || []),
    [], ["Goal - Bill", g.bill || 0], ["Goal - Pay", g.pay || 0], ["Goal - Margin", g.margin || 0], ["Goal - Headcount", g.headcount || 0],
  ];

  const recRows = [["Week label", ...wk]];
  for (const r of (rc.recruiters || [])) {
    recRows.push(["RECRUITER: " + r.name]);
    recRows.push(row("GM$ Contribution", r.gm)); recRows.push(row("People Paid", r.peoplePaid));
    recRows.push(row("Starts", r.starts)); recRows.push(row("Ends", r.ends));
    recRows.push(row("Interviews", r.interviews)); recRows.push(row("Registered", r.registered));
    recRows.push(row("Submittals", r.submittals)); recRows.push(row("Client Interviews", r.clientInterviews));
  }
  const t = rc.total || {};
  recRows.push(["TOTALS"]);
  recRows.push(row("People Paid By Current Recruiters", t.paidByRecruiter)); recRows.push(row("House People Paid", t.paidHouse));
  recRows.push(row("Starts", t.starts)); recRows.push(row("Ends", t.ends)); recRows.push(row("Open Orders", t.openOrders));
  recRows.push(row("Interviews", t.interviews)); recRows.push(row("Registered", t.registered));
  recRows.push(row("Submittals", t.submittals)); recRows.push(row("Client Interviews", t.clientInterviews));

  const saRows = [
    ["Week label", ...wk], ["Week ending (text)", ...dates],
    row("Total Calls", sa.totalCalls), row("Prospect DM Calls", sa.prospectDMCalls), row("Prospect Touches", sa.prospectTouches), row("Client Touches", sa.clientTouches),
    row("Prospect Emails", sa.prospectEmails), row("Client Emails", sa.clientEmails),
    row("Prospect Meetings", sa.prospectMeetings), row("Client Meetings", sa.clientMeetings),
    row("Contracts Sent", sa.contractsSent), row("Contracts Signed", sa.contractsSigned), row("New Clients", sa.newClients),
    [], ["REP TOTALS"],
    ["Rep", "Total Prospect Attempts", "Prospect DM Calls", "Prospect Meetings", "Client Meetings", "Contracts Sent", "Contracts Signed", "First Order", "New Accounts", "New GM$", "Prospect Touches", "Client Touches"],
  ];
  for (const [name, v] of Object.entries(sa.repTotals || {})) {
    saRows.push([name, v.calls || 0, v.prospectDMCalls || 0, v.prospectMeetings || 0, v.clientMeetings || 0, v.contracts || 0, v.signed || 0, v.firstOrder || 0, v.newAccounts || 0, v.gm || 0, v.prospectTouches || 0, v.clientTouches || 0]);
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tgRows), "Team Goals");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(recRows), "Recruitment");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(saRows), "Sales");
  const cfgE = getConfig(d);
  const aboutRows = [["Report", activeBrandName(d)], ["Generated", new Date().toLocaleString()], ["Theme primary", (cfgE.theme && cfgE.theme.primary) || "default"]];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aboutRows), "About");
  return wb;
}

function exportToExcel(d) {
  const wb = buildWorkbook(d);
  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = brandSlug(d) + "_data_" + dateStamp() + ".xlsx";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Build a fill-in-Excel template: the company's roster with 52 blank week columns. */
function downloadTemplate(d) {
  const td = JSON.parse(JSON.stringify(d));
  const N = 52;
  const pad = (arr) => { const a = Array.isArray(arr) ? arr.slice(0, N) : []; while (a.length < N) a.push(0); return a; };
  const tg = td.teamGoals;
  for (const k of TG_FIELDS) tg[k] = pad(tg[k]);
  tg.gmPerHour = pad(tg.gmPerHour); tg.gmPct = pad(tg.gmPct); tg.cum2026 = pad(tg.cum2026); tg.cum2025 = pad(tg.cum2025); tg.ytdFill = pad(tg.ytdFill);
  tg.weeks = Array.from({ length: N }, (_, i) => "W" + (i + 1));
  tg.weekDates = Array.from({ length: N }, () => "");
  const rt = td.recruitment.total || {};
  for (const k of ["paidByRecruiter", "paidHouse", "starts", "ends", "openOrders", "interviews", "registered", "submittals", "clientInterviews"]) rt[k] = pad(rt[k]);
  (td.recruitment.recruiters || []).forEach((r) => { for (const k of REC_FIELDS) r[k] = pad(r[k]); });
  td.recruitment.weeks = tg.weeks.slice();
  for (const k of SALES_FIELDS.concat(["prospectTouches", "clientTouches"])) td.sales[k] = pad(td.sales[k]);
  td.sales.weeks = tg.weeks.slice();
  td.currentWeek = N;
  const wb = buildWorkbook(td);
  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = brandSlug(d) + "_template.xlsx";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// ---- Rep leaderboard (Sales tab) ----
function Leaderboard({ repTotals, onRepClick, onUpdateGM }) {
  const [sortKey, setSortKey] = useState("newAccounts");
  const [dir, setDir] = useState("desc");
  const [q, setQ] = useState("");
  const [editGM, setEditGM] = useState(false);
  const [draft, setDraft] = useState({});
  const rows = useMemo(() => {
    const list = Object.entries(repTotals || {}).map(([rep, v]) => ({
      rep,
      calls: v.calls || 0,
      prospectDMCalls: v.prospectDMCalls || 0,
      prospectMeetings: v.prospectMeetings || 0,
      clientMeetings: v.clientMeetings || 0,
      contracts: v.contracts || 0,
      signed: v.signed || 0,
      firstOrder: v.firstOrder || 0,
      newAccounts: v.newAccounts || 0,
      gm: v.gm || 0,
    }));
    list.sort((a, b) => {
      let cmp;
      if (sortKey === "rep") cmp = a.rep.localeCompare(b.rep);
      else cmp = (a[sortKey] || 0) - (b[sortKey] || 0);
      return dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [repTotals, sortKey, dir]);

  const onSort = (key) => {
    if (key === sortKey) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setDir(key === "rep" ? "asc" : "desc"); }
  };
  const arrow = (key) => (sortKey === key ? (dir === "asc" ? " ▲" : " ▼") : "");

  return (
    <div className="card lb-card">
      <div className="card-title">Rep leaderboard
        <span className="card-hint">{editGM ? "enter season-to-date GM$ per rep, then Done" : "click a column to sort · ranked by " + LB_COLS.find((c) => c.key === sortKey).label.toLowerCase()}</span>
        <input className="tbl-search" placeholder="Search rep…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="lb-scroll">
        <table className="lb">
          <thead>
            <tr>
              {LB_COLS.map((c) => (
                <th key={c.key}
                  className={(c.type === "num" ? "num " : "") + (c.key === sortKey ? "active " : "") + (c.rank ? "rank-col" : "")}
                  onClick={() => onSort(c.key)}>
                  {c.label}{arrow(c.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.filter((r) => !q || r.rep.toLowerCase().includes(q.toLowerCase())).map((r) => (
              <tr key={r.rep} className={onRepClick && !editGM ? "lb-row" : ""} onClick={() => onRepClick && !editGM && onRepClick(r.rep)}>
                <td className="rep-name">{sortKey !== "rep" && <span className="rank-badge">{rows.indexOf(r) + 1}</span>}{r.rep}</td>
                <td className="num">{fmtNum(r.calls)}</td>
                <td className="num">{r.prospectDMCalls}</td>
                <td className="num">{r.prospectMeetings}</td>
                <td className="num">{r.clientMeetings}</td>
                <td className="num">{r.contracts}</td>
                <td className="num">{r.signed}</td>
                <td className="num">{r.firstOrder}</td>
                <td className={"num" + (LB_COLS.find((c) => c.rank).key === sortKey ? " active" : "")}>{r.newAccounts}</td>
                <td className={"num" + (sortKey === "gm" ? " active" : "")} onClick={(e) => editGM && e.stopPropagation()}>
                  {editGM
                    ? <input className="gm-inp" type="number" min="0" step="0.01" placeholder="0" value={draft[r.rep] ?? ""} onChange={(e) => setDraft((s) => ({ ...s, [r.rep]: e.target.value }))} />
                    : fmtCur(r.gm)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---- Team management modal ----
function TeamManager({ data, teams, multiTeam, onClose, onSplit, onAdd, onRename, onRemove, onImport, onImportInto }) {
  const [newName, setNewName] = useState("");
  const [firstName, setFirstName] = useState("Team 1");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(null);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{multiTeam ? "Manage teams" : "Set up teams"}</h3>
          <button className="x" onClick={onClose}>{"×"}</button>
        </div>
        <div className="modal-body">
          {!multiTeam ? (
            <div className="tm-intro">
              <p>Split this company into multiple teams or locations. Your current data becomes the first team — then you can add more, each with its own weekly numbers. The company admin sees an "All teams" roll-up plus each team on its own.</p>
              <label className="tm-label">Name your current team</label>
              <input className="inp" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Toronto, Head Office" />
              <button className="btn primary" onClick={() => { onSplit(firstName); onClose(); }}>Split into teams</button>
            </div>
          ) : (
            <>
              <div className="tm-list">
                {teams.map((t) => (
                  <div className="tm-row" key={t.id}>
                    {editId === t.id ? (
                      <>
                        <input className="inp tm-edit" value={editName} autoFocus onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { onRename(t.id, editName); setEditId(null); } }} />
                        <button className="btn sm primary" onClick={() => { onRename(t.id, editName); setEditId(null); }}>Save</button>
                        <button className="btn sm ghost" onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : confirmRemove === t.id ? (
                      <>
                        <span className="tm-name">Remove "{t.name}"?</span>
                        <button className="btn sm danger" onClick={() => { onRemove(t.id); setConfirmRemove(null); }}>Remove</button>
                        <button className="btn sm ghost" onClick={() => setConfirmRemove(null)}>Keep</button>
                      </>
                    ) : (
                      <>
                        <span className="tm-name">{t.name}</span>
                        <span className="tm-meta">{(data.teams[t.id] && data.teams[t.id].currentWeek) || 0} weeks</span>
                        {onImportInto && <button className="btn sm ghost" title={"Replace " + t.name + "'s data from a spreadsheet"} onClick={() => onImportInto(t.id)}>Import data</button>}
                        <button className="btn sm ghost" onClick={() => { setEditId(t.id); setEditName(t.name); }}>Rename</button>
                        <button className="btn sm ghost danger-text" onClick={() => setConfirmRemove(t.id)}>Remove</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="tm-add">
                <div className="tm-label">Add a team</div>
                <div className="tm-add-row">
                  <input className="inp" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New team / location name" />
                  <button className="btn ghost" disabled={!newName.trim()} onClick={() => { onAdd(newName); setNewName(""); }} title="Create an empty team">+ Empty</button>
                  <button className="btn primary" disabled={!newName.trim()} onClick={() => { onImport(newName.trim()); }} title="Create the team by importing a workbook">+ Import</button>
                </div>
                <div className="tm-hint">"Empty" creates a team you can enter weeks into. "Import" creates it from a spreadsheet.</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* NOTE: Overview, the App default export, parseWorkbook, and the remaining tab/chart/
   settings components are NOT in this file — reconstruct them from recovered/bundle.js.
   See RECONSTRUCTION.md. */
