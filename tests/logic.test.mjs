// Logic-layer tests: buildWorkbook -> parseWorkbook round-trips, and teamStandings
// ranks/paces correctly. Run: node tests/logic.test.mjs
import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import fs from "fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const require = createRequire(import.meta.url);
const outDir = path.join(root, "build-check");
fs.mkdirSync(outDir, { recursive: true });
const stub = path.join(outDir, "stub.cjs");
const out = path.join(outDir, "app_node.cjs");
fs.writeFileSync(stub, "const D=()=>null;module.exports=new Proxy({__esModule:true,default:D,jsx:D,jsxs:D},{get:(t,p)=>p in t?t[p]:D});\n");

await esbuild.build({
  entryPoints: [path.join(root, "src", "app.jsx")],
  bundle: true, format: "cjs", platform: "node", target: "node18",
  loader: { ".jsx": "jsx", ".js": "jsx" }, jsx: "automatic",
  external: ["react", "react/jsx-runtime"],
  alias: { recharts: stub, jspdf: stub, "jspdf-autotable": stub },
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: out, logLevel: "error",
});

const { buildWorkbook, parseWorkbook, teamStandings } = require(out);
const XLSX = require(path.join(root, "node_modules", "xlsx"));

let pass = 0, fail = 0;
const eq = (name, a, b) => { const ok = JSON.stringify(a) === JSON.stringify(b); console.log(ok ? "✓" : "✗", name); ok ? pass++ : fail++; };
const ok = (name, c) => { console.log(c ? "✓" : "✗", name); c ? pass++ : fail++; };

const N = 6, W = (base, jit) => Array.from({ length: N }, (_, i) => Math.max(0, Math.round(base + (i % 3) * jit)));
const rec = (name) => ({ name, gm: W(5000, 300), peoplePaid: W(20, 2), starts: W(4, 1), ends: W(2, 1), interviews: W(10, 2), registered: W(6, 1), submittals: W(8, 2), clientInterviews: W(3, 1) });
const rep = () => ({ calls: 300, prospectDMCalls: 40, prospectMeetings: 12, clientMeetings: 8, contracts: 5, signed: 3, firstOrder: 2, newAccounts: 4, gm: 15000.5, meetings: 20, prospectTouches: 500, clientTouches: 90 });
const D = {
  teamGoals: { weeks: Array.from({ length: N }, (_, i) => "W" + (i + 1)), weekDates: Array.from({ length: N }, (_, i) => "Jun " + (i + 1)), tempGM: W(9000, 400), totalGM: W(12000, 500), budget: W(11000, 0), revenue: W(36000, 800), hours: W(2500, 50), peoplePaid: W(40, 3), clientsBilled: W(22, 2), newClients: W(2, 1), cum2025: W(0, 0), newTempOrders: W(5, 1), openTempOrders: W(9, 2), openPerm: W(3, 1), weeklyFill: Array.from({ length: N }, () => 0.78), goals: { bill: 4940000, pay: 3940000, margin: 1045000, headcount: 95 } },
  recruitment: { recruiters: [rec("Hannah"), rec("Wei")], total: {} },
  sales: { totalCalls: W(120, 10), prospectDMCalls: W(40, 3), prospectTouches: W(300, 20), clientTouches: W(60, 5), prospectEmails: W(200, 10), clientEmails: W(50, 5), prospectMeetings: W(6, 1), clientMeetings: W(4, 1), contractsSent: W(5, 1), contractsSigned: W(3, 1), newClients: W(2, 1), repTotals: { Marcus: rep(), Priya: rep() } },
  currentWeek: N, weekEnding: "Jun 6", _year: 2026,
};

const bytes = XLSX.write(buildWorkbook(D), { type: "array", bookType: "xlsx" });
const R = parseWorkbook(bytes);
eq("round-trip currentWeek", R.currentWeek, N);
eq("round-trip totalGM series", R.teamGoals.totalGM, D.teamGoals.totalGM);
eq("round-trip revenue series", R.teamGoals.revenue, D.teamGoals.revenue);
eq("round-trip goals", R.teamGoals.goals, D.teamGoals.goals);
eq("round-trip recruiter names", R.recruitment.recruiters.map((r) => r.name), ["Hannah", "Wei"]);
eq("round-trip Hannah.registered", R.recruitment.recruiters[0].registered, D.recruitment.recruiters[0].registered);
eq("round-trip sales.totalCalls", R.sales.totalCalls, D.sales.totalCalls);
eq("round-trip rep names", Object.keys(R.sales.repTotals), ["Marcus", "Priya"]);
eq("round-trip Marcus.calls", R.sales.repTotals.Marcus.calls, D.sales.repTotals.Marcus.calls);
eq("round-trip Marcus.newAccounts", R.sales.repTotals.Marcus.newAccounts, D.sales.repTotals.Marcus.newAccounts);
eq("round-trip Marcus.gm", R.sales.repTotals.Marcus.gm, D.sales.repTotals.Marcus.gm);

const team = (name, gm, wk, margin) => ({ name, currentWeek: wk, teamGoals: { totalGM: gm, revenue: gm.map(() => 0), goals: { margin } } });
const st = teamStandings({ teams: { alpha: team("Alpha", [100, 100, 100], 3, 5200), bravo: team("Bravo", [50, 50, 50, 50], 4, 2737), charlie: team("Charlie", [25, 25], 2, 5200) } });
ok("standings rank #1 Alpha", st[0].id === "alpha" && st[0].rank === 1);
ok("standings Alpha ahead", st[0].status === "ahead");
ok("standings Bravo ontrack", st[1].status === "ontrack");
ok("standings Charlie behind", st[2].status === "behind");

console.log(`\n${pass}/${pass + fail} logic checks passed`);
process.exit(fail ? 1 : 0);
