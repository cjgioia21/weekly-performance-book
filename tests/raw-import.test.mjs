// Raw-workbook import test. Builds a workbook in the ORIGINAL agency format (no
// "Week label" row -> triggers parseRawWorkbook), runs parseWorkbook, and checks the
// parsed data. NOTE: synthetic — built to the format the parser expects; not a real
// customer file (none survived). Exercises the raw path end-to-end.
import * as esbuild from "esbuild";
import path from "path"; import { fileURLToPath } from "url"; import { createRequire } from "module"; import fs from "fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const require = createRequire(import.meta.url);
const outDir = path.join(root, "build-check"); fs.mkdirSync(outDir, { recursive: true });
const stub = path.join(outDir, "stub.cjs"); const out = path.join(outDir, "app_node.cjs");
fs.writeFileSync(stub, "const D=()=>null;module.exports=new Proxy({__esModule:true,default:D,jsx:D,jsxs:D},{get:(t,p)=>p in t?t[p]:D});\n");
await esbuild.build({ entryPoints: [path.join(root, "src", "app.jsx")], bundle: true, format: "cjs", platform: "node", target: "node18", loader: { ".jsx": "jsx", ".js": "jsx" }, jsx: "automatic", external: ["react", "react/jsx-runtime"], alias: { recharts: stub, jspdf: stub, "jspdf-autotable": stub }, define: { "process.env.NODE_ENV": '"production"' }, outfile: out, logLevel: "error" });

const { parseWorkbook } = require(out);
const XLSX = require(path.join(root, "node_modules", "xlsx"));

// --- build a raw-format workbook ---
const teamGoals = [
  ["", "Week 1", "Week 2", "Week 3"],
  ["", "Jun 1", "Jun 8", "Jun 15", "Yearly Goal"],
  ["Weekly Temp GM$ (Margin)", 9000, 9500, 9200, 1045000],
  ["Total GM$", 12000, 12500, 12200, 1045000],
  ["Perm/ Other", 3000, 3000, 3000, 0],
  ["Weekly Budget", 11000, 11000, 11000, 0],
  ["Temp Revenue (Bill)", 36000, 37000, 36500, 4940000],
  ["Pay-Burden", 30000, 31000, 30500, 3940000],
  ["Weekly Hours", 2500, 2550, 2520, 0],
  ["People Paid (Headcount)", 40, 42, 41, 95],
  ["Clients Billed", 22, 23, 22, 0],
  ["New Clients", 2, 3, 2, 0],
  ["New Temp Orders", 5, 6, 5, 0],
  ["Open Temp Orders", 9, 10, 9, 0],
  ["Open DH Orders", 3, 3, 4, 0],
  ["Weekly Fill Rate", 0.78, 0.80, 0.79, 0],
];
const recBlock = (name, gm, pp, st, en, iv, rg, sb, ci) => [
  [name, "Week 1", "Week 2", "Week 3"],
  ["GM$ Contribution", ...gm], ["People Paid", ...pp], ["Starts", ...st], ["Ends", ...en],
  ["Temp Interviews", ...iv], ["Registered", ...rg], ["Submittals", ...sb], ["Client Interviews", ...ci],
];
const recruitment = [
  ...recBlock("Hannah", [5000, 5300, 5100], [20, 21, 20], [4, 5, 4], [2, 2, 3], [10, 11, 10], [6, 7, 6], [8, 9, 8], [3, 3, 4]),
  ...recBlock("Wei", [4000, 4200, 4100], [18, 19, 18], [3, 4, 3], [1, 2, 1], [8, 9, 8], [5, 6, 5], [7, 8, 7], [2, 3, 2]),
];
const repBlock = (name, att, dm, pm, cm, ce, pt, cs, sg, fo, nc) => [
  [name, "", "Week 1", "Week 2", "Week 3"],
  ["Total Prospect Attempts", "", ...att], ["Prospect DM Calls", "", ...dm], ["Prospect Meetings", "", ...pm],
  ["Client Meetings", "", ...cm], ["Client Emails", "", ...ce], ["Prospect Total Touches", "", ...pt],
  ["Contracts Sent", "", ...cs], ["Contracts Signed", "", ...sg], ["First Order", "", ...fo], ["New Clients", "", ...nc],
];
const sales = [
  ...repBlock("Marcus", [100, 110, 120], [30, 32, 34], [5, 6, 7], [3, 4, 5], [20, 22, 24], [200, 210, 220], [4, 5, 6], [2, 3, 4], [1, 1, 2], [1, 2, 1]),
  ...repBlock("Priya", [90, 95, 100], [25, 26, 27], [4, 5, 6], [2, 3, 4], [18, 19, 20], [180, 190, 200], [3, 4, 5], [1, 2, 3], [0, 1, 1], [1, 1, 2]),
];
const weeklyGM = [
  ["Total New GM$", "", "", "Marcus", 5000, 5500, 6000],
  ["Total New GM$", "", "", "Priya", 4000, 4500, 5000],
];
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(teamGoals), "Team Goals");
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(recruitment), "Recruitment");
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sales), "Sales");
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(weeklyGM), "Weekly GM$");
const bytes = XLSX.write(wb, { type: "array", bookType: "xlsx" });

const R = parseWorkbook(bytes);
let pass = 0, fail = 0;
const eq = (name, a, b) => { const ok = JSON.stringify(a) === JSON.stringify(b); console.log(ok ? "✓" : "✗", name, ok ? "" : "→ got " + JSON.stringify(a)); ok ? pass++ : fail++; };

eq("raw path took (currentWeek=3)", R.currentWeek, 3);
eq("week dates parsed", R.teamGoals.weekDates, ["Jun 1", "Jun 8", "Jun 15"]);
eq("tempGM series", R.teamGoals.tempGM, [9000, 9500, 9200]);
eq("totalGM series", R.teamGoals.totalGM, [12000, 12500, 12200]);
eq("revenue series", R.teamGoals.revenue, [36000, 37000, 36500]);
eq("openPerm (Open DH Orders)", R.teamGoals.openPerm, [3, 3, 4]);
eq("weeklyFill series", R.teamGoals.weeklyFill, [0.78, 0.8, 0.79]);
eq("goals (bill/pay/margin/headcount)", R.teamGoals.goals, { bill: 4940000, pay: 3940000, margin: 1045000, headcount: 95 });
eq("recruiter names", R.recruitment.recruiters.map((r) => r.name), ["Hannah", "Wei"]);
eq("Hannah starts", R.recruitment.recruiters[0].starts, [4, 5, 4]);
eq("Hannah GM$ contribution", R.recruitment.recruiters[0].gm, [5000, 5300, 5100]);
eq("recruitment total starts (Hannah+Wei)", R.recruitment.total.starts, [7, 9, 7]);
eq("rep names", Object.keys(R.sales.repTotals), ["Marcus", "Priya"]);
const M = R.sales.repTotals.Marcus;
eq("Marcus calls (100+110+120)", M.calls, 330);
eq("Marcus prospectDMCalls", M.prospectDMCalls, 96);
eq("Marcus signed", M.signed, 9);
eq("Marcus newAccounts", M.newAccounts, 4);
eq("Marcus prospectTouches", M.prospectTouches, 630);
eq("Marcus clientTouches (emails+clientMtgs)", M.clientTouches, 78);
eq("Marcus GM from Weekly GM$ sheet", M.gm, 16500);
eq("sales.totalCalls aggregate", R.sales.totalCalls, [190, 205, 220]);

console.log(`\n${pass}/${pass + fail} raw-import checks passed`);
process.exit(fail ? 1 : 0);
