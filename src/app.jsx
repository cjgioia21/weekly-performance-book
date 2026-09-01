import React, { useState, useMemo, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  ResponsiveContainer, ComposedChart, LineChart, BarChart, AreaChart,
  Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ReferenceLine,
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { EMPTY } from "./EMPTY_DATA.js";

/* ===========================================================================
 *  app.jsx — the Weekly Performance Book dashboard.
 *  Reconstructed as clean source from the compiled build and validated by
 *  build + round-trip + jsdom-render tests (see tests/ and RECONSTRUCTION.md).
 *  Layout: config/theme engine · multi-team engine · week engine ·
 *  Excel export + parser · UI primitives/charts · tab views · modals · App.
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

/* ============================ TAB VIEWS ============================ */
function Overview({ d, s, wk, ytd, onNav, cfg, teamBoard, onPickTeam, youTeam }) {
  const on = (id) => widgetOn(cfg || DEFAULT_CONFIG, id);
  const u = d.teamGoals, f = d.sales;
  const [mode, setMode] = useState("this");
  const best = (u.totalGM || []).length ? u.totalGM.reduce((N, M, L, I) => (M > I[N] ? L : N), 0) : 0;
  const isBest = mode === "best";
  const m = isBest ? best : (wk || d.currentWeek) - 1;
  const isYtd = isBest ? false : ytd;
  const val = (N) => (isYtd ? sum(N || []) : (N || [])[m] || 0);
  const delta = (N) => (isYtd ? undefined : pct((N || [])[m], (N || [])[m - 1]));
  const subLabel = isBest ? "best week · W" + (best + 1) : ytd ? "YTD" : "vs prior wk";
  const permGM = val(u.totalGM) - val(u.tempGM);
  const paidDelta = isYtd ? (last(u.peoplePaid) || 0) - (u.peoplePaid[0] || 0) : (u.peoplePaid[m] || 0) - (u.peoplePaid[m - 1] || 0);
  const lyKey = String((d._year || new Date().getFullYear()) - 1);
  const ly = !isBest && d.archive && d.archive[lyKey] && d.archive[lyKey].teamGoals;
  const lyLabel = "vs " + lyKey;
  const yoy = (arr, lyArr) => {
    if (!ly || !lyArr || !lyArr.length) return null;
    const cur = isYtd ? sum((arr || []).slice(0, m + 1)) : (arr || [])[m] || 0;
    const prev = isYtd ? sum(lyArr.slice(0, Math.min(m + 1, lyArr.length))) : m < lyArr.length ? lyArr[m] || 0 : null;
    return prev == null || prev === 0 ? null : ((cur - prev) / Math.abs(prev)) * 100;
  };
  const permYoY = (() => {
    if (!ly) return null;
    const cumAt = (arr) => (isYtd ? sum((arr || []).slice(0, Math.min(m + 1, (arr || []).length))) : m < (arr || []).length ? (arr || [])[m] || 0 : null);
    const kAt = (arr) => (isYtd ? sum((arr || []).slice(0, m + 1)) : (arr || [])[m] || 0);
    const lyPerm = cumAt(ly.totalGM) != null && cumAt(ly.tempGM) != null ? cumAt(ly.totalGM) - cumAt(ly.tempGM) : null;
    return lyPerm == null || lyPerm === 0 ? null : ((kAt(u.totalGM) - kAt(u.tempGM) - lyPerm) / Math.abs(lyPerm)) * 100;
  })();
  const latestPaid = (() => { const ee = u.peoplePaid || []; for (let K = (isYtd ? ee.length : m + 1) - 1; K >= 0; K--) if (ee[K]) return ee[K]; return 0; })();
  return (
    <>
      <div className="ov-toggle">
        <button className={isBest ? "" : "on"} onClick={() => setMode("this")}>This week</button>
        <button className={isBest ? "on" : ""} onClick={() => setMode("best")}>Best week</button>
      </div>
      {teamBoard && teamBoard.length > 0 && on("ov_teamboard") && (
        <div className="card tlb-card">
          <div className="card-title">Team leaderboard <span className="card-hint">ranked by GM$ · pace vs annual goal</span>{onNav && <button className="tlb-viewall" onClick={() => onNav("Teams")}>View all teams →</button>}</div>
          <TeamLeaderboard rows={teamBoard} compact youTeam={youTeam} onPick={onPickTeam} />
        </div>
      )}
      {on("ov_insights") && <Insights d={d} />}
      {on("ov_hero") && (
        <div className="kpi-hero">
          <KPI big label="Total GM$" value={fmtCur0(val(u.totalGM))} sub={subLabel} delta={delta(u.totalGM)} yoy={yoy(u.totalGM, ly && ly.totalGM)} yoyLabel={lyLabel} />
          <KPI big label="Revenue (Bill)" value={fmtCur0(val(u.revenue))} sub={subLabel} delta={delta(u.revenue)} yoy={yoy(u.revenue, ly && ly.revenue)} yoyLabel={lyLabel} />
          <KPI big label="Perm GM$" value={fmtCur0(permGM)} sub={subLabel} yoy={permYoY} yoyLabel={lyLabel} />
          <KPI big label="People Paid" value={fmtNum(latestPaid)} sub={isBest ? subLabel : ytd ? "latest" : "headcount"} delta={delta(u.peoplePaid)} yoy={yoy(u.peoplePaid, ly && ly.peoplePaid)} yoyLabel={lyLabel} />
        </div>
      )}
      {on("ov_strip") && (
        <div className="kpi-strip">
          <KPI label="People Paid +/-" value={(paidDelta >= 0 ? "+" : "") + paidDelta} sub={isBest ? subLabel : ytd ? "net YTD" : "vs prior wk"} />
          <KPI label="Weekly Fill Rate" value={fmtPct((u.weeklyFill || [])[m] || 0)} sub="this week" />
          <KPI label="Sales Calls" value={fmtNum(val(f.totalCalls))} sub={subLabel} delta={delta(f.totalCalls)} />
          <KPI label="New Clients This Week" value={fmtNum((u.newClients || [])[m] || 0)} sub="this week" />
        </div>
      )}
      {on("ov_progress") && <div className="grid-progress solo"><ProgressCard d={d} wk={wk} ytd={ytd} /></div>}
      {on("ov_period") && <PeriodCompare d={d} />}
      {on("ov_charts") && (
        <div className="grid2">
          <ChartCard title="Weekly gross margin vs budget">
            <ComposedChart data={s.gmVsBudget}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} /><YAxis {...axis} tickFormatter={fmtCurK} />
              <Tooltip {...tip()} formatter={(N) => fmtCur0(N)} />
              <Bar dataKey="GM$" fill={C.blue} radius={[3, 3, 0, 0]} />
              <Line dataKey="Budget" stroke={C.orange} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ChartCard>
          <ChartCard title="Cumulative GM$: 2026 vs 2025">
            <LineChart data={s.cumRace}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} /><YAxis {...axis} tickFormatter={fmtCurK} />
              <Tooltip {...tip()} formatter={(N) => fmtCur0(N)} /><Legend />
              <Line dataKey="2026" stroke={C.blue} strokeWidth={2.5} dot={false} />
              <Line dataKey="2025" stroke={C.faint} strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ChartCard>
        </div>
      )}
    </>
  );
}

function TeamGoals({ d, s, wk, ytd, cfg }) {
  const on = (id) => widgetOn(cfg || DEFAULT_CONFIG, id);
  const tg = d.teamGoals, o = (wk || d.currentWeek) - 1;
  const val = (c) => (ytd ? sum(c) : c[o] || 0);
  const gmPct = ytd ? (sum(tg.revenue) ? sum(tg.totalGM) / sum(tg.revenue) : 0) : tg.gmPct[o] || 0;
  const ytdFill = ytd ? last(tg.ytdFill) || 0 : tg.ytdFill[o] || 0;
  return (
    <>
      {on("tg_kpis") && (
        <div className="kpis k4 tight">
          <KPI label="Temp GM$" value={fmtCur0(val(tg.tempGM))} sub={ytd ? "YTD" : "this week"} />
          <KPI label="Revenue (Bill)" value={fmtCur0(val(tg.revenue))} sub={ytd ? "YTD" : "this week"} />
          <KPI label="GM% (Mark-Up)" value={fmtPct(gmPct)} sub="margin rate" />
          <KPI label="YTD Fill" value={fmtPct(ytdFill)} sub="orders filled" />
        </div>
      )}
      {on("tg_charts") && (
        <div className="grid2">
          <ChartCard title="Weekly gross margin vs budget">
            <ComposedChart data={s.gmVsBudget}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} /><YAxis {...axis} tickFormatter={fmtCurK} />
              <Tooltip {...tip()} formatter={(c) => fmtCur0(c)} />
              <ReferenceLine y={ytd ? last(tg.budget) || 0 : tg.budget[o]} stroke={C.orange} strokeDasharray="4 4" />
              <Bar dataKey="GM$" fill={C.blue} radius={[3, 3, 0, 0]} />
              <Line dataKey="Budget" stroke={C.orange} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ChartCard>
          <ChartCard title="Cumulative GM$: 2026 vs 2025">
            <LineChart data={s.cumRace}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} /><YAxis {...axis} tickFormatter={fmtCurK} />
              <Tooltip {...tip()} formatter={(c) => fmtCur0(c)} /><Legend />
              <Line dataKey="2026" stroke={C.blue} strokeWidth={2.5} dot={false} />
              <Line dataKey="2025" stroke={C.faint} strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ChartCard>
          <ChartCard title="Revenue & headcount">
            <ComposedChart data={s.revHead}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} />
              <YAxis yAxisId="l" {...axis} tickFormatter={fmtCurK} />
              <YAxis yAxisId="r" orientation="right" {...axis} />
              <Tooltip {...tip()} /><Legend />
              <Area yAxisId="l" dataKey="Revenue" stroke={C.sky} fill={C.sky} fillOpacity={0.18} strokeWidth={2} />
              <Line yAxisId="r" dataKey="Headcount" stroke={C.orange} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ChartCard>
          <ChartCard title="Temp orders">
            <BarChart data={s.tempOrders}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} /><YAxis {...axis} /><Tooltip {...tip()} /><Legend />
              <Bar dataKey="New" stackId="a" fill={C.blue} />
              <Bar dataKey="Open" stackId="a" fill={C.sky} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartCard>
        </div>
      )}
    </>
  );
}

const SCORECARD_COLS = [
  { key: "gm", label: "Total GM$", cur: true, ytdAlways: true },
  { key: "gm", label: "GM$ Week", cur: true },
  { key: "interviews", label: "Interviews" },
  { key: "registered", label: "Registered" },
  { key: "submittals", label: "Submittals" },
  { key: "clientInterviews", label: "Client Int." },
  { key: "starts", label: "Starts" },
  { key: "peoplePaid", label: "Paid", stock: true },
];
function RecruiterScorecard({ rc, i, ytd, onRecClick }) {
  const [q, setQ] = useState("");
  const rows = (rc.recruiters || []).map((o) => ({ name: o.name, r: o })).filter((o) => !q || o.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="card lb-card">
      <div className="card-title">Recruiter scorecard<span className="card-hint">{ytd ? "YTD · full year" : "selected week"}</span><input className="tbl-search" placeholder="Search recruiter…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="lb-scroll">
        <table className="lb">
          <thead><tr><th>Recruiter</th>{SCORECARD_COLS.map((o, l) => <th key={l} className="num">{o.label}</th>)}</tr></thead>
          <tbody>
            {rows.map(({ name, r }) => (
              <tr key={name} className={onRecClick ? "lb-row" : ""} onClick={() => onRecClick && onRecClick(r)}>
                <td className="rep-name">{name}</td>
                {SCORECARD_COLS.map((col, u) => { const c = r[col.key] || []; const v = col.ytdAlways ? sum(c) : col.stock ? (ytd ? last(c) || 0 : c[i] || 0) : (ytd ? sum(c) : c[i] || 0); return <td key={u} className="num">{col.cur ? fmtCur0(v) : fmtNum(v)}</td>; })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Recruitment({ d, s, wk, ytd, cfg }) {
  const on = (id) => widgetOn(cfg || DEFAULT_CONFIG, id);
  const rc = d.recruitment, tg = d.teamGoals, l = (wk || d.currentWeek) - 1;
  const [prof, setProf] = useState(null);
  const paidDelta = ytd ? (last(tg.peoplePaid) || 0) - (tg.peoplePaid[0] || 0) : (tg.peoplePaid[l] || 0) - (tg.peoplePaid[l - 1] || 0);
  return (
    <>
      {on("rc_kpis") && (
        <div className="kpis k5 tight">
          <KPI label="People Paid By Current Recruiters" value={fmtNum(ytd ? last(rc.total.paidByRecruiter) || 0 : rc.total.paidByRecruiter[l])} sub={ytd ? "latest week" : "selected week"} />
          <KPI label="House People Paid" value={fmtNum(ytd ? last(rc.total.paidHouse) || 0 : rc.total.paidHouse[l])} sub={ytd ? "latest week" : "selected week"} />
          <KPI label="People Paid +/-" value={(paidDelta >= 0 ? "+" : "") + paidDelta} sub={ytd ? "net YTD" : "vs prior wk"} />
          <KPI label="Starts" value={fmtNum(ytd ? sum(rc.total.starts) : rc.total.starts[l] || 0)} sub={ytd ? "YTD" : "selected week"} />
          <KPI label="Ends" value={fmtNum(ytd ? sum(rc.total.ends) : rc.total.ends[l] || 0)} sub={ytd ? "YTD" : "selected week"} />
        </div>
      )}
      {on("rc_open") && (
        <div className="kpi-strip cols2">
          <KPI label="Open Temp Order" value={fmtNum(ytd ? last(tg.openTempOrders) || 0 : (tg.openTempOrders || [])[l] || 0)} sub={ytd ? "latest" : "selected week"} />
          <KPI label="Open Perm" value={fmtNum(ytd ? last(tg.openPerm) || 0 : (tg.openPerm || [])[l] || 0)} sub={ytd ? "latest" : "selected week"} />
        </div>
      )}
      <div className="grid2">
        {on("rc_funnel") && (
          <ChartCard title="Recruiting funnel" hint="YTD">
            <BarChart data={s.funnel} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="var(--grid)" horizontal={false} />
              <XAxis type="number" {...axis} />
              <YAxis type="category" dataKey="stage" {...axis} width={80} />
              <Tooltip {...tip()} />
              <Bar dataKey="v" fill={C.blue} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartCard>
        )}
        {on("rc_gm") && (
          <ChartCard title="GM$ contribution by recruiter" hint="YTD">
            <BarChart data={s.gmContrib}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="name" {...axis} /><YAxis {...axis} tickFormatter={fmtCurK} />
              <Tooltip {...tip()} formatter={(p) => fmtCur0(p)} />
              <Bar dataKey="v" fill={C.blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
        )}
        {on("rc_head") && (
          <ChartCard title="Net headcount change" sm wide>
            <BarChart data={s.netHC}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis dataKey="w" {...axis} /><YAxis {...axis} /><Tooltip {...tip()} />
              <ReferenceLine y={0} stroke="var(--axis)" />
              <Bar dataKey="Net" radius={[3, 3, 0, 0]}>{s.netHC.map((p, i) => <Cell key={i} fill={p.Net >= 0 ? C.green : C.rose} />)}</Bar>
            </BarChart>
          </ChartCard>
        )}
      </div>
      {on("rc_scorecard") && <RecruiterScorecard rc={rc} i={l} ytd={ytd} onRecClick={setProf} />}
      {prof && <RecProfile rec={prof} weekDates={tg.weekDates} onClose={() => setProf(null)} />}
    </>
  );
}

function Sales({ d, s, wk, ytd, onUpdateGM, cfg }) {
  const on = (id) => widgetOn(cfg || DEFAULT_CONFIG, id);
  const o = d.sales, l = (wk || d.currentWeek) - 1;
  const [prof, setProf] = useState(null);
  const [sel, setSel] = useState("All");
  const v = (m) => (ytd ? sum(m || []) : (m || [])[l] || 0);
  const firstOrderTotal = Object.values(o.repTotals || {}).reduce((m, x) => m + (+x.firstOrder || 0), 0);
  const repSel = sel !== "All" && (o.repTotals || {})[sel];
  const funnel = repSel
    ? [{ label: "Total Calls", value: +repSel.calls || 0 }, { label: "Prospect DM Calls", value: +repSel.prospectDMCalls || 0 }, { label: "Prospect Meetings", value: +repSel.prospectMeetings || 0 }, { label: "Contracts Sent", value: +repSel.contracts || 0 }, { label: "Contracts Signed", value: +repSel.signed || 0 }, { label: "First Order", value: +repSel.firstOrder || 0 }, { label: "New Client", value: +repSel.newAccounts || 0 }]
    : [{ label: "Total Calls", value: v(o.totalCalls) }, { label: "Prospect DM Calls", value: v(o.prospectDMCalls) }, { label: "Prospect Meetings", value: v(o.prospectMeetings) }, { label: "Contracts Sent", value: v(o.contractsSent) }, { label: "Contracts Signed", value: v(o.contractsSigned) }, { label: "First Order", value: firstOrderTotal }, { label: "New Client", value: v(o.newClients) }];
  return (
    <>
      <div className="sales-funnel-layout">
        {on("sa_funnel") && (
          <div className="card vfunnel-card">
            <div className="card-title">Sales funnel <span className="card-hint">{repSel ? "YTD · " + sel : ytd ? "YTD" : "this week"}</span></div>
            <div className="vfunnel">{funnel.map((m, i) => <div key={m.label} className="vfunnel-row" style={{ width: 100 - i * 11 + "%" }}><span className="vfunnel-label">{m.label}</span><span className="vfunnel-val">{fmtNum(m.value)}</span></div>)}</div>
          </div>
        )}
        {on("sa_conversion") && <SalesFocus d={d} s={s} sel={sel} setSel={setSel} />}
      </div>
      {on("sa_leaderboard") && <Leaderboard repTotals={o.repTotals} onRepClick={setProf} onUpdateGM={onUpdateGM} />}
      {prof && <RepProfile rep={prof} d={d} onClose={() => setProf(null)} />}
    </>
  );
}

function RecProfile({ rec, weekDates, onClose }) {
  useEscClose(onClose);
  const n = (l) => rec[l] || [];
  const len = Math.max(n("gm").length, n("starts").length, n("ends").length, (weekDates || []).length);
  const data = Array.from({ length: len }, (_, A) => ({ w: (weekDates || [])[A] || "W" + (A + 1), GM: +n("gm")[A] || 0, Starts: +n("starts")[A] || 0, Ends: +n("ends")[A] || 0, Submittals: +n("submittals")[A] || 0 }));
  const total = (l) => n(l).reduce((A, u) => A + (+u || 0), 0);
  const stats = [["GM$", fmtCur0(total("gm"))], ["Starts", fmtNum(total("starts"))], ["Ends", fmtNum(total("ends"))], ["Interviews", fmtNum(total("interviews"))], ["Registered", fmtNum(total("registered"))], ["Submittals", fmtNum(total("submittals"))], ["Client Intvw", fmtNum(total("clientInterviews"))], ["People Paid", fmtNum(total("peoplePaid"))]];
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><div className="modal-title">{rec.name} · recruiter profile</div><button className="x" onClick={onClose} aria-label="Close">×</button></div>
        <div className="modal-body">
          <div className="rp-totals">{stats.map(([l, A]) => <div key={l} className="rp-stat"><div className="rp-stat-v">{A}</div><div className="rp-stat-l">{l}</div></div>)}</div>
          {len ? (
            <div className="chart-wrap lg">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ left: 4, right: 10, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="var(--grid)" vertical={false} />
                  <XAxis dataKey="w" {...axis} />
                  <YAxis yAxisId="l" {...axis} />
                  <YAxis yAxisId="r" orientation="right" {...axis} tickFormatter={fmtCurK} />
                  <Tooltip {...tip()} /><Legend />
                  <Bar yAxisId="l" dataKey="Starts" stackId="a" fill={C.green} />
                  <Bar yAxisId="l" dataKey="Ends" stackId="a" fill={C.rose} />
                  <Bar yAxisId="l" dataKey="Submittals" stackId="a" fill={C.violet} radius={[3, 3, 0, 0]} />
                  <Line yAxisId="r" dataKey="GM" stroke={C.blue} strokeWidth={2.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : <div className="empty-hint">No weekly history yet for this recruiter.</div>}
        </div>
      </div>
    </div>
  );
}

// Extract a small logo + brand colors from an uploaded image file (async via callback).
function extractBrandFromLogo(file, cb) {
  const img = new Image();
  img.onload = () => {
    const cn = document.createElement("canvas"), i = 64;
    cn.width = i; cn.height = i;
    const ctx = cn.getContext("2d");
    ctx.drawImage(img, 0, 0, i, i);
    const px = ctx.getImageData(0, 0, i, i).data, buckets = {};
    for (let f = 0; f < px.length; f += 4) {
      const r = px[f], g = px[f + 1], b = px[f + 2];
      if (px[f + 3] < 200) continue;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      if (mx - mn < 18 || mx > 242 || mx < 26) continue;
      const key = (r >> 4) + "," + (g >> 4) + "," + (b >> 4);
      const bk = buckets[key] || (buckets[key] = { n: 0, r: 0, g: 0, b: 0 });
      bk.n++; bk.r += r; bk.g += g; bk.b += b;
    }
    const colors = Object.values(buckets).sort((a, b) => b.n - a.n).slice(0, 3).map((c) => "#" + [c.r, c.g, c.b].map((x) => Math.round(x / c.n).toString(16).padStart(2, "0")).join(""));
    const out = document.createElement("canvas"), max = 96, scale = Math.min(max / img.width, max / img.height, 1);
    out.width = Math.max(1, Math.round(img.width * scale)); out.height = Math.max(1, Math.round(img.height * scale));
    out.getContext("2d").drawImage(img, 0, 0, out.width, out.height);
    cb({ logo: out.toDataURL("image/png"), logoColors: colors, primary: colors[0] || null, secondary: colors[1] || null });
  };
  img.src = URL.createObjectURL(file);
}

function downloadPDF(d, wkArg, ytd) {
  const n = d.teamGoals, i = d.recruitment, a = d.sales;
  const s = d.currentWeek || n.totalGM.length;
  const o = (wkArg || s) - 1;
  const l = (T) => (ytd ? sum(T || []) : (T || [])[o] || 0);
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const cfg = getConfig(d);
  const primary = (cfg.theme && cfg.theme.primary) || (cfg.brand && cfg.brand.accent) || "#233041";
  const rgb = [parseInt(primary.slice(1, 3), 16), parseInt(primary.slice(3, 5), 16), parseInt(primary.slice(5, 7), 16)];
  const sub = ytd ? "YTD · Weeks 1–" + s : "Week " + (wkArg || s) + (n.weekDates && n.weekDates[o] ? " · ending " + n.weekDates[o] : "");
  doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(20); doc.text(activeBrandName(d), 40, 50);
  doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(110); doc.text(sub, 40, 68);
  doc.setDrawColor(225); doc.line(40, 80, W - 40, 80);
  const section = (title, head, body, y) => {
    if (title) { doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(20); doc.text(title, 40, y); }
    const colStyles = head.reduce((L, I, ee) => { L[ee] = { halign: ee ? "right" : "left" }; return L; }, {});
    autoTable(doc, { startY: title ? y + 8 : y, head: [head], body, theme: "striped", headStyles: { fillColor: rgb, halign: "left" }, styles: { fontSize: 10, cellPadding: 5 }, columnStyles: colStyles, didParseCell: (L) => { if (L.section === "head" && L.column.index > 0) L.cell.styles.halign = "right"; }, margin: { left: 40, right: 40 } });
    return doc.lastAutoTable.finalY;
  };
  const permGM = l(n.totalGM) - l(n.tempGM);
  const fill = (n.weeklyFill || [])[o];
  let y = section(null, ["Key metric", "Value"], [
    ["Total GM$", fmtCur0(l(n.totalGM))], ["Revenue (Bill)", fmtCur0(l(n.revenue))], ["Perm GM$", fmtCur0(permGM)],
    ["People Paid", fmtNum(ytd ? last(n.peoplePaid) || 0 : n.peoplePaid[o] || 0)],
    ["Weekly Fill Rate", fill != null ? fmtPct(fill) : "—"], ["New Clients (this week)", fmtNum((n.newClients || [])[o] || 0)],
    ["Open Temp Orders", fmtNum(ytd ? last(n.openTempOrders) || 0 : n.openTempOrders[o] || 0)],
    ["Starts / Ends", (ytd ? sum(i.total.starts) : i.total.starts[o] || 0) + " / " + (ytd ? sum(i.total.ends) : i.total.ends[o] || 0)],
  ], 92);
  y = section("Recruiters", ["Recruiter", "GM$", "Starts", "Ends"], (i.recruiters || []).map((T) => [T.name, fmtCur0(ytd ? sum(T.gm) : (T.gm || [])[o] || 0), fmtNum(ytd ? sum(T.starts) : (T.starts || [])[o] || 0), fmtNum(ytd ? sum(T.ends) : (T.ends || [])[o] || 0)]), y + 22);
  const firstOrder = Object.values(a.repTotals || {}).reduce((T, E) => T + (+E.firstOrder || 0), 0);
  y = section("Sales funnel", ["Stage", "Count"], [
    ["Total Calls", fmtNum(l(a.totalCalls))], ["Prospect DM Calls", fmtNum(l(a.prospectDMCalls))], ["Prospect Meetings", fmtNum(l(a.prospectMeetings))],
    ["Contracts Sent", fmtNum(l(a.contractsSent))], ["Contracts Signed", fmtNum(l(a.contractsSigned))], ["First Order", fmtNum(firstOrder)], ["New Client", fmtNum(l(a.newClients))],
  ], y + 22);
  const repRows = Object.entries(a.repTotals || {}).map(([T, E]) => ({ rep: T, v: E })).sort((T, E) => (+E.v.gm || 0) - (+T.v.gm || 0)).map(({ rep: T, v: E }) => [T, fmtNum(+E.calls || 0), fmtNum(+E.signed || 0), fmtNum(+E.newAccounts || 0), fmtCur0(+E.gm || 0)]);
  y = section("Sales leaderboard", ["Rep", "Calls", "Signed", "New Accts", "New GM$"], repRows, y + 22);
  const pages = doc.internal.getNumberOfPages();
  for (let T = 1; T <= pages; T++) { doc.setPage(T); doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(150); doc.text("Generated " + new Date().toLocaleDateString() + " · " + activeBrandName(d), 40, doc.internal.pageSize.getHeight() - 24); }
  doc.save(brandSlug(d) + "-" + (ytd ? "YTD" : "Week-" + (wkArg || s)) + "-" + dateStamp() + ".pdf");
}

/* ===================== SETTINGS / SETUP / ADD-WEEK ===================== */
function NumField({ label, value, onChange }) {
  return <label className="nf"><span>{label}</span><input type="number" inputMode="decimal" step="any" value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}
const TG_ENTRY_LABELS = { revenue: "Revenue / Bill ($)", tempGM: "Temp GM$ (Margin)", totalGM: "Total GM$", budget: "Weekly Budget ($)", hours: "Weekly Hours", peoplePaid: "People Paid (Headcount)", clientsBilled: "Clients Billed", newClients: "New Clients", newTempOrders: "New Temp Orders", openTempOrders: "Open Temp Orders", openPerm: "Open Perm Orders", weeklyFill: "Weekly Fill Rate (0–1)" };
const REC_ENTRY_LABELS = { gm: "GM$", peoplePaid: "Paid", starts: "Starts", ends: "Ends", interviews: "Interviews", registered: "Registered", submittals: "Submittals", clientInterviews: "Client Int." };
const SALES_ENTRY_LABELS = { totalCalls: "Total Calls", prospectTouches: "Prospect Touches", clientTouches: "Client Touches", prospectEmails: "Prospect Emails", clientEmails: "Client Emails", prospectMeetings: "Prospect Meetings", clientMeetings: "Client Meetings", contractsSent: "Contracts Sent", contractsSigned: "Contracts Signed", newClients: "New Clients", prospectDMCalls: "Prospect DM Calls" };
const REP_FIELD_LABELS = { calls: "Prospect Attempts", prospectDMCalls: "DM Calls", prospectMeetings: "Prospect Mtg", clientMeetings: "Client Mtg", contracts: "Sent", signed: "Signed", firstOrder: "First Order", newAccounts: "New Accts", gm: "GM$", prospectTouches: "Prospect Touch", clientTouches: "Client Touch" };

function SettingsPanel({ data, cfg, onPreview, onSave, onClose, dark, setDark, onDeleteWeek, onReset, weekCount }) {
  useEscClose(onClose);
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(cfg)));
  const [confirmDel, setConfirmDel] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const update = (fn) => setDraft((prev) => { const L = JSON.parse(JSON.stringify(prev)); fn(L); onPreview(L); return L; });
  const setTemplate = (N) => update((M) => { M.template = N; const L = TEMPLATES[N]; if (L && L.tabs) { M.tabs = { ...L.tabs }; M.widgets = {}; WIDGET_REGISTRY.forEach((I) => { if (I.id in (L.widgets || {})) M.widgets[I.id] = L.widgets[I.id]; }); } });
  const setColor = (N, M) => update((L) => { if (M) L.theme[N] = M; else delete L.theme[N]; });
  const getColor = (N) => draft.theme[N] || "";
  const [sec, setSec] = useState("Layout");
  const sections = ["Layout", "Branding", "Theme", "Display", "Danger"];
  const fileRef = useRef(null);
  const onLogoFile = (e) => { const file = e.target.files && e.target.files[0]; if (file) { extractBrandFromLogo(file, (L) => update((I) => { if (L.primary) I.theme.primary = L.primary; if (L.secondary) I.theme.secondary = L.secondary; I.brand = { ...(I.brand || {}), logo: L.logo, logoColors: L.logoColors }; })); e.target.value = ""; } };
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal wide settings" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><div className="modal-title">Dashboard settings</div><button className="x" onClick={onClose} aria-label="Close">×</button></div>
        <div className="set-nav">{sections.map((N) => <button key={N} className={"seg-btn" + (sec === N ? " on" : "")} onClick={() => setSec(N)}>{N}</button>)}</div>
        <div className="modal-body">
          {sec === "Layout" && (
            <>
              <div className="set-sec">
                <div className="set-h">Template</div>
                <div className="set-hint">Presets that set which tabs and widgets show. You can still fine-tune everything below after picking one.</div>
                <div className="seg">{Object.entries(TEMPLATES).map(([N, M]) => <button key={N} className={"seg-btn" + (draft.template === N ? " on" : "")} onClick={() => setTemplate(N)}>{M.label}</button>)}</div>
              </div>
              <div className="set-sec">
                <div className="set-h">Tabs</div>
                {ALL_TABS.map((N) => <label key={N} className="set-row"><input type="checkbox" checked={draft.tabs[N] !== false} onChange={(M) => update((L) => { L.tabs[N] = M.target.checked; L.template = "custom"; })} /><span>{N}</span></label>)}
              </div>
              <div className="set-sec">
                <div className="set-h">Widgets</div>
                {ALL_TABS.filter((N) => draft.tabs[N] !== false).map((N) => (
                  <div key={N} className="set-group">
                    <div className="set-sub">{N}</div>
                    {WIDGET_REGISTRY.filter((M) => M.tab === N).map((M) => <label key={M.id} className="set-row"><input type="checkbox" checked={draft.widgets[M.id] !== false} onChange={(L) => update((I) => { I.widgets[M.id] = L.target.checked; I.template = "custom"; })} /><span>{M.label}</span></label>)}
                  </div>
                ))}
              </div>
            </>
          )}
          {sec === "Branding" && (
            <div className="set-sec">
              <div className="set-h">Branding</div>
              <div className="cm-field">
                <label>Company logo <span className="cm-hint">(theme colors are generated from it)</span></label>
                <button className="btn ghost sm" onClick={() => fileRef.current.click()}>Upload logo → auto-generate theme</button>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onLogoFile} />
                {draft.brand && draft.brand.logoColors && <div className="swatches" style={{ marginTop: 8 }}>{draft.brand.logoColors.map((N) => <span key={N} className="swatch" style={{ background: N, cursor: "default" }} />)}</div>}
              </div>
              <div className="cm-field">
                <label>Company name <span className="cm-hint">(header, PDF title, export filenames)</span></label>
                <input className="inp" placeholder="Weekly Performance Book" value={(draft.brand && draft.brand.name) || ""} onChange={(N) => update((M) => { M.brand = { ...(M.brand || {}), name: N.target.value }; })} />
              </div>
            </div>
          )}
          {sec === "Theme" && (
            <div className="set-sec">
              <div className="set-h">Theme colors</div>
              <div className="set-hint">Leave a color empty to use the default. Changes preview live; nothing saves until you hit Save.</div>
              <div className="theme-grid">{THEME_FIELDS.map(([N, M]) => <div key={N} className="theme-row"><input type="color" value={getColor(N) || "#233041"} onChange={(L) => setColor(N, L.target.value)} /><span className="theme-lbl">{M}</span>{getColor(N) && <button className="theme-clear" title="Reset to default" onClick={() => setColor(N, "")}>×</button>}</div>)}</div>
              <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={() => update((N) => { N.theme = {}; })}>Reset all colors to default</button>
            </div>
          )}
          {sec === "Display" && (
            <div className="set-sec">
              <div className="set-h">Display</div>
              <label className="set-row"><input type="checkbox" checked={dark} onChange={(N) => setDark(N.target.checked)} /><span>Dark mode (this device)</span></label>
            </div>
          )}
          {sec === "Danger" && (
            <div className="set-sec danger-zone">
              <div className="set-h">Danger zone</div>
              {weekCount > 1 && <button className={"btn ghost sm" + (confirmDel ? " danger" : "")} onClick={() => { if (confirmDel) { onDeleteWeek(); setConfirmDel(false); } else { setConfirmDel(true); setTimeout(() => setConfirmDel(false), 4000); } }}>{confirmDel ? "Confirm delete Week " + weekCount : "Delete latest week (W" + weekCount + ")"}</button>}
              <button className={"btn ghost sm" + (confirmReset ? " danger" : "")} style={{ marginLeft: 8 }} onClick={() => { if (confirmReset) { onReset(); setConfirmReset(false); } else { setConfirmReset(true); setTimeout(() => setConfirmReset(false), 4000); } }}>{confirmReset ? "Confirm full reset" : "Reset all data"}</button>
            </div>
          )}
        </div>
        <div className="modal-foot"><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" onClick={() => onSave(draft)}>Save settings</button></div>
      </div>
    </div>
  );
}

function SetupWizard({ onCancel, onCreate }) {
  const [recs, setRecs] = useState([]);
  const [reps, setReps] = useState([]);
  const [recName, setRecName] = useState("");
  const [repName, setRepName] = useState("");
  const [goals, setGoals] = useState({ bill: "", pay: "", margin: "", headcount: "" });
  const addRec = () => { const p = recName.trim(); if (p && !recs.includes(p)) setRecs([...recs, p]); setRecName(""); };
  const addRep = () => { const p = repName.trim(); if (p && !reps.includes(p)) setReps([...reps, p]); setRepName(""); };
  return (
    <div className="modal-back" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><div className="modal-title">Set up your team</div><button className="x" onClick={onCancel} aria-label="Close">×</button></div>
        <div className="modal-body">
          <p className="setup-intro">Add your recruiters and salespeople. You can add, remove, or rename people anytime later from the Add Data screen.</p>
          <div className="msec">Recruiters</div>
          <div className="chip-row">{recs.length === 0 && <span className="chip-empty">None yet</span>}{recs.map((p) => <span key={p} className="chip">{p}<button type="button" onClick={() => setRecs(recs.filter((x) => x !== p))} aria-label={"Remove " + p}>×</button></span>)}</div>
          <div className="create-form"><input className="inp" placeholder="Recruiter name" value={recName} onChange={(e) => setRecName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addRec(); }} /><button className="btn sm" onClick={addRec}>Add</button></div>
          <div className="msec" style={{ marginTop: 14 }}>Salespeople</div>
          <div className="chip-row">{reps.length === 0 && <span className="chip-empty">None yet</span>}{reps.map((p) => <span key={p} className="chip">{p}<button type="button" onClick={() => setReps(reps.filter((x) => x !== p))} aria-label={"Remove " + p}>×</button></span>)}</div>
          <div className="create-form"><input className="inp" placeholder="Salesperson name" value={repName} onChange={(e) => setRepName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addRep(); }} /><button className="btn sm" onClick={addRep}>Add</button></div>
          <div className="msec" style={{ marginTop: 14 }}>Weekly goals <span className="setup-opt">(optional — you can set these later)</span></div>
          <div className="nf-grid">
            <NumField label="Bill $" value={goals.bill} onChange={(p) => setGoals({ ...goals, bill: p })} />
            <NumField label="Pay $" value={goals.pay} onChange={(p) => setGoals({ ...goals, pay: p })} />
            <NumField label="Margin %" value={goals.margin} onChange={(p) => setGoals({ ...goals, margin: p })} />
            <NumField label="Headcount" value={goals.headcount} onChange={(p) => setGoals({ ...goals, headcount: p })} />
          </div>
        </div>
        <div className="modal-foot"><button className="btn ghost" onClick={onCancel}>Cancel</button><button className="btn primary" onClick={() => onCreate({ recruiters: recs, salespeople: reps, goals })}>Create dashboard</button></div>
      </div>
    </div>
  );
}

function AddWeekModal({ d, onClose, onSave, onAddRep, onRemoveRep, onAddRecruiter, onRemoveRecruiter }) {
  const dirty = useRef(false);
  const close = () => { if (!dirty.current || window.confirm("You have unsaved entries for this week. Discard them?")) onClose(); };
  useEscClose(close);
  const nextWeek = (d.currentWeek || d.teamGoals.totalGM.length) + 1;
  const blank = (fields) => Object.fromEntries(fields.map((f) => [f, ""]));
  const [weekDate, setWeekDate] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [tgForm, setTgForm] = useState(blank(TG_FIELDS));
  const [openOrders, setOpenOrders] = useState("");
  const [salesForm, setSalesForm] = useState(blank(SALES_FIELDS));
  const [recForm, setRecForm] = useState({});
  const [repForm, setRepForm] = useState({});
  const recNames = (d.recruitment.recruiters || []).map((r) => r.name);
  const repNames = Object.keys(d.sales.repTotals || {});
  const [section, setSection] = useState("tg");
  const [addName, setAddName] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [err, setErr] = useState("");
  const touch = () => { dirty.current = true; };
  const setTg = (k, v) => { touch(); setTgForm((p) => ({ ...p, [k]: v })); };
  const setSales = (k, v) => { touch(); setSalesForm((p) => ({ ...p, [k]: v })); };
  const setRec = (name, k, v) => { touch(); setRecForm((p) => ({ ...p, [name]: { ...(p[name] || blank(REC_FIELDS)), [k]: v } })); };
  const setRep = (name, k, v) => { touch(); setRepForm((p) => ({ ...p, [name]: { ...(p[name] || blank(REP_ENTRY_FIELDS)), [k]: v } })); };
  const pickSection = (v) => { setSection(v); setConfirmRemove(null); setAddName(""); };
  const priorIdx = nextWeek - 2, canPrefill = priorIdx >= 0;
  const prefill = () => {
    if (!canPrefill) return;
    const at = (arr) => { const v = (arr || [])[priorIdx]; return v == null || v === 0 ? "" : String(v); };
    setTgForm(Object.fromEntries(TG_FIELDS.map((f) => [f, at(d.teamGoals[f])])));
    setOpenOrders(at(d.recruitment.total && d.recruitment.total.openOrders));
    setSalesForm(Object.fromEntries(SALES_FIELDS.map((f) => [f, at(d.sales[f])])));
    setRecForm(Object.fromEntries((d.recruitment.recruiters || []).map((r) => [r.name, Object.fromEntries(REC_FIELDS.map((f) => [f, at(r[f])]))])));
    const led = (d._weekLedger || []).find((x) => x.week === nextWeek - 1);
    if (led && led.reps) setRepForm(Object.fromEntries(Object.entries(led.reps).map(([name, vals]) => [name, Object.fromEntries(REP_ENTRY_FIELDS.map((f) => [f, vals[f] == null || +vals[f] === 0 ? "" : String(vals[f])]))])));
  };
  const addPerson = (kind) => {
    const name = addName.trim();
    if (!name) return;
    if (kind === "rep") { if (repNames.includes(name)) return; onAddRep(name); setRepForm((p) => ({ ...p, [name]: blank(REP_ENTRY_FIELDS) })); setSection("rep::" + name); }
    else { if (recNames.includes(name)) return; onAddRecruiter(name); setRecForm((p) => ({ ...p, [name]: blank(REC_FIELDS) })); setSection("rec::" + name); }
    setAddName("");
  };
  const removePerson = (kind, name) => {
    const key = kind + "::" + name;
    if (confirmRemove === key) {
      if (kind === "rep") { onRemoveRep(name); const rest = repNames.filter((x) => x !== name); setSection(rest[0] ? "rep::" + rest[0] : "tg"); }
      else { onRemoveRecruiter(name); const rest = recNames.filter((x) => x !== name); setSection(rest[0] ? "rec::" + rest[0] : "tg"); }
      setConfirmRemove(null);
    } else setConfirmRemove(key);
  };
  const collectReps = () => Object.fromEntries(repNames.map((n) => [n, repForm[n] || blank(REP_ENTRY_FIELDS)]));
  const collectRecs = () => Object.fromEntries(recNames.map((n) => [n, recForm[n] || blank(REC_FIELDS)]));
  const recSel = section.startsWith("rec::") && section !== "rec::__add__" ? section.slice(5) : null;
  const repSel = section.startsWith("rep::") && section !== "rep::__add__" ? section.slice(5) : null;
  return (
    <div className="modal-back" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">Add data — Week {nextWeek}</div>
          {canPrefill && <button className="btn ghost sm prefill-btn" onClick={prefill} title="Copy last week's numbers into the form so you only change what moved">⤺ Prefill from last week</button>}
          <button className="x" onClick={close} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          <label className="nf wide"><span>Week ending (date)</span><input type="date" value={dateInput} onChange={(e) => { const v = e.target.value; setDateInput(v); if (!v) { setWeekDate(""); return; } const parts = v.split("-"); setWeekDate(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][+parts[1] - 1] + " " + parts[2]); }} /></label>
          <div className="msec">Section</div>
          <div className="rep-manage">
            <select className="rep-select" value={section} onChange={(e) => pickSection(e.target.value)}>
              <optgroup label="Team"><option value="tg">Team goals</option><option value="salestot">Sales totals</option></optgroup>
              <optgroup label="Recruiters">{recNames.map((w) => <option key={w} value={"rec::" + w}>{w}</option>)}<option value="rec::__add__">＋ Add recruiter…</option></optgroup>
              <optgroup label="Sales reps">{repNames.map((w) => <option key={w} value={"rep::" + w}>{w}</option>)}<option value="rep::__add__">＋ Add sales rep…</option></optgroup>
            </select>
          </div>
          {section === "tg" && <div className="nf-grid">{TG_FIELDS.map((w) => <NumField key={w} label={TG_ENTRY_LABELS[w]} value={tgForm[w]} onChange={(v) => setTg(w, v)} />)}<NumField label="Open Orders (total)" value={openOrders} onChange={setOpenOrders} /></div>}
          {section === "salestot" && <div className="nf-grid">{SALES_FIELDS.map((w) => <NumField key={w} label={SALES_ENTRY_LABELS[w]} value={salesForm[w]} onChange={(v) => setSales(w, v)} />)}</div>}
          {recSel && <div className="nf-grid rep-fields">{REC_FIELDS.map((w) => <NumField key={w} label={REC_ENTRY_LABELS[w]} value={(recForm[recSel] || {})[w] || ""} onChange={(v) => setRec(recSel, w, v)} />)}</div>}
          {repSel && <div className="nf-grid rep-fields">{REP_ENTRY_FIELDS.map((w) => <NumField key={w} label={REP_FIELD_LABELS[w]} value={(repForm[repSel] || {})[w] || ""} onChange={(v) => setRep(repSel, w, v)} />)}</div>}
          {(section === "rep::__add__" || section === "rec::__add__") && <div className="rep-add"><input placeholder={section === "rep::__add__" ? "New sales rep name" : "New recruiter name"} value={addName} onChange={(e) => setAddName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPerson(section === "rep::__add__" ? "rep" : "rec"); } }} /><button type="button" className="btn primary xs" onClick={() => addPerson(section === "rep::__add__" ? "rep" : "rec")}>Add</button></div>}
          <div className="mnote"><b>To add or remove a person:</b> pick them (or "Add…") from the dropdown — those roster changes save instantly, so you can just close this window. <b>To log a new week:</b> fill in the numbers, then Save. (Saving with everything blank is blocked so you don't create an empty week.)</div>
          {err && <div className="mnote merr">{err}</div>}
          {(() => {
            const num = (x) => +x || 0;
            const warns = [];
            if (num(salesForm.contractsSigned) > num(salesForm.contractsSent)) warns.push("Contracts signed exceeds contracts sent.");
            Object.entries(repForm).forEach(([name, v]) => { if (num(v.signed) > num(v.contracts)) warns.push(name + ": signed exceeds contracts sent."); });
            if (num(tgForm.weeklyFill) > 1) warns.push("Weekly fill rate is over 100% — enter it as a decimal (0.85 = 85%).");
            if ([...Object.values(tgForm), ...Object.values(salesForm)].some((x) => num(x) < 0) || Object.values(repForm).some((v) => Object.values(v).some((x) => num(x) < 0)) || Object.values(recForm).some((v) => Object.values(v).some((x) => num(x) < 0))) warns.push("A negative number was entered.");
            return warns.length ? <div className="entry-warn"><b>Double-check:</b><ul>{warns.map((w, i) => <li key={i}>{w}</li>)}</ul></div> : null;
          })()}
        </div>
        <div className="modal-foot">
          <button className="btn ghost" onClick={close}>Close</button>
          <button className="btn primary" onClick={() => {
            const any = (o) => Object.values(o || {}).some((x) => (+x || 0) !== 0);
            const reps = collectReps(), recs = collectRecs();
            if (!(any(tgForm) || (+openOrders || 0) !== 0 || any(salesForm) || Object.values(reps).some(any) || Object.values(recs).some(any))) { setErr("Nothing to save yet — enter at least one number for Week " + nextWeek + ". (Adding or removing people already saved on its own.)"); return; }
            onSave({ weekDate, tg: tgForm, sales: salesForm, openOrders, recruiters: recs, reps });
          }}>Save Week {nextWeek}</button>
        </div>
      </div>
    </div>
  );
}

/* ================================ APP ================================ */
const blankRecruiter = (name, n = 0) => ({ name, gm: Array(n).fill(0), peoplePaid: Array(n).fill(0), starts: Array(n).fill(0), ends: Array(n).fill(0), interviews: Array(n).fill(0), registered: Array(n).fill(0), submittals: Array(n).fill(0), clientInterviews: Array(n).fill(0) });
const blankRep = () => ({ calls: 0, prospectDMCalls: 0, prospectMeetings: 0, clientMeetings: 0, contracts: 0, signed: 0, firstOrder: 0, newAccounts: 0, gm: 0, meetings: 0, prospectTouches: 0, clientTouches: 0 });

export default function App({ session = null, initialData = undefined, onPersist = null, canEdit = true, agencyName = "", editableTeam = null }) {
  const isLead = !!editableTeam;
  const canEditNormal = canEdit && !isLead;
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(() => { try { const t = localStorage.getItem("wpb_default_tab"); return ALL_TABS.includes(t) ? t : "Overview"; } catch { return "Overview"; } });
  const [wkView, setWkView] = useState(null);
  const [archYear, setArchYear] = useState(null);
  const [teamSel, setTeamSel] = useState(editableTeam || "__all__");
  const yearRef = useRef(null);
  const [addOpen, setAddOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState({ name: "", logo: null, logoColors: null, primary: null, secondary: null });
  const logoRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cfgPreview, setCfgPreview] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [dark, setDark] = useState(() => { try { return localStorage.getItem(THEME_KEY) === "dark"; } catch { return false; } });
  const [err, setErr] = useState("");
  const importRef = useRef(null);
  const teamCreateRef = useRef(null);
  const teamTargetRef = useRef(null);
  const [savedAt, setSavedAt] = useState(0);
  const [savedFlash, setSavedFlash] = useState(false);
  const [teamMgrOpen, setTeamMgrOpen] = useState(false);
  const [pendingTeam, setPendingTeam] = useState("");

  useEffect(() => { if (agencyName) setBrand((b) => (b.name ? b : { ...b, name: agencyName })); }, [agencyName]);
  const brandConfig = () => (brand.name || brand.logo ? { template: "custom", tabs: {}, widgets: {}, theme: { ...(brand.primary ? { primary: brand.primary } : {}), ...(brand.secondary ? { secondary: brand.secondary } : {}) }, brand: { name: (brand.name || "").trim(), ...(brand.logo ? { logo: brand.logo, logoColors: brand.logoColors } : {}) } } : null);

  useEffect(() => { if (!session) try { const s = localStorage.getItem(STORAGE_KEY); if (s) setData(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { if (session && initialData !== undefined) setData(initialData); }, [session, initialData]);
  useEffect(() => { document.documentElement.classList.toggle("wpb-dark", dark); try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch {} }, [dark]);

  const re = cfgPreview || getConfig(data);
  Object.assign(C, chartColors(re));
  useEffect(() => { applyThemeVars(re); }, [JSON.stringify(re.theme), JSON.stringify(re.brand)]);
  useEffect(() => { try { document.title = activeBrandName({ ...data, config: cfgPreview || (data && data.config) }); } catch {} }, [re.brand && re.brand.name]);

  const persist = (nd) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(nd)); } catch {} if (onPersist) onPersist(nd); setSavedAt(Date.now()); };
  useEffect(() => { if (!savedAt) return; setSavedFlash(true); const t = setTimeout(() => setSavedFlash(false), 2500); return () => clearTimeout(t); }, [savedAt]);

  const createFromSetup = ({ recruiters = [], salespeople = [], goals = {} }) => {
    const nd = JSON.parse(JSON.stringify(EMPTY));
    nd.recruitment.recruiters = recruiters.map((name) => blankRecruiter(name, 0));
    nd.sales.repTotals = {};
    salespeople.forEach((name) => { nd.sales.repTotals[name] = blankRep(); });
    nd.teamGoals.goals = { bill: goals.bill != null && goals.bill !== "" ? +goals.bill : null, pay: goals.pay != null && goals.pay !== "" ? +goals.pay : null, margin: goals.margin != null && goals.margin !== "" ? +goals.margin : null, headcount: goals.headcount != null && goals.headcount !== "" ? +goals.headcount : null };
    nd.currentWeek = 0; nd.weekEnding = "";
    const bc = brandConfig(); if (bc) nd.config = bc;
    setData(nd); persist(nd); setWizardOpen(false); setWkView(null);
  };

  const editTarget = pickEditTarget(data, teamSel);
  const commitEdit = (ndTarget) => { const merged = mergeTeamEdit(data, teamSel, ndTarget); setData(merged); persist(merged); };

  const slugify2 = (s) => (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "team-" + Date.now();

  const onImport = async (e) => {
    const file = e.target.files && e.target.files[0], target = teamTargetRef.current;
    teamTargetRef.current = null;
    if (!file) { e.target.value = ""; return; }
    setErr("");
    try {
      const buf = await file.arrayBuffer();
      const parsed = parseWorkbook(buf);
      if (!parsed.currentWeek) throw new Error("No weekly data found — fill in at least one week before importing");
      if (data && hasTeams(data)) {
        const tid = target && data.teams[target] ? target : teamSel !== "__all__" ? teamSel : null;
        if (!tid || !data.teams[tid]) { setErr("Pick a team first (top-left), then Import replaces that team's data. On “All teams” there's no single team to import into."); e.target.value = ""; return; }
        const nd = importIntoTeamData(data, tid, parsed, file.name);
        setData(nd); persist(nd); setTeamSel(tid); setWkView(null); e.target.value = ""; return;
      }
      if (!data) { const bc = brandConfig(); if (bc) parsed.config = bc; }
      if (data) {
        const gNew = parsed.teamGoals.goals || {}, gOld = (data.teamGoals && data.teamGoals.goals) || {};
        if (!Object.values(gNew).some((x) => x)) parsed.teamGoals.goals = gOld;
        if (!parsed.config && data.config) parsed.config = data.config;
        if (!parsed.brand && data.brand) parsed.brand = data.brand;
        if (!parsed.commission && data.commission) parsed.commission = data.commission;
      }
      parsed._importMeta = { file: file.name, at: new Date().toISOString() };
      setData(parsed); persist(parsed); setWkView(null); e.target.value = "";
    } catch (ex) { setErr("Couldn't read that file: " + ex.message); e.target.value = ""; }
  };

  const onAddYear = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setErr("");
    try {
      const buf = await file.arrayBuffer();
      const parsed = parseWorkbook(buf);
      if (!parsed.currentWeek) throw new Error("No weekly data found in that file");
      const yr = String(parsed._year || "");
      if (!yr) throw new Error("Couldn't determine the file's year");
      delete parsed.archive; delete parsed.config;
      if (!data) { const bc = brandConfig(); if (bc) parsed.config = bc; parsed._importMeta = { file: file.name, at: new Date().toISOString() }; setData(parsed); persist(parsed); setArchYear(null); setWkView(null); e.target.value = ""; return; }
      if (yr === String(year)) throw new Error("That year (" + yr + ") is already loaded as the current year. Use Import to replace it.");
      delete parsed.brand;
      if (+yr > +year) {
        const cur = JSON.parse(JSON.stringify(data)); const curYr = String(year); const arc = cur.archive || {}; delete cur.archive;
        const nd = { ...parsed, config: data.config, brand: data.brand, _importMeta: { file: file.name, at: new Date().toISOString() }, archive: { ...arc, [curYr]: cur } };
        setData(nd); persist(nd); setArchYear(null); setWkView(null);
      } else { const nd = { ...data, archive: { ...archive, [yr]: parsed } }; setData(nd); persist(nd); setArchYear(yr); setWkView(null); }
    } catch (ex) { setErr("Couldn't add that year: " + ex.message); }
    e.target.value = "";
  };

  const clearAll = () => { setData(null); setWkView(null); try { localStorage.removeItem(STORAGE_KEY); } catch {} };

  const importIntoTeam = (tid) => { if (data && hasTeams(data) && data.teams[tid]) { teamTargetRef.current = tid; if (importRef.current) importRef.current.click(); } };
  const splitIntoTeams = (name) => {
    if (!data || hasTeams(data)) return;
    const tid = slugify2(name || "Team 1");
    const team = { name: (name || "Team 1").trim(), teamGoals: data.teamGoals, recruitment: data.recruitment, sales: data.sales, currentWeek: data.currentWeek, weekEnding: data.weekEnding, _year: data._year, _importMeta: data._importMeta };
    const nd = { teams: { [tid]: team }, config: data.config, brand: data.brand, archive: data.archive, _year: data._year };
    setData(nd); persist(nd); setTeamSel(tid); setWkView(null);
  };
  const addTeam = (name) => {
    if (!data) return;
    const nm = (name || "").trim(); if (!nm) return;
    const tid = slugify2(nm); const blank = JSON.parse(JSON.stringify(EMPTY));
    const team = { name: nm, teamGoals: blank.teamGoals, recruitment: blank.recruitment, sales: blank.sales, currentWeek: 0, weekEnding: "", _year: data._year || new Date().getFullYear() };
    if (hasTeams(data)) { const nd = { ...data, teams: { ...data.teams, [tid]: team } }; setData(nd); persist(nd); setTeamSel(tid); setWkView(null); }
    else splitIntoTeams("Team 1");
  };
  const renameTeam = (tid, name) => { if (!hasTeams(data) || !data.teams[tid]) return; const nm = (name || "").trim(); if (!nm) return; const nd = { ...data, teams: { ...data.teams, [tid]: { ...data.teams[tid], name: nm } } }; setData(nd); persist(nd); };
  const removeTeam = (tid) => {
    if (!hasTeams(data) || !data.teams[tid]) return;
    const teams = { ...data.teams }; delete teams[tid];
    const ids = Object.keys(teams); let nd;
    if (ids.length === 0) { setTeamMgrOpen(false); return; }
    if (ids.length === 1) { const only = teams[ids[0]]; nd = { ...data, teamGoals: only.teamGoals, recruitment: only.recruitment, sales: only.sales, currentWeek: only.currentWeek, weekEnding: only.weekEnding }; delete nd.teams; setTeamSel("__all__"); }
    else { nd = { ...data, teams }; if (teamSel === tid) setTeamSel("__all__"); }
    setData(nd); persist(nd); setWkView(null);
  };
  const onTeamCreateImport = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !pendingTeam) { e.target.value = ""; return; }
    setErr("");
    try {
      const parsed = parseWorkbook(await file.arrayBuffer());
      if (!parsed.currentWeek) throw new Error("No weekly data found in that file");
      const tid = slugify2(pendingTeam);
      const team = { name: pendingTeam.trim(), teamGoals: parsed.teamGoals, recruitment: parsed.recruitment, sales: parsed.sales, currentWeek: parsed.currentWeek, weekEnding: parsed.weekEnding, _year: parsed._year, _importMeta: { file: file.name, at: new Date().toISOString() } };
      let nd;
      if (hasTeams(data)) nd = { ...data, teams: { ...data.teams, [tid]: team } };
      else if (data) {
        const firstId = slugify2(activeBrandName(data) || "Team 1");
        const first = { name: "Team 1", teamGoals: data.teamGoals, recruitment: data.recruitment, sales: data.sales, currentWeek: data.currentWeek, weekEnding: data.weekEnding, _year: data._year };
        nd = { teams: { [firstId === tid ? firstId + "-1" : firstId]: first, [tid]: team }, config: data.config, brand: data.brand, archive: data.archive, _year: data._year };
      } else nd = { teams: { [tid]: team }, _year: parsed._year, config: { template: "custom", tabs: {}, widgets: {}, theme: {}, brand: {} } };
      setData(nd); persist(nd); setTeamSel(tid); setWkView(null); setPendingTeam("");
    } catch (ex) { setErr("Couldn't import that team: " + ex.message); }
    e.target.value = "";
  };

  const teams = teamList(data);
  const multi = hasTeams(data);
  const viewBase = data ? (multi ? resolveTeamData(data, teamSel) : data) : null;
  const year = (viewBase && viewBase._year) || new Date().getFullYear();
  const archive = (viewBase && viewBase.archive) || {};
  const years = Object.keys(archive).sort((a, b) => b.localeCompare(a));
  const viewingArchive = !!(archYear && archYear !== String(year) && archive[archYear]);
  const view = data
    ? viewingArchive
      ? { ...archive[archYear], config: data.config, brand: data.brand }
      : (() => {
          const prev = archive[String(year - 1)];
          if (!prev || !prev.teamGoals) return viewBase;
          let acc = 0; const cum = (prev.teamGoals.totalGM || []).map((v) => (acc += +v || 0));
          return { ...viewBase, teamGoals: { ...viewBase.teamGoals, cum2025: (viewBase.teamGoals.totalGM || []).map((v, i) => +(cum[i] != null ? cum[i] : cum[cum.length - 1] || 0).toFixed(2)) } };
        })()
    : null;
  const series = useSeries(view || EMPTY);
  const standings = multi ? teamStandings(data) : [];

  useEffect(() => {
    const h = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.metaKey || e.ctrlKey || e.altKey || addOpen || settingsOpen) return;
      const shown = ALL_TABS.filter((t) => tabOn(re, t));
      if (/^[1-4]$/.test(e.key) && shown[+e.key - 1]) setTab(shown[+e.key - 1]);
      else if (e.key === "a" && data && !viewingArchive && !(multi && teamSel === "__all__") && (canEditNormal || (isLead && teamSel === editableTeam))) setAddOpen(true);
      else if (e.key === "e" && data) exportToExcel(data);
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  });

  const addWeekEl = () => addOpen && (
    <AddWeekModal
      d={editTarget}
      onClose={() => setAddOpen(false)}
      onSave={(form) => { commitEdit(addWeek(editTarget, form)); setWkView(null); setAddOpen(false); }}
      onAddRep={(name) => { const nd = JSON.parse(JSON.stringify(editTarget)); nd.sales.repTotals = nd.sales.repTotals || {}; if (!nd.sales.repTotals[name]) nd.sales.repTotals[name] = blankRep(); commitEdit(nd); }}
      onRemoveRep={(name) => { const nd = JSON.parse(JSON.stringify(editTarget)); if (nd.sales.repTotals) delete nd.sales.repTotals[name]; commitEdit(nd); }}
      onAddRecruiter={(name) => { const nd = JSON.parse(JSON.stringify(editTarget)); const n = nd.currentWeek || nd.teamGoals.totalGM.length; nd.recruitment.recruiters = nd.recruitment.recruiters || []; if (!nd.recruitment.recruiters.some((r) => r.name === name)) nd.recruitment.recruiters.push(blankRecruiter(name, n)); commitEdit(nd); }}
      onRemoveRecruiter={(name) => { const nd = JSON.parse(JSON.stringify(editTarget)); nd.recruitment.recruiters = (nd.recruitment.recruiters || []).filter((r) => r.name !== name); commitEdit(nd); }}
    />
  );

  // ---- no data yet ----
  if (!data) return canEdit ? (
    <div className="welcome onboard">
      <div className="w-eyebrow">WELCOME{brand.name ? " · " + brand.name.toUpperCase() : ""}</div>
      <div className="ob-steps"><span className={"ob-dot" + (step === 1 ? " on" : " done")}>1</span><span className="ob-line" /><span className={"ob-dot" + (step === 2 ? " on" : "")}>2</span></div>
      {step === 1 && (
        <>
          <h1>Make it yours.</h1>
          <p>Confirm your company name and add your logo — we'll build your color theme from it automatically. You can change all of this later in Settings.</p>
          <div className="ob-card">
            <div className="cm-field"><label>Company name</label><input className="inp" placeholder="Acme Staffing" value={brand.name} onChange={(e) => setBrand((b) => ({ ...b, name: e.target.value }))} /></div>
            <div className="cm-field">
              <label>Logo <span className="cm-hint">(optional — generates your theme colors)</span></label>
              <div className="ob-logo-row">
                {brand.logo ? <img className="ob-logo-preview" src={brand.logo} alt="logo" /> : <span className="brand-mark ob-mark">{(brand.name || "?").replace(/^The /i, "").split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?"}</span>}
                <button className="btn ghost sm" onClick={() => logoRef.current.click()}>{brand.logo ? "Replace logo" : "Upload logo"}</button>
                <input ref={logoRef} type="file" accept="image/*" hidden onChange={(e) => { const file = e.target.files && e.target.files[0]; if (file) { extractBrandFromLogo(file, (c) => setBrand((b) => ({ ...b, ...c }))); e.target.value = ""; } }} />
              </div>
              {brand.logoColors && brand.logoColors.length > 0 && <div className="ob-palette"><span className="cm-hint">Your theme:</span>{brand.logoColors.map((c) => <span key={c} className="swatch" style={{ background: c, cursor: "default" }} />)}</div>}
            </div>
          </div>
          <div className="w-actions"><button className="btn primary" onClick={() => setStep(2)}>Continue</button><button className="btn ghost" onClick={() => { setBrand({ name: "", logo: null, logoColors: null, primary: null, secondary: null }); setStep(2); }}>Skip for now</button></div>
        </>
      )}
      {step === 2 && (
        <>
          <h1>Bring in your numbers.</h1>
          <p>Import your existing Weekly Stats workbook — we read it as-is — or set up your team from scratch and enter weeks manually.</p>
          <div className="ob-choices">
            <button className="ob-choice" onClick={() => importRef.current.click()}><div className="ob-choice-icon">⬆</div><div className="ob-choice-t">Import spreadsheet</div><div className="ob-choice-d">Your raw Weekly Stats workbook or a Performance Book export. Recruiters, reps, goals, and every week come in automatically.</div></button>
            <button className="ob-choice" onClick={() => setWizardOpen(true)}><div className="ob-choice-icon">✎</div><div className="ob-choice-t">Set up manually</div><div className="ob-choice-d">Enter your recruiters, salespeople, and goals, then add numbers week by week.</div></button>
          </div>
          <div className="w-actions"><button className="btn ghost sm" onClick={() => setStep(1)}>← Back to branding</button></div>
        </>
      )}
      {canEdit && <input ref={importRef} type="file" accept=".xlsx,.xlsm,.csv" hidden onChange={onImport} />}
      {err && <div className="err">{err}</div>}
      {wizardOpen && <SetupWizard onCancel={() => setWizardOpen(false)} onCreate={createFromSetup} />}
    </div>
  ) : (
    <div className="welcome"><div className="w-eyebrow">WEEKLY PERFORMANCE BOOK</div><h1>Nothing here yet.</h1><p>Ask your company admin to set up the dashboard.</p></div>
  );

  // ---- team set up, but no weeks yet ----
  if (!multi && !data.currentWeek) {
    const recs = (data.recruitment && data.recruitment.recruiters || []).map((r) => r.name);
    const reps = Object.keys(data.sales && data.sales.repTotals || {});
    return (
      <div className="welcome">
        <div className="w-eyebrow">WEEKLY PERFORMANCE BOOK</div>
        <h1>Your team is set up.</h1>
        <p>Download the Excel template — it's pre-built with your team. Fill in your weekly numbers, import it back, and your dashboard comes to life. Prefer typing? You can also add weeks manually.</p>
        <div className="setup-roster">
          <div><b>Recruiters:</b> {recs.length ? recs.join(", ") : "none yet"}</div>
          <div><b>Salespeople:</b> {reps.length ? reps.join(", ") : "none yet"}</div>
        </div>
        <div className="w-actions">
          {canEdit ? (
            <>
              <button className="btn primary" onClick={() => downloadTemplate(data)} title="Excel template pre-built with your team — fill weeks in, then import it back">⬇ Download data template</button>
              <button className="btn primary" onClick={() => importRef.current.click()}>⬆ Import spreadsheet</button>
              <button className="btn ghost" onClick={() => setAddOpen(true)}>+ Add a week manually</button>
            </>
          ) : <div className="empty-note">No data yet. Ask your company admin to add this week's numbers.</div>}
        </div>
        {canEdit && <input ref={importRef} type="file" accept=".xlsx,.xlsm,.csv" hidden onChange={onImport} />}
        {err && <div className="err">{err}</div>}
        {addWeekEl()}
      </div>
    );
  }

  // ---- main dashboard ----
  const totalWk = view.currentWeek;
  const ytd = wkView === "ytd";
  const curWk = ytd ? totalWk : Math.min(wkView || totalWk, totalWk);
  const wkEnding = (view.teamGoals.weekDates || [])[curWk - 1] || view.weekEnding || "";
  const rollup = multi && teamSel === "__all__";
  const canAdd = canEdit && !viewingArchive && !rollup && (!isLead || teamSel === editableTeam);
  const pickTeam = (id) => { setTeamSel(id); setWkView(null); };
  const setWeek = (n) => setWkView(Math.max(1, Math.min(totalWk, n)));
  const brandName = activeBrandName({ ...data, config: cfgPreview || data.config });
  const logo = (re.brand && re.brand.logo) || LOGO;
  const initials = brandName.replace(/^The /i, "").split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          {logo ? <img className="brand-logo" src={logo} alt={brandName} /> : <span className="brand-mark">{initials || "W"}</span>}
          <div>
            <div className="brand-title">{brandName}</div>
            <div className="brand-sub">
              Viewing {ytd ? "YTD · Weeks 1–" + totalWk : "Week " + curWk + " of " + totalWk + (wkEnding ? " · ending " + wkEnding : "")}
              {data._importMeta ? <span className="fresh-badge" title={"Imported " + data._importMeta.file}>{"⇩ " + (data._importMeta.file.length > 28 ? data._importMeta.file.slice(0, 26) + "…" : data._importMeta.file) + " · " + new Date(data._importMeta.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span> : null}
              {viewingArchive ? " · " + archYear + " archive (read-only)" : ""}
              {rollup ? <span className="rollup-banner">◉ All teams · company roll-up (read-only)</span> : null}
              {multi && teamSel !== "__all__" ? <span className="rollup-banner">{"◉ " + ((data.teams[teamSel] && data.teams[teamSel].name) || teamSel)}</span> : null}
              {savedFlash && <span className="saved-flash">✓ Saved</span>}
            </div>
          </div>
        </div>
        <div className="top-actions">
          {multi && (
            <div className="seg teamseg" title="Choose team">
              <button className={"seg-btn" + (teamSel === "__all__" ? " on" : "")} onClick={() => { setTeamSel("__all__"); setWkView(null); }}>All teams</button>
              {teams.map((t) => <button key={t.id} className={"seg-btn" + (teamSel === t.id ? " on" : "") + (isLead && t.id === editableTeam ? " yours" : "")} onClick={() => { setTeamSel(t.id); setWkView(null); }}>{t.name}</button>)}
              {canEditNormal && <button className="seg-btn teamadd" title="Manage teams" onClick={() => setTeamMgrOpen(true)}>⚙</button>}
            </div>
          )}
          {!multi && canEditNormal && data && data.currentWeek > 0 && <button className="btn ghost sm" title="Split this company into multiple teams / locations" onClick={() => setTeamMgrOpen(true)}>+ Teams</button>}
          {(years.length > 0 || canEditNormal) && (
            <div className="seg yearseg" title="Choose year">
              <button className={"seg-btn" + (viewingArchive ? "" : " on")} onClick={() => { setArchYear(null); setWkView(null); }}>{String(year)}</button>
              {years.map((y) => <button key={y} className={"seg-btn" + (viewingArchive && archYear === y ? " on" : "")} onClick={() => { setArchYear(y); setWkView(null); }}>{y}</button>)}
              {canEditNormal && <button className="seg-btn yearadd" title="Import a previous year's workbook" onClick={() => yearRef.current.click()}>+</button>}
            </div>
          )}
          <div className="weeksel" title="Choose which week to view">
            <button className="wk-btn" onClick={() => setWeek(curWk - 1)} disabled={ytd || curWk <= 1} aria-label="Previous week">‹</button>
            <select className="wk-select" value={ytd ? "ytd" : String(curWk)} onChange={(e) => (e.target.value === "ytd" ? setWkView("ytd") : setWeek(+e.target.value))}>
              <option value="ytd">YTD · full year</option>
              {Array.from({ length: totalWk }, (_, i) => i + 1).map((w) => { const wd = (view.teamGoals.weekDates || [])[w - 1]; return <option key={w} value={w}>Week {w}{wd ? " · " + wd : ""}</option>; })}
            </select>
            <button className="wk-btn" onClick={() => setWeek(curWk + 1)} disabled={ytd || curWk >= totalWk} aria-label="Next week">›</button>
          </div>
          <button className="btn primary sm" onClick={() => setAddOpen(true)} style={canAdd ? undefined : { display: "none" }}>+ Add Data</button>
          <button className="btn ghost sm" onClick={() => exportToExcel(view)}>Export</button>
          <button className="btn ghost sm no-print" onClick={() => downloadPDF(view, curWk, ytd)} title="Download a formatted PDF of this view">⬇ PDF</button>
          {canEditNormal && <button className="btn ghost sm" onClick={() => importRef.current.click()} disabled={viewingArchive} title={viewingArchive ? "Switch back to the current year to import" : multi ? (teamSel === "__all__" ? "Pick a team first — Import replaces that team's data" : "Replaces " + ((data.teams[teamSel] && data.teams[teamSel].name) || "this team") + "'s data") : "Import a workbook (replaces the current data)"}>Import</button>}
          {canEditNormal && <button className="btn ghost sm no-print" onClick={() => setSettingsOpen(true)}>⚙ Settings</button>}
          {canEditNormal && <input ref={importRef} type="file" accept=".xlsx,.xlsm,.csv" hidden onChange={onImport} />}
          {canEditNormal && <input ref={yearRef} type="file" accept=".xlsx,.xlsm,.csv" hidden onChange={onAddYear} />}
          {canEditNormal && <input ref={teamCreateRef} type="file" accept=".xlsx,.xlsm,.csv" hidden onChange={onTeamCreateImport} />}
        </div>
      </header>
      <nav className="tabs">
        {ALL_TABS.filter((t) => tabOn(re, t)).map((t) => <button key={t} className={"tab" + (t === tab ? " active" : "")} onClick={() => setTab(t)}>{t}</button>)}
        {multi && <button className={"tab" + (tab === "Teams" ? " active" : "")} onClick={() => setTab("Teams")}>Teams</button>}
        <button className="tab-pin" title={"Make “" + tab + "” your default landing tab"} onClick={() => { try { localStorage.setItem("wpb_default_tab", tab); setErr(""); } catch {} }}>★ Set default</button>
      </nav>
      {err && <div className="err">{err}</div>}
      <main>
        {tab === "Overview" && tabOn(re, "Overview") && <Overview d={view} s={series} wk={curWk} ytd={ytd} onNav={setTab} cfg={re} teamBoard={rollup ? standings : null} onPickTeam={pickTeam} youTeam={editableTeam || null} />}
        {tab === "Teams" && multi && (
          <div className="teams-view">
            <div className="card tlb-card">
              <div className="card-title">Team leaderboard <span className="card-hint">ranked by GM$ · pace = actual vs goal-to-date · projection at current run-rate</span></div>
              <TeamLeaderboard rows={standings} currentTeam={teamSel === "__all__" ? null : teamSel} youTeam={editableTeam || null} onPick={pickTeam} />
              <div className="tlb-legend">
                <span><span className="tlb-pill ahead">Ahead</span> at or above goal pace</span>
                <span><span className="tlb-pill ontrack">On track</span> within 10% of pace</span>
                <span><span className="tlb-pill behind">Behind</span> more than 10% behind</span>
              </div>
            </div>
          </div>
        )}
        {tab === "Team Goals" && tabOn(re, "Team Goals") && <TeamGoals d={view} s={series} wk={curWk} ytd={ytd} cfg={re} />}
        {tab === "Recruitment (Current Team)" && tabOn(re, "Recruitment (Current Team)") && <Recruitment d={view} s={series} wk={curWk} ytd={ytd} cfg={re} />}
        {tab === "Sales" && tabOn(re, "Sales") && <Sales d={view} s={series} wk={curWk} ytd={ytd} cfg={re} onUpdateGM={canAdd ? (map) => { const nd = JSON.parse(JSON.stringify(editTarget)); for (const [name, v] of Object.entries(map)) if (nd.sales.repTotals[name]) nd.sales.repTotals[name].gm = +v || 0; commitEdit(nd); } : null} />}
      </main>
      {addWeekEl()}
      {teamMgrOpen && canEditNormal && (
        <TeamManager data={data} teams={teams} multiTeam={multi} onClose={() => { setTeamMgrOpen(false); setPendingTeam(""); }} onSplit={splitIntoTeams} onAdd={addTeam} onRename={renameTeam} onRemove={removeTeam} onImport={(name) => { setPendingTeam(name); teamCreateRef.current.click(); }} onImportInto={(tid) => { setTeamMgrOpen(false); importIntoTeam(tid); }} />
      )}
      {settingsOpen && (
        <SettingsPanel data={data} cfg={getConfig(data)} dark={dark} setDark={setDark} onPreview={(c) => setCfgPreview(c)} onSave={(c) => { const nd = { ...data, config: c, brand: c.brand || data.brand }; setData(nd); persist(nd); setCfgPreview(null); setSettingsOpen(false); }} onClose={() => { setCfgPreview(null); setSettingsOpen(false); }} onDeleteWeek={() => { commitEdit(deleteLastWeek(editTarget)); setWkView(null); }} onReset={() => { clearAll(); setSettingsOpen(false); }} weekCount={totalWk} />
      )}
    </div>
  );
}
