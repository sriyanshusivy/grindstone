// Checks the content, then assembles one self-contained index.html in the repository root.
import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import { build } from 'esbuild';
import { FORMULAS } from './src/formulas.js';
import { PROBLEMS } from './src/problems.js';
import { UNITS, TOPICS, COVERAGE } from './src/topics.js';

const errs = [];
const checkTex = (where, s) => {
  if (!s) return;
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+)\$/g; let m;
  if ((s.match(/\$/g) || []).length % 2) errs.push(`${where}: odd number of $`);
  while ((m = re.exec(s))) { try { katex.renderToString(m[1] || m[2], { throwOnError: true, strict: false, displayMode: !!m[1] }); } catch (e) { errs.push(`${where}: ${e.message.slice(0, 120)}`); } }
};
const src = fs.readFileSync('src/sims.js', 'utf8');
const has = (kind, name) => new RegExp(`\\b${name}\\s*[:(]`).test(src.slice(src.indexOf(kind)));
for (const [id, f] of Object.entries(FORMULAS)) {
  try { katex.renderToString(f.t, { throwOnError: true, strict: false, displayMode: true }); } catch (e) { errs.push(`formula ${id}: ${e.message.slice(0, 120)}`); }
  checkTex(`formula ${id} v`, f.v); checkTex(`formula ${id} w`, f.w);
  if (!TOPICS.find((t) => t.id === f.topic)) errs.push(`formula ${id}: unknown topic ${f.topic}`);
}
for (const [id, p] of Object.entries(PROBLEMS)) {
  checkTex(`problem ${id} q`, p.q); checkTex(`problem ${id} ans`, p.ans); checkTex(`problem ${id} note`, p.note);
  p.steps.forEach(([h, b], i) => checkTex(`problem ${id} step ${i + 1}`, b));
  if (!TOPICS.find((t) => t.id === p.topic)) errs.push(`problem ${id}: unknown topic`);
}
const usedF = new Set(), usedP = new Set();
for (const t of TOPICS) {
  if (!UNITS.some((u) => u.topics.includes(t.id))) errs.push(`topic ${t.id} not in a unit`);
  for (const c of t.concepts) for (const [i, s] of c.steps.entries()) {
    const w = `topic ${t.id}/${c.id} step ${i + 1}`;
    checkTex(w, s.md); checkTex(w, s.cap); (s.list || []).forEach((l) => checkTex(w, l));
    (s.f || []).forEach((id) => { usedF.add(id); if (!FORMULAS[id]) errs.push(`${w}: no formula ${id}`); });
    [s.ex, ...(s.pr || [])].filter(Boolean).forEach((id) => { if (usedP.has(id)) errs.push(`${w}: problem ${id} used twice`); usedP.add(id); if (!PROBLEMS[id]) errs.push(`${w}: no problem ${id}`); });
    if (s.fig && !has('export const FIGS', s.fig)) errs.push(`${w}: no figure ${s.fig}`);
    if (s.sim && !has('export const SIMS', s.sim)) errs.push(`${w}: no sim ${s.sim}`);
  }
  t.quiz.forEach((q, i) => { checkTex(`quiz ${t.id} ${i}`, q.q); checkTex(`quiz ${t.id} ${i}`, q.why); if (!(q.a >= 0 && q.a < q.o.length)) errs.push(`quiz ${t.id} ${i}: bad answer index`); });
  t.cards.forEach((c, i) => { checkTex(`card ${t.id} ${i}`, c[0]); checkTex(`card ${t.id} ${i}`, c[1]); });
}
for (const id of Object.keys(FORMULAS)) if (!usedF.has(id)) errs.push(`formula ${id} is never shown in a topic`);
for (const id of Object.keys(PROBLEMS)) if (!usedP.has(id)) errs.push(`problem ${id} is never shown in a topic`);
for (const c of COVERAGE) for (const r of c.rows) for (const id of r[2] ? r[2].split(',') : []) if (!TOPICS.find((t) => t.id === id)) errs.push(`coverage: unknown topic ${id}`);
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }

// ---- assemble
const kdir = path.dirname(new URL(import.meta.resolve('katex')).pathname);
let kcss = fs.readFileSync(path.join(kdir, 'katex.min.css'), 'utf8');
kcss = kcss.replace(/src:url\(fonts\/([\w-]+)\.woff2\) format\("woff2"\)[^;}]*/g, (_, n) => `src:url(data:font/woff2;base64,${fs.readFileSync(path.join(kdir, 'fonts', n + '.woff2')).toString('base64')}) format("woff2")`);
if (/url\(fonts\//.test(kcss)) { console.error('katex css still has external fonts'); process.exit(1); }
const out = await build({ entryPoints: ['src/app.js'], bundle: true, format: 'iife', minify: true, write: false, target: 'es2020', charset: 'utf8' });
const js = out.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = fs.readFileSync('src/style.css', 'utf8');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Grindstone Size Reduction Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800;900&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${kcss}</style>
<style>${css}</style>
</head>
<body>
<div class="shell">
<nav class="rail" id="rail" aria-label="Learning path"></nav>
<main>
<div class="top"><button class="btn sm menu" data-act="menu" type="button">Menu</button><div class="search"><input id="sq" type="search" placeholder="Search topics, formulas, problems ( / )" aria-label="Search" autocomplete="off"><div class="results" id="sres" hidden></div></div><span class="overall" id="overall"></span></div>
<div class="page" id="app"></div>
</main>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script>${js}</script>
</body>
</html>
`;
fs.writeFileSync('index.html', html);
const n = (k) => Object.values(PROBLEMS).filter((p) => p.kind === k).length;
console.log(`ok: ${TOPICS.length} topics, ${TOPICS.reduce((s, t) => s + t.concepts.length, 0)} ideas, ${Object.keys(FORMULAS).length} formulas, ${n('ex')} examples, ${n('pr')} practice, ${n('pyq')} pyq, ${TOPICS.reduce((s, t) => s + t.quiz.length, 0)} quiz, ${TOPICS.reduce((s, t) => s + t.cards.length, 0)} cards; ${(html.length / 1024).toFixed(0)} KB`);
