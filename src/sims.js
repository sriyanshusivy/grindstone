// Figures (static SVG) and interactive panels. No dependencies.
const f2 = (x, d = 2) => (Number.isFinite(x) ? x.toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: 0 }) : '–');
const sig = (x, n = 3) => (Number.isFinite(x) ? Number(x.toPrecision(n)).toLocaleString('en-IN', { maximumFractionDigits: 6 }) : '–');
const rng = (id, label, min, max, step, val, unit = '') => `<label class="ctl" for="${id}"><span>${label}</span><output data-for="${id}" data-unit="${unit}"></output><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
const num = (id, label, val, step = 'any') => `<label class="ctl" for="${id}"><span>${label}</span><input type="number" id="${id}" value="${val}" step="${step}"></label>`;
const out = (id, label, hot) => `<div class="out${hot ? ' hot' : ''}"><b id="${id}">–</b><span>${label}</span></div>`;
function panel(el, title, html) { el.innerHTML = `<header>${title}</header><div class="body">${html}</div>`; }
function wire(el, fn) {
  const run = () => {
    el.querySelectorAll('output[data-for]').forEach((o) => { const i = el.querySelector('#' + o.dataset.for); o.textContent = i.value + (o.dataset.unit ? ' ' + o.dataset.unit : ''); });
    fn((id) => parseFloat(el.querySelector('#' + id).value), (id, t) => { const n = el.querySelector('#' + id); if (n) n.textContent = t; });
  };
  el.addEventListener('input', run); run();
}

// ---------------------------------------------------------------- small line chart
function ticks(lo, hi, log) {
  const t = [];
  if (log) { for (let p = Math.floor(Math.log10(lo)); p <= Math.ceil(Math.log10(hi)); p++) for (const m of [1, 2, 5]) { const v = m * 10 ** p; if (v >= lo * 0.999 && v <= hi * 1.001) t.push(v); } return t; }
  const span = hi - lo, raw = span / 5, mag = 10 ** Math.floor(Math.log10(raw)), st = [1, 2, 2.5, 5, 10].find((s) => s * mag >= raw) * mag;
  for (let v = Math.ceil(lo / st) * st; v <= hi + st * 1e-6; v += st) t.push(+v.toPrecision(10));
  return t;
}
export function plot(host, c) {
  const W = 640, H = c.h || 300, m = { l: 56, r: 16, t: 12, b: 40 };
  const sx = c.xlog ? (v) => Math.log10(v) : (v) => v, sy = c.ylog ? (v) => Math.log10(v) : (v) => v;
  const [x0, x1] = c.x.map(sx), [y0, y1] = c.y.map(sy);
  const X = (v) => m.l + ((sx(v) - x0) / (x1 - x0)) * (W - m.l - m.r), Y = (v) => H - m.b - ((sy(v) - y0) / (y1 - y0)) * (H - m.t - m.b);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${c.aria || 'chart'}">`;
  for (const t of ticks(c.x[0], c.x[1], c.xlog)) s += `<line x1="${X(t)}" x2="${X(t)}" y1="${m.t}" y2="${H - m.b}" style="stroke:var(--line)"/><text x="${X(t)}" y="${H - m.b + 15}" text-anchor="middle">${sig(t, 3)}</text>`;
  for (const t of ticks(c.y[0], c.y[1], c.ylog)) s += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(t)}" y2="${Y(t)}" style="stroke:var(--line)"/><text x="${m.l - 7}" y="${Y(t) + 4}" text-anchor="end">${sig(t, 3)}</text>`;
  s += `<text x="${(m.l + W - m.r) / 2}" y="${H - 6}" text-anchor="middle">${c.xl}</text><text transform="translate(13 ${(H - m.b + m.t) / 2}) rotate(-90)" text-anchor="middle">${c.yl}</text>`;
  for (const v of c.vlines || []) s += `<line x1="${X(v.x)}" x2="${X(v.x)}" y1="${m.t}" y2="${H - m.b}" style="stroke:${v.c || 'var(--ink)'};stroke-dasharray:5 4;stroke-width:1.4"/>`;
  for (const v of c.hlines || []) s += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v.y)}" y2="${Y(v.y)}" style="stroke:var(--ink);stroke-dasharray:5 4;stroke-width:1.4"/>`;
  for (const se of c.series) s += `<path d="${se.pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join('')}" style="fill:none;stroke:${se.c};stroke-width:2.2;stroke-linejoin:round"/>`;
  for (const d of c.dots || []) s += `<circle cx="${X(d.x)}" cy="${Y(d.y)}" r="5" style="fill:${d.c};stroke:var(--bg);stroke-width:2"/>`;
  s += `<line class="xh" y1="${m.t}" y2="${H - m.b}" style="stroke:var(--ink3);visibility:hidden"/><rect class="hit" x="${m.l}" y="${m.t}" width="${W - m.l - m.r}" height="${H - m.t - m.b}" style="fill:transparent"/></svg>`;
  host.innerHTML = `<div class="legend">${c.series.map((se) => `<span><i style="background:${se.c}"></i>${se.name}</span>`).join('')}</div>` + s + '<div class="tip" hidden></div>';
  const svg = host.querySelector('svg'), tip = host.querySelector('.tip'), xh = host.querySelector('.xh');
  const at = (se, xv) => { const p = se.pts; for (let i = 1; i < p.length; i++) { const a = p[i - 1], b = p[i]; if ((a[0] - xv) * (b[0] - xv) <= 0 && a[0] !== b[0]) return a[1] + ((b[1] - a[1]) * (xv - a[0])) / (b[0] - a[0]); } return NaN; };
  const move = (e) => {
    const r = svg.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width) * W;
    if (px < m.l || px > W - m.r) return leave();
    const u = x0 + ((px - m.l) / (W - m.l - m.r)) * (x1 - x0), xv = c.xlog ? 10 ** u : u;
    xh.setAttribute('x1', px); xh.setAttribute('x2', px); xh.style.visibility = 'visible';
    tip.hidden = false;
    tip.innerHTML = `${c.xt || 'x'} = ${sig(xv, 3)}<br>` + c.series.map((se) => `<span style="color:${se.c}">■</span> ${se.name}: ${sig(at(se, xv), 3)}`).join('<br>');
    const left = ((px / W) * r.width); tip.style.left = Math.min(left + 12, r.width - tip.offsetWidth - 4) + 'px'; tip.style.top = '34px';
  };
  const leave = () => { tip.hidden = true; xh.style.visibility = 'hidden'; };
  svg.addEventListener('pointermove', move); svg.addEventListener('pointerleave', leave);
}

// ---------------------------------------------------------------- figures
const DEF = `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--ink)"/></marker></defs>`;
const st = { o: 'fill:none;stroke:var(--ink);stroke-width:1.6', f: 'fill:var(--sunk);stroke:var(--ink);stroke-width:1.6', h: 'fill:var(--hazard);stroke:var(--ink);stroke-width:1.6', a: 'stroke:var(--ink);stroke-width:1.8;fill:none', d: 'stroke:var(--ink3);stroke-width:1.2;stroke-dasharray:4 4;fill:none', r: 'fill:var(--ink3);stroke:var(--ink);stroke-width:1.2' };
const T = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} style="font:13px var(--body);fill:var(--ink)">${s}</text>`;
const Tm = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o} style="font:12px var(--body);fill:var(--ink3)">${s}</text>`;
const AR = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="${st.a}" marker-end="url(#ah)"/>`;
const BOX = (x, y, w, h, label, cls = 'f') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" style="${st[cls]}"/>${T(x + w / 2, y + h / 2 + 4.5, label, 'text-anchor="middle"')}`;
const rock = (x, y, r) => `<path d="M${x - r} ${y + r * 0.2}L${x - r * 0.6} ${y - r * 0.8}L${x + r * 0.3} ${y - r}L${x + r} ${y - r * 0.2}L${x + r * 0.7} ${y + r * 0.8}L${x - r * 0.3} ${y + r}z" style="${st.r}"/>`;

export const FIGS = {
  mechanisms: () => `<svg viewBox="0 0 720 190">${DEF}
    <rect x="40" y="38" width="100" height="14" style="${st.f}"/><rect x="40" y="118" width="100" height="14" style="${st.f}"/>${rock(90, 85, 28)}${AR(90, 8, 90, 34)}${AR(90, 162, 90, 136)}${T(90, 182, 'Compression', 'text-anchor="middle"')}
    ${rock(270, 96, 28)}<rect x="196" y="40" width="34" height="22" transform="rotate(35 213 51)" style="${st.h}"/>${AR(222, 58, 250, 78)}<path d="M300 70l14 -10M304 92l18 -2M298 118l14 10" style="${st.a}"/>${T(270, 182, 'Impact', 'text-anchor="middle"')}
    <rect x="400" y="60" width="110" height="14" style="${st.f}"/><rect x="390" y="112" width="110" height="14" style="${st.f}"/>${rock(450, 93, 18)}${AR(470, 48, 520, 48)}${AR(430, 140, 380, 140)}${T(450, 182, 'Attrition (rubbing)', 'text-anchor="middle"')}
    <rect x="570" y="112" width="120" height="14" style="${st.f}"/><rect x="590" y="84" width="80" height="28" style="${st.r}"/><path d="M630 30l16 54h-32z" style="${st.h}"/>${AR(630, 6, 630, 28)}${T(630, 182, 'Cutting', 'text-anchor="middle"')}</svg>`,
  sizeladder: () => {
    const X = (mm) => 150 + ((Math.log10(mm) + 3) / 6) * 540, rows = [['Crushers', 5, 250, 'var(--s1)'], ['Grinders', 0.1, 50, 'var(--s2)'], ['Fine grinders', 0.074, 5, 'var(--s3)'], ['Ultrafine grinders', 0.001, 6, 'var(--s4)'], ['Cutters', 2, 10, 'var(--ink3)']];
    let s = `<svg viewBox="0 0 720 220">`;
    [['1 µm', 0.001], ['10 µm', 0.01], ['0.1 mm', 0.1], ['1 mm', 1], ['10 mm', 10], ['100 mm', 100], ['1 m', 1000]].forEach(([l, v]) => { s += `<line x1="${X(v)}" x2="${X(v)}" y1="14" y2="178" style="stroke:var(--line)"/>${Tm(X(v), 198, l, 'text-anchor="middle"')}`; });
    rows.forEach(([n, a, b, c], i) => { const y = 26 + i * 31; s += `${T(142, y + 13, n, 'text-anchor="end"')}<rect x="${X(a)}" y="${y}" width="${X(b) - X(a)}" height="18" rx="4" style="fill:${c}"/>`; });
    return s + `${Tm(420, 216, 'product size at the left end of each bar, feed size at the right end', 'text-anchor="middle"')}</svg>`;
  },
  cubes: () => `<svg viewBox="0 0 720 200">${DEF}
    <rect x="70" y="30" width="130" height="130" style="${st.f}"/><line x1="135" y1="14" x2="135" y2="176" style="${st.d}"/>${AR(100, 8, 100, 28)}${AR(170, 182, 170, 162)}${T(135, 196, 'Cube 1: section area A', 'text-anchor="middle"')}
    ${T(225, 70, 'Energy = F × A × D')}${T(225, 94, 'New surface = 2A')}
    <rect x="450" y="72" width="65" height="65" style="${st.f}"/><line x1="482" y1="56" x2="482" y2="152" style="${st.d}"/>${AR(466, 50, 466, 70)}${AR(500, 158, 500, 139)}${T(482, 196, 'Cube 2: section area A/4', 'text-anchor="middle"')}
    ${T(540, 92, 'Energy = F × (A/4) × D')}${T(540, 116, 'New surface = 2A/4')}</svg>`,
  jaw: () => `<svg viewBox="0 0 720 300">${DEF}
    <path d="M150 30h22v230h-22z" style="${st.f}"/>${T(100, 150, 'Fixed', 'text-anchor="middle"')}${T(100, 167, '(anvil) jaw', 'text-anchor="middle"')}
    <path d="M300 30l22 0l-92 232l-22 -8z" style="${st.h}"/><circle cx="311" cy="30" r="7" style="${st.o};fill:var(--bg)"/>${T(330, 22, 'Pivot at the top (Blake)')}
    ${rock(215, 70, 28)}${rock(196, 140, 17)}${rock(186, 196, 10)}${rock(182, 232, 6)}
    <line x1="172" y1="18" x2="300" y2="18" style="${st.a}" marker-end="url(#ah)" marker-start="url(#ah)"/>${T(236, 12, 'Gape', 'text-anchor="middle"')}
    <line x1="172" y1="278" x2="208" y2="278" style="${st.a}" marker-end="url(#ah)" marker-start="url(#ah)"/>${T(190, 295, 'Set', 'text-anchor="middle"')}
    <line x1="244" y1="262" x2="280" y2="262" style="${st.a}" marker-end="url(#ah)" marker-start="url(#ah)"/>${T(262, 281, 'Throw', 'text-anchor="middle"')}
    <circle cx="500" cy="70" r="24" style="${st.f}"/><circle cx="508" cy="64" r="5" style="${st.r}"/>${T(540, 60, 'Eccentric')}
    <line x1="500" y1="94" x2="500" y2="212" style="stroke:var(--ink);stroke-width:7"/>${T(514, 150, 'Pitman')}
    <line x1="500" y1="212" x2="258" y2="196" style="stroke:var(--ink);stroke-width:4"/><line x1="500" y1="212" x2="660" y2="196" style="stroke:var(--ink);stroke-width:4"/>
    <rect x="660" y="150" width="20" height="90" style="${st.f}"/>${T(400, 228, 'Toggle plates', 'text-anchor="middle"')}${Tm(670, 142, 'Frame', 'text-anchor="middle"')}
    <path d="M520 212a20 20 0 0 1 -2 -14" style="${st.o}"/>${Tm(528, 204, 'θ')}</svg>`,
  gyratory: () => `<svg viewBox="0 0 720 280">${DEF}
    <path d="M220 30L300 230h-34L186 30z" style="${st.f}"/><path d="M500 30L420 230h34L534 30z" style="${st.f}"/>
    <path d="M372 44L306 222h118z" style="${st.h}"/><line x1="372" y1="10" x2="358" y2="262" style="stroke:var(--ink);stroke-width:6"/>
    <circle cx="360" cy="252" r="16" style="${st.f}"/>${T(386, 258, 'Eccentric')}
    ${rock(270, 70, 22)}${rock(288, 130, 13)}${rock(298, 184, 7)}${rock(462, 80, 16)}
    ${T(394, 200, 'Mantle', 'text-anchor="middle"')}${T(160, 130, 'Concave', 'text-anchor="end"')}${T(160, 147, 'shell', 'text-anchor="end"')}
    <line x1="224" y1="24" x2="366" y2="24" style="${st.a}" marker-end="url(#ah)" marker-start="url(#ah)"/>${T(296, 16, 'Gape', 'text-anchor="middle"')}
    ${Tm(262, 250, 'closed side', 'text-anchor="middle"')}${Tm(520, 250, 'open side', 'text-anchor="middle"')}
    </svg>`,
  circuits: () => `<svg viewBox="0 0 720 250">${DEF}
    ${T(150, 16, 'Open circuit', 'text-anchor="middle" font-weight="600"')}
    ${AR(40, 50, 88, 50)}${Tm(40, 40, 'Feed')}${BOX(90, 32, 110, 36, 'Crusher 1')}${AR(145, 68, 145, 98)}${BOX(90, 100, 110, 36, 'Screen')}
    <path d="M200 118h48v46" style="${st.a}" marker-end="url(#ah)"/>${Tm(206, 110, 'Oversize')}${BOX(204, 166, 110, 36, 'Crusher 2')}
    <path d="M145 136v92h70" style="${st.a}" marker-end="url(#ah)"/><path d="M259 202v26" style="${st.a}"/><line x1="215" y1="228" x2="320" y2="228" style="${st.a}" marker-end="url(#ah)"/>${Tm(60, 190, 'Undersize')}${Tm(326, 232, 'Product')}
    ${T(550, 16, 'Closed circuit', 'text-anchor="middle" font-weight="600"')}
    ${AR(400, 110, 448, 110)}${Tm(400, 100, 'Feed')}${BOX(450, 92, 100, 36, 'Crusher')}${AR(550, 110, 588, 110)}${BOX(590, 92, 100, 36, 'Screen')}
    <path d="M640 92V48H500v42" style="${st.a}" marker-end="url(#ah)"/>${T(570, 40, 'Circulating load (oversize)', 'text-anchor="middle"')}
    ${AR(640, 128, 640, 176)}${Tm(650, 158, 'Undersize')}${T(640, 196, 'Product', 'text-anchor="middle"')}</svg>`,
  conundrum: () => `<svg viewBox="0 0 720 230">${DEF}
    ${BOX(40, 86, 150, 50, '100 g to the screen')}${Tm(115, 156, '40 g oversize + 60 g undersize', 'text-anchor="middle"')}
    ${AR(190, 111, 258, 111)}<rect x="260" y="92" width="120" height="38" rx="3" style="${st.h}"/>${T(320, 116, 'Screen', 'text-anchor="middle"')}
    <path d="M380 100h60V52h38" style="${st.a}" marker-end="url(#ah)"/><path d="M380 122h60v48h38" style="${st.a}" marker-end="url(#ah)"/>
    ${BOX(480, 30, 210, 44, 'Overflow 45 g (40 + 5)')}${BOX(480, 148, 210, 44, 'Undersize 55 g, pure')}
    ${Tm(585, 92, 'oversize basis: 40 / 45 = 0.89', 'text-anchor="middle"')}${Tm(585, 210, 'undersize basis: 55 / 60 = 0.92', 'text-anchor="middle"')}</svg>`,
};

// ---------------------------------------------------------------- interactive panels
const WI = [['Gypsum rock', 6.73], ['Bauxite', 8.78], ['Limestone', 12.74], ['Coal', 13.0], ['Cement clinker', 13.45], ['Quartz', 13.57]];
export const SIMS = {
  laws(el) {
    panel(el, 'Three laws on one chart', `<div class="ctls">${num('lw-f1', 'Known duty: feed size, mm', 50)}${num('lw-p1', 'Known duty: product size, mm', 10)}${num('lw-e1', 'Known duty: energy, kJ/kg', 13)}${num('lw-f2', 'New duty: feed size, mm', 75)}${num('lw-p2', 'New duty: product size, mm', 25)}</div>
      <div class="outs">${out('lw-k', 'Kick, kJ/kg')}${out('lw-b', 'Bond, kJ/kg')}${out('lw-r', 'Rittinger, kJ/kg')}</div><div class="plot" id="lw-plot"></div>
      <p class="simnote">Curves show the energy to take the new feed down to each product size. The dashed line marks your product size. Try a fine duty such as 1 mm to 0.05 mm and watch the gap open.</p>`);
    wire(el, (v, set) => {
      const [f1, p1, e1, f2, p2] = ['lw-f1', 'lw-p1', 'lw-e1', 'lw-f2', 'lw-p2'].map(v);
      if (!(f1 > p1 && p1 > 0 && f2 > p2 && p2 > 0 && e1 > 0)) { set('lw-k', '–'); set('lw-b', '–'); set('lw-r', '–'); return; }
      const K = e1 / Math.log(f1 / p1), B = e1 / (1 / Math.sqrt(p1) - 1 / Math.sqrt(f1)), R = e1 / (1 / p1 - 1 / f1);
      const fk = (x) => K * Math.log(f2 / x), fb = (x) => B * (1 / Math.sqrt(x) - 1 / Math.sqrt(f2)), fr = (x) => R * (1 / x - 1 / f2);
      set('lw-k', sig(fk(p2))); set('lw-b', sig(fb(p2))); set('lw-r', sig(fr(p2)));
      const lo = Math.min(p2 / 3, f2 / 100), xs = Array.from({ length: 60 }, (_, i) => f2 * 0.97 * (lo / (f2 * 0.97)) ** (i / 59));
      const all = xs.flatMap((x) => [fk(x), fb(x), fr(x)]);
      plot(el.querySelector('#lw-plot'), { xlog: 1, ylog: 1, x: [lo, f2], y: [Math.min(...all) * 0.8, Math.max(...all) * 1.2], xl: 'Product size, mm (log scale)', yl: 'Energy, kJ/kg (log scale)', xt: 'size, mm', aria: 'Energy against product size for the three laws',
        series: [{ name: 'Kick', c: 'var(--s1)', pts: xs.map((x) => [x, fk(x)]) }, { name: 'Bond', c: 'var(--s2)', pts: xs.map((x) => [x, fb(x)]) }, { name: 'Rittinger', c: 'var(--s3)', pts: xs.map((x) => [x, fr(x)]) }],
        vlines: [{ x: p2 }], dots: [{ x: p2, y: fk(p2), c: 'var(--s1)' }, { x: p2, y: fb(p2), c: 'var(--s2)' }, { x: p2, y: fr(p2), c: 'var(--s3)' }] });
    });
  },
  bond(el) {
    panel(el, 'Bond calculator', `<div class="ctls"><label class="ctl" for="bd-m"><span>Material</span><select id="bd-m">${WI.map(([n, w]) => `<option value="${w}"${n === 'Limestone' ? ' selected' : ''}>${n} (${w})</option>`).join('')}</select></label>
      ${num('bd-f', 'Feed, 80 % passing, mm', 50)}${num('bd-p', 'Product, 80 % passing, mm', 3)}${num('bd-q', 'Throughput, t/h', 100)}${rng('bd-e', 'Machine efficiency', 5, 100, 1, 100, '%')}</div>
      <div class="outs">${out('bd-w', 'kWh per tonne', 1)}${out('bd-n', 'net power, kW')}${out('bd-i', 'power drawn, kW')}${out('bd-rr', 'reduction ratio')}</div>`);
    wire(el, (v, set) => {
      const wi = v('bd-m'), f = v('bd-f'), p = v('bd-p'), q = v('bd-q'), e = v('bd-e') / 100;
      const w = f > p && p > 0 ? 0.3162 * wi * (1 / Math.sqrt(p) - 1 / Math.sqrt(f)) : NaN;
      set('bd-w', sig(w, 4)); set('bd-n', sig(w * q, 4)); set('bd-i', sig((w * q) / e, 4)); set('bd-rr', sig(f / p));
    });
  },
  d80(el) {
    const A = [3.327, 2.362, 1.651, 1.168, 0.833, 0.589, 0.417, 0.295, 0.208, 0.147, 0.104];
    const F = [0.143, 0.211, 0.23, 0.186, 0.12, 0.076, 0.034, 0, 0, 0, 0], P = [0, 0, 0, 0.098, 0.234, 0.277, 0.149, 0.101, 0.068, 0.044, 0.029];
    const lab = (i) => (i < 10 ? `−${A[i]} +${A[i + 1]}` : `−${A[10]}`);
    panel(el, '80 % passing size', `<div class="split"><div class="tw"><table><thead><tr><th>Screen size, mm</th><th>Feed</th><th>Product</th></tr></thead><tbody>${A.map((_, i) => `<tr><td>${lab(i)}</td><td><input class="cell" type="number" step="0.001" min="0" id="d8-f${i}" value="${F[i]}" aria-label="feed fraction ${lab(i)}"></td><td><input class="cell" type="number" step="0.001" min="0" id="d8-p${i}" value="${P[i]}" aria-label="product fraction ${lab(i)}"></td></tr>`).join('')}</tbody></table></div>
      <div style="display:grid;gap:12px"><div class="plot" id="d8-plot"></div><div class="outs">${out('d8-df', 'feed D80, mm')}${out('d8-dp', 'product D80, mm')}${out('d8-e', 'Bond energy, kWh/t (Wi 13.57)', 1)}${out('d8-s', 'column totals')}</div></div></div>
      <p class="simnote">Sizes are found by straight-line interpolation between sieves. The slides read 2.12 mm and 0.7 mm from a smooth hand-drawn curve.</p>`);
    wire(el, (v, set) => {
      const cum = (pre) => { const x = A.map((_, i) => v(pre + i) || 0), c = []; let s = 0; for (let i = 10; i >= 0; i--) { s += x[i]; c[i] = s; } return [c, s]; };
      const d80 = (c, tot) => { for (let i = 0; i < 10; i++) { const hi = c[i] / tot, lo = c[i + 1] / tot; if (hi >= 0.8 && lo < 0.8) return A[i + 1] + ((0.8 - lo) / (hi - lo)) * (A[i] - A[i + 1]); } return NaN; };
      const [cf, sf] = cum('d8-f'), [cp, sp] = cum('d8-p'), df = d80(cf, sf), dp = d80(cp, sp);
      set('d8-df', sig(df)); set('d8-dp', sig(dp)); set('d8-s', `${f2(sf, 3)} / ${f2(sp, 3)}`);
      set('d8-e', sig(0.3162 * 13.57 * (1 / Math.sqrt(dp) - 1 / Math.sqrt(df)), 4));
      plot(el.querySelector('#d8-plot'), { h: 250, x: [0, 3.5], y: [0, 1], xl: 'Aperture, mm', yl: 'Cumulative fraction passing', xt: 'aperture, mm', aria: 'Cumulative undersize curves for feed and product',
        series: [{ name: 'Feed', c: 'var(--s1)', pts: A.map((a, i) => [a, cf[i] / sf]).reverse() }, { name: 'Product', c: 'var(--s2)', pts: A.map((a, i) => [a, cp[i] / sp]).reverse() }],
        hlines: [{ y: 0.8 }], vlines: [{ x: df, c: 'var(--s1)' }, { x: dp, c: 'var(--s2)' }].filter((l) => Number.isFinite(l.x)) });
    });
  },
  surface(el) {
    const R = [[0.569, 5, 0.1, 0], [0.4013, 4.6, 0.2, 0], [0.2845, 4.2, 0.4, 0], [0.2007, 3.8, 0.2, 0], [0.141, 3.4, 0.1, 0], [0.1001, 3.3, 0, 0], [0.0712, 2.7, 0, 0], [0.0506, 2.5, 0, 0.05], [0.0356, 2.4, 0, 0.3], [0.0252, 2.2, 0, 0.44], [0.0178, 2, 0, 0.08], [0.0126, 1.8, 0, 0.04], [0.0089, 1.6, 0, 0.09]];
    panel(el, 'Specific surface and Rittinger energy', `<div class="split"><div class="tw"><table><thead><tr><th>d avg, cm</th><th>n</th><th>Feed x</th><th>Product x</th></tr></thead><tbody>${R.map((r, i) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><input class="cell" type="number" step="0.01" min="0" id="sf-f${i}" value="${r[2]}" aria-label="feed fraction row ${i + 1}"></td><td><input class="cell" type="number" step="0.01" min="0" id="sf-p${i}" value="${r[3]}" aria-label="product fraction row ${i + 1}"></td></tr>`).join('')}</tbody></table></div>
      <div style="display:grid;gap:12px"><div class="ctls">${num('sf-rho', 'Solid density, g/cm³', 3.8)}${num('sf-rn', "Rittinger's number, cm²/J", 178.57)}${num('sf-m', 'Feed rate, kg/h', 5000)}${num('sf-pl', 'Power when crushing, kW', 7.5)}${num('sf-pe', 'Power running empty, kW', 4)}</div>
      <div class="outs">${out('sf-sf', 'Σ n x / d, feed, cm⁻¹')}${out('sf-sp', 'Σ n x / d, product, cm⁻¹')}${out('sf-ds', 'new surface, cm²/g')}${out('sf-e', 'surface power, W', 1)}${out('sf-o', 'overall efficiency, %')}${out('sf-t', 'theoretical effectiveness, %')}</div></div></div>`);
    wire(el, (v, set) => {
      let a = 0, b = 0; R.forEach((r, i) => { a += (r[1] * (v('sf-f' + i) || 0)) / r[0]; b += (r[1] * (v('sf-p' + i) || 0)) / r[0]; });
      const ds = (6 / v('sf-rho')) * (b - a), e = ((ds * 1000) / v('sf-rn')) * (v('sf-m') / 3600);
      set('sf-sf', f2(a)); set('sf-sp', f2(b)); set('sf-ds', f2(ds)); set('sf-e', f2(e, 1)); set('sf-o', f2((e / (v('sf-pl') * 1000)) * 100)); set('sf-t', f2((e / ((v('sf-pl') - v('sf-pe')) * 1000)) * 100));
    });
  },
  jaw(el) {
    panel(el, 'Jaw crusher sizing', `<div class="ctls">${rng('jw-g', 'Gape', 0.2, 2, 0.05, 0.6, 'm')}</div>
      <div class="outs">${out('jw-d', 'largest feed lump, m', 1)}${out('jw-h', 'vertical height, m')}${out('jw-w', 'jaw width range, m')}${out('jw-t', 'throw, mm (gape in m)')}${out('jw-t2', 'throw, mm (gape in mm)')}</div>
      <div class="ctls">${num('jw-f1', 'Pitman force F₁, kN', 100)}${rng('jw-th', 'Toggle angle θ', 45, 89, 1, 80, '°')}${num('jw-l', 'Pivot to toggle, L, m', 1.5)}${num('jw-x', 'Pivot to particle, x, m', 0.75)}</div>
      <div class="outs">${out('jw-f2', 'force in each toggle F₂, kN')}${out('jw-fx', 'crushing force Fₓ, kN', 1)}${out('jw-ma', 'Fₓ / F₁')}</div>
      <p class="simnote">Push θ towards 90° to see the toggle multiply the force.</p>`);
    wire(el, (v, set) => {
      const g = v('jw-g'); set('jw-d', f2(0.9 * g)); set('jw-h', f2(2 * g)); set('jw-w', `${f2(1.3 * g)} to ${f2(3 * g)}`);
      set('jw-t', f2(0.0502 * g ** 0.85 * 1000, 1)); set('jw-t2', f2(0.0502 * (g * 1000) ** 0.85, 1));
      const th = (v('jw-th') * Math.PI) / 180, f1 = v('jw-f1'), fx = (f1 * v('jw-l') * Math.tan(th)) / (2 * v('jw-x'));
      set('jw-f2', sig(f1 / (2 * Math.cos(th)))); set('jw-fx', sig(fx)); set('jw-ma', sig(fx / f1));
    });
  },
  select(el) {
    panel(el, 'Jaw or gyratory?', `<div class="ctls">${rng('sl-q', 'Required capacity', 5, 200, 1, 10, 'tons/h')}${rng('sl-g', 'Gape', 6, 40, 1, 10, 'in')}</div><div class="outs">${out('sl-a', 'gape area L × D, in²')}${out('sl-r', 'capacity ÷ gape area', 1)}</div><div class="verdict" id="sl-v"></div>`);
    wire(el, (v, set) => {
      const a = 1.7 * v('sl-g') ** 2, r = v('sl-q') / a, n = el.querySelector('#sl-v');
      set('sl-a', f2(a, 1)); set('sl-r', f2(r, 3));
      n.className = 'verdict ok'; n.textContent = r < 0.115 ? 'Below 0.115: choose a jaw crusher.' : 'Above 0.115: choose a gyratory crusher.';
    });
  },
  nip(el) {
    panel(el, 'Angle of nip', `<div class="ctls">${rng('np-D', 'Roll diameter D', 200, 1500, 10, 1000, 'mm')}${rng('np-d', 'Feed particle d', 5, 200, 1, 53, 'mm')}${rng('np-L', 'Set L', 1, 100, 1, 15, 'mm')}${rng('np-mu', 'Friction coefficient μ', 0.05, 0.7, 0.01, 0.3)}</div>
      <div id="np-svg"></div><div class="outs">${out('np-th', 'half angle θ')}${out('np-2t', 'angle of nip 2θ', 1)}${out('np-tan', 'tan θ')}${out('np-dm', 'largest d this μ can nip, mm')}</div><div class="verdict" id="np-v"></div>`);
    wire(el, (v, set) => {
      const D = v('np-D'), d = v('np-d'), L = v('np-L'), mu = v('np-mu'), R = D / 2, n = el.querySelector('#np-v'), host = el.querySelector('#np-svg');
      const dm = 2 * ((R + L / 2) / Math.cos(Math.atan(mu)) - R); set('np-dm', f2(dm, 1));
      if (d <= L) { set('np-th', '–'); set('np-2t', '–'); set('np-tan', '–'); n.className = 'verdict no'; n.textContent = 'The particle is smaller than the set and falls straight through.'; host.innerHTML = ''; return; }
      const th = Math.acos((R + L / 2) / (R + d / 2)), ok = Math.tan(th) <= mu;
      set('np-th', f2((th * 180) / Math.PI, 1) + '°'); set('np-2t', f2((th * 360) / Math.PI, 1) + '°'); set('np-tan', f2(Math.tan(th), 3));
      n.className = 'verdict ' + (ok ? 'ok' : 'no'); n.textContent = ok ? `Nipped: tan θ = ${f2(Math.tan(th), 3)} is not more than μ = ${mu}.` : `Not nipped: tan θ = ${f2(Math.tan(th), 3)} exceeds μ = ${mu}. The particle rides on the rolls.`;
      const py = -(R + d / 2) * Math.sin(th), cx = R + L / 2; const top = py - d * 0.9, bot = Math.max(0.35 * d, 0.03 * D), hw = Math.max(1.5 * d + L, 0.8 * (bot - top));
      const ux = -cx / (R + d / 2), uy = py / (R + d / 2), kx = cx + R * ux, ky = R * uy, tl = d * 1.1, col = ok ? 'var(--good)' : 'var(--bad)';
      host.innerHTML = `<svg viewBox="${-hw} ${top} ${2 * hw} ${bot - top}" style="width:100%;max-height:330px;display:block" role="img" aria-label="Two rolls and a particle at the nip">
        <circle cx="${-cx}" cy="0" r="${R}" style="fill:var(--sunk);stroke:var(--ink)" vector-effect="non-scaling-stroke"/><circle cx="${cx}" cy="0" r="${R}" style="fill:var(--sunk);stroke:var(--ink)" vector-effect="non-scaling-stroke"/>
        <line x1="${kx - uy * tl}" y1="${ky + ux * tl}" x2="${kx + uy * tl}" y2="${ky - ux * tl}" style="stroke:var(--ink3);stroke-dasharray:4 3" vector-effect="non-scaling-stroke"/><line x1="${-kx + uy * tl}" y1="${ky + ux * tl}" x2="${-kx - uy * tl}" y2="${ky - ux * tl}" style="stroke:var(--ink3);stroke-dasharray:4 3" vector-effect="non-scaling-stroke"/>
        <circle cx="0" cy="${py}" r="${d / 2}" style="fill:${col};stroke:var(--ink)" vector-effect="non-scaling-stroke"/>
        <line x1="${-L / 2}" y1="0" x2="${L / 2}" y2="0" style="stroke:var(--hazard);stroke-width:3" vector-effect="non-scaling-stroke"/></svg>`;
    });
  },
  ballmill(el, mini) {
    panel(el, mini ? 'Ball mill, live' : 'Ball mill and critical speed', `<canvas width="560" height="${mini ? 400 : 460}" aria-label="Animated cross-section of a ball mill"></canvas>
      <div class="ctls">${rng('bm-f', 'Speed, % of critical', 20, 130, 1, 72, '%')}${mini ? '' : num('bm-D', 'Mill diameter D, m', 2) + num('bm-d', 'Ball diameter d, mm', 100)}</div>
      ${mini ? '<div class="verdict ok" id="bm-v"></div>' : `<div class="outs">${out('bm-nc', 'critical speed, rpm')}${out('bm-n', 'operating speed, rpm', 1)}${out('bm-a', 'ball leaves at, from top')}</div><div class="verdict ok" id="bm-v"></div>`}`);
    const cv = el.querySelector('canvas'), g = cv.getContext('2d'), W = cv.width, H = cv.height, S = Math.min(W, H) * 0.42, cx = W / 2, cy = H / 2;
    let f = 0.72, paths = [], t = 0, last = 0;
    const build = () => {
      paths = [1, 0.87, 0.74].map((rho, li) => {
        const c = f * f * rho, pts = [];
        if (c >= 1) { for (let i = 0; i <= 120; i++) { const a = (i / 120) * 2 * Math.PI; pts.push([rho * Math.sin(-a), rho * Math.cos(a), a / f]); } return { pts, T: (2 * Math.PI) / f, n: 11 - li * 2 }; }
        const td = Math.acos(c); let x = rho * Math.sin(td), y = rho * Math.cos(td), tt = 0; const vx = -f * rho * Math.cos(td), vy = f * rho * Math.sin(td), x0 = x, y0 = y;
        pts.push([x, y, 0]);
        for (let i = 0; i < 4000; i++) { tt += 0.004; x = x0 + vx * tt; y = y0 + vy * tt - 0.5 * tt * tt; if (tt > 0.05 && x * x + y * y >= rho * rho) break; pts.push([x, y, tt]); }
        let al = Math.atan2(x, y); if (al < td) al += 2 * Math.PI;
        const steps = 80; for (let i = 0; i <= steps; i++) { const a = al - ((al - td) * i) / steps; pts.push([rho * Math.sin(a), rho * Math.cos(a), tt + (al - a) / f]); }
        return { pts, T: tt + (al - td) / f, n: 11 - li * 2 };
      });
    };
    const posAt = (p, tm) => { const u = ((tm % p.T) + p.T) % p.T, a = p.pts; let lo = 0, hi = a.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (a[m][2] <= u) lo = m; else hi = m; } const k = (u - a[lo][2]) / (a[hi][2] - a[lo][2] || 1); return [a[lo][0] + (a[hi][0] - a[lo][0]) * k, a[lo][1] + (a[hi][1] - a[lo][1]) * k]; };
    const css = (n) => getComputedStyle(el).getPropertyValue(n).trim();
    const draw = () => {
      const ink = css(mini ? '--on-steel' : '--ink'), dim = css(mini ? '--on-steel2' : '--ink3'), haz = css('--hazard');
      g.clearRect(0, 0, W, H); g.lineWidth = 5; g.strokeStyle = ink; g.beginPath(); g.arc(cx, cy, S * 1.09, 0, 7); g.stroke();
      g.lineWidth = 4; for (let i = 0; i < 12; i++) { const a = -t * f + (i * Math.PI) / 6; g.beginPath(); g.moveTo(cx + S * 1.09 * Math.sin(a), cy - S * 1.09 * Math.cos(a)); g.lineTo(cx + S * 1.02 * Math.sin(a), cy - S * 1.02 * Math.cos(a)); g.stroke(); }
      paths.forEach((p, li) => { g.fillStyle = li === 0 ? haz : dim; for (let i = 0; i < p.n; i++) { const [x, y] = posAt(p, t + (i * p.T) / p.n); g.beginPath(); g.arc(cx + x * S, cy - y * S, S * 0.055, 0, 7); g.fill(); } });
      const c = f * f; if (c < 1) { const td = Math.acos(c); g.strokeStyle = haz; g.lineWidth = 2; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + S * 1.09 * Math.sin(td), cy - S * 1.09 * Math.cos(td)); g.stroke(); g.setLineDash([]); }
    };
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const loop = (now) => { if (!el.isConnected) return; const dt = Math.min(0.05, (now - last) / 1000 || 0); last = now; t += dt * 2.6; draw(); requestAnimationFrame(loop); };
    wire(el, (v, set) => {
      f = v('bm-f') / 100; build();
      const n = el.querySelector('#bm-v');
      n.className = 'verdict ' + (f >= 1 ? 'no' : 'ok');
      n.textContent = f >= 1 ? 'Centrifuging: the outer balls ride round with the shell and nothing is ground.' : f < 0.55 ? 'Cascading: balls are lifted a little and roll back. Rubbing, not much impact.' : 'Cataracting: balls are thrown across the mill and strike the toe of the charge.';
      if (!mini) { const nc = 42.3 / Math.sqrt(v('bm-D') - v('bm-d') / 1000); set('bm-nc', f2(nc)); set('bm-n', f2(nc * f)); set('bm-a', f < 1 ? f2((Math.acos(f * f) * 180) / Math.PI, 1) + '°' : 'never'); }
      if (still) { t = 1.3; draw(); }
    });
    if (!still) requestAnimationFrame(loop);
  },
  circuit(el) {
    panel(el, 'Closed-circuit balance', `<div class="ctls">${rng('cc-F', 'Fresh feed F', 50, 500, 10, 100, 't/h')}${rng('cc-a', 'Oversize in crusher discharge', 10, 80, 1, 46, '%')}${rng('cc-e', 'Screen efficiency', 50, 99, 1, 85, '%')}
      <label class="ctl" for="cc-b"><span>Efficiency based on</span><select id="cc-b"><option value="0">oversize</option><option value="1">undersize</option></select></label></div>
      <div id="cc-svg"></div><div class="outs">${out('cc-C', 'circulating load, t/h', 1)}${out('cc-T', 'load on crusher and screen, t/h')}${out('cc-r', 'circulating load, % of feed')}${out('cc-o', 'older-deck definition, t/h')}</div><div class="verdict" id="cc-v"></div>`);
    wire(el, (v, set) => {
      const F = v('cc-F'), a = v('cc-a') / 100, e = v('cc-e') / 100, ub = el.querySelector('#cc-b').value === '1', n = el.querySelector('#cc-v');
      const C = ub ? F / (e * (1 - a)) - F : e > a ? (a * F) / (e - a) : Infinity, old = ub ? C : (e * a * F) / (1 - e * a);
      set('cc-C', f2(C, 1)); set('cc-T', f2(F + C, 1)); set('cc-r', f2((C / F) * 100, 0)); set('cc-o', f2(old, 1));
      n.className = 'verdict ' + (Number.isFinite(C) ? 'ok' : 'no');
      n.textContent = !Number.isFinite(C) ? 'No steady state: on the oversize basis the efficiency must exceed the oversize fraction, or the overflow could never be that impure.' : ub ? `Undersize in screen feed ${f2((1 - a) * (F + C), 1)} t/h, of which ${f2(F, 0)} t/h passes.` : `True oversize in screen feed ${f2(a * (F + C), 1)} t/h, carried in an overflow of ${f2(C, 1)} t/h.`;
      const cT = Number.isFinite(C) ? f2(C, 1) : '∞';
      el.querySelector('#cc-svg').innerHTML = `<svg viewBox="0 0 640 190" style="width:100%;max-width:640px;display:block">${DEF}
        ${AR(20, 110, 118, 110)}${T(24, 100, `Feed ${f2(F, 0)}`)}${BOX(120, 90, 120, 40, 'Crusher')}${AR(240, 110, 378, 110)}${T(309, 100, Number.isFinite(C) ? f2(F + C, 1) : '∞', 'text-anchor="middle"')}
        <rect x="380" y="90" width="120" height="40" rx="3" style="${st.h}"/>${T(440, 115, 'Screen', 'text-anchor="middle"')}
        <path d="M440 90V40H180v48" style="${st.a}" marker-end="url(#ah)"/>${T(310, 30, `Circulating load ${cT}`, 'text-anchor="middle"')}
        ${AR(500, 110, 600, 110)}${T(506, 100, `Product ${f2(F, 0)}`)}${Tm(309, 150, 'all flows in t/h', 'text-anchor="middle"')}</svg>`;
    });
  },
};
