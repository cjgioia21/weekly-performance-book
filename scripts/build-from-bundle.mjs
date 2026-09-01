// Assemble a deployable dist/index.html from the PRESERVED app bundle + the clean,
// editable src/styles.css. This lets you change styling (or the small template CSS)
// and redeploy the exact working app WITHOUT a clean app.jsx.
//
//   1. edit src/styles.css
//   2. node scripts/build-from-bundle.mjs
//   3. drag dist/index.html onto Netlify
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...a) => path.join(root, ...a);

const bundle = fs.readFileSync(p("recovered", "bundle.js"), "utf8").replace(/<\/script/g, "<\\/script");
const css = fs.readFileSync(p("src", "styles.css"), "utf8");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Weekly Performance Book</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;background:#EEF1F6;color:#0F172A;
    font-family:'IBM Plex Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;}
  html.wpb-dark,html.wpb-dark body{background:#070A12;color:#E8EAED;}
  .page{max-width:1240px;margin:0 auto;padding:20px 16px 48px;}
  .page-foot{color:#94A3B8;font-size:12px;text-align:center;margin-top:18px;
    font-family:'IBM Plex Mono',ui-monospace,monospace;}
  #root:empty::after{content:"Loading…";display:block;text-align:center;color:#94A3B8;padding:80px 0;}
${css}
</style>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23233041'/%3E%3Crect x='15' y='34' width='8' height='13' rx='2' fill='white'/%3E%3Crect x='28' y='25' width='8' height='22' rx='2' fill='white'/%3E%3Crect x='41' y='17' width='8' height='30' rx='2' fill='white'/%3E%3C/svg%3E" />
<script>try{if(localStorage.getItem('wpb_theme')==='dark')document.documentElement.classList.add('wpb-dark');}catch(e){}</script>
<script>window.__BTG_LOGO__="";</script>
</head>
<body>
  <div class="page">
    <div id="root"></div>
    <div class="page-foot">Weekly Performance Book · by Christopher Gioia</div>
  </div>
  <script>${bundle}</script>
</body>
</html>`;

fs.writeFileSync(p("dist", "index.html"), html);
fs.writeFileSync(p("dist", "Weekly_Performance_Book.html"), html);
console.log("Built dist/index.html from preserved bundle + src/styles.css · KB:", Math.round(html.length / 1024));
