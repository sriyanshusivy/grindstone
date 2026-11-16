import { FORMULAS } from './formulas.js';
import { PROBLEMS } from './problems.js';
import { UNITS, TOPICS, COVERAGE } from './topics.js';
import { FIGS, SIMS } from './sims.js';

// ------------------------------------------------------------------ helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tex = (t, display) => { try { return window.katex.renderToString(t, { displayMode: !!display, throwOnError: false, strict: false }); } catch (e) { return `<code>${esc(t)}</code>`; } };
function inline(s) {
  return s.split(/(\$[^$]+\$)/g).map((p) => (p.length > 2 && p[0] === '$' && p.at(-1) === '$' ? tex(p.slice(1, -1)) : esc(p).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'))).join('');
}
function mdr(src) {
  return src.trim().split(/\n\s*\n/).map((b) => {
    b = b.trim(); const L = b.split('\n').map((l) => l.trim());
    if (b.startsWith('$$') && b.endsWith('$$')) return `<div class="dm">${tex(b.slice(2, -2), true)}</div>`;
    if (L.every((l) => l.startsWith('|'))) {
      const rows = L.filter((l) => !/^\|[\s|:-]+\|$/.test(l)).map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim())));
      return `<div class="tw"><table><thead><tr>${rows[0].map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    if (L.every((l) => l.startsWith('- '))) return `<ul>${L.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
    if (L.every((l) => l.startsWith('>'))) return `<blockquote>${inline(L.map((l) => l.replace(/^>\s?/, '')).join(' '))}</blockquote>`;
    return `<p>${inline(L.join(' '))}</p>`;
  }).join('');
}
const DECK = { A: 'SR I', B: 'SR II', C: 'L14–19', Y23: 'End-sem 2023', Y24: 'End-sem 2024' };
const DECKFULL = { A: 'Size Reduction, up to 15.10 (101 slides)', B: 'Size Reduction, 30.10 (34 slides)', C: 'Mechanical Operations, Lectures 14 to 19 (111 slides)' };
function chips(src, by) {
  if (!src) return `<span class="chips"><span class="chip add" title="Explanation or solution written for this site">◆ Studio</span></span>`;
  const c = src.split(';').map((s) => { const [d, p] = s.split(':'); const y = d[0] === 'Y'; return `<span class="chip${y ? ' pyq' : ''}" title="${y ? 'End-semester paper' : DECKFULL[d] + ', slide ' + p}">${DECK[d]} · ${p.replace(/-/g, '–')}</span>`; }).join('');
  return `<span class="chips">${c}${by === 'studio' ? '<span class="chip add" title="The source gives the question; the solution was written for this site">◆ Studio solution</span>' : ''}</span>`;
}
const TBY = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
const ORDER = UNITS.flatMap((u) => u.topics);
const KIND = { c: 'Concept', i: 'Intuition', v: 'Picture', e: 'Equations', x: 'Worked example', s: 'Try it', p: 'Practice', t: 'Takeaways' };

// ------------------------------------------------------------------ progress (this browser only)
const KEY = 'grindstone.v1';
let S = { done: {}, solved: {}, quiz: {}, star: {}, box: {}, last: '' };
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* storage unavailable: progress lasts for this visit only */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };
function tprog(t) {
  const probs = Object.entries(PROBLEMS).filter(([, p]) => p.topic === t.id).map(([id]) => id);
  const parts = [...t.concepts.map((c) => S.done[t.id + ':' + c.id]), ...probs.map((id) => S.solved[id]), ...t.quiz.map((_, i) => S.quiz[t.id + ':' + i] !== undefined)];
  return parts.filter(Boolean).length / parts.length;
}
const allprog = () => TOPICS.reduce((s, t) => s + tprog(t), 0) / TOPICS.length;

// ------------------------------------------------------------------ pieces
function fcard(id) {
  const f = FORMULAS[id];
  return `<div class="fcard" id="f-${id}"><header><b>${esc(f.n)}</b>${f.key ? '<span class="key">KEY</span>' : ''}${chips(f.src)}<button class="star${S.star[id] ? ' on' : ''}" data-act="star" data-id="${id}" aria-label="Star this formula" aria-pressed="${!!S.star[id]}">★</button></header>
    <div class="dm">${tex(f.t, true)}</div><p><b>Symbols.</b> ${inline(f.v)}</p><p><b>When.</b> ${inline(f.w)}</p></div>`;
}
function prob(id, open) {
  const p = PROBLEMS[id], lab = { ex: 'Worked example', pr: 'Practice', pyq: 'End-semester question' }[p.kind];
  const sol = `<div class="sol"><ol>${p.steps.map(([h, b]) => `<li><div><h4>${esc(h)}</h4><div class="md">${mdr(b)}</div></div></li>`).join('')}</ol><div class="ans md"><p><strong>Answer.</strong> ${inline(p.ans)}</p></div>${p.note ? `<div class="watch md"><p>${inline(p.note)}</p></div>` : ''}</div>`;
  return `<article class="prob" id="p-${id}"><header><b>${esc(p.title)}</b><span class="lvl">${lab}${p.marks ? ' · ' + p.marks + ' marks' : ''} · ${'●'.repeat(p.lvl)}${'○'.repeat(3 - p.lvl)}</span>${chips(p.src, p.by)}</header>
    <div class="q md">${mdr(p.q)}</div>
    ${open ? sol : `<details${S.solved[id] ? '' : ''}><summary class="btn sm" style="margin:0 16px 12px">Show solution</summary>${sol}</details>`}
    <div style="padding:0 16px 12px"><label class="done"><input type="checkbox" data-act="solved" data-id="${id}"${S.solved[id] ? ' checked' : ''}> ${p.kind === 'ex' ? 'I have studied this' : 'I have solved this'}</label></div></article>`;
}
function quizq(t, i) {
  const q = t.quiz[i], k = t.id + ':' + i, got = S.quiz[k];
  return `<div class="qz" id="q-${t.id}-${i}"><p>${i + 1}. ${inline(q.q)}</p><div class="opts">${q.o.map((o, j) => `<button class="opt${got !== undefined && j === q.a ? ' right' : ''}${got === j && j !== q.a ? ' wrong' : ''}" data-act="quiz" data-t="${t.id}" data-i="${i}" data-j="${j}"${got !== undefined ? ' disabled' : ''}>${inline(o)}</button>`).join('')}</div>
    ${got !== undefined ? `<p class="why">${got === q.a ? '<strong>Correct.</strong>' : '<strong>Not this one.</strong>'} ${inline(q.why)} ${q.src ? chips(q.src) : ''}</p>` : ''}</div>`;
}
function step(t, s) {
  let body = '';
  if (s.md) body += `<div class="md">${mdr(s.md)}</div>`;
  if (s.fig) body += `<figure>${FIGS[s.fig]()}<figcaption>${inline(s.cap || '')}</figcaption></figure>`;
  if (s.f) body += s.f.map(fcard).join('');
  if (s.ex) body += prob(s.ex, true);
  if (s.sim) body += `<div class="sim" data-sim="${s.sim}"></div>${s.cap ? `<p class="simnote" style="margin-top:8px">${inline(s.cap)}</p>` : ''}`;
  if (s.pr) body += s.pr.map((id) => prob(id)).join('');
  if (s.list) body += `<ul class="take md">${s.list.map((l) => `<li>${inline(l)}</li>`).join('')}</ul>`;
  const showChip = s.k === 'c' || s.k === 'i' || s.k === 'v';
  return `<section class="step k-${s.k}"><aside>${KIND[s.k]}${showChip ? chips(s.src) : ''}</aside><div>${body}</div></section>`;
}

// ------------------------------------------------------------------ pages
const count = (k) => Object.values(PROBLEMS).filter((p) => p.kind === k).length;
function home() {
  const next = TBY[(S.last || '').replace('t-', '')] || TOPICS[0], nq = TOPICS.reduce((s, t) => s + t.quiz.length, 0), nc = TOPICS.reduce((s, t) => s + t.cards.length, 0);
  const qa = Object.entries(S.quiz), right = qa.filter(([k, v]) => { const [t, i] = k.split(':'); return TBY[t] && TBY[t].quiz[i] && TBY[t].quiz[i].a === v; }).length;
  return `<section class="hero"><div class="txt"><div class="eyebrow">CH21205 · Mechanical Operations · Size reduction</div>
    <h1>Right size.<br><em>Least energy.</em></h1>
    <p>The whole size-reduction unit from your three slide decks, rebuilt as a study studio: every idea explained, every slide problem worked step by step, the end-semester questions solved, and live models you can push around.</p>
    <div class="row"><a class="btn go" href="#t-${next.id}">${S.last ? 'Continue' : 'Start'}: ${esc(next.title)}</a><a class="btn ghost" href="#practice">Practice bank</a><a class="btn ghost" href="#revision">Revision</a></div></div>
    <div class="mill"><div class="sim" data-sim="ballmill" data-mini="1" style="border-color:#3a433d;background:transparent"></div></div></section>
  <section class="tiles"><div class="tile"><b>${Math.round(allprog() * 100)}%</b><span>overall progress</span></div><div class="tile"><b>${TOPICS.length}</b><span>topics in 3 units</span></div><div class="tile"><b>${Object.keys(FORMULAS).length}</b><span>formula cards</span></div><div class="tile"><b>${count('ex')}</b><span>worked examples</span></div><div class="tile"><b>${count('pr') + count('pyq')}</b><span>practice problems, ${count('pyq')} from end-sems</span></div><div class="tile"><b>${qa.length ? Math.round((right / qa.length) * 100) + '%' : nq}</b><span>${qa.length ? 'quiz accuracy' : 'quiz questions'}</span></div></section>
  <section><div class="sec-h"><h2>Learning path</h2><p>Work down the list, or jump to what you need.</p></div><div class="units" style="margin-top:14px">${UNITS.map((u) => `<div class="unit"><header><span class="u">${u.id}</span><h3>${esc(u.title)}</h3><p>${esc(u.blurb)}</p></header>${u.topics.map((id) => { const t = TBY[id], p = tprog(t); return `<a class="t" href="#t-${id}"><span class="n">${String(ORDER.indexOf(id) + 1).padStart(2, '0')}</span><span><b>${esc(t.title)}</b><small>${esc(t.sub)}</small></span><span class="bar" title="${Math.round(p * 100)}% done"><i style="width:${p * 100}%"></i></span><small class="num">${t.min} min</small></a>`; }).join('')}</div>`).join('')}</div></section>
  <section class="two"><div class="card"><h3>How each idea is taught</h3><ul class="flow">${Object.entries(KIND).map(([k, v]) => `<li class="step k-${k}" style="display:flex;gap:10px;align-items:center;padding:0;border:0"><aside style="padding:0"></aside>${v}</li>`).join('')}</ul>
    <p style="margin:14px 0 0;font-size:14.5px;color:var(--ink2)"><span class="chip">SR I · 22–28</span> comes from your slides, with the deck and slide numbers. <span class="chip add">◆ Studio</span> is an explanation or solution written for this site, drawing on the standard texts.</p></div>
  <div class="card"><h3>Source library</h3><ul><li><b>SR I</b>: ${DECKFULL.A}</li><li><b>SR II</b>: ${DECKFULL.B}</li><li><b>L14–19</b>: ${DECKFULL.C}</li><li>End-semester papers, Autumn 2023 and 2024: the six size-reduction questions</li><li>Background: McCabe, Smith and Harriott; Coulson and Richardson, Vol. 2; Wills; Gupta and Yan</li></ul>
    <div class="row" style="margin-top:14px"><a class="btn sm" href="#coverage">Coverage map</a><a class="btn sm" href="#formulas">Formula sheet</a></div></div></section>`;
}
function topic(id) {
  const t = TBY[id], i = ORDER.indexOf(id), u = UNITS.find((x) => x.topics.includes(id)), prev = TBY[ORDER[i - 1]], next = TBY[ORDER[i + 1]];
  S.last = 't-' + id; save();
  return `<header class="thead"><div class="eyebrow">Unit ${u.id} · ${esc(u.title)} · ${t.min} min</div><h1>${esc(t.title)}</h1><p>${esc(t.sub)}</p><div style="margin-top:10px">${chips(t.src)}</div></header>
  ${t.concepts.map((c, n) => `<article class="concept" id="c-${id}-${c.id}"><header><span class="cn">${i + 1}.${n + 1}</span><h2>${esc(c.title)}</h2><label class="done"><input type="checkbox" data-act="done" data-id="${id}:${c.id}"${S.done[id + ':' + c.id] ? ' checked' : ''}> Understood</label></header>${c.steps.map((s) => step(t, s)).join('')}</article>`).join('')}
  <article class="concept"><header><h2>Quick quiz</h2><span class="cn">${t.quiz.length} questions</span></header><section style="padding:18px 20px">${t.quiz.map((_, k) => quizq(t, k)).join('')}</section></article>
  <nav class="pn">${prev ? `<a class="btn" href="#t-${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn go" href="#t-${next.id}">${esc(next.title)} →</a>` : '<a class="btn go" href="#revision">Revision →</a>'}</nav>`;
}
let FQ = '', FT = '', FS = false;
function formulas() {
  const ids = Object.keys(FORMULAS).filter((id) => { const f = FORMULAS[id]; return (!FT || f.topic === FT) && (!FS || S.star[id]) && (!FQ || (f.n + ' ' + f.v + ' ' + f.w + ' ' + f.t).toLowerCase().includes(FQ.toLowerCase())); });
  return `<header class="thead"><div class="eyebrow">Reference</div><h1>Formula sheet</h1><p>${Object.keys(FORMULAS).length} cards. Star the ones you keep forgetting.</p></header>
  <div class="filters"><input id="fq" type="search" placeholder="Filter formulas" value="${esc(FQ)}" aria-label="Filter formulas"><select id="ft" aria-label="Topic"><option value="">All topics</option>${TOPICS.map((t) => `<option value="${t.id}"${FT === t.id ? ' selected' : ''}>${esc(t.title)}</option>`).join('')}</select><label class="done"><input type="checkbox" id="fs"${FS ? ' checked' : ''}> Starred only</label></div>
  <div id="flist">${ids.length ? ids.map(fcard).join('') : '<p class="empty">No formula matches. Clear the filter to see all cards.</p>'}</div>`;
}
let PK = '', PT = '', PD = '';
function practice() {
  const ids = Object.keys(PROBLEMS).filter((id) => { const p = PROBLEMS[id]; return (!PK || p.kind === PK) && (!PT || p.topic === PT) && (!PD || (PD === 'todo') === !S.solved[id]); });
  const n = Object.keys(PROBLEMS).length, d = Object.keys(PROBLEMS).filter((id) => S.solved[id]).length;
  return `<header class="thead"><div class="eyebrow">Practice</div><h1>Practice bank</h1><p>${n} problems, ${d} done. Try each one on paper before you open the solution.</p></header>
  <div class="filters"><select id="pk" aria-label="Kind"><option value="">All kinds</option><option value="pyq"${PK === 'pyq' ? ' selected' : ''}>End-semester questions</option><option value="ex"${PK === 'ex' ? ' selected' : ''}>Worked examples from the slides</option><option value="pr"${PK === 'pr' ? ' selected' : ''}>Practice</option></select>
  <select id="pt" aria-label="Topic"><option value="">All topics</option>${TOPICS.map((t) => `<option value="${t.id}"${PT === t.id ? ' selected' : ''}>${esc(t.title)}</option>`).join('')}</select>
  <select id="pd" aria-label="Status"><option value="">Done and not done</option><option value="todo"${PD === 'todo' ? ' selected' : ''}>Not done yet</option><option value="done"${PD === 'done' ? ' selected' : ''}>Done</option></select></div>
  <div>${ids.length ? ids.map((id) => prob(id)).join('') : '<p class="empty">Nothing matches these filters.</p>'}</div>`;
}
let RT = 'cards', RC = null, RQ = null, RF = null;
const allCards = () => TOPICS.flatMap((t) => t.cards.map((c, i) => ({ k: t.id + ':' + i, t, f: c[0], b: c[1] })));
function pickCard() { const due = allCards().filter((c) => (S.box[c.k]?.due || 0) <= Date.now()); return due.length ? due[Math.floor(Math.random() * due.length)] : null; }
function revision() {
  let body = '';
  if (RT === 'cards') {
    if (!RC) RC = { c: pickCard(), flip: false };
    const all = allCards(), due = all.filter((c) => (S.box[c.k]?.due || 0) <= Date.now()).length, c = RC.c;
    body = c ? `<p class="simnote">${due} of ${all.length} cards due. Cards you know come back after longer gaps.</p><div class="flash" data-act="flip" tabindex="0" role="button" aria-label="Flip the card"><div><div class="side">${RC.flip ? 'Answer' : 'Question'} · ${esc(c.t.title)}</div><div class="face">${inline(RC.flip ? c.b : c.f)}</div></div></div>
      <div class="row">${RC.flip ? '<button class="btn" data-act="card" data-ok="0">Again</button><button class="btn go" data-act="card" data-ok="1">I knew it</button>' : '<button class="btn go" data-act="flip">Show answer</button>'}</div>`
      : `<p class="empty">No cards are due. Come back later, or <button class="btn sm" data-act="resetcards">make all cards due again</button></p>`;
  } else if (RT === 'quiz') {
    if (!RQ) { const pool = TOPICS.flatMap((t) => t.quiz.map((q, i) => ({ t, i, q }))); RQ = { qs: pool.sort(() => Math.random() - 0.5).slice(0, 10), ans: {} }; }
    const done = Object.keys(RQ.ans).length, right = RQ.qs.filter((x, n) => RQ.ans[n] === x.q.a).length;
    body = `<p class="simnote">Ten questions drawn from every topic. ${done ? `${right} right out of ${done} answered.` : ''}</p>${RQ.qs.map((x, n) => { const got = RQ.ans[n]; return `<div class="qz"><p>${n + 1}. ${inline(x.q.q)}</p><div class="opts">${x.q.o.map((o, j) => `<button class="opt${got !== undefined && j === x.q.a ? ' right' : ''}${got === j && j !== x.q.a ? ' wrong' : ''}" data-act="rq" data-n="${n}" data-j="${j}"${got !== undefined ? ' disabled' : ''}>${inline(o)}</button>`).join('')}</div>${got !== undefined ? `<p class="why">${inline(x.q.why)} <a href="#t-${x.t.id}">${esc(x.t.title)}</a></p>` : ''}</div>`; }).join('')}<div class="row"><button class="btn" data-act="newquiz">New set of ten</button></div>`;
  } else {
    const keys = Object.keys(FORMULAS).filter((id) => FORMULAS[id].key);
    if (!RF) RF = { id: keys[Math.floor(Math.random() * keys.length)], show: false };
    const f = FORMULAS[RF.id];
    body = `<p class="simnote">Write the formula from memory, then check.</p><div class="flash" style="cursor:default"><div><div class="side">${esc(TBY[f.topic].title)}</div><div class="face">${esc(f.n)}</div></div></div>${RF.show ? fcard(RF.id) : ''}<div class="row">${RF.show ? '' : '<button class="btn go" data-act="fshow">Show formula</button>'}<button class="btn" data-act="fnext">Next formula</button></div>`;
  }
  return `<header class="thead"><div class="eyebrow">Before the exam</div><h1>Revision</h1><p>Short sessions, often.</p></header>
  <div class="tabs" role="tablist">${[['cards', 'Flashcards'], ['quiz', 'Rapid quiz'], ['drill', 'Formula drill']].map(([k, v]) => `<button class="tab${RT === k ? ' on' : ''}" role="tab" aria-selected="${RT === k}" data-act="rtab" data-k="${k}">${v}</button>`).join('')}</div>
  <div style="display:grid;gap:14px">${body}</div>`;
}
function coverage() {
  return `<header class="thead"><div class="eyebrow">Sources</div><h1>Coverage map</h1><p>Which slides feed which topic, so you can open your own PDF at the right place.</p></header>
  ${COVERAGE.map((c) => `<div class="card"><h3>${DECK[c.d]}</h3><p style="margin:-4px 0 10px;color:var(--ink3);font-size:14px">${DECKFULL[c.d]}</p><div class="tw"><table><thead><tr><th>Slides</th><th>Content</th><th>Topics here</th></tr></thead><tbody>${c.rows.map(([s, w, ts]) => `<tr><td class="num">${s.replace('-', '–')}</td><td>${esc(w)}</td><td>${ts ? ts.split(',').map((id) => `<a href="#t-${id}">${esc(TBY[id].title)}</a>`).join(', ') : '<span style="color:var(--ink3)">not examinable content</span>'}</td></tr>`).join('')}</tbody></table></div></div>`).join('')}
  <div class="card"><h3>End-semester papers</h3><div class="tw"><table><thead><tr><th>Paper</th><th>Question</th><th>Solved in</th></tr></thead><tbody>${Object.entries(PROBLEMS).filter(([, p]) => p.kind === 'pyq').map(([id, p]) => `<tr><td>${DECK[p.src.split(':')[0]]}</td><td>${p.src.split(':')[1]}: ${esc(p.title)} <span class="lvl">${p.marks} marks</span></td><td><a href="#t-${p.topic}">${esc(TBY[p.topic].title)}</a></td></tr>`).join('')}</tbody></table></div>
  <p style="margin:12px 0 0;font-size:14.5px;color:var(--ink2)">The other questions in those two papers are on classification, hydrocyclones, particle size distributions, filtration, cyclones, centrifuges, flotation, sedimentation, silos, fluidisation and pneumatic conveying. None of that is in the three decks, so it is not on this site.</p></div>
  <div class="card"><h3>Where the two decks disagree</h3><div class="md">${mdr(String.raw`- **Screen efficiency on oversize basis.** SR II multiplies (overflow = efficiency × oversize); L14–19 divides (overflow = oversize ÷ efficiency). This site follows L14–19 and quotes the SR II answer beside it.
- **Throw of a jaw crusher.** Both give $0.0502\,G^{0.85}$. L14–19 adds "mm if gape is mm"; the textbook form takes the gape in metres.
- **Data slips.** SR I slide 53 prints Rittinger's number for sphalerite as 0.573 m²/J and one feed fraction as 0.035; its own working uses 0.0573 and 0.35. L14–19 slide 95 has two entries in the oversize column (0.30 and 0.05) that must be 0.03 and 0.35 for its solution to hold.`)}</div></div>`;
}

// ------------------------------------------------------------------ shell, router, events
const app = document.getElementById('app');
function nav() {
  const h = location.hash.slice(1) || 'home';
  const link = (id, label, extra = '') => `<a class="nav${h === id ? ' on' : ''}" href="#${id}">${label}${extra}</a>`;
  document.getElementById('rail').innerHTML = `<a class="brand" href="#home"><i></i><b>Grindstone</b></a>${link('home', 'Overview')}${UNITS.map((u) => `<small>Unit ${u.id} · ${esc(u.title)}</small>${u.topics.map((id) => { const p = tprog(TBY[id]); return `<a class="nav${h === 't-' + id ? ' on' : ''}" href="#t-${id}"><span class="dot${p >= 0.999 ? ' full' : p > 0 ? ' part' : ''}"></span>${esc(TBY[id].title)}<span class="pct">${Math.round(p * 100)}</span></a>`; }).join('')}`).join('')}
    <small>Tools</small>${link('formulas', 'Formula sheet')}${link('practice', 'Practice bank')}${link('revision', 'Revision')}${link('coverage', 'Coverage map')}
    <small>Progress</small><a class="nav" href="#home" data-act="reset">Reset my progress</a>`;
  document.getElementById('overall').textContent = Math.round(allprog() * 100) + '% done';
}
function render(keep) {
  const h = location.hash.slice(1) || 'home', y = window.scrollY;
  app.innerHTML = h.startsWith('t-') && TBY[h.slice(2)] ? topic(h.slice(2)) : h === 'formulas' ? formulas() : h === 'practice' ? practice() : h === 'revision' ? revision() : h === 'coverage' ? coverage() : home();
  app.querySelectorAll('.sim[data-sim]').forEach((el) => SIMS[el.dataset.sim](el, !!el.dataset.mini));
  nav(); document.getElementById('rail').classList.remove('open');
  if (keep) window.scrollTo(0, y); else window.scrollTo(0, 0);
}
function jump(sel) { const n = document.querySelector(sel); if (n) { if (n.tagName === 'ARTICLE' && n.querySelector('details')) n.querySelector('details').open = true; n.scrollIntoView({ block: 'start' }); window.scrollBy(0, -64); } }
let pending = null;
window.addEventListener('hashchange', () => { render(false); if (pending) { jump(pending); pending = null; } });
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
  if (a === 'menu') { document.getElementById('rail').classList.toggle('open'); return; }
  if (a === 'goto') { e.preventDefault(); document.getElementById('sres').hidden = true; if (location.hash === b.dataset.h) jump(b.dataset.sel); else { pending = b.dataset.sel; location.hash = b.dataset.h; } return; }
  if (a === 'star') { S.star[b.dataset.id] = !S.star[b.dataset.id]; save(); b.classList.toggle('on'); b.setAttribute('aria-pressed', !!S.star[b.dataset.id]); return; }
  if (a === 'done' || a === 'solved') { S[a][b.dataset.id] = b.checked; save(); nav(); return; }
  if (a === 'quiz') { S.quiz[b.dataset.t + ':' + b.dataset.i] = +b.dataset.j; save(); const n = document.getElementById(`q-${b.dataset.t}-${b.dataset.i}`); n.outerHTML = quizq(TBY[b.dataset.t], +b.dataset.i); nav(); return; }
  if (a === 'reset') { e.preventDefault(); if (b.dataset.sure) { S = { done: {}, solved: {}, quiz: {}, star: {}, box: {}, last: '' }; save(); render(false); } else { b.dataset.sure = 1; b.textContent = 'Click again to erase progress'; } return; }
  if (a === 'rtab') { RT = b.dataset.k; }
  if (a === 'flip') { RC.flip = !RC.flip; }
  if (a === 'card') { const k = RC.c.k, box = b.dataset.ok === '1' ? Math.min(5, (S.box[k]?.b || 0) + 1) : 0; S.box[k] = { b: box, due: Date.now() + [0.5, 10, 60 * 24, 3 * 60 * 24, 7 * 60 * 24, 14 * 60 * 24][box] * 60000 }; save(); RC = null; }
  if (a === 'resetcards') { S.box = {}; save(); RC = null; }
  if (a === 'rq') { RQ.ans[b.dataset.n] = +b.dataset.j; }
  if (a === 'newquiz') { RQ = null; }
  if (a === 'fshow') { RF.show = true; }
  if (a === 'fnext') { RF = null; }
  render(true);
});
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); document.getElementById('sq').focus(); }
  if (e.key === 'Escape') { document.getElementById('sres').hidden = true; document.getElementById('rail').classList.remove('open'); }
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.dataset.act === 'flip') { e.preventDefault(); document.activeElement.click(); }
});
document.addEventListener('input', (e) => {
  const id = e.target.id;
  if (id === 'fq' || id === 'ft' || id === 'fs') { FQ = document.getElementById('fq').value; FT = document.getElementById('ft').value; FS = document.getElementById('fs').checked; const pos = e.target.selectionStart; render(true); if (id === 'fq') { const n = document.getElementById('fq'); n.focus(); n.setSelectionRange(pos, pos); } }
  if (id === 'pk' || id === 'pt' || id === 'pd') { PK = document.getElementById('pk').value; PT = document.getElementById('pt').value; PD = document.getElementById('pd').value; render(true); }
  if (id === 'sq') search(e.target.value);
});
// ------------------------------------------------------------------ search
const INDEX = [
  ...TOPICS.flatMap((t) => [{ kind: 'Topic', label: t.title, text: t.title + ' ' + t.sub, h: '#t-' + t.id, sel: '.thead' }, ...t.concepts.map((c) => ({ kind: 'Idea', label: c.title, text: c.title + ' ' + c.steps.map((s) => s.md || '').join(' '), h: '#t-' + t.id, sel: `#c-${t.id}-${c.id}` }))]),
  ...Object.entries(FORMULAS).map(([id, f]) => ({ kind: 'Formula', label: f.n, text: f.n + ' ' + f.w, h: '#formulas', sel: '#f-' + id })),
  ...Object.entries(PROBLEMS).map(([id, p]) => ({ kind: p.kind === 'pyq' ? 'End-sem' : 'Problem', label: p.title, text: p.title + ' ' + p.q, h: '#practice', sel: '#p-' + id })),
];
function search(q) {
  const box = document.getElementById('sres'); q = q.trim().toLowerCase();
  if (q.length < 2) { box.hidden = true; return; }
  const words = q.split(/\s+/), hits = INDEX.map((x) => ({ x, s: words.every((w) => x.text.toLowerCase().includes(w)) ? (x.label.toLowerCase().includes(q) ? 2 : 1) : 0 })).filter((r) => r.s).sort((a, b) => b.s - a.s).slice(0, 12);
  box.hidden = false;
  box.innerHTML = hits.length ? hits.map(({ x }) => `<a href="${x.h}" data-act="goto" data-h="${x.h}" data-sel="${x.sel}"><span>${x.kind}</span>${esc(x.label)}</a>`).join('') : '<p class="empty" style="padding:8px 10px;margin:0">No match. Try a shorter word, such as “nip” or “Bond”.</p>';
}
document.addEventListener('click', (e) => { if (!e.target.closest('.search')) document.getElementById('sres').hidden = true; });
FQ = ''; PK = ''; render(false);
