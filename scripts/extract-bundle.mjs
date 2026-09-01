// Pull the compiled app bundle out of the built HTML and preserve it as a
// standalone file, so the complete (compiled) app is never trapped only inside
// dist/index.html. Un-escapes the build-time <\/script guard back to valid JS.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");

const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const bundle = blocks.sort((a, b) => b.length - a.length)[0]; // largest = app bundle
const js = bundle.replace(/<\\\/script/g, "</script");        // reverse the build escape

fs.mkdirSync(path.join(root, "recovered"), { recursive: true });
fs.writeFileSync(path.join(root, "recovered", "bundle.js"), js);
console.log("preserved recovered/bundle.js:", (js.length / 1024 / 1024).toFixed(2), "MB");
