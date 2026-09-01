// Render test: mount the App in jsdom with real data and assert the dashboard renders
// with no React errors, then switch to the Sales tab. Run: node tests/render.test.mjs
import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import fs from "fs";
import { JSDOM } from "jsdom";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const require = createRequire(import.meta.url);
const outDir = path.join(root, "build-check");
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, "app_dom.cjs");

await esbuild.build({
  entryPoints: [path.join(root, "src", "app.jsx")],
  bundle: true, format: "cjs", platform: "browser", target: "es2020",
  loader: { ".jsx": "jsx", ".js": "jsx" }, jsx: "automatic",
  external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
  define: { "process.env.NODE_ENV": '"development"' },
  outfile: out, logLevel: "error",
});

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: "http://localhost/", pretendToBeVisual: true });
const w = dom.window;
global.window = w; global.document = w.document;
try { Object.defineProperty(global, "navigator", { value: w.navigator, configurable: true }); } catch {}
global.HTMLElement = w.HTMLElement; global.SVGElement = w.SVGElement; global.Node = w.Node; global.Event = w.Event;
global.getComputedStyle = w.getComputedStyle.bind(w);
global.localStorage = w.localStorage;
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
w.ResizeObserver = global.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
w.matchMedia = global.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
w.HTMLCanvasElement.prototype.getContext = function () { return new Proxy({}, { get: (t, p) => (p === "getImageData" ? () => ({ data: [] }) : p === "measureText" ? () => ({ width: 0 }) : () => {}) }); };
w.HTMLCanvasElement.prototype.toDataURL = () => "data:image/png;base64,";
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const N = 8, W = (b, j) => Array.from({ length: N }, (_, i) => Math.max(0, Math.round(b + (i % 3) * j)));
const rec = (name) => ({ name, gm: W(5000, 300), peoplePaid: W(20, 2), starts: W(4, 1), ends: W(2, 1), interviews: W(10, 2), registered: W(6, 1), submittals: W(8, 2), clientInterviews: W(3, 1) });
const rep = () => ({ calls: 300, prospectDMCalls: 40, prospectMeetings: 12, clientMeetings: 8, contracts: 5, signed: 3, firstOrder: 2, newAccounts: 4, gm: 15000.5, meetings: 20, prospectTouches: 500, clientTouches: 90 });
const D = {
  teamGoals: { weeks: Array.from({ length: N }, (_, i) => "W" + (i + 1)), weekDates: Array.from({ length: N }, (_, i) => "Jun " + (i + 1)), tempGM: W(9000, 400), totalGM: W(12000, 500), budget: W(11000, 0), revenue: W(36000, 800), hours: W(2500, 50), peoplePaid: W(40, 3), clientsBilled: W(22, 2), newClients: W(2, 1), cum2025: W(0, 0), newTempOrders: W(5, 1), openTempOrders: W(9, 2), openPerm: W(3, 1), weeklyFill: Array.from({ length: N }, () => 0.78), goals: { bill: 4940000, pay: 3940000, margin: 1045000, headcount: 95 } },
  recruitment: { recruiters: [rec("Hannah"), rec("Wei")], total: { starts: W(8, 2), ends: W(4, 1), interviews: W(20, 3), registered: W(12, 2), submittals: W(16, 3), clientInterviews: W(6, 1), paidByRecruiter: W(40, 4), paidHouse: W(0, 0), openOrders: W(9, 2) } },
  sales: { totalCalls: W(120, 10), prospectDMCalls: W(40, 3), prospectTouches: W(300, 20), clientTouches: W(60, 5), prospectEmails: W(200, 10), clientEmails: W(50, 5), prospectMeetings: W(6, 1), clientMeetings: W(4, 1), contractsSent: W(5, 1), contractsSigned: W(3, 1), newClients: W(2, 1), repTotals: { Marcus: rep(), Priya: rep() } },
  currentWeek: N, weekEnding: "Jun 8", _year: 2026,
};
w.localStorage.setItem("wpb_data_v2", JSON.stringify(D));

const React = require(path.join(root, "node_modules", "react"));
const { createRoot } = require(path.join(root, "node_modules", "react-dom", "client"));
const { act } = React;
const App = require(out).default;

const errors = [];
const origErr = console.error; console.error = (...a) => { errors.push(a.join(" ")); };
let r;
await act(async () => { r = createRoot(document.getElementById("root")); r.render(React.createElement(App)); });
await act(async () => { await new Promise((res) => setTimeout(res, 300)); });
console.error = origErr;

const html = document.getElementById("root").innerHTML;
let pass = 0, fail = 0;
const has = (name, s) => { const ok = html.includes(s); console.log(ok ? "✓" : "✗", name); ok ? pass++ : fail++; };
has("renders topbar", "topbar");
has("renders tabs nav", 'class="tabs"');
has("shows Overview tab", ">Overview<");
has("shows Sales tab", ">Sales<");
has("renders a KPI (Total GM$)", "Total GM$");
has("renders week selector", "wk-select");
has("renders brand title", "brand-title");
has("renders a chart container", "recharts-responsive-container");

await act(async () => {
  const sales = [...document.querySelectorAll(".tab")].find((b) => b.textContent === "Sales");
  if (sales) sales.dispatchEvent(new w.Event("click", { bubbles: true }));
  await new Promise((res) => setTimeout(res, 100));
});
const html2 = document.getElementById("root").innerHTML;
const okSales = html2.includes("Rep leaderboard") || html2.includes("Sales funnel");
console.log(okSales ? "✓" : "✗", "Sales tab renders leaderboard/funnel"); okSales ? pass++ : fail++;

const reactErrs = errors.filter((e) => !/act\(|not wrapped in act|ReactDOM.render is no longer/.test(e));
if (reactErrs.length) { console.log("\nReact errors:"); reactErrs.slice(0, 5).forEach((e) => console.log("  !", e.slice(0, 200))); }
console.log(`\n${pass}/${pass + fail} render checks passed; ${reactErrs.length} React errors`);
process.exit(fail || reactErrs.length ? 1 : 0);
