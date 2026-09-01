import React, { useState, useMemo, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  ResponsiveContainer, ComposedChart, LineChart, BarChart, AreaChart,
  Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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

/* ======================= UI PRIMITIVES & CHARTS ======================= */
const axis = { stroke: "var(--axis)", fontSize: 11 };
const tip = () => ({ contentStyle: { background: "var(--tip-bg)", border: "1px solid var(--line)", borderRadius: 8, fontSize: 12, color: "var(--text)" }, labelStyle: { color: "var(--text)" }, itemStyle: { color: "var(--text)" } });
const useEscClose = (onClose) => { useEffect(() => { const h = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]); };

function KPI({ label, value, sub, delta, big, yoy, yoyLabel }) {
  const up = delta != null && delta >= 0, yUp = yoy != null && yoy >= 0;
  return (
    <div className={"card kpi" + (big ? " kpi-big" : "")}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub">{sub}{delta != null && <span className={"chip " + (up ? "up" : "down")}>{up ? "↑" : "↓"} {Math.abs(delta).toFixed(1)}%</span>}</div>
      {yoy != null && <div className="kpi-yoy"><span className={"chip " + (yUp ? "up" : "down")}>{yUp ? "↑" : "↓"} {Math.abs(yoy).toFixed(1)}%</span> {yoyLabel || "vs last year"}</div>}
    </div>
  );
}

function ProgressRing({ label, current, estimate, goal, ytdVal, estVal, fmt, explain }) {
  const cl = (y) => (Number.isFinite(y) ? clamp01(y) : 0);
  const A = cl(current), u = cl(estimate), c = 57, f = 43, h = 6, p = 12;
  const d = 2 * Math.PI * c, g = 2 * Math.PI * f, m = fmt || fmtNum, v = "rg-" + label;
  return (
    <div className="ring">
      <svg viewBox="0 0 130 130" width="120" height="120">
        <defs><linearGradient id={v} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.blue} /><stop offset="100%" stopColor={C.sky} /></linearGradient></defs>
        <circle cx="65" cy="65" r={c} fill="none" stroke="var(--ring-track)" strokeWidth={h} />
        <circle cx="65" cy="65" r={c} fill="none" stroke={C.orange} strokeWidth={h} strokeDasharray={`${d * u} ${d}`} strokeLinecap="round" transform="rotate(-90 65 65)" />
        <circle cx="65" cy="65" r={f} fill="none" stroke="var(--ring-track)" strokeWidth={p} />
        <circle cx="65" cy="65" r={f} fill="none" stroke={`url(#${v})`} strokeWidth={p} strokeDasharray={`${g * A} ${g}`} strokeLinecap="round" transform="rotate(-90 65 65)" />
        <text x="65" y="62" textAnchor="middle" className="ring-pct">{Math.round(A * 100)}%</text>
        <text x="65" y="81" textAnchor="middle" className="ring-lab">{label}</text>
      </svg>
      {goal != null && (
        <div className="ring-tip" role="tooltip">
          <div className="rt-title">{label}</div>
          <div className="rt-row"><span>Yearly Goal</span><b>{m(goal)}</b></div>
          <div className="rt-row"><span>Actual YTD</span><b className="blue">{m(ytdVal)}</b></div>
          <div className="rt-row"><span>Estimated YE</span><b className="orange">{m(estVal)}</b></div>
          <div className="rt-note">Inner ring = progress to date · outer ring = projected year-end.{explain ? " " + explain : ""}</div>
        </div>
      )}
    </div>
  );
}

function ProgressCard({ d, wk, ytd }) {
  const [gmode, setGmode] = useState("Margin");
  const a = d.teamGoals, s = a.goals || {}, o = d.currentWeek || a.totalGM.length;
  const l = ytd ? o : wk || o, yearPct = clamp01(l / 52);
  const u = (V) => (V || []).slice(0, l), left = Math.max(0, 52 - l);
  const proj = (V) => { const R = u(V), Q = R.reduce((Y, J) => Y + (+J || 0), 0), G = R.slice(-8), W = G.length ? G.reduce((Y, J) => Y + (+J || 0), 0) / G.length : 0; return { avg: W, total: Q + W * left }; };
  const rev = sum(u(a.revenue));
  const cumGM = a.cum2026 && a.cum2026[l - 1] != null ? a.cum2026[l - 1] : sum(u(a.totalGM));
  const pay = rev - cumGM, hc = (a.peoplePaid || [])[l - 1] || 0;
  const marginGap = (a.revenue || []).map((V, R) => (V || 0) - ((a.totalGM || [])[R] || 0));
  const vRev = proj(a.revenue).total, vPay = proj(marginGap).total, vGM = proj(a.totalGM).total, vHC = proj(a.peoplePaid).avg;
  const ratio = (V, R, Q) => (Q ? { cur: clamp01(V / Q), est: clamp01(R / Q) } : { cur: 0, est: 0 });
  const E = ratio(rev, vRev, s.bill), F = ratio(pay, vPay, s.pay), N = ratio(cumGM, vGM, s.margin);
  const M = { cur: clamp01(hc / (s.headcount || 1)), est: clamp01(vHC / (s.headcount || 1)) }, L = N.cur;
  if (!(s.bill || s.pay || s.margin || s.headcount)) return <div className="card progress"><div className="card-title">Progress</div><div className="empty-hint">Add annual targets (Bill, Pay, Margin, Headcount) on the Team Goals sheet to light up this card.</div></div>;
  const isHC = gmode === "Headcount";
  const K = (a.weeks || []).slice(0, o).map((V, R) => ({ w: (a.weekDates || [])[R] || V, Goal: isHC ? s.headcount || null : (a.budget || [])[R] || 0, Performance: isHC ? (a.peoplePaid || [])[R] || 0 : (a.totalGM || [])[R] || 0 }));
  const paceOf = (cur) => { const gp = cur - yearPct; return gp >= 0.03 ? "ahead" : gp <= -0.03 ? "behind" : "on"; };
  const Pace = ({ l: lbl, c: cur, goal }) => goal ? (() => { const y = paceOf(cur); return <div className={"pace " + y}><span className="pace-lbl">{lbl}</span><span className="pace-val">{y === "ahead" ? "Ahead" : y === "behind" ? "Behind" : "On pace"}</span></div>; })() : <div className="pace-spacer" />;
  const emptyRing = (lbl) => <div className="ring-empty"><div className="ring-empty-circle">—</div><div className="ring-empty-l">{lbl}</div><div className="ring-empty-hint">No goal set</div></div>;
  return (
    <div className="card progress">
      <div className="card-title">Progress<span className="card-hint">{ytd ? "year to date" : "through week " + l}</span></div>
      <div className="bars">
        <div className="bar-row"><div className="bar-track"><div className="bar-fill blue" style={{ width: yearPct * 100 + "%" }} /></div><span className="bar-tag blue">{Math.round(yearPct * 100)}% Year completed</span></div>
        <div className="bar-row"><div className="bar-track"><div className="bar-fill orange" style={{ width: L * 100 + "%" }} /></div><span className="bar-tag orange">{Math.round(L * 100)}% Goal completed</span></div>
      </div>
      <div className="rings">
        <div className="ring-col"><Pace l="Bill" c={E.cur} goal={s.bill} />{s.bill ? <ProgressRing label="Bill" current={E.cur} estimate={E.est} goal={s.bill} ytdVal={rev} estVal={vRev} fmt={fmtCur0} explain="Year-end estimate: last 8 weeks' pace projected across the weeks left" /> : emptyRing("Bill")}</div>
        <div className="ring-col"><Pace l="Pay" c={F.cur} goal={s.pay} />{s.pay ? <ProgressRing label="Pay" current={F.cur} estimate={F.est} goal={s.pay} ytdVal={pay} estVal={vPay} fmt={fmtCur0} explain="Year-end estimate: last 8 weeks' pace projected across the weeks left" /> : emptyRing("Pay")}</div>
        <div className="ring-col"><Pace l="Margin" c={N.cur} goal={s.margin} />{s.margin ? <ProgressRing label="Margin" current={N.cur} estimate={N.est} goal={s.margin} ytdVal={cumGM} estVal={vGM} fmt={fmtCur0} explain="Year-end estimate: last 8 weeks' pace projected across the weeks left" /> : emptyRing("Margin")}</div>
        <div className="ring-col"><Pace l="Headcount" c={M.cur} goal={s.headcount} />{s.headcount ? <ProgressRing label="Headcount" current={M.cur} estimate={M.est} goal={s.headcount} ytdVal={hc} estVal={vHC} fmt={fmtNum} explain="Year-end estimate: average headcount over the last 8 weeks" /> : emptyRing("Headcount")}</div>
        <div className="ring-legend"><div><span className="dot" style={{ background: C.blue }} /> Inner · current progress</div><div><span className="dot" style={{ background: C.orange }} /> Outer · projected year-end</div></div>
      </div>
      <div className="gp-head">
        <div className="seg">{["Margin", "Headcount"].map((V) => <button key={V} className={"seg-btn" + (gmode === V ? " on" : "")} onClick={() => setGmode(V)}>{V}</button>)}</div>
        <div className="gp-legend"><span><i className="dot" style={{ background: C.orange }} /> Goal</span><span><i className="dot" style={{ background: C.blue }} /> Performance</span></div>
      </div>
      <div className="gp-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={K} margin={{ left: 4, right: 10, top: 6, bottom: 0 }}>
            <CartesianGrid stroke="var(--grid)" vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="w" {...axis} interval={Math.max(0, Math.ceil(o / 6) - 1)} />
            <YAxis {...axis} width={isHC ? 30 : 50} tickFormatter={isHC ? undefined : fmtCurK} />
            <Tooltip {...tip()} formatter={(v) => (isHC ? fmtNum(v) : fmtCur0(v))} />
            <Line dataKey="Goal" stroke={C.orange} strokeWidth={2.5} strokeDasharray="5 4" dot={false} type="monotone" />
            <Line dataKey="Performance" stroke={C.blue} strokeWidth={2.5} dot={false} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ChartCard({ title, hint, children, sm, lg, wide }) {
  return (
    <div className={"card chart-card" + (wide ? " chart-wide" : "")}>
      <div className="card-title">{title}{hint && <span className="card-hint">{hint}</span>}</div>
      <div className={"chart-wrap" + (sm ? " sm" : lg ? " lg" : "")}>
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </div>
  );
}

// Two-slice donut of prospect vs client touches.
function TouchesDonut({ prospect, client, subtitle }) {
  const data = [{ name: "Prospect", v: prospect || 0 }, { name: "Client", v: client || 0 }];
  const total = (prospect || 0) + (client || 0);
  const colors = [C.blue, C.orange];
  return (
    <div className="card">
      <div className="card-title">Touch mix<span className="card-hint">{subtitle || "YTD"}</span></div>
      <div className="chart-wrap sm">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="v" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2}>
              {data.map((e, i) => <Cell key={i} fill={colors[i]} />)}
            </Pie>
            <Tooltip {...tip()} formatter={(v) => fmtNum(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="donut-total">{fmtNum(total)} total touches</div>
    </div>
  );
}

function Funnel({ data, subtitle }) {
  const first = data[0] ? data[0].v : 0;
  const lastV = data.length ? data[data.length - 1].v : 0;
  const overall = first ? (lastV / first) * 100 : 0;
  const oa = overall < 1 ? overall.toFixed(2) : Math.round(overall) + "";
  const palette = [C.sky, C.blue, C.violet, C.green, C.orange];
  const max = data[0] ? data[0].v : 1;
  const total = data.reduce((s, x) => s + (x.v || 0), 0);
  return (
    <div className="card">
      <div className="card-title">Sales conversion<span className="card-hint">{subtitle || "YTD"}</span></div>
      <div className="funnel-summary">
        <span className="card-hint">{data[0] ? data[0].stage : ""} → {data.length ? data[data.length - 1].stage : ""}</span>
        <span className="fs-val">{oa}% overall</span>
      </div>
      <div className="funnel">
        {data.map((step, i) => {
          const w = Math.max(7, (step.v / (max || 1)) * 100);
          const share = total ? Math.round((step.v / total) * 100) : 0;
          return (
            <div key={step.stage}>
              <div className="fn-step">
                <div className="fn-head"><span className="fn-stage">{step.stage}</span><span className="fn-val">{fmtNum(step.v)} · {share}%</span></div>
                <div className="fn-track"><div className="fn-bar" style={{ width: w + "%", background: palette[i % palette.length] }} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const salesFunnelFromRep = (r) => { r = r || {}; return [{ stage: "Prospect Meetings", v: +r.prospectMeetings || 0 }, { stage: "Sent", v: +r.contracts || 0 }, { stage: "Signed", v: +r.signed || 0 }, { stage: "New Clients", v: +r.newAccounts || 0 }]; };

function SalesFocus({ d, s, sel, setSel }) {
  const sales = d.sales;
  const reps = Object.keys(sales.repTotals || {}).sort((a, b) => a.localeCompare(b));
  const cur = sel === "All" || reps.includes(sel) ? sel : "All";
  const rt = cur === "All" ? null : sales.repTotals[cur] || {};
  const funnel = cur === "All" ? s.salesFunnel : salesFunnelFromRep(rt);
  const pTouch = cur === "All" ? sum(sales.prospectTouches) : +rt.prospectTouches || 0;
  const cTouch = cur === "All" ? sum(sales.clientTouches) : +rt.clientTouches || 0;
  const donutSub = cur === "All" ? "YTD · prospect vs client" : "YTD · " + cur;
  return (
    <div className="sales-focus">
      <div className="seg rep-seg">
        <button className={"seg-btn" + (cur === "All" ? " on" : "")} onClick={() => setSel("All")}>All</button>
        {reps.map((r) => <button key={r} className={"seg-btn" + (cur === r ? " on" : "")} onClick={() => setSel(r)}>{r}</button>)}
      </div>
      <div className="grid2">
        <TouchesDonut prospect={pTouch} client={cTouch} subtitle={donutSub} />
        <Funnel data={funnel} subtitle={cur === "All" ? "YTD · all reps" : "YTD · " + cur} />
      </div>
    </div>
  );
}

const LB_COLS = [
  { key: "rep", label: "Rep", type: "text" },
  { key: "calls", label: "Prospect Attempts", type: "num" },
  { key: "prospectDMCalls", label: "DM Calls", type: "num" },
  { key: "prospectMeetings", label: "Prospect Mtgs", type: "num" },
  { key: "clientMeetings", label: "Client Mtgs", type: "num" },
  { key: "contracts", label: "Sent", type: "num" },
  { key: "signed", label: "Signed", type: "num" },
  { key: "firstOrder", label: "First Order", type: "num" },
  { key: "newAccounts", label: "New Accounts", type: "num", rank: true },
  { key: "gm", label: "New GM$", type: "num", cur: true },
];

function Leaderboard({ repTotals, onRepClick, onUpdateGM }) {
  const [sortKey, setSortKey] = useState("newAccounts");
  const [dir, setDir] = useState("desc");
  const [q, setQ] = useState("");
  const [editGM, setEditGM] = useState(false);
  const [draft, setDraft] = useState({});
  const rows = useMemo(() => {
    const list = Object.entries(repTotals || {}).map(([rep, v]) => ({ rep, calls: v.calls || 0, prospectDMCalls: v.prospectDMCalls || 0, prospectMeetings: v.prospectMeetings || 0, clientMeetings: v.clientMeetings || 0, contracts: v.contracts || 0, signed: v.signed || 0, firstOrder: v.firstOrder || 0, newAccounts: v.newAccounts || 0, gm: v.gm || 0 }));
    list.sort((a, b) => { const cmp = sortKey === "rep" ? a.rep.localeCompare(b.rep) : (a[sortKey] || 0) - (b[sortKey] || 0); return dir === "asc" ? cmp : -cmp; });
    return list;
  }, [repTotals, sortKey, dir]);
  const onSort = (key) => { if (key === sortKey) setDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setDir(key === "rep" ? "asc" : "desc"); } };
  const arrow = (key) => (sortKey === key ? (dir === "asc" ? " ▲" : " ▼") : "");
  const rankCol = LB_COLS.find((c) => c.rank).key;
  const save = () => { if (onUpdateGM) onUpdateGM(draft); setEditGM(false); setDraft({}); };
  return (
    <div className="card lb-card">
      <div className="card-title">Rep leaderboard
        <span className="card-hint">{editGM ? "enter season-to-date GM$ per rep, then Done" : "click a column to sort · ranked by " + LB_COLS.find((c) => c.key === sortKey).label.toLowerCase()}</span>
        <input className="tbl-search" placeholder="Search rep…" value={q} onChange={(e) => setQ(e.target.value)} />
        {onUpdateGM && <button className="btn ghost xs" onClick={() => (editGM ? save() : setEditGM(true))}>{editGM ? "Done" : "Edit GM$"}</button>}
      </div>
      <div className="lb-scroll">
        <table className="lb">
          <thead><tr>{LB_COLS.map((c) => <th key={c.key} className={(c.type === "num" ? "num " : "") + (c.key === sortKey ? "active " : "") + (c.rank ? "rank-col" : "")} onClick={() => onSort(c.key)}>{c.label}{arrow(c.key)}</th>)}</tr></thead>
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
                <td className={"num" + (rankCol === sortKey ? " active" : "")}>{r.newAccounts}</td>
                <td className={"num" + (sortKey === "gm" ? " active" : "")} onClick={(e) => editGM && e.stopPropagation()}>
                  {editGM ? <input className="gm-inp" type="number" min="0" step="0.01" placeholder="0" value={draft[r.rep] ?? ""} onChange={(e) => setDraft((s) => ({ ...s, [r.rep]: e.target.value }))} /> : fmtCur0(r.gm)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function useSeries(d) {
  return useMemo(() => {
    const t = d.teamGoals, r = d.recruitment, n = d.sales;
    for (const k of ["cum2026", "cum2025", "gmPerHour", "gmPct", "ytdFill"]) if (!Array.isArray(t[k])) t[k] = t.totalGM.map(() => 0);
    if (Array.isArray(t.ytdFillSheet) && t.ytdFillSheet.length) t.ytdFill = t.ytdFillSheet.map((x) => +x || 0);
    else if (Array.isArray(t.weeklyFill)) { let c = 0; t.ytdFill = t.weeklyFill.map((g, m) => (c += Math.min(1, Math.max(0, +g || 0)), +(c / (m + 1)).toFixed(4))); }
    const wl = (i) => t.weekDates[i] || t.weeks[i] || "W" + (i + 1);
    const gmVsBudget = t.tempGM.map((v, i) => ({ w: wl(i), "GM$": Math.round(v), Budget: Math.round(t.budget[i] || 0) }));
    const cumRace = t.cum2026.map((v, i) => ({ w: wl(i), 2026: Math.round(v), 2025: Math.round(t.cum2025[i] || 0) }));
    const revHead = t.revenue.map((v, i) => ({ w: wl(i), Revenue: Math.round(v), Headcount: t.peoplePaid[i] || 0 }));
    const tempOrders = t.newTempOrders.map((v, i) => ({ w: wl(i), New: v || 0, Open: t.openTempOrders[i] || 0 }));
    const funnel = [{ stage: "Interviews", v: sum(r.total.interviews) }, { stage: "Submittals", v: sum(r.total.submittals) }, { stage: "Registered", v: sum(r.total.registered) }, { stage: "Starts", v: sum(r.total.starts) }];
    const netHC = r.total.starts.map((v, i) => ({ w: wl(i), Net: (v || 0) - (r.total.ends[i] || 0) }));
    const gmContrib = (r.recruiters || []).map((x) => ({ name: x.name, v: Math.round(sum(x.gm)) }));
    const outreach = n.totalCalls.map((v, i) => ({ w: wl(i), Calls: v || 0, Prospect: n.prospectTouches[i] || 0, Client: n.clientTouches[i] || 0 }));
    const touchSplit = [{ name: "Prospect", v: sum(n.prospectTouches) }, { name: "Client", v: sum(n.clientTouches) }];
    const salesFunnel = [{ stage: "Meetings", v: sum(n.prospectMeetings) + sum(n.clientMeetings) }, { stage: "Sent", v: sum(n.contractsSent) }, { stage: "Signed", v: sum(n.contractsSigned) }, { stage: "New Clients", v: sum(n.newClients) }];
    return { gmVsBudget, cumRace, revHead, tempOrders, funnel, netHC, gmContrib, outreach, touchSplit, salesFunnel };
  }, [d]);
}

function Insights({ d }) {
  const t = d.teamGoals, i = (t.totalGM || []).length;
  if (!i) return null;
  const a = [];
  if (i >= 2) { const l = t.totalGM[i - 1], A = t.totalGM[i - 2], u = A ? ((l - A) / A) * 100 : 0; a.push({ tag: "Trend", title: "Total GM$ " + (u >= 0 ? "up " : "down ") + Math.abs(u).toFixed(0) + "% WoW", sub: fmtCur0(l) + " this week", tone: u >= 0 ? "up" : "down" }); }
  const best = t.totalGM.reduce((l, A, u, c) => (A > c[l] ? u : l), 0);
  a.push({ tag: "Best week", title: t.weekDates[best] || "W" + (best + 1), sub: fmtCur0(t.totalGM[best]) + " GM$", tone: "up" });
  a.push({ tag: "Hours", title: fmtNum((t.hours || [])[i - 1] || 0), sub: "this week", tone: "" });
  a.push({ tag: "Clients", title: fmtNum((t.clientsBilled || [])[i - 1] || (t.newClients || [])[i - 1] || 0), sub: "this week", tone: "" });
  const fill = (t.weeklyFill || [])[i - 1];
  if (fill != null) a.push({ tag: "Fill rate", title: fmtPct(fill) + " this week", sub: fill >= 0.8 ? "on target" : "below 80%", tone: fill >= 0.8 ? "up" : "warn" });
  return <div className="insights">{a.slice(0, 4).map((l, A) => <div key={A} className={"insight " + l.tone}><div className="ins-tag">{l.tag}</div><div className="ins-title">{l.title}</div><div className="ins-sub">{l.sub}</div></div>)}</div>;
}

function PeriodCompare({ d }) {
  const t = d.teamGoals, r = d.sales, n = (t.totalGM || []).length;
  const [win, setWin] = useState(4);
  const [mode, setMode] = useState("prior");
  const lyKey = String((d._year || new Date().getFullYear()) - 1);
  const arc = d.archive && d.archive[lyKey];
  const hasLY = !!(arc && arc.teamGoals && (arc.teamGoals.totalGM || []).length);
  const cmpLY = mode === "lastyear" && hasLY;
  let f = 0;
  for (let y = 0; y < n; y++) if ((t.totalGM[y] || 0) !== 0 || (t.hours[y] || 0) > 0 || (t.revenue[y] || 0) !== 0) f = y + 1;
  if (!f) f = n;
  if (f < 2) return null;
  const rangeSum = (y, from, to) => (y || []).slice(from, to).reduce((s, e) => s + (+e || 0), 0);
  const p = Math.max(0, f - win), dEnd = f, g = Math.max(0, f - 2 * win), m = p;
  const rows = [
    { label: "Total GM$", arr: t.totalGM, ly: cmpLY && arc.teamGoals.totalGM, fmt: fmtCur0 },
    { label: "Revenue", arr: t.revenue, ly: cmpLY && arc.teamGoals.revenue, fmt: fmtCur0 },
    { label: "Hours Worked", arr: t.hours, ly: cmpLY && arc.teamGoals.hours, fmt: (y) => fmtNum(Math.round(y)) },
    { label: "Sales Calls", arr: r.totalCalls, ly: cmpLY && arc.sales && arc.sales.totalCalls, fmt: fmtNum },
    { label: "New Clients", arr: t.newClients, ly: cmpLY && arc.teamGoals.newClients, fmt: fmtNum },
  ];
  return (
    <div className="card pc-card">
      <div className="card-title">Period comparison<span className="card-hint">{cmpLY ? "vs same period " + lyKey : "current vs prior"}</span></div>
      <div className="pc-controls">
        <div className="seg pc-seg">{[["Week", 1], ["4 Weeks", 4], ["13 Weeks", 13]].map(([lbl, v]) => <button key={v} className={"seg-btn" + (win === v ? " on" : "")} onClick={() => setWin(v)}>{lbl}</button>)}</div>
        {hasLY && <div className="seg pc-seg">{[["Prior period", "prior"], ["Last year", "lastyear"]].map(([lbl, v]) => <button key={v} className={"seg-btn" + (mode === v ? " on" : "")} onClick={() => setMode(v)}>{lbl}</button>)}</div>}
      </div>
      <div className="pc-rows">
        {rows.map((y) => {
          const cur = rangeSum(y.arr, p, dEnd);
          let prev;
          if (cmpLY) { const F = y.ly || []; prev = rangeSum(F, Math.max(0, Math.min(p, F.length)), Math.min(dEnd, F.length)); }
          else prev = rangeSum(y.arr, g, m);
          const delta = prev ? ((cur - prev) / prev) * 100 : cur ? 100 : 0;
          return (
            <div key={y.label} className="pc-row">
              <span className="pc-label">{y.label}</span>
              <span className="pc-cur">{y.fmt(Math.round(cur))}</span>
              <span className="pc-prev">from {y.fmt(Math.round(prev))}{cmpLY ? " in " + lyKey : ""}</span>
              <span className={"pc-delta " + (cur >= prev ? "up" : "down")}>{(delta >= 0 ? "+" : "") + delta.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
      <div className="pc-note">{cmpLY ? "Weeks " + (p + 1) + "–" + dEnd + " this year vs the same weeks in " + lyKey + "." : "Last " + (win === 1 ? "week" : win + " weeks") + " vs the prior " + (win === 1 ? "week" : win + " weeks") + "."}</div>
    </div>
  );
}

function RepProfile({ rep, d, onClose }) {
  useEscClose(onClose);
  const n = (d.sales.repTotals || {})[rep] || {};
  const hist = (d._weekLedger || []).map((o) => { const l = (o.reps && o.reps[rep]) || {}; return { w: "W" + o.week, Calls: +l.calls || 0, Meetings: (+l.prospectMeetings || 0) + (+l.clientMeetings || 0), Signed: +l.signed || 0, New: +l.newAccounts || 0 }; });
  const stats = [["Calls", n.calls], ["Prospect Mtgs", n.prospectMeetings], ["Client Mtgs", n.clientMeetings], ["Sent", n.contracts], ["Signed", n.signed], ["First Order", n.firstOrder], ["New Accts", n.newAccounts], ["GM$", n.gm]];
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><div className="modal-title">{rep} · rep profile</div><button className="x" onClick={onClose} aria-label="Close">×</button></div>
        <div className="modal-body">
          <div className="rp-totals">{stats.map(([lbl, v]) => <div key={lbl} className="rp-stat"><div className="rp-stat-v">{lbl === "GM$" ? fmtCur0(+v || 0) : fmtNum(+v || 0)}</div><div className="rp-stat-l">{lbl}</div></div>)}</div>
          {hist.length ? (
            <div className="chart-wrap lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hist} margin={{ left: 4, right: 10, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="var(--grid)" vertical={false} />
                  <XAxis dataKey="w" {...axis} /><YAxis {...axis} /><Tooltip {...tip()} /><Legend />
                  <Line dataKey="Calls" stroke={C.sky} strokeWidth={2} dot={false} />
                  <Line dataKey="Meetings" stroke={C.blue} strokeWidth={2} dot={false} />
                  <Line dataKey="Signed" stroke={C.green} strokeWidth={2} dot={false} />
                  <Line dataKey="New" stroke={C.orange} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : <div className="empty-hint">Week-by-week history appears here once weeks are added in-app. Imported spreadsheets only carry season-to-date totals.</div>}
        </div>
      </div>
    </div>
  );
}

function TeamManager({ data, teams, multiTeam, onClose, onSplit, onAdd, onRename, onRemove, onImport, onImportInto }) {
  const [newName, setNewName] = useState("");
  const [firstName, setFirstName] = useState("Team 1");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(null);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h3>{multiTeam ? "Manage teams" : "Set up teams"}</h3><button className="x" onClick={onClose}>×</button></div>
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
                      <><input className="inp tm-edit" value={editName} autoFocus onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { onRename(t.id, editName); setEditId(null); } }} /><button className="btn sm primary" onClick={() => { onRename(t.id, editName); setEditId(null); }}>Save</button><button className="btn sm ghost" onClick={() => setEditId(null)}>Cancel</button></>
                    ) : confirmRemove === t.id ? (
                      <><span className="tm-name">Remove "{t.name}"?</span><button className="btn sm danger" onClick={() => { onRemove(t.id); setConfirmRemove(null); }}>Remove</button><button className="btn sm ghost" onClick={() => setConfirmRemove(null)}>Keep</button></>
                    ) : (
                      <><span className="tm-name">{t.name}</span><span className="tm-meta">{(data.teams[t.id] && data.teams[t.id].currentWeek) || 0} weeks</span>{onImportInto && <button className="btn sm ghost" title={"Replace " + t.name + "'s data from a spreadsheet"} onClick={() => onImportInto(t.id)}>Import data</button>}<button className="btn sm ghost" onClick={() => { setEditId(t.id); setEditName(t.name); }}>Rename</button><button className="btn sm ghost danger-text" onClick={() => setConfirmRemove(t.id)}>Remove</button></>
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

/* ===== STUBS — reconstructed in later checkpoints ===== */
const extractBrandFromLogo = async () => null;
function downloadPDF() {}
function RecProfile({ onClose }) { useEscClose(onClose); return <div className="modal-back" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="modal-body">Recruiter profile — pending reconstruction.</div></div></div>; }
function Commission() { return null; }
function Overview(props) { return <div className="empty-hint">Overview — pending reconstruction.</div>; }
function TeamGoals() { return <div className="empty-hint">Team Goals — pending reconstruction.</div>; }
function Recruitment() { return <div className="empty-hint">Recruitment — pending reconstruction.</div>; }
function Sales() { return <div className="empty-hint">Sales — pending reconstruction.</div>; }
function RecruiterScorecard() { return <div className="empty-hint">Recruiter scorecard — pending reconstruction.</div>; }
function AddWeekModal({ onClose }) { useEscClose(onClose); return <div className="modal-back" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="modal-body">Add week — pending reconstruction.</div></div></div>; }
function SettingsPanel({ onClose }) { useEscClose(onClose); return <div className="modal-back" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="modal-body">Settings — pending reconstruction.</div></div></div>; }
function SetupWizard() { return <div className="empty-hint">Setup wizard — pending reconstruction.</div>; }

/* ===== CHECKPOINT 2 stub App (App shell reconstructed next) ===== */
export default function App() {
  return <div className="welcome"><h1>Reconstruction — checkpoint 2 (UI primitives)</h1><p>Charts, KPIs, leaderboard, progress rings, period comparison reconstructed.</p></div>;
}
