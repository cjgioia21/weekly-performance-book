import React, { useState, useMemo, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { EMPTY } from "./EMPTY_DATA.js";

/* ===========================================================================
 *  app.jsx — reconstructed from the compiled build (see RECONSTRUCTION.md).
 *  CHECKPOINT 1: logic layer (config, engine, week engine, Excel export/parse).
 *  Components + the App shell are added in later checkpoints.
 * ========================================================================== */

const STORAGE_KEY = "wpb_data_v2";
const THEME_KEY = "wpb_theme";
const LOGO = (typeof window !== "undefined" && window.__BTG_LOGO__) || "";

const ALL_TABS = ["Overview", "Team Goals", "Recruitment (Current Team)", "Sales"];
const TABS = ["Overview", "Team Goals", "Recruitment (Current Team)", "Sales"];

const WIDGET_REGISTRY = [
  { id: "ov_insights", tab: "Overview", label: "Auto-insights row" },
  { id: "ov_hero", tab: "Overview", label: "Hero KPIs (GM$, Revenue, Perm, Paid)" },
  { id: "ov_strip", tab: "Overview", label: "Secondary KPIs (fill, calls, clients)" },
  { id: "ov_progress", tab: "Overview", label: "Progress vs goals" },
  { id: "ov_period", tab: "Overview", label: "Period comparison" },
  { id: "ov_charts", tab: "Overview", label: "Trend charts (GM, revenue, orders)" },
  { id: "tg_kpis", tab: "Team Goals", label: "Goal KPIs" },
  { id: "tg_charts", tab: "Team Goals", label: "Goal charts" },
  { id: "rc_kpis", tab: "Recruitment (Current Team)", label: "Recruiting KPIs" },
  { id: "rc_open", tab: "Recruitment (Current Team)", label: "Open temp / perm orders" },
  { id: "rc_funnel", tab: "Recruitment (Current Team)", label: "Recruiting funnel chart" },
  { id: "rc_gm", tab: "Recruitment (Current Team)", label: "GM$ contribution chart" },
  { id: "rc_head", tab: "Recruitment (Current Team)", label: "Net headcount chart" },
  { id: "rc_scorecard", tab: "Recruitment (Current Team)", label: "Recruiter scorecard" },
  { id: "sa_funnel", tab: "Sales", label: "Sales funnel" },
  { id: "sa_conversion", tab: "Sales", label: "Conversion & touches charts" },
  { id: "sa_leaderboard", tab: "Sales", label: "Rep leaderboard" },
];

const TEMPLATES = {
  custom: { label: "Custom", tabs: null, widgets: null },
  executive: {
    label: "Executive",
    tabs: { Overview: true, "Team Goals": true, "Recruitment (Current Team)": false, Sales: false },
    widgets: { ov_insights: true, ov_hero: true, ov_strip: true, ov_progress: true, ov_period: true, ov_charts: true },
  },
  sales: {
    label: "Sales-Focused",
    tabs: { Overview: true, "Team Goals": false, "Recruitment (Current Team)": false, Sales: true },
    widgets: { ov_insights: true, ov_hero: true, ov_strip: true, ov_progress: false, ov_period: true, ov_charts: false },
  },
  recruitment: {
    label: "Recruitment-Focused",
    tabs: { Overview: true, "Team Goals": false, "Recruitment (Current Team)": true, Sales: false },
    widgets: { ov_insights: true, ov_hero: true, ov_strip: false, ov_progress: true, ov_period: false, ov_charts: false },
  },
  minimal: {
    label: "Minimal",
    tabs: { Overview: true, "Team Goals": false, "Recruitment (Current Team)": false, Sales: false },
    widgets: { ov_insights: false, ov_hero: true, ov_strip: true, ov_progress: false, ov_period: false, ov_charts: false },
  },
};

const THEME_FIELDS = [
  ["primary", "Primary (buttons, funnel, links)"],
  ["secondary", "Secondary accent"],
  ["background", "Page background"],
  ["surface", "Card / surface"],
  ["text", "Text"],
  ["muted", "Muted text"],
  ["line", "Borders & grid lines"],
  ["chart1", "Chart series 1"], ["chart2", "Chart series 2"], ["chart3", "Chart series 3"],
  ["chart4", "Chart series 4"], ["chart5", "Chart series 5"], ["chart6", "Chart series 6"],
];

const DEFAULT_CONFIG = { template: "custom", tabs: {}, widgets: {}, theme: {}, brand: null };

function getConfig(d) {
  const t = (d && d.config) || {};
  return {
    template: t.template || "custom",
    tabs: { ...(t.tabs || {}) },
    widgets: { ...(t.widgets || {}) },
    theme: { ...(t.theme || {}) },
    brand: t.brand || (d && d.brand) || null,
  };
}
const tabOn = (cfg, t) => cfg.tabs[t] !== false;
const widgetOn = (cfg, id) => cfg.widgets[id] !== false;
const activeBrandName = (d) => { const c = getConfig(d); return (c.brand && c.brand.name) || "Weekly Performance Book"; };

const THEME_VAR_MAP = { primary: "--accent", secondary: "--accent2", background: "--bg", surface: "--panel", text: "--text", muted: "--muted", line: "--line" };
const DEF_CHART = { c1: "#2563EB", c2: "#0EA5E9", c3: "#16A34A", c4: "#DB2777", c5: "#7C3AED", c6: "#EA580C" };

function chartColors(cfg) {
  const t = cfg.theme || {};
  return {
    blue: t.chart1 || DEF_CHART.c1, sky: t.chart2 || DEF_CHART.c2, green: t.chart3 || DEF_CHART.c3,
    rose: t.chart4 || DEF_CHART.c4, violet: t.chart5 || DEF_CHART.c5, orange: t.chart6 || DEF_CHART.c6,
    amber: t.chart6 || "#A9B8CC", faint: t.muted || "#9AA6B6",
  };
}
function applyThemeVars(cfg) {
  const t = cfg.theme || {}, r = document.documentElement;
  for (const [n, i] of Object.entries(THEME_VAR_MAP)) t[n] ? r.style.setProperty(i, t[n]) : r.style.removeProperty(i);
  t.line ? r.style.setProperty("--grid", t.line) : r.style.removeProperty("--grid");
  if (!t.primary && cfg.brand && cfg.brand.accent) { r.style.setProperty("--accent", cfg.brand.accent); r.style.setProperty("--accent2", cfg.brand.accent); }
  Object.assign(C, chartColors(cfg));
}
const C = { blue: "#2563EB", orange: "#EA580C", green: "#16A34A", sky: "#0EA5E9", violet: "#7C3AED", rose: "#DB2777", amber: "#F59E0B", faint: "#9AA6B6" };

// ---- helpers ----
const sum = (a) => (a || []).reduce((t, r) => t + (Number(r) || 0), 0);
const last = (a) => (a && a.length ? a[a.length - 1] : null);
function deriveTeamGoals(tg) {
  tg.gmPerHour = tg.tempGM.map((n, i) => { const a = tg.hours[i]; return a ? +(n / a).toFixed(2) : 0; });
  tg.gmPct = tg.totalGM.map((n, i) => { const a = tg.revenue[i]; return a ? +(n / a).toFixed(2) : 0; });
  let t = 0; tg.cum2026 = tg.totalGM.map((n) => (t += n, +t.toFixed(2)));
  let r = 0; tg.ytdFill = tg.weeklyFill.map((n, i) => (r += Math.min(1, Math.max(0, +n || 0)), +(r / (i + 1)).toFixed(4)));
}
const pct = (cur, prev) => (prev == null || prev === 0 || cur == null ? null : ((cur - prev) / Math.abs(prev)) * 100);
const fmtCur = (n) => (n == null ? "–" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const fmtCurK = (n) => (n == null ? "–" : Math.abs(n) >= 1e6 ? "$" + (n / 1e6).toFixed(1) + "M" : Math.abs(n) >= 1e3 ? "$" + Math.round(n / 1e3) + "k" : "$" + Math.round(n));
const fmtCur0 = (n) => (n == null ? "–" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const fmtNum = (n) => (n == null ? "–" : Number.isInteger(+n) ? (+n).toLocaleString() : (+n).toLocaleString("en-US", { maximumFractionDigits: 1 }));
const fmtPct = (n) => (n == null ? "–" : (n * 100).toFixed(2) + "%");
const clamp01 = (x) => Math.max(0, Math.min(1, x || 0));
const slugify = (s) => (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || ("team-" + Date.now());

const TG_FIELDS = ["tempGM", "totalGM", "budget", "revenue", "hours", "peoplePaid", "clientsBilled", "newClients", "newTempOrders", "openTempOrders", "openPerm", "weeklyFill"];
const REC_FIELDS = ["gm", "peoplePaid", "starts", "ends", "interviews", "registered", "submittals", "clientInterviews"];
const SALES_FIELDS = ["totalCalls", "prospectDMCalls", "prospectTouches", "clientTouches", "prospectEmails", "clientEmails", "prospectMeetings", "clientMeetings", "contractsSent", "contractsSigned", "newClients"];
const REP_ENTRY_FIELDS = ["calls", "prospectDMCalls", "prospectMeetings", "clientMeetings", "contracts", "signed", "firstOrder", "newAccounts", "gm", "prospectTouches", "clientTouches"];

// ===== MULTI-TEAM SUPPORT =====
function hasTeams(d) { return !!(d && d.teams && Object.keys(d.teams).length > 0); }
function teamList(d) { return hasTeams(d) ? Object.keys(d.teams).map((id) => ({ id, name: (d.teams[id] && d.teams[id].name) || id })) : []; }
function sumArrays(arrs) {
  const n = arrs.reduce((m, a) => Math.max(m, (a || []).length), 0);
  const out = new Array(n).fill(0);
  for (const a of arrs) for (let i = 0; i < (a || []).length; i++) out[i] += (+a[i] || 0);
  return out;
}
function rollupTeams(d) {
  const teams = Object.values(d.teams || {});
  if (!teams.length) return d;
  const maxWeek = teams.reduce((m, t) => Math.max(m, t.currentWeek || (t.teamGoals && t.teamGoals.totalGM ? t.teamGoals.totalGM.length : 0)), 0);
  const ref = teams.slice().sort((a, b) => (b.currentWeek || 0) - (a.currentWeek || 0))[0];
  const tg = { weeks: (ref.teamGoals.weeks || []).slice(), weekDates: (ref.teamGoals.weekDates || []).slice() };
  const tgKeys = new Set(TG_FIELDS);
  for (const t of teams) for (const k in (t.teamGoals || {})) if (Array.isArray(t.teamGoals[k]) && !["weeks", "weekDates", "gmPerHour", "gmPct", "cum2026", "ytdFill", "ytdFillSheet"].includes(k)) tgKeys.add(k);
  for (const f of tgKeys) tg[f] = sumArrays(teams.map((t) => t.teamGoals[f]));
  tg.goals = {};
  for (const t of teams) { const g = (t.teamGoals && t.teamGoals.goals) || {}; for (const k in g) tg.goals[k] = (tg.goals[k] || 0) + (+g[k] || 0); }
  tg.cum2025 = sumArrays(teams.map((t) => t.teamGoals.cum2025));
  deriveTeamGoals(tg);
  const recMap = {};
  for (const t of teams) for (const r of ((t.recruitment && t.recruitment.recruiters) || [])) {
    const ex = recMap[r.name] || (recMap[r.name] = { name: r.name });
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
export function teamStandings(d) {
  if (!hasTeams(d)) return [];
  const yearWeeks = 52;
  const rows = Object.keys(d.teams).map((id) => {
    const t = d.teams[id], tg = (t && t.teamGoals) || {};
    const wk = t.currentWeek || (tg.totalGM ? tg.totalGM.length : 0);
    const s = (a) => (a || []).slice(0, wk).reduce((x, v) => x + (+v || 0), 0);
    const gm = s(tg.totalGM), revenue = s(tg.revenue);
    const goalMargin = (tg.goals && +tg.goals.margin) || 0, goalBill = (tg.goals && +tg.goals.bill) || 0;
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
const STATUS_META = {
  ahead: { label: "Ahead", cls: "ahead" }, ontrack: { label: "On track", cls: "ontrack" },
  behind: { label: "Behind", cls: "behind" }, none: { label: "No goal", cls: "none" },
};
export function TeamLeaderboard({ rows, compact, currentTeam, youTeam, onPick }) {
  if (!rows || !rows.length) return <div className="empty-hint">No teams to rank yet. Add a second team to see the leaderboard.</div>;
  const maxGM = rows.reduce((m, r) => Math.max(m, r.gm || 0), 0) || 1;
  return (
    <div className={"tlb" + (compact ? " compact" : "")}>
      <div className="tlb-head">
        <span className="tlb-c-rank">#</span><span className="tlb-c-team">Team</span><span className="tlb-c-gm">GM$ YTD</span>
        {!compact && <span className="tlb-c-goal">Goal</span>}<span className="tlb-c-pace">Pace vs goal</span>
        {!compact && <span className="tlb-c-proj">Proj. year-end</span>}<span className="tlb-c-status">Status</span>
      </div>
      {rows.map((r) => {
        const sm = STATUS_META[r.status] || STATUS_META.none;
        const isYou = youTeam && r.id === youTeam, isCur = currentTeam && r.id === currentTeam;
        return (
          <div key={r.id} className={"tlb-row" + (isCur ? " current" : "") + (isYou ? " you" : "") + (onPick ? " clickable" : "")}
            onClick={onPick ? () => onPick(r.id) : undefined} title={onPick ? "View " + r.name : undefined}>
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
function editingTeam(d, teamSel) { return !!(hasTeams(d) && teamSel && teamSel !== "__all__" && d.teams && d.teams[teamSel]); }
export function pickEditTarget(d, teamSel) { return editingTeam(d, teamSel) ? d.teams[teamSel] : d; }
export function mergeTeamEdit(d, teamSel, ndTarget) { return editingTeam(d, teamSel) ? { ...d, teams: { ...d.teams, [teamSel]: ndTarget } } : ndTarget; }
export function importIntoTeamData(d, tid, parsed, fileName) {
  const cur = (d.teams && d.teams[tid]) || {};
  const gNew = (parsed.teamGoals && parsed.teamGoals.goals) || {};
  const goals = Object.values(gNew).some((v) => v) ? gNew : ((cur.teamGoals && cur.teamGoals.goals) || {});
  const t = { ...cur, name: cur.name || tid, teamGoals: { ...parsed.teamGoals, goals }, recruitment: parsed.recruitment, sales: parsed.sales, currentWeek: parsed.currentWeek, weekEnding: parsed.weekEnding, _year: parsed._year, _importMeta: { file: fileName, at: new Date().toISOString() } };
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
  for (const r of (rc.recruiters || [])) { const rv = (form.recruiters && form.recruiters[r.name]) || {}; for (const f of REC_FIELDS) (r[f] = r[f] || []).push(+rv[f] || 0); }
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
  pop(tg); (rc.recruiters || []).forEach((r) => pop(r)); pop(rc.total); pop(sa);
  const ledger = nd._weekLedger || [];
  const lastLedger = ledger.length ? ledger[ledger.length - 1] : null;
  if (lastLedger && lastLedger.week === n && lastLedger.reps && sa.repTotals) {
    for (const [name, vals] of Object.entries(lastLedger.reps)) {
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
function recomputeRecruitTotals(nd) {
  const rc = nd.recruitment, tg = nd.teamGoals;
  const n = nd.currentWeek || (tg.totalGM ? tg.totalGM.length : 0);
  const recs = rc.recruiters || [];
  const sumAt = (f, i) => recs.reduce((s, r) => s + (+(r[f] || [])[i] || 0), 0);
  rc.total = rc.total || {};
  for (const f of ["starts", "ends", "interviews", "registered", "submittals", "clientInterviews"]) rc.total[f] = Array.from({ length: n }, (_, i) => sumAt(f, i));
  rc.total.paidByRecruiter = Array.from({ length: n }, (_, i) => sumAt("peoplePaid", i));
  rc.total.paidHouse = Array.from({ length: n }, (_, i) => Math.max(0, ((tg.peoplePaid || [])[i] || 0) - rc.total.paidByRecruiter[i]));
}

// ---- Excel export ----
const brandSlug = (d) => (activeBrandName(d) || "Weekly Performance Book").trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "") || "Weekly-Performance-Book";
const dateStamp = () => new Date().toISOString().slice(0, 10);

export function buildWorkbook(d) {
  const tg = d.teamGoals, rc = d.recruitment, sa = d.sales;
  const n = d.currentWeek || tg.totalGM.length;
  const wk = (tg.weeks || []).slice(0, n), dates = (tg.weekDates || []).slice(0, n);
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

// ---- Excel import (parser) ----
const sheetToAoa = (ws) => XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: null });
const norm = (e) => String(e == null ? "" : e).trim().toLowerCase().replace(/\s+/g, " ");
function readN(row, count) { const r = []; for (let n = 1; n <= count; n++) { const i = row[n]; r.push(i == null || i === "" ? 0 : Number(i) || 0); } return r; }
function lastFilled(row) { if (!row) return 0; let t = 0; for (let r = 1; r < row.length; r++) if (row[r] != null && row[r] !== "") t = r; return t; }
function weekCount(rows) {
  const find = (n) => rows.find((i) => norm(i[0]) === n);
  let r = lastFilled(find("week ending (text)")) || lastFilled(find("week ending"));
  if (!r) r = lastFilled(find("total gm$")) || lastFilled(find("total calls")) || lastFilled(find("week label"));
  return r;
}
const TG_LABELS = { "temp gm$ (margin)": "tempGM", "total gm$": "totalGM", "weekly budget": "budget", "temp revenue (bill)": "revenue", "weekly hours": "hours", "people paid (headcount)": "peoplePaid", "clients billed": "clientsBilled", "new clients": "newClients", "cumulative gm$ 2025": "cum2025", "new temp orders": "newTempOrders", "open temp orders": "openTempOrders", "open perm orders": "openPerm", "weekly fill rate": "weeklyFill", "ytd temp order filled %": "ytdFillSheet" };
const REC_LABELS = { "gm$ contribution": "gm", "people paid": "peoplePaid", starts: "starts", ends: "ends", interviews: "interviews", registered: "registered", submittals: "submittals", "client interviews": "clientInterviews" };
const REC_TOTAL_LABELS = { "people paid by current recruiters": "paidByRecruiter", "house people paid": "paidHouse", starts: "starts", ends: "ends", "open orders": "openOrders", interviews: "interviews", registered: "registered", submittals: "submittals", "client interviews": "clientInterviews" };
const SA_LABELS = { "total calls": "totalCalls", "prospect dm calls": "prospectDMCalls", "prospect touches": "prospectTouches", "client touches": "clientTouches", "prospect emails": "prospectEmails", "client emails": "clientEmails", "prospect meetings": "prospectMeetings", "client meetings": "clientMeetings", "contracts sent": "contractsSent", "contracts signed": "contractsSigned", "new clients": "newClients" };
const REP_LABELS = { calls: "calls", "total prospect attempts": "calls", "prospect attempts": "calls", "prospect dm calls": "prospectDMCalls", "prospect meetings": "prospectMeetings", "client meetings": "clientMeetings", "contracts sent": "contracts", "contracts signed": "signed", "first order": "firstOrder", "new accounts": "newAccounts", "new gm$": "gm", "new gm": "gm", "gm$": "gm", gm: "gm", "prospect touches": "prospectTouches", "client touches": "clientTouches" };
const serialDate = (e) => { const t = new Date((e - 25569) * 864e5); return isNaN(t) ? "" : t.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }); };

// Raw agency workbook parser (the user's original Excel export format). See RECONSTRUCTION.md.
function parseRawWorkbook(wb) {
  const t = JSON.parse(JSON.stringify(EMPTY));
  const aliases = { recruitment: ["recruitment", "recruitng", "recruiting"] };
  const sheet = (name) => { const opts = aliases[norm(name)] || [norm(name)]; const found = wb.SheetNames.find((x) => opts.includes(norm(x))); return found ? sheetToAoa(wb.Sheets[found]) : null; };
  const tgSheet = sheet("Team Goals");
  if (!tgSheet) return null;
  const weekRun = (row, from) => { let i = 0; while (/^week \d+$/i.test(String((row || [])[from + i] == null ? "" : (row || [])[from + i]).trim())) i++; return i; };
  const isSerial = (v) => typeof v === "number" && v > 4e4 && v < 5e4;
  const serialRun = (row, from) => { let i = 0; while (isSerial((row || [])[from + i])) i++; return i; };
  const looksData = (row, from) => String((row || [])[from]).trim() === "Week 1" || serialRun(row, from) >= 3;
  let headerRow = -1;
  for (let i = 0; i < Math.min(tgSheet.length, 10); i++) if ((tgSheet[i] || []).some((x) => String(x).trim() === "Week 1")) { headerRow = i; break; }
  if (headerRow < 0) return null;
  const startCol = (tgSheet[headerRow] || []).findIndex((x) => String(x).trim() === "Week 1");
  const dateRow = tgSheet[headerRow + 1] || [];
  const findRow = (rows, label) => rows.find((r) => norm(r && r[0]) === norm(label)) || [];
  const take = (row, from, len) => Array.from({ length: len }, (_, i) => Number(row[from + i]) || 0);
  const nWeeks = weekRun(tgSheet[headerRow], startCol);
  if (!nWeeks) return null;
  const tg = t.teamGoals;
  tg.weeks = Array.from({ length: nWeeks }, (_, i) => "W" + (i + 1));
  tg.weekDates = Array.from({ length: nWeeks }, (_, i) => { const v = dateRow[startCol + i]; return typeof v === "number" ? serialDate(v) : String(v || ""); });
  { const yv = Array.from({ length: nWeeks }, (_, i) => dateRow[startCol + i]).find((v) => typeof v === "number"); if (yv) t._year = new Date((yv - 25569) * 864e5).getUTCFullYear(); }
  const col = (label) => take(findRow(tgSheet, label), startCol, nWeeks);
  tg.clientsBilled = col("Clients Billed"); tg.newClients = col("New Clients"); tg.hours = col("Weekly Hours");
  tg.revenue = col("Temp Revenue (Bill)"); tg.tempGM = col("Weekly Temp GM$ (Margin)");
  const total = col("Total GM$"), perm = col("Perm/ Other");
  tg.totalGM = total.some((v) => v) ? total : tg.tempGM.map((v, i) => +(v + (perm[i] || 0)).toFixed(2));
  tg.budget = col("Weekly Budget"); tg.peoplePaid = col("People Paid (Headcount)"); tg.newTempOrders = col("New Temp Orders");
  tg.openTempOrders = col("Open Temp Orders"); tg.openPerm = col("Open DH Orders"); tg.weeklyFill = col("Weekly Fill Rate");
  tg.gmPerHour = tg.tempGM.map((v, i) => (tg.hours[i] ? +(v / tg.hours[i]).toFixed(2) : 0));
  tg.gmPct = tg.totalGM.map((v, i) => (tg.revenue[i] ? +(v / tg.revenue[i]).toFixed(2) : 0));
  { const gc = dateRow.findIndex((v) => norm(v) === "yearly goal"); if (gc > 0) { const goalOf = (label) => { const x = findRow(tgSheet, label)[gc]; return typeof x === "number" && x > 0 ? Math.round(x) : null; }; tg.goals = { bill: goalOf("Temp Revenue (Bill)"), pay: goalOf("Pay-Burden"), margin: goalOf("Total GM$") || goalOf("Weekly Temp GM$ (Margin)"), headcount: goalOf("People Paid (Headcount)") }; } }
  let cum = 0; tg.cum2026 = tg.totalGM.map((v) => (cum += v, +cum.toFixed(2)));
  let fs = 0; tg.ytdFill = tg.weeklyFill.map((v, i) => (fs += Math.min(1, Math.max(0, +v || 0)), +(fs / (i + 1)).toFixed(4)));
  t.currentWeek = nWeeks; t.weekEnding = tg.weekDates[nWeeks - 1] || "";
  // Recruitment
  const recSheet = sheet("Recruitment") || [];
  const RAW_REC = { "gm$ contribution": "gm", "people paid": "peoplePaid", starts: "starts", ends: "ends", "temp interviews": "interviews", registered: "registered", submittals: "submittals", "client interviews": "clientInterviews" };
  let rec = null, recLen = nWeeks;
  for (const row of recSheet) {
    const head = String(row && row[0] == null ? "" : row[0]).trim();
    if (head && looksData(row, 1)) {
      if (/^totals?$/i.test(head)) { rec = null; continue; }
      recLen = Math.min(nWeeks, weekRun(row, 1) || serialRun(row, 1) || nWeeks);
      rec = { name: head, gm: [], peoplePaid: [], starts: [], ends: [], interviews: [], registered: [], submittals: [], clientInterviews: [] };
      t.recruitment.recruiters.push(rec);
      continue;
    }
    if (!rec || !head) continue;
    const key = RAW_REC[norm(head)];
    if (key) rec[key] = take(row, 1, Math.min(nWeeks, recLen)).concat(Array.from({ length: Math.max(0, nWeeks - recLen) }, () => 0));
  }
  t.recruitment.recruiters = t.recruitment.recruiters.filter((r) => ["gm", "peoplePaid", "starts", "ends", "interviews", "registered", "submittals", "clientInterviews"].some((f) => (r[f] || []).some((v) => v)));
  const sumRec = (f) => Array.from({ length: nWeeks }, (_, i) => t.recruitment.recruiters.reduce((s, r) => s + ((r[f] || [])[i] || 0), 0));
  const mt = t.recruitment.total;
  mt.starts = sumRec("starts"); mt.ends = sumRec("ends"); mt.interviews = sumRec("interviews"); mt.registered = sumRec("registered");
  mt.submittals = sumRec("submittals"); mt.clientInterviews = sumRec("clientInterviews"); mt.paidByRecruiter = sumRec("peoplePaid");
  mt.paidHouse = tg.peoplePaid.map((v, i) => Math.max(0, (v || 0) - (mt.paidByRecruiter[i] || 0)));
  mt.openOrders = tg.openTempOrders.slice(); t.recruitment.weeks = tg.weeks.slice();
  // Sales
  const salesSheet = sheet("Sales") || [];
  const repRaw = {}; let curRep = null, repLen = nWeeks;
  for (const row of salesSheet) {
    const head = String(row && row[0] == null ? "" : row[0]).trim();
    if (head && looksData(row, 2)) {
      if (/^totals?$/i.test(head)) { curRep = null; continue; }
      repLen = Math.min(nWeeks, weekRun(row, 2) || serialRun(row, 2) || nWeeks);
      curRep = head; repRaw[head] = {};
      continue;
    }
    if (!curRep || !head) continue;
    repRaw[curRep][norm(head)] = take(row, 2, repLen).concat(Array.from({ length: Math.max(0, nWeeks - repLen) }, () => 0));
  }
  const zero = () => Array.from({ length: nWeeks }, () => 0);
  const add = (into, arr) => arr.forEach((v, i) => { into[i] = (into[i] || 0) + (+v || 0); });
  const agg = { totalCalls: zero(), prospectDMCalls: zero(), prospectTouches: zero(), clientTouches: zero(), prospectEmails: zero(), clientEmails: zero(), prospectMeetings: zero(), clientMeetings: zero(), contractsSent: zero(), contractsSigned: zero(), newClients: zero() };
  for (const [name, fields] of Object.entries(repRaw)) {
    const pick = (...labels) => { for (const l of labels) { const v = fields[norm(l)]; if (v && v.some((x) => x)) return v; } return fields[norm(labels[0])] || zero(); };
    const pickRe = (re) => { for (const k in fields) if (re.test(k) && fields[k].some((v) => v)) return fields[k]; return zero(); };
    const total = (a) => a.reduce((s, v) => s + (+v || 0), 0);
    const dm = pick("Prospect DM Calls", "DM Meeting/ Calls");
    const pMtg = pick("Prospect Meetings Booked", "Prospect Meetings");
    const cMtg = pick("Client Meetings Booked", "Client Meetings");
    const cDM = pick("Client Calls DM", "Client DM Calls");
    const touchAll = pick("Total Touchers (not incl blasts)", "Total Touches");
    const gmGen = pickRe(/^gm\$ generated new client/);
    let calls = total(pick("Total Prospect Attempts")) ? pick("Total Prospect Attempts") : pick("Prospect Emails").map((v, i) => v + (pick("Prospect Cold Calls")[i] || 0) + (dm[i] || 0));
    if (!total(calls)) calls = touchAll;
    const pTouch = total(pick("Prospect Total Touches")) ? pick("Prospect Total Touches") : (total(pick("Prospect Emails")) || total(dm) || total(pMtg)) ? pick("Prospect Emails").map((v, i) => v + (dm[i] || 0) + (pMtg[i] || 0)) : touchAll;
    const cTouch = pick("Client Emails").map((v, i) => v + (cDM[i] || 0) + (cMtg[i] || 0));
    add(agg.totalCalls, calls); add(agg.prospectDMCalls, dm); add(agg.prospectTouches, pTouch); add(agg.clientTouches, cTouch);
    add(agg.prospectEmails, pick("Prospect Emails")); add(agg.clientEmails, pick("Client Emails"));
    add(agg.prospectMeetings, pMtg); add(agg.clientMeetings, cMtg);
    add(agg.contractsSent, pick("Contracts Sent", "Quotes Sendouts")); add(agg.contractsSigned, pick("Contracts Signed", "Quotes/ Contracts Signed")); add(agg.newClients, pick("New Clients"));
    const ri = (v) => Math.round(v);
    t.sales.repTotals[name] = {
      calls: ri(total(calls)), prospectDMCalls: ri(total(dm)), prospectMeetings: ri(total(pMtg)), clientMeetings: ri(total(cMtg)),
      contracts: ri(total(pick("Contracts Sent", "Quotes Sendouts"))), signed: ri(total(pick("Contracts Signed", "Quotes/ Contracts Signed"))),
      firstOrder: ri(total(pick("First Order"))), newAccounts: ri(total(pick("New Clients", "New Accounts/ Dept Billed"))),
      gm: total(gmGen) ? +total(gmGen).toFixed(2) : 0, meetings: ri(total(pMtg) + total(cMtg)), prospectTouches: ri(total(pTouch)), clientTouches: ri(total(cTouch)),
    };
  }
  for (const k in agg) t.sales[k] = agg[k].map((v) => Math.round(v));
  t.sales.weeks = tg.weeks.slice();
  // Per-rep GM from "Weekly GM$" sheet
  const gmSheet = sheet("Weekly GM$") || [];
  let gmCols = 0; const GM_START = 4;
  { const first = gmSheet[0] || []; while (typeof first[GM_START + gmCols] === "number") gmCols++; if (!gmCols) gmCols = nWeeks; }
  const gmByRep = (label) => { const out = {}; for (const row of gmSheet) if (String(row && row[0] == null ? "" : row[0]).trim() === label) { const rep = String(row[3] || "").trim(); if (rep) out[rep] = row.slice(GM_START, GM_START + Math.min(gmCols, nWeeks)).reduce((s, v) => s + (+v || 0), 0); } return out; };
  const totalNew = gmByRep("Total New GM$"), salesRepGM = gmByRep("Sales Rep GM$");
  const repNames = Object.keys(t.sales.repTotals);
  const useTotalNew = repNames.some((n) => totalNew[n]);
  for (const n of repNames) { const v = useTotalNew ? totalNew[n] : salesRepGM[n]; if (v) t.sales.repTotals[n].gm = +v.toFixed(2); }
  // trim trailing empty weeks
  let lastReal = 0;
  for (let i = 0; i < nWeeks; i++) if ((tg.hours[i] || 0) > 0 || (tg.totalGM[i] || 0) !== 0 || (t.sales.totalCalls[i] || 0) > 0) lastReal = i + 1;
  if (lastReal && lastReal < nWeeks) {
    const trim = (o) => { for (const k in o) if (Array.isArray(o[k]) && o[k].length === nWeeks) o[k] = o[k].slice(0, lastReal); };
    trim(tg); trim(t.sales); trim(mt); t.recruitment.recruiters.forEach(trim);
    tg.weeks = tg.weeks.slice(0, lastReal); tg.weekDates = tg.weekDates.slice(0, lastReal);
    t.recruitment.weeks = tg.weeks.slice(); t.sales.weeks = tg.weeks.slice();
    t.currentWeek = lastReal; t.weekEnding = tg.weekDates[lastReal - 1] || "";
  }
  return t;
}

export function parseWorkbook(buf) {
  const wb = XLSX.read(buf, { type: "array" });
  const sheet = (name) => { const found = wb.SheetNames.find((x) => norm(x) === norm(name)); return found ? sheetToAoa(wb.Sheets[found]) : null; };
  { const tgSheet = sheet("Team Goals"); if (tgSheet && !tgSheet.some((r) => norm(r && r[0]) === "week label")) { const raw = parseRawWorkbook(wb); if (raw) return raw; } }
  const n = JSON.parse(JSON.stringify(EMPTY));
  const tgSheet = sheet("Team Goals");
  if (tgSheet) {
    const wc = weekCount(tgSheet); const labels = [], dates = [];
    for (const f of tgSheet) {
      const h = norm(f[0]);
      if (h === "week label") for (let p = 1; p <= wc; p++) labels.push(String(f[p] == null ? "W" + p : f[p]));
      if (h === "week ending (text)" || h === "week ending") for (let p = 1; p <= wc; p++) dates.push(String(f[p] == null ? "" : f[p]));
      if (TG_LABELS[h]) n.teamGoals[TG_LABELS[h]] = readN(f, wc);
      if (h === "goal - bill") n.teamGoals.goals.bill = Number(f[1]) || null;
      if (h === "goal - pay") n.teamGoals.goals.pay = Number(f[1]) || null;
      if (h === "goal - margin") n.teamGoals.goals.margin = Number(f[1]) || null;
      if (h === "goal - headcount") n.teamGoals.goals.headcount = Number(f[1]) || null;
    }
    n.teamGoals.weeks = labels.length ? labels : Array.from({ length: wc }, (_, h) => "W" + (h + 1));
    n.teamGoals.weekDates = dates.map((f) => f.replace(/,\s*\d{4}\s*$/, ""));
    n.teamGoals.gmPerHour = n.teamGoals.tempGM.map((f, h) => { const p = n.teamGoals.hours[h]; return p ? +(f / p).toFixed(2) : 0; });
    n.teamGoals.gmPct = n.teamGoals.totalGM.map((f, h) => { const p = n.teamGoals.revenue[h]; return p ? +(f / p).toFixed(2) : 0; });
    let cum = 0; n.teamGoals.cum2026 = n.teamGoals.totalGM.map((f) => (cum += f, +cum.toFixed(2)));
    let fs = 0; n.teamGoals.ytdFill = n.teamGoals.weeklyFill.map((f, h) => (fs += Math.min(1, Math.max(0, +f || 0)), +(fs / (h + 1)).toFixed(4)));
    n.currentWeek = wc; n.weekEnding = dates[wc - 1] || "";
  }
  const recSheet = sheet("Recruitment");
  if (recSheet) {
    const wc = n.currentWeek || weekCount(recSheet);
    n.recruitment.weeks = n.teamGoals.weeks.slice(0, wc);
    let cur = null;
    for (const A of recSheet) {
      const raw0 = String(A[0] == null ? "" : A[0]).trim(), c = norm(raw0);
      if (c.startsWith("recruiter:")) { cur = { name: raw0.split(":")[1].trim(), gm: [], peoplePaid: [], starts: [], ends: [], interviews: [], registered: [], submittals: [], clientInterviews: [] }; n.recruitment.recruiters.push(cur); continue; }
      if (c === "totals" || c.startsWith("totals")) { cur = n.recruitment.total; continue; }
      if (cur) { if (cur === n.recruitment.total) { if (REC_TOTAL_LABELS[c]) cur[REC_TOTAL_LABELS[c]] = readN(A, wc); } else if (REC_LABELS[c]) cur[REC_LABELS[c]] = readN(A, wc); }
    }
  }
  const salesSheet = sheet("Sales");
  if (salesSheet) {
    const wc = n.currentWeek || weekCount(salesSheet);
    n.sales.weeks = n.teamGoals.weeks.slice(0, wc);
    let mode = "totals", colMap = null;
    for (const u of salesSheet) {
      const raw0 = String(u[0] == null ? "" : u[0]).trim(), f = norm(raw0);
      if (f === "week label" || f === "week ending (text)" || f === "week ending") continue;
      if (f.startsWith("rep totals")) { mode = "repheader"; continue; }
      if (mode === "totals") { if (SA_LABELS[f]) n.sales[SA_LABELS[f]] = readN(u, wc); continue; }
      if (mode === "repheader") { colMap = {}; for (let h = 1; h < u.length; h++) { const p = REP_LABELS[norm(u[h])]; if (p) colMap[h] = p; } mode = "reprows"; continue; }
      if (mode === "reprows" && raw0) {
        const h = { calls: 0, prospectDMCalls: 0, prospectMeetings: 0, clientMeetings: 0, contracts: 0, signed: 0, firstOrder: 0, newAccounts: 0, gm: 0, meetings: 0, prospectTouches: 0, clientTouches: 0 };
        for (const p in colMap) h[colMap[p]] = Number(u[p]) || 0;
        h.meetings = h.prospectMeetings + h.clientMeetings; n.sales.repTotals[raw0] = h;
      }
    }
  }
  { const o = n.teamGoals, len = n.currentWeek || (o.totalGM || []).length; let lastReal = 0;
    for (let u = 0; u < len; u++) if ((o.hours[u] || 0) > 0 || (o.totalGM[u] || 0) !== 0 || ((n.sales.totalCalls || [])[u] || 0) > 0) lastReal = u + 1;
    if (lastReal && lastReal < len) {
      const trim = (c) => { for (const f in c) if (Array.isArray(c[f]) && c[f].length === len) c[f] = c[f].slice(0, lastReal); };
      trim(o); trim(n.sales); trim(n.recruitment.total || {}); (n.recruitment.recruiters || []).forEach(trim);
      o.weeks = (o.weeks || []).slice(0, lastReal); o.weekDates = (o.weekDates || []).slice(0, lastReal);
      n.recruitment.weeks = o.weeks.slice(); n.sales.weeks = o.weeks.slice(); n.currentWeek = lastReal; n.weekEnding = o.weekDates[lastReal - 1] || "";
    } else if (!lastReal) n.currentWeek = 0;
  }
  if (!n._year) n._year = new Date().getFullYear();
  return n;
}

/* ===== CHECKPOINT 1 stub App (real components + App shell added next) ===== */
export default function App() {
  return <div className="welcome"><h1>Reconstruction — checkpoint 1 (logic layer)</h1><p>Engine, Excel export &amp; parser reconstructed. Components + App shell next.</p></div>;
}
