// @ts-nocheck
// Episode 06 — Vasant Panchami (वसंत पंचमी)
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp, palace, cloud, lotus, moon, temple, chariot, horse, chip, pop, xdefs, rnd, blink, sway,
  MUNI, QUEEN, MAN, WOMAN, KRISH, axe,
  book, frame, bgPlain, bgCourt, bgForest, bgNight, diya, bubble, lying, couch,
} from './mb3';
import { RAM, baby, scroll } from './mb2';

type Fn = (lt: number, d: number) => string;
const mk = (fn: Fn, push = 0.035) => ({ dur }: { t0: number; dur: number }) => {
  const f = useCurrentFrame();
  const lt = f / 30, d = dur / 30;
  return (
    <Stage dur={dur} push={push}>
      <g dangerouslySetInnerHTML={{ __html: defs() + xdefs() + fn(lt, d) + frame() }} />
    </Stage>
  );
};
const glow = (x: number, y: number, r: number, o = 1) => `<circle cx="${x}" cy="${y}" r="${Math.max(1, r)}" fill="url(#glowY)" opacity="${o}"/>`;
const T = (x: number, y: number, txt: string, size = 34, col = INK, fam = 'NSB') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${fam}" font-weight="800" font-size="${size}" fill="${col}">${txt}</text>`;
const at = (lt: number, t: number, x: number, y: number, inner: string) => (lt > t ? `<g transform="translate(${x},${y}) scale(${pop(lt, t)})">${inner}</g>` : '');
const fade = (o: number, inner: string) => `<g opacity="${clamp(o).toFixed(3)}">${inner}</g>`;
const walk = (lt: number, on: boolean, k = 0) => (on ? 12 * Math.sin(lt * 7 + k) : 0);
const petals = (lt: number, seed = 3, n = 30, cols = [MC.saffron, MC.pink]) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const x0 = 30 + r() * 900, sp = 60 + r() * 60, ph = r() * 10; const y = ((lt * sp + r() * 500) % 460) + 20; const x = x0 + 20 * Math.sin(lt * 2 + ph); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="4" fill="${cols[i % cols.length]}" ${S(1.2)} transform="rotate(${((lt * 120 + ph * 40) % 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return g; };

// ---------- cast ----------
const BRAHMA = { skin: '#e9a56d', bun: true, bunColor: '#f4f1ea', beard: true, dhoti: MC.white, uttariya: MC.saffron };
const SARA = { female: true, skin: '#f7e8d6' };
const KUMB = { skin: '#6f8a5a', crown: 'king', beard: true, dhoti: MC.maroon, uttariya: INK };
const KALI = { skin: '#d9915a', dhoti: '#b0703a', uttariya: MC.green };
const PANDIT = { ...MUNI, skin: '#cf9060', dhoti: MC.saffron, uttariya: MC.white };
const KHUSRO = { skin: '#d9915a', dhoti: MC.white, uttariya: MC.yellow };
const YMAN = { ...MAN, dhoti: MC.yellow, uttariya: MC.yellow };
const YWOMAN = { ...WOMAN };
const GURU = { ...MUNI, skin: '#c58a5a' };
const YFLOW = `<g transform="translate(9,-175)">${[-18, 0, 18].map((x, i) => `<line x1="${x}" y1="0" x2="${x * 0.3}" y2="30" stroke="${MC.green}" stroke-width="4"/><circle cx="${x}" cy="${-4 - (i % 2) * 8}" r="11" fill="${MC.yellow}" ${S(2)}/><circle cx="${x}" cy="${-4 - (i % 2) * 8}" r="4" fill="${MC.saffron}"/>`).join('')}</g>`;
const QUILL = `<g transform="translate(9,-190) rotate(30)"><line x1="0" y1="0" x2="0" y2="-70" ${S(5)}/><path d="M0,-70 C20,-96 30,-120 24,-150 C6,-130 -6,-100 0,-70Z" fill="${MC.white}" ${S(3)}/></g>`;

// ---------- props ----------
const note = (x: number, y: number, s = 1, col = MC.red, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><ellipse rx="10" ry="7.5" fill="${col}" ${S(2.5)} transform="rotate(-20)"/><line x1="8" y1="-2" x2="8" y2="-36" ${S(3)}/><path d="M8,-36 q18,6 10,24" fill="none" ${S(3)}/></g>`;
const floatNotes = (lt: number, x: number, y: number, t0: number, n = 5, spread = 160) => {
  let g = ''; const cols = [MC.red, MC.blue, MC.pink, MC.saffron, MC.green];
  if (lt < t0) return g;
  for (let i = 0; i < n; i++) { const k = ((lt - t0) * 0.45 + i / n) % 1; const xx = x + (i - (n - 1) / 2) * (spread / n) + 26 * Math.sin(k * 7 + i * 2), yy = y - k * 240; g += `<g opacity="${(1 - k).toFixed(2)}">${note(xx, yy, 0.75 + 0.2 * (i % 2), cols[i % 5], 12 * Math.sin(k * 6 + i))}</g>`; }
  return g;
};
const veena = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-140" y="-9" width="270" height="18" rx="9" fill="${MC.maroon}" ${S(4)}/><ellipse cx="-150" cy="14" rx="40" ry="32" fill="${MC.red}" ${S(4)}/><ellipse cx="-150" cy="14" rx="22" ry="17" fill="url(#dotsW)" ${S(2)}/><ellipse cx="140" cy="-6" rx="30" ry="26" fill="${MC.yellow}" ${S(4)}/><path d="M168,-10 q22,-12 24,-34" fill="none" ${S(6)}/>` + [-4, 0, 4].map((o) => `<line x1="-120" y1="${o}" x2="130" y2="${o}" stroke="${MC.cream}" stroke-width="2"/>`).join('') + [-70, -30, 10, 50, 90].map((px) => `<circle cx="${px}" cy="0" r="3.5" fill="${MC.yellow}"/>`).join('') + `</g>`;
const mala = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` + Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI * 2 / 16; return `<circle cx="${(44 * Math.cos(a)).toFixed(1)}" cy="${(52 * Math.sin(a)).toFixed(1)}" r="9" fill="${i % 4 === 0 ? MC.red : MC.saffron}" ${S(2)}/>`; }).join('') + `<path d="M0,52 L0,86" ${S(4)}/><circle cy="92" r="9" fill="${MC.red}" ${S(2)}/></g>`;
const swan = (x: number, y: number, s = 1, t = 0, flip = false, dip = 0) => `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><path d="M-70,-30 C-80,10 -30,30 30,22 C70,16 80,-10 60,-34 C30,-24 -30,-20 -70,-30Z" fill="${MC.white}" ${S(4)}/><path d="M-60,-30 C-30,-70 10,-60 20,-30 C-10,-34 -30,-30 -60,-30Z" fill="#f0e8d8" ${S(3)}/><path d="M50,-26 C70,-60 ${70 + 20 * dip},${-110 + 70 * dip} ${66 + 20 * dip},${-124 + 100 * dip}" fill="none" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M50,-26 C70,-60 ${70 + 20 * dip},${-110 + 70 * dip} ${66 + 20 * dip},${-124 + 100 * dip}" fill="none" stroke="${MC.white}" stroke-width="20" stroke-linecap="round"/><g transform="translate(${66 + 20 * dip},${-124 + 100 * dip}) rotate(${dip * 50})"><circle r="17" fill="${MC.white}" ${S(3)}/><path d="M12,-4 L40,4 L12,10Z" fill="${MC.saffron}" ${S(3)}/><circle cx="4" cy="-4" r="3.5" fill="${INK}"/></g></g>`;
const wlotus = (x: number, y: number, s = 1, open = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [-70, -45, -22, 0, 22, 45, 70].map((a) => `<path d="M0,0 C-26,-36 -16,-86 0,-108 C16,-86 26,-36 0,0Z" fill="${MC.white}" ${S(3)} transform="rotate(${a * open})"/>`).join('') + `</g>`;
const kamandalu = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,-60 C-60,-30 -50,30 0,34 C50,30 60,-30 30,-60Z" fill="${MC.yellow}" ${S(4)}/><path d="M-18,-60 L-14,-84 L14,-84 L18,-60Z" fill="${MC.saffron}" ${S(4)}/><path d="M34,-24 C60,-30 76,-50 70,-70" fill="none" ${S(8)}/><path d="M-40,-20 Q0,0 40,-20" fill="none" stroke="${MC.red}" stroke-width="5" stroke-dasharray="3 9" stroke-linecap="round"/></g>`;
const kite = (x: number, y: number, s = 1, rot = 0, col = MC.red, t = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M0,-50 L34,0 L0,60 L-34,0Z" fill="${col}" ${S(3)}/><path d="M0,-50 L0,60 M-34,0 L34,0" ${S(2)}/><path d="M-34,0 L0,0 L0,-50Z" fill="${MC.yellow}" opacity=".85"/><path d="M0,60 q${14 * Math.sin(t * 5)},20 0,40 q${-14 * Math.sin(t * 5)},20 0,40 q${14 * Math.sin(t * 5)},20 0,40" fill="none" stroke="${INK}" stroke-width="3"/>` + [0, 1, 2].map((i) => `<path d="M-8,${74 + i * 40} l16,0 l-8,14Z" fill="${MC.pink}" ${S(1.5)}/>`).join('') + `</g>`;
const mount = (x: number, base: number, w: number, h: number, col = '#8a6a4a', snow = true) => `<path d="M${x - w},${base} L${x},${base - h} L${x + w},${base}Z" fill="${col}" ${S(4)}/>` + (snow ? `<path d="M${x - w * 0.22},${base - h * 0.78} L${x},${base - h} L${x + w * 0.22},${base - h * 0.78} L${x + w * 0.1},${base - h * 0.7} L${x},${base - h * 0.8} L${x - w * 0.1},${base - h * 0.7}Z" fill="${MC.white}" ${S(2.5)}/>` : '');
const river = (lt: number, y0 = 440, col = MC.blue, h = 70, sat = 1) => { let g = `<path d="M0,${y0} Q240,${y0 - 14} 480,${y0} T960,${y0} L960,${y0 + h} Q720,${y0 + h + 14} 480,${y0 + h} T0,${y0 + h}Z" fill="${col}" ${S(3)}/>`; if (sat) for (let i = 0; i < 6; i++) g += `<path d="M${-60 + ((i * 190 + lt * 70) % 1060)},${y0 + 20 + (i % 3) * 18} q20,-9 40,0 t40,0" fill="none" stroke="#bfdcf5" stroke-width="3"/>`; return g; };
const rings = (lt: number, t0: number, x: number, y: number, col = MC.yellow, n = 3, sp = 120) => { let g = ''; if (lt < t0) return g; for (let i = 0; i < n; i++) { const r = ((lt - t0) * sp + i * 60) % 240; g += `<circle cx="${x}" cy="${y}" r="${30 + r}" fill="none" stroke="${col}" stroke-width="4" opacity="${(1 - r / 240).toFixed(2)}"/>`; } return g; };
const sarasSeated = (x: number, y: number, s: number, lt: number, play = true, flip = false) =>
  glow(x, y - 60 * s, 170 * s, 0.65) +
  seated(SARA, x, y, s, flip, { armF: play ? -64 + sway(lt, 6, 5) : -40, armB: play ? -40 + sway(lt, 5, 4) : -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(x, y + 126 * s, s * 1.5) + veena(x + (flip ? 14 : -14) * s, y - 40 * s, s * 0.9, flip ? 28 : -28);
const idol = (x: number, y: number, s: number, lt: number) =>
  `<rect x="${x - 120 * s}" y="${y + 128 * s}" width="${240 * s}" height="${70 * s}" fill="${MC.maroon}" ${S(4)}/><rect x="${x - 110 * s}" y="${y + 134 * s}" width="${220 * s}" height="${16 * s}" fill="url(#tri)"/>` +
  `<circle cx="${x}" cy="${y - 150 * s}" r="${120 * s}" fill="${MC.yellow}" ${S(4)} opacity=".85"/><circle cx="${x}" cy="${y - 150 * s}" r="${104 * s}" fill="none" stroke="${MC.red}" stroke-width="3" stroke-dasharray="3 9"/>` +
  sarasSeated(x, y, s, lt, false) + garlandIcon(x, y - 110 * s, s);
const garlandIcon = (x: number, y: number, s: number) => Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.1 + 0.8 * i / 10); return `<circle cx="${(x + 60 * s * Math.cos(a)).toFixed(1)}" cy="${(y + 40 * s * Math.sin(a)).toFixed(1)}" r="${6 * s + 2}" fill="${i % 2 ? MC.saffron : MC.yellow}" ${S(1.8)}/>`; }).join('');
const sword = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) rotate(-35) scale(${s})"><path d="M-8,-90 L8,-90 L8,40 L-8,40Z" fill="#cfd6dc" ${S(4)}/><rect x="-30" y="40" width="60" height="12" fill="${MC.maroon}" ${S(3)}/><rect x="-7" y="52" width="14" height="40" fill="${MC.red}" ${S(3)}/></g>`;
const cross = (x: number, y: number, s = 1, col = MC.red) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-34,-34 L34,34 M34,-34 L-34,34" stroke="${col}" stroke-width="12" stroke-linecap="round"/></g>`;
const tick = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-34,0 L-10,26 L36,-30" fill="none" stroke="${MC.green}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const thali = (x: number, y: number, s = 1, kind = 'rice') => `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="110" ry="34" fill="#cfd6dc" ${S(4)}/><ellipse rx="92" ry="26" fill="${kind === 'rice' ? MC.white : '#e8ecef'}" ${S(2)}/>` + (kind === 'yellow' ? `<ellipse cx="-30" cy="-6" rx="46" ry="20" fill="${MC.yellow}" ${S(3)}/><ellipse cx="46" cy="-4" rx="30" ry="16" fill="${MC.saffron}" ${S(3)}/>` : kind === 'bhog' ? `<ellipse cx="-34" cy="-6" rx="40" ry="18" fill="#e8c48a" ${S(3)}/>` + [0, 1, 2].map((i) => `<circle cx="${28 + i * 22}" cy="${-6 + (i % 2) * 6}" r="11" fill="${MC.pink}" ${S(2.5)}/>`).join('') : '') + `</g>`;
const mustard = (lt: number, y0 = 330, seed = 4, n = 70) => { const r = rnd(seed); let g = `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="#8fb04a"/><rect x="0" y="${y0 - 6}" width="${W}" height="6" fill="${INK}"/>`; for (let i = 0; i < n; i++) { const x = 20 + r() * 920, y = y0 + 10 + r() * (H - y0 - 40), sw = 4 * Math.sin(lt * 2 + i); g += `<line x1="${x.toFixed(0)}" y1="${(y + 24).toFixed(0)}" x2="${(x + sw).toFixed(0)}" y2="${y.toFixed(0)}" stroke="${MC.green}" stroke-width="3"/><circle cx="${(x + sw).toFixed(0)}" cy="${y.toFixed(0)}" r="9" fill="${MC.yellow}" ${S(1.8)}/><circle cx="${(x + sw).toFixed(0)}" cy="${y.toFixed(0)}" r="3" fill="${MC.saffron}"/>`; } return g; };
const dawnSky = () => `<rect width="${W}" height="${H}" fill="url(#dawn)"/>`;
const greyOverlay = (o: number) => `<rect width="${W}" height="${H}" fill="#6b6f7a" opacity="${o.toFixed(2)}"/>`;
const sunRays = (x: number, y: number, lt: number, n = 14) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + lt * 0.15; return `<path d="M${x},${y} L${(x + 900 * Math.cos(a - 0.05)).toFixed(0)},${(y + 900 * Math.sin(a - 0.05)).toFixed(0)} L${(x + 900 * Math.cos(a + 0.05)).toFixed(0)},${(y + 900 * Math.sin(a + 0.05)).toFixed(0)}Z" fill="#fff2b0" opacity=".28"/>`; }).join('');
const qmark = (x: number, y: number, s = 1, col = MC.red) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="NSB" font-weight="800" font-size="${70 * s}" fill="${col}" stroke="${INK}" stroke-width="2">?</text>`;
const zz = (lt: number, x: number, y: number) => [0, 1, 2].map((i) => { const k = ((lt * 0.5 + i / 3) % 1); return `<text x="${x + k * 40}" y="${y - k * 90}" font-family="Hind" font-weight="700" font-size="${24 + k * 18}" fill="${MC.blue}" opacity="${(1 - k).toFixed(2)}">z</text>`; }).join('');
const panel = (x: number, y: number, w: number, h: number, inner: string, col = MC.cream) => `<g transform="translate(${x},${y})"><rect width="${w}" height="${h}" rx="18" fill="${col}" ${S(4)}/><rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="none" stroke="${MC.red}" stroke-width="2" stroke-dasharray="3 7"/>${inner}</g>`;
const dargah = (x: number, base: number, s = 1) => `<g transform="translate(${x},${base}) scale(${s})"><rect x="-130" y="-170" width="260" height="170" fill="${MC.cream}" ${S(5)}/><path d="M-90,-170 Q-90,-300 0,-310 Q90,-300 90,-170Z" fill="${MC.white}" ${S(5)}/><path d="M-90,-170 Q-90,-300 0,-310 Q90,-300 90,-170" fill="none" stroke="${MC.green}" stroke-width="6" stroke-dasharray="4 10"/><line x1="0" y1="-310" x2="0" y2="-345" ${S(4)}/><circle cy="-350" r="8" fill="${MC.yellow}" ${S(2)}/>` + [-150, 150].map((px) => `<rect x="${px - 14}" y="-260" width="28" height="260" fill="${MC.cream}" ${S(4)}/><path d="M${px - 18},-260 Q${px},-310 ${px + 18},-260Z" fill="${MC.green}" ${S(3)}/>`).join('') + `<path d="M-40,0 L-40,-90 Q0,-130 40,-90 L40,0Z" fill="${MC.green}" ${S(4)}/></g>`;

// =============== scenes ===============
// 1  (0–9) the world is made: mountains, river, trees, creatures, people
const A1 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + sunFace(800, 110, 36);
  g += at(lt, 2.6, 0, 0, mount(200, FL - 40, 190, 230) + mount(430, FL - 40, 150, 170, '#9a7a52') + mount(740, FL - 40, 180, 200));
  if (lt > 4.0) g += fade(prog(lt, 4.0, 4.8), river(lt, 436, MC.blue, 70));
  if (lt > 5.3) { g += at(lt, 5.3, 80, FL + 4, tree(0, 0, 0.55)) + at(lt, 5.6, 880, FL + 4, tree(0, 0, 0.55)); g += at(lt, 6.0, 330, 130, bird(0, 0, 0.5, Math.sin(lt * 6))) + at(lt, 6.3, 620, 100, bird(0, 0, 0.45, Math.cos(lt * 6))) + at(lt, 6.2, 560, 480, fish(0, 0, 0.4, 0)); }
  if (lt > 6.6) g += fade(prog(lt, 6.6, 7.2), fig(MAN, 380, FL + 50, 0.3, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }) + fig(WOMAN, 460, FL + 50, 0.3, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }));
  return g;
});
// 2  (9–17.4) everything is silent
const A2 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="#d9d4cc"/><rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#b8b2a8"/>`;
  g += mount(210, FL - 40, 190, 230, '#9a968f') + mount(700, FL - 40, 200, 210, '#a4a098');
  g += river(0, 440, '#8c98a4', 70, 0);
  g += bird(330, 150, 0.5, 0) + bird(600, 190, 0.45, 0) + tree(100, FL + 4, 0.5) + tree(880, FL + 4, 0.5);
  g += greyOverlay(0.18);
  // mute note (no song)
  g += at(lt, 2.7, 480, 250, `<g>${note(0, 20, 2, '#8a8a8a')}${cross(0, -10, 1.8)}</g>`);
  // no wind
  if (lt > 5.4) g += at(lt, 5.4, 800, 300, `<path d="M-70,-20 q30,-30 60,0 t60,0 M-80,20 q30,-30 60,0 t70,0" fill="none" stroke="#7a7f88" stroke-width="6" stroke-linecap="round"/>${cross(0, 0, 1.2)}`);
  return g;
});
// 3  (17.4–26.8) Brahma worried on a lotus
const A3 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#fbe9c4') + glow(480, 250, 280, 0.5);
  g += seated(BRAHMA, 480, FL - 130, 0.62, false, { armF: lt > 3.4 ? -50 : 8, armB: -6, headTilt: 10 + sway(lt, 3, 2), eyeOpen: blink(lt) }, {}, MC.white) + wlotus(480, FL - 40, 1.0);
  g += at(lt, 0.6, 330, 150, qmark(0, 0, 1.0)) + at(lt, 1.2, 640, 120, qmark(0, 0, 0.7, MC.maroon));
  if (lt > 3.4) g += at(lt, 3.4, 760, 150, `<g opacity=".7">${note(0, 20, 1.6, '#b3b3b3')}</g><circle cx="0" cy="-4" r="52" fill="none" stroke="${MC.red}" stroke-width="5" stroke-dasharray="6 8"/>`);
  if (lt > 6.8) g += at(lt, 6.8, 480, 470, chip(0, 0, 'आवाज़', MC.red, 30));
  return g;
}, 0.04);
// 4  (26.8–34.2) title
const A4 = mk((lt) => {
  let g = dawnSky() + sunFace(480, 110, 46) + glow(480, 250, 260, 0.6);
  g += sarasSeated(480, FL - 130, 0.5, lt) + floatNotes(lt, 480, 330, 0.2, 6, 260);
  g += at(lt, 5.8, 480, 490, `<rect x="-230" y="-70" width="460" height="100" rx="22" fill="${MC.cream}" ${S(5)}/>` + T(0, 0, 'वसंत पंचमी', 66, MC.maroon));
  return g;
});
// 5  (34.2–46.9) the story appears in different forms; Brahma creates, earth feels sad
const A5 = mk((lt) => {
  let g = '';
  if (lt < 4.6) {
    g += bgPlain('#f3dfb3', '#c9a25e') + glow(480, 250, 260, 0.5);
    for (let i = 0; i < 3; i++) g += at(lt, 0.6 + i * 0.6, 270 + i * 210, 290 + (i % 2) * 14, `<g transform="rotate(${(i - 1) * 8})">${book(0, 0, 0.8, 0)}</g>`);
    g += at(lt, 2.2, 480, 120, chip(0, 0, 'पुराण', MC.red, 30));
  } else {
    g += bgPlain('#f1e7cf', '#cdb98c') + mount(180, FL - 40, 170, 190, '#9a968f') + mount(780, FL - 40, 170, 170, '#a4a098');
    g += fig(BRAHMA, 480, FL + 40, 0.5, false, { armF: lt > 4.9 ? -60 + sway(lt, 6, 4) : 8, armB: -6, eyeOpen: blink(lt) });
    const kids = [[250, MAN], [330, WOMAN], [650, WOMAN], [730, MAN]];
    kids.forEach(([x, o], i) => { g += fade(prog(lt, 7.5 + i * 0.25, 8.0 + i * 0.25), fig(o, x, FL + 50, 0.3, i > 1, { armF: 8, armB: -6 })); });
    g += at(lt, 7.6, 160, 380, bird(0, 0, 0.5, 0)) + at(lt, 7.9, 820, 330, fish(0, 0, 0.45, 0));
    g += greyOverlay(0.22 * prog(lt, 9.9, 11.5));
  }
  return g;
});
// 6  (46.9–54.3) sprinkles water; goddess appears
const A6 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#c9a25e') + wlotus(700, FL + 10, 1.3, 0.6 + 0.4 * prog(lt, 3.6, 5));
  const arm = lt < 3.2 ? lerp(8, -75, ease(prog(lt, 0.3, 1.2))) : -75;
  g += fig(BRAHMA, 260, FL + 40, 0.56, false, { armF: arm, armB: -6, eyeOpen: blink(lt) });
  g += kamandalu(260 + 90, FL + 40 - 190 * 0.56 * 1.35 + 20, 0.5);
  if (lt > 0.6) for (let i = 0; i < 9; i++) { const k = ((lt - 0.6) * 0.7 + i / 9) % 1; if (lt > 3.4 && k > 0.95) continue; const x = 370 + k * 300, y = 250 + 160 * k * k - 110 * k; g += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="5" ry="8" fill="#9cc3ea" ${S(1.6)} opacity="${(0.4 + 0.6 * (1 - k)).toFixed(2)}"/>`; }
  if (lt > 3.8) { const k = ease(prog(lt, 3.8, 5.8)); g += glow(700, 300, 200 * k, 0.9); g += fade(k, seated(SARA, 700, FL - 150 - 60 * (1 - k), 0.5, true, { armF: -50, armB: -6, eyeOpen: blink(lt) }, {}, MC.white)) + wlotus(700, FL - 20, 1.2); }
  return g;
});
// 7  (54.3–62.9) veena, book, mala; white lotus
const A7 = mk((lt) => {
  let g = bgPlain('#f7ecd6', '#f7ecd6') + glow(480, 270, 300, 0.55);
  g += seated(SARA, 480, FL - 140, 0.62, false, { armF: -40, armB: -20, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(480, FL - 30, 1.2);
  g += at(lt, 0.7, 260, 270, veena(0, 0, 0.8, -50)) + at(lt, 2.6, 700, 210, book(0, 0, 0.6, 0.4)) + at(lt, 4.0, 690, 360, mala(0, 0, 1.2));
  if (lt > 5.3) { g += rings(lt, 5.3, 480, 380, MC.white, 3, 90); for (let i = 0; i < 8; i++) { const a = lt * 1.2 + i; g += `<circle cx="${(480 + 190 * Math.cos(a + i)).toFixed(0)}" cy="${(300 + 120 * Math.sin(a * 1.3 + i)).toFixed(0)}" r="${3 + (i % 3)}" fill="${MC.yellow}" opacity=".9"/>`; } }
  return g;
});
// 8  (62.9–68.2) Brahma asks her to give voice
const A8 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#c9a25e') + glow(700, 300, 240, 0.5);
  g += fig(BRAHMA, 230, FL + 40, 0.56, false, { armF: lt > 0.8 ? -100 : 8, armB: lt > 0.8 ? -100 : -6, headTilt: 6, eyeOpen: blink(lt) });
  g += seated(SARA, 700, FL - 140, 0.6, false, { armF: -50, armB: -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(700, FL - 30, 1.2);
  g += at(lt, 1.6, 330, 150, `<g transform="scale(1)"><rect x="-70" y="-44" width="140" height="80" rx="26" fill="${MC.cream}" ${S(3)}/><path d="M-30,36 L-50,64 L-6,36Z" fill="${MC.cream}" ${S(3)}/><g transform="translate(0,8)">${note(0, 10, 1.1, MC.red)}</g>${rings(0, 0, 0, 0, MC.red, 0)}</g>`);
  return g;
});
// 9  (68.2–74.0) veena plucked; world wakes up
const A9 = mk((lt) => {
  let g = lt < 3.2 ? bgPlain('#f1e7cf', '#cdb98c') + greyOverlay(0.2) : bgPlain('#fff0c8', '#e0b36a') + glow(480, 250, 320, 0.7);
  if (lt >= 3.2) g += mount(150, FL - 40, 150, 160, '#b88a5a') + mount(820, FL - 40, 150, 170, '#b88a5a') + river(lt, 450, MC.blue, 60) + at(lt, 3.5, 100, 140, bird(0, 0, 0.5, Math.sin(lt * 7))) + at(lt, 3.7, 860, 120, bird(0, 0, 0.5, Math.cos(lt * 7)));
  g += sarasSeated(480, FL - 130, 0.6, lt) + floatNotes(lt, 480, 300, 0.9, 6, 300);
  if (lt > 3.2) g += rings(lt, 3.3, 480, 300, MC.pink, 3, 200) + petals(lt, 5, 24, [MC.pink, MC.yellow]);
  return g;
});
// 10 (74–82.6) river, wind, birds, human speech
const A10 = mk((lt) => {
  let g = bgPlain('#fff0c8', '#e0b36a') + sunFace(480, 100, 38) + mount(140, FL - 40, 170, 180, '#b88a5a') + mount(820, FL - 40, 170, 190, '#b88a5a');
  g += river(lt, 430, MC.blue, 80);
  g += floatNotes(lt, 200, 440, 0.6, 3, 200);
  if (lt > 2.4) g += at(lt, 2.4, 480, 220, `<path d="M-120,0 q40,-40 80,0 t80,0 t80,0 M-100,36 q40,-40 80,0 t80,0" fill="none" stroke="#8fc0e4" stroke-width="7" stroke-linecap="round"/>`) + `<g opacity=".8">${note(300 + 20 * Math.sin(lt * 3), 180, 0.9, MC.blue)}</g>`;
  if (lt > 4.2) for (let i = 0; i < 4; i++) g += at(lt, 4.2 + i * 0.2, 150 + i * 190 + 30 * Math.sin(lt * 3 + i), 150 + 30 * Math.sin(lt * 5 + i), bird(0, 0, 0.5, Math.sin(lt * 9 + i)));
  if (lt > 6.0) g += fig(MAN, 700, FL + 60, 0.4, true, { armF: -60, armB: -6, eyeOpen: blink(lt) }) + fig(WOMAN, 800, FL + 70, 0.38, true, { armF: 8, armB: -6 }) + at(lt, 6.4, 640, 190, `<rect x="-60" y="-40" width="120" height="76" rx="26" fill="${MC.cream}" ${S(3)}/><path d="M20,36 L40,64 L-16,36Z" fill="${MC.cream}" ${S(3)}/>${note(0, 14, 1.0, MC.green)}`);
  return g;
});
// 11 (82.6–89.2) named Saraswati
const A11 = mk((lt) => {
  let g = dawnSky() + sunFace(480, 110, 46) + glow(480, 280, 300, 0.6) + sunRays(480, 130, lt, 12);
  g += sarasSeated(480, FL - 120, 0.6, lt) + floatNotes(lt, 480, 330, 0.3, 5, 300);
  g += at(lt, 0.6, 480, 500, `<rect x="-170" y="-60" width="340" height="86" rx="20" fill="${MC.cream}" ${S(5)}/>` + T(0, 0, 'सरस्वती', 62, MC.maroon));
  if (lt > 3.4) g += at(lt, 3.4, 200, 300, book(0, 0, 0.5, 0.3)) + at(lt, 3.9, 780, 300, veena(0, 0, 0.6, -40));
  return g;
});
// 12 (89.2–96.2) stories differ
const A12 = mk((lt) => {
  let g = bgPlain('#f3dfb3', '#c9a25e') + glow(480, 220, 220, 0.5);
  g += seated(SARA, 480, FL - 190, 0.45, false, { armF: -40, armB: -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(480, FL - 100, 0.9);
  const xs = [190, 480, 770];
  xs.forEach((x, i) => { g += at(lt, 1.0 + i * 0.35, x, 440, `<g transform="rotate(${(i - 1) * 6})">${book(0, 0, 0.55, 0)}</g>`); });
  g += at(lt, 3.2, 480, 130, qmark(0, 0, 0.9, MC.maroon));
  if (lt > 3.2) for (const x of xs) g += `<path d="M${x},${400} Q${(x + 480) / 2},300 480,${300}" fill="none" stroke="${MC.red}" stroke-width="3" stroke-dasharray="4 8" opacity=".7"/>`;
  return g;
});
// 13 (96.2–104.9) three versions: from mouth, her power, as daughter
const A13 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#f7e2b0');
  const p1 = `<g transform="translate(135,330)">${glow(0, -20, 90, 0.5)}${fig(BRAHMA, 0, 40, 0.42, false, { armF: 8, armB: -6, eyeOpen: blink(lt) })}${lt > 0.9 ? `<g transform="translate(60,-120)">${note(0, 0, 0.9, MC.red)}${fade(prog(lt, 0.9, 1.6), `<path d="M-6,-6 C20,-24 40,-30 70,-20" fill="none" stroke="${MC.yellow}" stroke-width="6" stroke-dasharray="6 8"/>`)}</g>` : ''}</g>`;
  const p2 = `<g transform="translate(135,320)">${glow(0, -20, 90, 0.5 + 0.3 * Math.sin(lt * 4))}${fig(BRAHMA, -40, 50, 0.4, false, { armF: 8, armB: -6 })}<g transform="translate(60,-80) scale(${0.8 + 0.1 * Math.sin(lt * 4)})">${glow(0, 0, 60, 1)}<circle r="22" fill="${MC.white}" ${S(3)}/>${note(0, 10, 0.8, MC.red)}</g></g>`;
  const p3 = `<g transform="translate(135,330)">${fig(BRAHMA, -50, 40, 0.42, false, { armF: 8, armB: -6, eyeOpen: blink(lt) })}${fig(SARA, 60, 40, 0.3, true, { armF: -50, armB: -6, eyeOpen: blink(lt + 1) })}</g>`;
  g += at(lt, 0.4, 0, 0, panel(40, 120, 270, 360, p1)) + at(lt, 3.8, 0, 0, panel(345, 120, 270, 360, p2)) + at(lt, 5.8, 0, 0, panel(650, 120, 270, 360, p3));
  return g;
}, 0.02);
// 14 (104.9–115.6) Brahmavaivarta: Krishna worships on Magha shukla panchami
const A14 = mk((lt) => {
  let g = bgPlain('#e9f0f8', '#c9a25e') + glow(700, 270, 220, 0.5);
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'ब्रह्मवैवर्त पुराण', MC.blue, 26));
  if (lt > 0.4) g += at(lt, 3.7, 0, 0, '') + fig(KRISH, lerp(-60, 270, ease(prog(lt, 0.4, 3.6))), FL + 40, 0.52, false, { armF: lt > 3.7 ? -70 + sway(lt, 6, 4) : 8, armB: -6, legSwing: walk(lt, lt < 3.6), eyeOpen: blink(lt) }, lt > 3.7 ? { handItem: `<g transform="translate(9,-185)">${[-24, 0, 24].map((a) => `<path d="M0,0 C-10,-16 -8,-40 0,-50 C8,-40 10,-16 0,0Z" fill="${MC.pink}" ${S(2)} transform="rotate(${a})"/>`).join('')}</g>` } : {});
  g += seated(SARA, 700, FL - 150, 0.55, false, { armF: lt > 3.7 ? -70 : -40, armB: -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(700, FL - 40, 1.1);
  if (lt > 3.9) for (let i = 0; i < 6; i++) { const k = clamp((lt - 3.9 - i * 0.15) / 1.4); g += `<circle cx="${lerp(380, 640, k).toFixed(0)}" cy="${(300 - 70 * Math.sin(Math.PI * k)).toFixed(0)}" r="6" fill="${i % 2 ? MC.pink : MC.yellow}" ${S(1.5)} opacity="${k > 0 && k < 1 ? 1 : 0}"/>`; }
  if (lt > 7.2) g += at(lt, 7.2, 860, 110, moon(0, 0, 40, 0.2) + [0, 1, 2, 3, 4].map((i) => `<circle cx="${-48 + i * 24}" cy="66" r="7" fill="${MC.yellow}" ${S(2)}/>`).join(''));
  return g;
});
// 15 (115.6–122.6) Krishna's boon: people worship her idol on this day
const A15 = mk((lt) => {
  let g = bgPlain('#fff0c8', '#e0b36a') + idol(480, FL - 150, 0.62, lt);
  g += fig(KRISH, 200, FL + 40, 0.5, false, { armF: -75 + sway(lt, 5, 3), armB: -6, eyeOpen: blink(lt) }) + at(lt, 0.2, 200, 120, glow(0, 0, 70, 0.9));
  if (lt > 3.5) { const ppl = [[690, MAN, true], [780, WOMAN, true], [860, MAN, true]]; ppl.forEach(([x, o, f], i) => { g += fade(prog(lt, 3.5 + i * 0.3, 4 + i * 0.3), fig(o, x, FL + 40 + i * 6, 0.4, f, { armF: -100, armB: -100, eyeOpen: blink(lt + i) })); }); g += at(lt, 4.2, 330, 480, diya(0, 0, 0.9, lt)) + at(lt, 4.5, 630, 480, diya(0, 0, 0.9, lt + 1)); }
  return g;
});
// 16 (122.6–129.2) many forms, one feeling
const A16 = mk((lt) => {
  let g = dawnSky() + glow(480, 270, 300, 0.6);
  const cols = [MC.red, MC.green, MC.blue];
  cols.forEach((c, i) => { if (lt > 0.3 + i * 0.4) { const k = prog(lt, 0.3 + i * 0.4, 2.8 + i * 0.3); const sx = [100, 480, 860][i], sy = [120, 60, 120][i]; g += `<path d="M${sx},${sy} C${sx},${300} 480,${200} 480,${300}" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="${(1000 * (1 - k)).toFixed(0)}"/>`; } });
  g += sarasSeated(480, FL - 100, 0.58, lt, true) + at(lt, 3.9, 480, 470, glow(0, 0, 120, 0.6) + `<text x="0" y="14" text-anchor="middle" font-size="64" fill="${MC.red}" font-family="NSB" font-weight="800">♥</text>`);
  if (lt > 3.9) g += rings(lt, 3.9, 480, 330, MC.yellow, 3, 140);
  return g;
});
// 17 (129.2–138.4) Rigveda river Saraswati
const A17 = mk((lt) => {
  let g = bgPlain('#fff0c8', '#cfe3a8') + sunFace(840, 100, 34);
  g += at(lt, 0.3, 140, 90, scroll(0, 0, 150, 120, '', [], MC.red).replace(/<text[^>]*>.*?<\/text>/g, '')) + at(lt, 0.4, 140, 250, chip(0, 0, 'ऋग्वेद', MC.red, 26));
  if (lt > 3.0) {
    const k = ease(prog(lt, 3.0, 4.6));
    g += `<g opacity="${k.toFixed(2)}">` + mount(180, 360, 190, 170, '#a58a64') + mount(400, 360, 150, 120, '#b49a74');
    g += `<path d="M300,330 C340,370 280,400 380,420 C500,440 420,480 600,490 C760,498 760,520 960,500 L960,540 L0,540 L0,500 C200,490 220,470 200,440 C150,400 260,380 300,330Z" fill="${MC.blue}" ${S(3)}/>`;
    for (let i = 0; i < 9; i++) { const t = ((lt * 0.3 + i / 9) % 1); g += `<path d="M${(300 + 660 * t).toFixed(0)},${(380 + 112 * ease(t)).toFixed(0)} q10,-8 20,0 t20,0" fill="none" stroke="#bfdcf5" stroke-width="3"/>`; }
    g += `</g>`;
  }
  if (lt > 6.8) g += at(lt, 6.8, 700, 200, lotus(0, 40, 1.1, 1) + `<path d="M-60,-80 L-30,-130 L0,-90 L30,-130 L60,-80Z" fill="${MC.yellow}" ${S(4)}/>`) + glow(700, 210, 110, 0.6);
  return g;
});
// 18 (138.4–149.9) Vak hymn; river and speech flow into one goddess
const A18 = mk((lt) => {
  let g = '';
  if (lt < 4.8) {
    g += bgPlain('#f7e2b0', '#c9a25e') + fig(MUNI, 330, FL + 40, 0.56, false, { armF: -70 + sway(lt, 5, 5), armB: -6, eyeOpen: blink(lt) });
    g += rings(lt, 0.3, 420, 250, MC.red, 3, 120) + floatNotes(lt, 480, 250, 0.6, 4, 220);
    g += at(lt, 0.4, 700, 300, `<g>${chip(0, 0, 'वाक्', MC.red, 40)}</g>`);
  } else {
    g += bgPlain('#fff0c8', '#e0b36a') + glow(620, 270, 250, 0.7);
    g += `<path d="M0,430 C200,380 300,470 470,380" fill="none" stroke="${MC.blue}" stroke-width="${44}" stroke-linecap="round" opacity="${prog(lt, 4.8, 5.8).toFixed(2)}"/>`;
    g += `<path d="M0,330 q60,-60 120,0 t120,0 t110,-20" fill="none" stroke="${MC.red}" stroke-width="10" stroke-linecap="round" opacity="${prog(lt, 5.0, 6.0).toFixed(2)}"/>`;
    for (let i = 0; i < 8; i++) { const k = ((lt * 0.35 + i / 8) % 1); g += `<circle cx="${(30 + 470 * k).toFixed(0)}" cy="${(i % 2 ? 330 - 30 * Math.sin(k * 6) + 40 * k : 420 - 40 * k).toFixed(0)}" r="8" fill="${i % 2 ? MC.pink : '#bfdcf5'}" ${S(1.5)}/>`; }
    g += fade(prog(lt, 6.5, 8.5), sarasSeated(640, FL - 120, 0.6, lt, true));
  }
  if (lt > 9.8) g += at(lt, 9.8, 160, 140, fig(MUNI, 0, 140, 0.2, false, { armF: 8, armB: -6 }) + book(60, 100, 0.25, 0));
  return g;
});
// 19 (149.9–162.4) meaning of each symbol
const A19 = mk((lt) => {
  let g = bgPlain('#fbf0d8', '#fbf0d8') + glow(480, 300, 260, 0.5);
  g += seated(SARA, 480, FL - 150, 0.6, false, { armF: -40, armB: -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(480, FL - 40, 1.2);
  const item = (t0: number, x: number, y: number, inner: string) => (lt > t0 ? glow(x, y, 120 * ease(prog(lt, t0, t0 + 0.6)) + 4, 0.7) + at(lt, t0, x, y, inner) + rings(lt, t0, x, y, MC.yellow, 1, 100) : '');
  g += item(4.7, 190, 250, veena(0, 0, 0.8, -35)) + item(8.0, 770, 250, book(0, 0, 0.6, 0)) + item(9.9, 480, 110, mala(0, 0, 1.1));
  if (lt > 4.9) g += floatNotes(lt, 190, 300, 4.9, 3, 100);
  return g;
});
// 20 (162.4–176.5) swan: milk and water; white colour
const A20 = mk((lt) => {
  let g = bgPlain('#e8f3fa', '#bcd7ea');
  g += `<ellipse cx="480" cy="${FL + 30}" rx="460" ry="60" fill="${MC.blue}" ${S(3)} opacity=".55"/>`;
  g += at(lt, 0.5, 480, FL - 20, swan(0, 0, 1.4, lt)) ;
  if (lt > 2.7) {
    const dip = lt > 4.0 ? Math.min(1, prog(lt, 4.0, 5.2)) : 0;
    g = bgPlain('#e8f3fa', '#bcd7ea') + glow(480, 250, 240, 0.4) + swan(300, FL - 20, 1.3, lt, false, dip * 0.5);
    g += `<g transform="translate(700,${FL - 20})"><path d="M-80,-100 L-70,0 L70,0 L80,-100Z" fill="#fff" ${S(4)} opacity=".95"/><path d="M-76,-60 L-70,0 L70,0 L76,-60Z" fill="${MC.blue}" opacity=".7"/><path d="M-78,-84 L-76,-60 L76,-60 L78,-84Z" fill="${MC.white}"/></g>`;
    if (lt > 4.0) g += `<g transform="translate(700,${FL - 120})" opacity="${prog(lt, 4.2, 5.4).toFixed(2)}"><circle r="20" fill="${MC.white}" ${S(2)}/><text y="8" text-anchor="middle" font-size="20" font-family="Hind" font-weight="700">दूध</text></g>`;
  }
  if (lt > 7.1) g += at(lt, 7.1, 300, 120, tick(0, 0, 1.6)) + at(lt, 7.5, 660, 120, cross(0, 0, 1.4)) + at(lt, 8.1, 480, 120, `<path d="M-30,0 L30,0" ${S(6)}/>`);
  if (lt > 10.5) g += `<rect width="${W}" height="${H}" fill="#fff" opacity="${(0.55 * ease(prog(lt, 10.5, 11.8))).toFixed(2)}"/>` + wlotus(480, 360, 1.3, 1) + glow(480, 280, 180, 0.8);
  return g;
});
// 21 (176.5–186.5) no sword — only veena & book
const A21 = mk((lt) => {
  let g = bgPlain('#fbf0d8', '#fbf0d8') + glow(480, 280, 260, 0.5);
  g += seated(SARA, 480, FL - 150, 0.58, false, { armF: lt > 3.4 ? -55 : -30, armB: -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(480, FL - 40, 1.15);
  g += at(lt, 0.4, 190, 250, sword(0, 0, 1.2) + cross(0, 0, 2.2));
  if (lt > 3.4) g += at(lt, 3.4, 770, 240, veena(0, 0, 0.7, -30)) + at(lt, 3.8, 770, 380, book(0, 0, 0.45, 0.4)) + glow(770, 300, 140, 0.4);
  if (lt > 5.6) g += at(lt, 5.6, 480, 500, chip(0, 0, 'समझ ही ताक़त', MC.red, 30));
  return g;
});
// 22 (186.5–190.5) Ramayana bridge
const A22 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + glow(480, 250, 260, 0.5);
  g += fig(RAM, 320, FL + 40, 0.55, false, { armF: -50, armB: -6, eyeOpen: blink(lt) }) + at(lt, 0.2, 640, 270, scroll(0, 0, 180, 180, '', [], MC.red).replace(/<text[^>]*>.*?<\/text>/g, ''));
  g += at(lt, 0.2, 480, 80, chip(0, 0, 'रामायण', MC.red, 32));
  return g;
}, 0.05);
// 23 (190.5–204.9) Kumbhakarna asks Brahma for a boon; Saraswati sits on his tongue
const A23 = mk((lt) => {
  let g = bgPlain('#f6e7c1', '#c9a25e') + glow(710, 250, 200, 0.4);
  g += at(lt, 0.1, 160, 90, chip(0, 0, 'उत्तरकांड', MC.red, 24));
  g += seated(BRAHMA, 730, FL - 150, 0.55, false, { armF: lt > 3.4 ? -50 : 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.white) + wlotus(730, FL - 40, 1.1);
  const kx = lerp(-80, 290, ease(prog(lt, 2.8, 5.2)));
  if (lt > 2.8) g += fig(KUMB, kx, FL + 60, 0.62, false, { armF: lt > 5.4 ? -100 : 8, armB: lt > 5.4 ? -100 : -6, legSwing: walk(lt, lt < 5.2), eyeOpen: blink(lt) });
  if (lt > 7.1) g += at(lt, 7.1, 480, 120, cloud(0, 0, 0.9, '#e8eef6') + fig(MAN, -50, 66, 0.15, false, { armF: 8, armB: -6, headTilt: 12 }) + fig(WOMAN, 0, 66, 0.15, false, { armF: 8, armB: -6 }) + fig(MUNI, 50, 66, 0.15, false, { armF: 8, armB: -6, headTilt: 10 }) + qmark(0, -50, 0.5));
  if (lt > 11.1) { const k = ease(prog(lt, 11.1, 13.0)); const mx = kx + 60 * 0.62 * 1.0 + 8, my = FL + 60 - 440 * 0.62; const px = lerp(480, mx, k), py = lerp(190, my, k) - 40 * Math.sin(Math.PI * k); g += glow(px, py, 40, 1) + `<g transform="translate(${px},${py}) scale(${lerp(0.9, 0.35, k)})">${seated(SARA, 0, 0, 0.3, false, { armF: -40, armB: -6 }, {}, MC.white)}</g>`; }
  return g;
});
// 24 (204.9–211.95) wanted another thing, words came different; long sleep
const A24 = mk((lt) => {
  let g = bgPlain('#f6e7c1', '#c9a25e');
  if (lt < 4.3) {
    g += fig(KUMB, 380, FL + 60, 0.66, false, { armF: 8, armB: -6, headTilt: lt > 2.8 ? 14 : 0, eyeOpen: blink(lt) });
    const icon = lt < 2.8 ? `<g><path d="M-36,10 L-30,-24 L-14,0 L0,-34 L14,0 L30,-24 L36,10Z" fill="${MC.yellow}" ${S(3)}/><rect x="-38" y="10" width="76" height="12" fill="${MC.saffron}" ${S(3)}/></g>` : `<g><rect x="-42" y="-10" width="84" height="30" rx="8" fill="${MC.red}" ${S(3)}/><rect x="-42" y="-24" width="30" height="20" rx="8" fill="${MC.white}" ${S(3)}/></g>`;
    g += at(lt, 0.4, 640, 190, `<rect x="-70" y="-50" width="140" height="90" rx="26" fill="${MC.cream}" ${S(3)}/><path d="M-30,40 L-50,70 L-6,40Z" fill="${MC.cream}" ${S(3)}/>${icon}`);
    if (lt > 2.8) g += `<circle cx="640" cy="${190 + 6}" r="76" fill="none" stroke="${MC.red}" stroke-width="3" stroke-dasharray="4 8" opacity="${(0.5 + 0.5 * Math.sin(lt * 8)).toFixed(2)}"/>`;
  } else {
    g += couch(480, FL - 5, 1.15) + lying(KUMB, 360, FL - 75, 0.5) + zz(lt, 640, 300) + at(lt, 4.4, 800, 140, moon(0, 0, 44, 0.3));
  }
  return g;
});
// 25 (211.95–218.2) reverse the speech and the whole story changes
const A25 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#c9a25e') + glow(480, 250, 250, 0.4);
  const rot = 180 * ease(prog(lt, 2.4, 4.4));
  g += `<g transform="translate(480,250) rotate(${rot})"><path d="M-160,0 L120,0" stroke="${MC.red}" stroke-width="22" stroke-linecap="round"/><path d="M80,-50 L170,0 L80,50Z" fill="${MC.red}" ${S(4)}/></g>`;
  g += `<g transform="translate(480,250)">${rings(lt, 0, 0, 0, MC.yellow, 2, 60)}</g>`;
  g += at(lt, 0.2, 200, 420, book(0, 0, 0.5, 0)) + at(lt, 4.4, 760, 420, `<g transform="rotate(${-10})">${book(0, 0, 0.5, 0.5)}</g>`);
  g += at(lt, 0.4, 480, 440, `<g transform="scale(.9)">${fig(KUMB, 0, 70, 0.3, false, { armF: 8, armB: -6 })}</g>`);
  return g;
});
// 26 (218.2–229.25) calendar: Magha shukla panchami; 11 February 2027
const A26 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#fbe9c4') + glow(480, 280, 300, 0.4) + sunFace(160, 130, 34);
  g += at(lt, 2.1, 160, 330, moon(0, 0, 54, 0.2) + [0, 1, 2, 3, 4].map((i) => `<circle cx="${-50 + i * 25}" cy="86" r="8" fill="${MC.yellow}" ${S(2)}/>`).join(''));
  const flip = ease(prog(lt, 8.2, 8.8));
  g += `<g transform="translate(560,300)"><rect x="-190" y="-220" width="380" height="400" rx="20" fill="${MC.cream}" ${S(5)}/><rect x="-190" y="-220" width="380" height="84" rx="20" fill="${MC.red}" ${S(5)}/><circle cx="-90" cy="-224" r="10" fill="${INK}"/><circle cx="90" cy="-224" r="10" fill="${INK}"/>` + Array.from({ length: 35 }, (_, i) => `<rect x="${-160 + (i % 7) * 46}" y="${-110 + Math.floor(i / 7) * 52}" width="38" height="42" rx="6" fill="${MC.white}" ${S(2)}/>`).join('') + (lt > 8.4 ? `<circle cx="${-160 + 3 * 46 + 19}" cy="${-110 + 2 * 52 + 21}" r="30" fill="none" stroke="${MC.red}" stroke-width="7"/>` : '') + (lt > 0.1 ? `<text x="0" y="-166" text-anchor="middle" font-family="NSB" font-weight="800" font-size="44" fill="${MC.cream}">${lt > 6.1 ? 'फ़रवरी २०२७' : 'माघ'}</text>` : '') + (lt > 8.4 ? `<g transform="scale(${0.2 + 0.8 * pop(lt, 8.4)})"><rect x="-110" y="-90" width="220" height="230" rx="20" fill="${MC.cream}" ${S(5)}/><text x="0" y="60" text-anchor="middle" font-family="NSB" font-weight="800" font-size="190" fill="${MC.maroon}">११</text><text x="0" y="116" text-anchor="middle" font-family="Hind" font-weight="700" font-size="36" fill="${INK}">गुरुवार</text></g>` : '') + `</g>`;
  if (flip > 0 && flip < 1) g += `<rect x="370" y="80" width="380" height="400" fill="${MC.cream}" opacity="${(0.8 * (1 - flip)).toFixed(2)}"/>`;
  return g;
});
// 27 (229.25–238.7) morning puja; winter fades
const A27 = mk((lt) => {
  const sunY = lerp(FL - 20, 150, ease(prog(lt, 0.2, 3.0)));
  let g = dawnSky() + sunRays(480, sunY, lt, 12) + sunFace(480, sunY, 52) + `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#c9a25e"/><rect x="0" y="${FL - 44}" width="${W}" height="6" fill="${INK}"/>`;
  g += tree(90, FL, 0.55) + tree(880, FL, 0.55);
  if (lt > 2.6) { g += idol(480, FL - 120, 0.42, lt); [[250, MAN], [340, WOMAN], [620, WOMAN], [710, MAN]].forEach(([x, o], i) => { g += fade(prog(lt, 2.6 + i * 0.2, 3.2 + i * 0.2), fig(o, x, FL + 60, 0.38, x > 480, { armF: -100, armB: -100, eyeOpen: blink(lt + i) })); }); g += at(lt, 3.2, 420, FL + 60, diya(0, 0, 0.7, lt)) + at(lt, 3.4, 540, FL + 60, diya(0, 0, 0.7, lt + 1)); }
  g += `<rect width="${W}" height="${H}" fill="#9cc3ea" opacity="${(0.38 * (1 - ease(prog(lt, 5.7, 8.6)))).toFixed(2)}"/>`;
  return g;
});
// 28 (238.7–250.75) mustard fields, yellow clothes, yellow rice and halwa
const A28 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="url(#dawn)"/>` + sunFace(800, 100, 38) + mustard(lt, 300, 4, 90);
  g += `<rect width="${W}" height="${H}" fill="${MC.yellow}" opacity="${(0.28 * prog(lt, 3.2, 4.5)).toFixed(2)}"/>`;
  if (lt > 6.5) { [[250, YMAN, false], [380, YWOMAN, false], [580, YMAN, true], [710, YWOMAN, true]].forEach(([x, o, f], i) => { g += fade(prog(lt, 6.5 + i * 0.25, 7.0 + i * 0.25), fig(o, x, FL + 60, 0.42, f, { armF: i % 2 ? -50 : 8, armB: -6, eyeOpen: blink(lt + i) }, i % 2 ? {} : {})); }); }
  if (lt > 8.7) g += at(lt, 8.7, 480, 470, thali(0, 0, 1.3, 'yellow'));
  return g;
});
// 29 (250.75–261.97) different places: east India big day
const A29 = mk((lt) => {
  let g = bgPlain('#f6ead0', '#f6ead0');
  g += `<path d="M300,90 L380,60 L470,100 L560,80 L640,150 L700,170 L660,230 L600,250 L570,330 L520,420 L470,500 L420,420 L370,320 L330,250 L270,190Z" fill="${MC.cream}" ${S(5)}/><path d="M300,90 L380,60 L470,100 L560,80 L640,150 L700,170 L660,230 L600,250 L570,330 L520,420 L470,500 L420,420 L370,320 L330,250 L270,190Z" fill="${MC.yellow}" opacity=".25"/>`;
  const pins = [[610, 255], [575, 300], [640, 300], [680, 215]];
  pins.forEach(([x, y], i) => { g += at(lt, 4.6 + i * 0.4, x, y, `<path d="M0,0 C-26,-30 -22,-60 0,-62 C22,-60 26,-30 0,0Z" fill="${MC.red}" ${S(3)}/><circle cy="-42" r="8" fill="${MC.yellow}"/>`); });
    
  if (lt > 6.5) g += idol(160, 330, 0.5, lt) + petals(lt, 11, 12, [MC.yellow, MC.saffron]);
  return g;
});
// 30 (261.97–275.76) school puja: books and pens at her feet; books rest
const A30 = mk((lt) => {
  let g = bgCourt(lt) + idol(480, FL - 150, 0.62, lt);
  if (lt > 3.5) {
    const kids = [[200, MAN, false], [300, WOMAN, false], [760, MAN, true], [860, WOMAN, true]];
    kids.forEach(([x, o, f], i) => { const k = ease(prog(lt, 3.5 + i * 0.2, 5.2 + i * 0.2)); const tx = f ? 600 : 360; g += fig(o, lerp(f ? 1050 : -90, x, ease(prog(lt, 0.2 + i * 0.1, 3.4))), FL + 60, 0.34, f, { armF: lt < 3.6 ? -30 : 8, armB: -6, legSwing: walk(lt, lt < 3.4, i), eyeOpen: blink(lt + i) }); });
    for (let i = 0; i < 4; i++) g += at(lt, 4.0 + i * 0.3, 380 + i * 65, FL + 70, i % 2 ? `<rect x="-6" y="-4" width="12" height="40" fill="${MC.blue}" ${S(2)} transform="rotate(${20 - i * 8})"/>` : book(0, 0, 0.26, 0));
  } else {
    [[200, MAN, false], [300, WOMAN, false], [760, MAN, true], [860, WOMAN, true]].forEach(([x, o, f], i) => { g += fig(o, lerp(f ? 1050 : -90, x, ease(prog(lt, 0.2 + i * 0.1, 3.4))), FL + 60, 0.34, f, { armF: -30, armB: -6, legSwing: walk(lt, lt < 3.4, i), eyeOpen: blink(lt + i) }); });
  }
  if (lt > 8.0) g += at(lt, 8.0, 150, 160, `<g>${book(0, 0, 0.45, 0)}${cross(0, 0, 1.3)}</g>`);
  if (lt > 10.4) g += at(lt, 10.4, 810, 170, `<g>${book(0, 0, 0.45, 0)}</g>`) + zz(lt, 830, 180);
  return g;
});
// 31 (275.76–285.06) bhog in Bengal homes; Shantiniketan Basant Utsav
const A31 = mk((lt) => {
  let g = '';
  if (lt < 4.9) {
    g += bgPlain('#f7e2b0', '#c9a25e') + glow(480, 320, 240, 0.4) + at(lt, 0.5, 340, 400, thali(0, 0, 1.4, 'bhog')) + at(lt, 1.2, 640, 400, thali(0, 0, 1.4, 'yellow'));
    g += at(lt, 2.0, 480, 200, diya(0, 0, 1.2, lt)) + at(lt, 2.4, 240, 240, wlotus(0, 0, 0.5)) + at(lt, 2.6, 720, 240, wlotus(0, 0, 0.5));
  } else {
    g += bgPlain('#fff0c8', '#e7c27a') + mustardTrees(lt) + petals(lt, 9, 40, [MC.yellow, MC.saffron, MC.pink, MC.red]);
    const dn = [[300, YWOMAN, false], [480, YWOMAN, true], [660, YWOMAN, false]];
    dn.forEach(([x, o, f], i) => { g += fig(o, x, FL + 60, 0.5, f, { armF: -70 + 40 * Math.sin(lt * 4 + i), armB: -70 - 40 * Math.sin(lt * 4 + i), headTilt: 6 * Math.sin(lt * 3 + i), eyeOpen: blink(lt + i) }); });
    g += at(lt, 4.9, 480, 80, chip(0, 0, 'शांतिनिकेतन', MC.red, 28));
  }
  return g;
});
function mustardTrees(lt) { return tree(80, FL, 0.6) + tree(880, FL, 0.6) + `<circle cx="480" cy="140" r="${60 + 4 * Math.sin(lt * 3)}" fill="url(#glowY)" opacity=".7"/>`; }
// 32 (285.06–292.28) South India: first letters — Vidyarambham
const A32 = mk((lt) => {
  let g = bgPlain('#f6e7c1', '#c9a25e') + temple(720, FL + 6, 0.8);
  g += fig(WOMAN, 230, FL + 50, 0.5, false, { armF: lt > 2 ? -50 : 8, armB: -6, eyeOpen: blink(lt) }) + fig(MAN, 340, FL + 70, 0.28, false, { armF: lt > 2.4 ? -40 : 8, armB: -6, eyeOpen: blink(lt + 1) });
  g += at(lt, 0.9, 520, 200, `<rect x="-70" y="-60" width="140" height="120" rx="14" fill="${MC.maroon}" ${S(4)}/><rect x="-58" y="-48" width="116" height="96" fill="#2b2b2b" ${S(2)}/><text y="26" text-anchor="middle" font-family="NSB" font-weight="800" font-size="86" fill="${MC.white}">अ</text>`);
  g += at(lt, 5.2, 480, 90, chip(0, 0, 'विद्यारंभ', MC.red, 32));
  return g;
});
// 33 (292.28–299.5) guiding a child's finger in rice
const A33 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#e7c27a') + glow(480, 360, 260, 0.5);
  g += at(lt, 0.4, 480, 400, thali(0, 0, 2.6, 'rice'));
  g += fig(WOMAN, 130, FL + 60, 0.48, false, { armF: -50, armB: -6, eyeOpen: blink(lt) }) + fig(MAN, 850, FL + 60, 0.3, true, { armF: -40, armB: -6, eyeOpen: blink(lt + 1) });
  const k = prog(lt, 3.9, 6.8);
  if (lt > 3.9) { const d = 'M420,386 C470,330 540,340 520,390 C505,430 440,420 470,380 L560,400'; g += `<path d="${d}" fill="none" stroke="${MC.maroon}" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${(1 - k).toFixed(3)}"/>`; }
  const fx = lerp(420, 560, k), fy = lerp(386, 400, k) - 14 * Math.sin(k * 12);
  g += `<g transform="translate(${lt > 3.9 ? fx : 420},${lt > 3.9 ? fy : 340})"><circle r="14" fill="#d9915a" ${S(3)}/><path d="M0,-12 L-20,-50" stroke="#d9915a" stroke-width="16" stroke-linecap="round"/></g>`;
  return g;
});
// 34 (299.5–308.1) Punjab/Haryana: kites
const A34 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="#9cd3f0"/>` + cloud(200, 110, 0.8) + cloud(760, 160, 0.7) + sunFace(480, 80, 30) + mustard(lt, 400, 8, 40);
  const cols = [MC.red, MC.yellow, MC.pink, MC.green, MC.saffron, MC.blue, MC.red, MC.yellow, MC.pink];
  cols.forEach((c, i) => { const x = 70 + i * 100 + 20 * Math.sin(lt * 1.5 + i), y = 120 + (i % 3) * 70 + 14 * Math.sin(lt * 2 + i * 2); g += at(lt, 0.4 + i * 0.28, x, y, kite(0, 0, 0.62 + (i % 3) * 0.08, 14 * Math.sin(lt + i), c, lt + i)); });
  if (lt > 0.4) g += at(lt, 0.6, 480, 500, chip(0, 0, 'पंजाब · हरियाणा', MC.red, 24));
  if (lt > 4.8) { [[300, YMAN, false], [660, MAN, true]].forEach(([x, o, f], i) => { g += fig(o, x + 14 * Math.sin(lt * 3 + i) * 0, FL + 70, 0.4, f, { armF: -120 + 10 * Math.sin(lt * 5 + i), armB: -6, eyeOpen: blink(lt + i) }); }); }
  return g;
});
// 35 (308.1–321.0) Delhi: mustard flowers at the dargah
const A35 = mk((lt) => {
  let g = bgPlain('#f6e7c1', '#c9a25e') + at(lt, 3.4, 640, FL + 6, dargah(0, 0, 0.9));
  g += at(lt, 0.5, 200, 120, chip(0, 0, 'दिल्ली', MC.red, 30));
  if (lt > 3.4) { const x = lerp(-60, 460, ease(prog(lt, 3.6, 7.2))); g += fig(MAN, x, FL + 60, 0.44, false, { armF: -35, armB: -6, legSwing: walk(lt, lt < 7.2), eyeOpen: blink(lt) }, { handItem: YFLOW }); g += [0, 1, 2, 3, 4].map((i) => at(lt, 7.4 + i * 0.25, 560 + i * 36, FL + 56, `<circle r="11" fill="${MC.yellow}" ${S(2)}/><circle r="4" fill="${MC.saffron}"/>`)).join(''); }
  if (lt > 8.9) g += `<rect width="${W}" height="${H}" fill="#c9a25e" opacity="${(0.28 * ease(prog(lt, 8.9, 10))).toFixed(2)}"/>` + at(lt, 9.0, 160, 400, diya(0, 0, 1.0, lt));
  return g;
});
// 36 (321.0–328.55) folk tale: Khusro sings with yellow flowers to a sad teacher
const A36 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + glow(300, 300, 200, 0.4);
  g += seated(GURU, 250, FL - 120, 0.52, false, { armF: lt < 4.5 ? 40 : -20, armB: -6, headTilt: lt < 4.5 ? 18 : 0, eyeOpen: lt < 4.5 ? 0.5 : blink(lt) }, {}, MC.saffron);
  const x = lerp(1050, 640, ease(prog(lt, 2.6, 4.6)));
  g += fig(KHUSRO, x, FL + 55, 0.5, true, { armF: -80 + 12 * Math.sin(lt * 5), armB: -6, legSwing: walk(lt, lt < 4.6), eyeOpen: blink(lt) }, { handItem: YFLOW });
  g += floatNotes(lt, x - 40, 280, 3.4, 4, 160) + at(lt, 0.4, 480, 80, chip(0, 0, 'लोक कथा', MC.maroon, 28));
  if (lt > 5.2) g += petals(lt, 6, 16, [MC.yellow, MC.saffron]);
  return g;
});
// 37 (328.55–333.3) folk tale about Saraswati's grace
const A37 = mk((lt) => {
  let g = dawnSky() + glow(480, 280, 280, 0.6) + sunRays(480, 150, lt, 12);
  g += sarasSeated(480, FL - 120, 0.6, lt) + floatNotes(lt, 480, 330, 0.3, 5, 260);
  g += at(lt, 0.6, 480, 80, chip(0, 0, 'लोक कथा', MC.maroon, 30));
  return g;
}, 0.05);
// 38 (333.3–340.8) naive Kalidasa cuts the branch he sits on
const A38 = mk((lt) => {
  let g = bgForest(lt);
  const ang = lt > 3.9 ? Math.min(20, (lt - 3.9) * 8) : 0;
  g += `<g transform="rotate(${(-ang * 0.1).toFixed(1)} 300 300)"><rect x="270" y="150" width="60" height="${FL - 150}" fill="#7a4a2a" ${S(4)}/></g>`;
  g += `<g transform="rotate(${ang} 330 280)"><path d="M330,300 C420,280 520,270 640,280" fill="none" ${S(24)}/><path d="M330,300 C420,280 520,270 640,280" fill="none" stroke="#8a5a32" stroke-width="16" stroke-linecap="round"/>` + [[480, 262], [600, 262], [380, 276]].map(([x, y]) => `<ellipse cx="${x}" cy="${y - 30}" rx="40" ry="26" fill="${MC.leaf}" ${S(3)}/>`).join('');
  g += fig(KALI, 560, 280, 0.34, false, { armF: -100 + 50 * Math.sin(lt * 6), armB: -6, eyeOpen: blink(lt) }, { handItem: axe }) + `</g>`;
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'कालिदास', MC.red, 28));
  if (lt > 3.9) g += at(lt, 3.9, 700, 230, qmark(0, 0, 0.9, MC.maroon));
  return g;
});
// 39 (340.8–349.5) pandits arrange marriage; princess sends him away
const A39 = mk((lt) => {
  let g = bgCourt(lt);
  const turn = lt > 5.1;
  g += fig(PANDIT, 150, FL + 40, 0.44, false, { armF: -50, armB: -6, eyeOpen: blink(lt) }) + fig(PANDIT, 260, FL + 50, 0.4, false, { armF: 8, armB: -6, headTilt: 8 });
  g += fig(KALI, lerp(430, turn ? 130 : 430, ease(prog(lt, 5.4, 7.6))), FL + 55, 0.42, turn, { armF: 8, armB: -6, headTilt: turn ? 20 : 0, legSwing: walk(lt, turn && lt < 7.6), eyeOpen: blink(lt) });
  g += fig(QUEEN, 760, FL + 40, 0.46, true, { armF: turn ? -95 : 8, armB: -6, eyeOpen: blink(lt) });
  if (lt > 0.4 && !turn) g += at(lt, 1.4, 600, FL - 20, `<g transform="translate(0,-100)">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${-42 + i * 12}" cy="${14 * Math.sin(i / 7 * Math.PI)}" r="8" fill="${i % 2 ? MC.saffron : MC.yellow}" ${S(1.5)}/>`).join('')}</g>`);
  if (turn) g += at(lt, 5.2, 600, 150, `<path d="M-60,0 L40,0 M10,-30 L50,0 L10,30" stroke="${MC.red}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="scale(-1,1)"/>`);
  return g;
});
// 40 (349.5–356.2) Kali temple; grace; mahakavi
const A40 = mk((lt) => {
  let g = bgNight(lt, 'nightg').replace('</rect>', '') + `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#3a1f24"/>`;
  g += temple(700, FL - 30, 0.85) + at(lt, 0.2, 700, 120, `<g>${diya(-80, 0, 0.8, lt)}${diya(80, 0, 0.8, lt + 1)}</g>`);
  const x = lerp(-60, 400, ease(prog(lt, 0.1, 2.7)));
  g += fig(KALI, x, FL + 55, 0.44, false, { armF: lt > 2.7 ? -100 : 8, armB: lt > 2.7 ? -100 : -6, legSwing: walk(lt, lt < 2.7), headTilt: lt < 2.7 ? 14 : 0, eyeOpen: blink(lt) });
  if (lt > 2.7) { g += glow(400, 260, 190 * ease(prog(lt, 2.7, 3.6)), 0.9) + rings(lt, 2.7, 400, 260, MC.yellow, 2, 120) + at(lt, 3.4, 300, 200, book(0, 0, 0.4, 0.4)) + at(lt, 3.8, 520, 190, `<g>${veena(0, 0, 0.5, -20)}</g>`) + petals(lt, 7, 14, [MC.yellow, MC.pink]); }
  return g;
});
// 41 (356.2–367.4) different versions; lesson: hunger to learn finds a way
const A41 = mk((lt) => {
  let g = '';
  if (lt < 5.9) {
    g += bgPlain('#f3dfb3', '#c9a25e');
    [[200, -6], [480, 0], [760, 6]].forEach(([x, r], i) => { g += at(lt, 0.4 + i * 0.3, x, 330, `<g transform="rotate(${r})">${book(0, 0, 0.6, i === 2 && lt > 2.9 ? 0.9 : 0)}</g>`); });
    if (lt > 2.9) g += at(lt, 2.9, 760, 180, `<g>${glow(0, 0, 90, 0.8)}<g transform="scale(.9)">${seated(SARA, 0, 0, 0.3, false, { armF: -40, armB: -6 }, {}, MC.white)}</g></g>`);
  } else {
    g += dawnSky() + sunFace(700, 200, 50) + mount(180, 400, 220, 200, '#b88a5a') + `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#c9a25e"/>`;
    g += `<path d="M120,${H} C300,460 420,420 560,380 C640,350 680,320 700,270" fill="none" stroke="#e7c98a" stroke-width="64" stroke-linecap="round"/><path d="M120,${H} C300,460 420,420 560,380 C640,350 680,320 700,270" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 16"/>`;
    const k = ease(prog(lt, 6.4, 11));
    const x = lerp(220, 600, k), y = lerp(480, 340, k);
    g += fig(MAN, x, y, lerp(0.42, 0.26, k), false, { armF: -40, armB: -6, legSwing: walk(lt, true), eyeOpen: blink(lt) }, { handItem: `<g transform="translate(9,-175) scale(.9)">${book(20, 0, 0.3, 0)}</g>` });
    g += glow(700, 230, 120, 0.7);
  }
  return g;
});
// 42 (367.4–377.8) pick up a book, read a page, learn something new — best puja
const A42 = mk((lt) => {
  let g = bgPlain('#e9f0c8', '#8fb04a') + tree(120, FL, 0.8) + `<g>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${70 + i * 28}" cy="${200 + (i % 2) * 40}" r="14" fill="${MC.yellow}" ${S(2)}/>`).join('')}</g>`;
  g += at(lt, 0.3, 780, 300, `<rect x="-100" y="-90" width="200" height="190" fill="#7a3310" ${S(4)}/><rect x="-100" y="-10" width="200" height="10" fill="${INK}"/>` + [0, 1, 2, 3, 4].map((i) => `<rect x="${-88 + i * 34}" y="${-80 + (i % 2) * 6}" width="26" height="${64 - (i % 2) * 6}" fill="${[MC.red, MC.blue, MC.green, MC.saffron, MC.pink][i]}" ${S(2)}/>`).join(''));
  g += seated(MAN, 420, FL - 120, 0.52, false, { armF: lt > 0.5 ? -60 : 8, armB: -50, headTilt: 14, eyeOpen: blink(lt) }, {}, MC.saffron) + at(lt, 0.4, 440, FL - 110, `<g transform="rotate(${lt < 4.2 ? 0 : 12 * Math.sin((lt - 4.2) * 6)})">${book(0, 0, 0.4, 0.3)}</g>`);
  if (lt > 4.2) g += at(lt, 4.2, 520, 200, glow(0, 0, 70, 0.9) + `<text y="14" text-anchor="middle" font-size="60" fill="${MC.red}" font-family="NSB" font-weight="800">✦</text>`);
  if (lt > 7.5) g += glow(420, 150, 130 * ease(prog(lt, 7.5, 8.5)), 0.8) + at(lt, 7.6, 420, 140, `<g transform="scale(.7)">${seated(SARA, 0, 0, 0.32, false, { armF: -64, armB: -20 }, {}, MC.white)}</g>`) + at(lt, 8.2, 260, 440, diya(0, 0, 1.0, lt));
  return g;
});
// 43 (377.8–389.6) teaser: seven-horse chariot in the sky
const A43 = mk((lt) => {
  let g = dawnSky() + sunRays(480, 260, lt, 16) + at(lt, 0.4, 200, 70, chip(0, 0, 'अगली कहानी', MC.maroon, 28));
  g += at(lt, 0.8, 480, 240, sunFace(0, 0, 54));
  if (lt > 2.7) { const k = ease(prog(lt, 2.7, 4)); for (let i = 0; i < 7; i++) g += `<g opacity="${k.toFixed(2)}">${horse(120 + i * 78, 440 - (i % 2) * 18, 0.33, lt + i * 0.4)}</g>`; g += `<g opacity="${k.toFixed(2)}">${chariot(740, 490, 0.55, lt)}</g>`; }
  if (lt > 2.7) g += cloud(150 + ((lt * 60) % 900), 140, 0.6) + cloud(((lt * 40 + 500) % 1100) - 100, 340, 0.5);
  if (lt > 8.3) g += `<rect width="${W}" height="${H}" fill="#fff2b0" opacity="${(0.25 * prog(lt, 8.3, 9.5)).toFixed(2)}"/>` + [0, 1, 2].map((i) => at(lt, 8.5 + i * 0.3, 120 + i * 360, 130, bird(0, 0, 0.5, Math.sin(lt * 8 + i)))).join('');
  return g;
});
// 44 (389.6–399.5) who is the owner? which way did it turn? Ratha Saptami
const A44 = mk((lt) => {
  let g = lt < 6.6 ? dawnSky() + sunRays(480, 270, lt, 14) : `<rect width="${W}" height="${H}" fill="${MC.maroon}"/>` + sunRays(480, 270, lt, 14);
  if (lt < 6.6) {
    g += glow(480, 270, 140 + 12 * Math.sin(lt * 3), 0.8) + at(lt, 0.5, 300, 270, baby(0, 0, 1.4) + qmark(30, -90, 0.9));
    if (lt > 3.6) { const k = ease(prog(lt, 3.6, 5.6)); g += `<g transform="translate(640,300) rotate(${-90 * k})">${chariot(0, 0, 0.5, lt)}</g>` + at(lt, 4.0, 800, 150, `<path d="M0,60 L0,-60 M-30,-30 L0,-64 L30,-30" stroke="${MC.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`); }
  } else {
    g += at(lt, 6.6, 480, 270, T(0, 0, 'रथ सप्तमी', 92, MC.yellow));
    g += at(lt, 7.0, 480, 130, sunFace(0, 0, 40));
  }
  return g;
});
// 45 (399.5–412.7) question; first letter; Jai Maa Saraswati
const A45 = mk((lt) => {
  let g = bgPlain('#fbe9c4', '#e7c27a') + glow(480, 280, 280, 0.5);
  if (lt < 7.8) {
    g += fig(WOMAN, 230, FL + 50, 0.5, false, { armF: lt > 2.8 ? -50 : 8, armB: -6, eyeOpen: blink(lt) }) + fig(MAN, 340, FL + 70, 0.28, false, { armF: -45, armB: -6, eyeOpen: blink(lt + 1) });
    g += at(lt, 0.5, 480, 140, qmark(0, 0, 1.0, MC.maroon));
    g += at(lt, 2.8, 650, 300, `<rect x="-110" y="-80" width="220" height="160" rx="14" fill="${MC.maroon}" ${S(4)}/><rect x="-96" y="-66" width="192" height="132" fill="#2b2b2b" ${S(2)}/><text y="44" text-anchor="middle" font-family="NSB" font-weight="800" font-size="130" fill="${MC.white}">अ</text>`);
  } else {
    g += at(lt, 7.8, 480, 190, bubble(0, 0, '…', 200, 40, MC.red).replace('…', '✎'));
    g += fade(prog(lt, 7.8, 8.6), fig(MAN, 480, FL + 70, 0.4, false, { armF: -60, armB: -6, eyeOpen: blink(lt) }));
  }
  if (lt > 9.9) g += `<rect width="${W}" height="${H}" fill="#fff0c8"/>` + sunRays(480, 200, lt, 12) + sarasSeated(480, FL - 100, 0.56, lt) + T(480, 505, 'जय माँ सरस्वती', 62, MC.maroon) + petals(lt, 3, 30, [MC.yellow, MC.pink]);
  return g;
});

const LIST: [number, number, any][] = [
  [0, 9.03, A1], [9.03, 17.36, A2], [17.36, 26.76, A3], [26.76, 34.21, A4], [34.21, 46.89, A5], [46.89, 54.32, A6], [54.32, 62.94, A7], [62.94, 68.16, A8], [68.16, 74.03, A9],
  [74.03, 82.62, A10], [82.62, 89.22, A11], [89.22, 96.22, A12], [96.22, 104.93, A13], [104.93, 115.55, A14], [115.55, 122.64, A15], [122.64, 129.19, A16], [129.19, 138.38, A17],
  [138.38, 149.91, A18], [149.91, 162.37, A19], [162.37, 176.46, A20], [176.46, 186.49, A21], [186.49, 190.53, A22], [190.53, 204.87, A23], [204.87, 211.95, A24], [211.95, 218.24, A25],
  [218.24, 229.25, A26], [229.25, 238.72, A27], [238.72, 250.75, A28], [250.75, 261.97, A29], [261.97, 275.76, A30], [275.76, 285.06, A31], [285.06, 292.28, A32], [292.28, 299.52, A33],
  [299.52, 308.13, A34], [308.13, 321.01, A35], [321.01, 328.55, A36], [328.55, 333.32, A37], [333.32, 340.77, A38], [340.77, 349.46, A39], [349.46, 356.17, A40], [356.17, 367.38, A41],
  [367.38, 377.83, A42], [377.83, 389.64, A43], [389.64, 399.47, A44], [399.47, 412.7, A45],
];
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
