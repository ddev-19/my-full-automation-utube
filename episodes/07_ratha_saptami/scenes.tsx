// @ts-nocheck
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, garland, sunFace, bird, tree, prog, ease, lerp, clamp, cloud, lotus, moon, temple, chariot, horse, chip, pop, xdefs, rnd, blink, sway,
  KRISH, KING2, MUNI, QUEEN, MAN, WOMAN,
  frame, bgPlain, bgNight, bgWater, bgForest, diya, bubble, book, verse, badge,
} from './mb3';
import { baby, fire } from './mb2';

const mk = (start: number, fn: (lt: number, a: number, d: number) => string, push = 0.035) => ({ dur }: { t0: number; dur: number }) => {
  const f = useCurrentFrame();
  const lt = f / 30, d = dur / 30;
  return (
    <Stage dur={dur} push={push}>
      <g dangerouslySetInnerHTML={{ __html: defs() + xdefs() + fn(lt, lt + start, d) + frame() }} />
    </Stage>
  );
};
const glow = (x: number, y: number, r: number, o = 1) => `<circle cx="${x}" cy="${y}" r="${Math.max(1, r)}" fill="url(#glowY)" opacity="${o}"/>`;
const T = (x: number, y: number, txt: string, size = 34, col = INK, fam = 'NSB') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${fam}" font-weight="800" font-size="${size}" fill="${col}">${txt}</text>`;
const at = (a: number, t: number, x: number, y: number, inner: string) => (a > t ? `<g transform="translate(${x},${y}) scale(${pop(a, t)})">${inner}</g>` : '');
const fade = (o: number, inner: string) => `<g opacity="${clamp(o).toFixed(3)}">${inner}</g>`;
const win = (a: number, t0: number, t1: number, inner: string) => (a > t0 && a < t1 ? inner : '');
const walk = (lt: number, on: boolean, k = 0) => (on ? 12 * Math.sin(lt * 7 + k) : 0);
const petals = (lt: number, seed = 3, n = 30) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const x0 = 30 + r() * 900, sp = 70 + r() * 70, ph = r() * 10; const y = ((lt * sp + r() * 500) % 460) + 20; const x = x0 + 20 * Math.sin(lt * 2 + ph); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="4" fill="${i % 3 ? MC.saffron : MC.pink}" ${S(1.2)} transform="rotate(${((lt * 120 + ph * 40) % 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return g; };

// ---- cast (new looks built from existing figure options) ----
const SURYA = { skin: '#f08a2a', crown: 'ram', dhoti: MC.red, uttariya: MC.yellow };
const ADITI = { female: true, skin: '#e6b07c' };
const ARUNA = { skin: '#e8793a', crown: 'king', dhoti: MC.saffron, uttariya: MC.yellow };
const SAMBA = { skin: '#5a8fc0', crown: 'king', dhoti: MC.green, uttariya: MC.yellow };
const VENK = { skin: '#2c5e9e', crown: 'ram', dhoti: MC.yellow, uttariya: MC.red };
const BRAHMA = { ...MUNI, skin: '#e8a050', uttariya: MC.red };
const SHIVA = { skin: '#c9dcee', bun: true, dhoti: MC.white, uttariya: MC.red };
const PARVATI = { female: true, skin: '#e6b07c' };
const DEVA = { skin: '#6aa0d0', crown: 'ram', dhoti: MC.white, uttariya: MC.blue };
const ASUR = { skin: '#4a3a5a', crown: 'king', beard: true, dhoti: '#3a1a2a', uttariya: INK };

// ---- local props / backgrounds ----
const bgDawn = (lt: number, sunY = 170, sunR = 70, hills = true) =>
  `<rect width="${W}" height="${H}" fill="url(#dawn)"/>` + glow(480, sunY, sunR * 3, 0.5) + sunFace(480, sunY, sunR) +
  (hills ? `<path d="M0,330 Q200,280 400,320 T800,300 T960,330 L960,${H} L0,${H}Z" fill="#d98a4a" ${S(3)}/><rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#c9a25e"/><rect x="0" y="${FL - 24}" width="${W}" height="5" fill="${INK}"/>` : '');
const ratha7 = (x: number, y: number, s: number, lt: number, aruna = true) => {
  let g = glow(x + 200 * s, y - 180 * s, 300 * s, 0.35);
  g += `<line x1="${x + 100 * s}" y1="${y - 120 * s}" x2="${x + 150 * s + 240 * s}" y2="${y - 130 * s}" ${S(4)}/>`;
  for (let i = 6; i >= 0; i--) g += horse(x + 150 * s + i * 42 * s, y - (i % 2 ? 9 : 0) * s, 0.62 * s, lt + i * 0.3);
  if (aruna) g += fig(ARUNA, x + 55 * s, y - 55 * s, 0.42 * s, false, { armF: -35 + sway(lt, 6, 4), armB: -20, eyeOpen: blink(lt) });
  g += chariot(x, y, s, lt);
  return g;
};
const calendar = (x: number, y: number, s: number, day: string, mon: string) =>
  `<g transform="translate(${x},${y}) scale(${s})"><rect x="-130" y="-150" width="260" height="300" rx="16" fill="${MC.cream}" ${S(5)}/><rect x="-130" y="-150" width="260" height="76" rx="16" fill="${MC.red}" ${S(5)}/>${T(0, -98, mon, 30, MC.cream, 'Hind')}${T(0, 66, day, 150, MC.maroon)}<circle cx="-70" cy="-150" r="9" fill="${INK}"/><circle cx="70" cy="-150" r="9" fill="${INK}"/></g>`;
const lota = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M-24,-30 L24,-30 L36,20 Q0,40 -36,20Z" fill="${MC.yellow}" ${S(4)}/><rect x="-14" y="-44" width="28" height="16" fill="${MC.yellow}" ${S(4)}/></g>`;
const pot = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,-70 Q-84,-10 -40,40 L40,40 Q84,-10 60,-70Z" fill="#b5532f" ${S(5)}/><rect x="-66" y="-84" width="132" height="22" rx="8" fill="#9a3f22" ${S(5)}/><path d="M-50,-30 L50,-30 M-56,0 L56,0" fill="none" stroke="${MC.cream}" stroke-width="4"/></g>`;
const upla = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [-70, -20, 30, 80].map((dx, i) => `<ellipse cx="${dx}" cy="${i % 2 ? -14 : 0}" rx="34" ry="14" fill="#7a4a2a" ${S(3)}/>`).join('') + `</g>`;
const wheel = (x: number, y: number, r: number, rot: number, col = '#b97a4a') => `<g transform="translate(${x},${y}) rotate(${rot})"><circle r="${r}" fill="${col}" ${S(5)}/><circle r="${r * 0.82}" fill="none" ${S(3)}/>` + Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="0" x2="${(r * 0.82 * Math.cos(i * Math.PI / 6)).toFixed(1)}" y2="${(r * 0.82 * Math.sin(i * Math.PI / 6)).toFixed(1)}" ${S(3)}/>`).join('') + `<circle r="${r * 0.18}" fill="${MC.yellow}" ${S(3)}/></g>`;
const house = (x: number, y: number, s = 1, col = MC.cream, lit = false) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-50" y="-70" width="100" height="70" fill="${col}" ${S(4)}/><path d="M-62,-70 L0,-120 L62,-70Z" fill="${MC.red}" ${S(4)}/><rect x="-12" y="-44" width="24" height="44" fill="${lit ? MC.yellow : '#6b4423'}" ${S(3)}/></g>`;
const eyeSym = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,0 Q0,-48 60,0 Q0,48 -60,0Z" fill="#fff" ${S(5)}/><circle r="22" fill="${MC.blue}" ${S(3)}/><circle r="9" fill="${INK}"/></g>`;
const arrow = (x1: number, y1: number, x2: number, y2: number, col = MC.red) => { const a = Math.atan2(y2 - y1, x2 - x1), hx = 16; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="8" stroke-linecap="round"/><path d="M${x2},${y2} l${(-hx * Math.cos(a - 0.5)).toFixed(1)},${(-hx * Math.sin(a - 0.5)).toFixed(1)} M${x2},${y2} l${(-hx * Math.cos(a + 0.5)).toFixed(1)},${(-hx * Math.sin(a + 0.5)).toFixed(1)}" stroke="${col}" stroke-width="8" stroke-linecap="round"/>`; };
const pillar = (x: number, base: number, top: number, lt: number) => {
  const h = base - top; let g = glow(x, (base + top) / 2, h * 0.7, 0.55);
  g += `<path d="M${x - 44},${base} L${x - 40 + 4 * Math.sin(lt * 5)},${top + 30} Q${x},${top - 20} ${x + 40},${top + 30} L${x + 44},${base}Z" fill="#ff9a2a" ${S(5)}/>`;
  g += `<path d="M${x - 24},${base} L${x - 20},${top + 60} Q${x},${top + 10} ${x + 20},${top + 60} L${x + 24},${base}Z" fill="#ffd86b" ${S(3)}/>`;
  for (let i = 0; i < 5; i++) { const yy = base - ((lt * 90 + i * h / 5) % h); g += `<circle cx="${x + 14 * Math.sin(lt * 3 + i)}" cy="${yy}" r="6" fill="#fff2b0" opacity=".8"/>`; }
  return g;
};

// 1 sunrise, man looks up
const A1 = mk(0, (lt, a) => {
  const sy = lerp(400, 190, ease(prog(lt, 0.3, 5)));
  let g = bgDawn(lt, sy, 80, false) + `<path d="M0,380 Q240,340 480,370 T960,360 L960,${H} L0,${H}Z" fill="#d98a4a" ${S(3)}/><rect x="0" y="${FL + 10}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += bird(300, 120 + 6 * Math.sin(lt * 3), 0.5, Math.sin(lt * 6)) + bird(640, 90, 0.4, Math.sin(lt * 6 + 1));
  g += fig(MAN, 190, FL + 50, 0.52, false, { armF: a > 3.07 ? -100 : 8, armB: -6, headTilt: -8, eyeOpen: blink(lt) });
  g += at(a, 3.07, 260, 120, T(0, 0, '?', 80, MC.red));
  return g;
});
// 2 chariot crosses sky
const A2 = mk(6.01, (lt, a) => {
  let g = bgDawn(lt, 120, 50, false) + cloud(200, 140, 0.9) + cloud(760, 100, 0.8) + `<path d="M0,430 Q240,400 480,420 T960,415 L960,${H} L0,${H}Z" fill="#d98a4a" ${S(3)}/>`;
  g += ratha7(lerp(-420, 250, ease(prog(lt, 0, 9))), 380, 0.8, lt);
  g += at(a, 10.75, 330, 70, chip(0, 0, 'सात घोड़े', MC.red, 28)) + at(a, 12.4, 640, 70, chip(0, 0, 'एक सारथी', MC.blue, 28));
  return g;
});
// 3 festival title
const A3 = mk(15.52, (lt, a) => {
  let g = bgDawn(lt, 140, 60, false) + `<rect x="0" y="${FL - 10}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += at(a, 17.42, 480, 290, T(0, 0, 'रथ सप्तमी', 78, MC.red));
  g += at(a, 19.1, 180, 330, badge(0, 0, '७', 'सप्तमी', MC.red, 0.8));
  g += at(a, 19.4, 600, 370, chip(0, 0, 'माघ · उजाला पक्ष', MC.green, 28));
  g += at(a, 22.19, 480, 450, chip(0, 0, 'सूर्य जयंती = जन्मदिन', MC.saffron, 28));
  return g;
});
// 4 date
const A4 = mk(26.77, (lt, a) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + calendar(270, 250, 1, '१३', 'फ़रवरी २०२७');
  g += at(a, 30.19, 270, 440, chip(0, 0, 'शनिवार', MC.red, 30));
  g += `<g transform="translate(720,250)">${glow(0, 0, 150, 0.7)}${sunFace(0, 0, 66)}${garland(0, 74, 40, 24)}</g>`;
  for (let i = 0; i < 5; i++) g += at(a, 31.75 + i * 0.4, 590 + i * 65, 400, diya(0, 0, 0.8, lt + i));
  g += at(a, 34.68, 720, 90, chip(0, 0, 'सूर्य का जन्मदिन', MC.saffron, 26));
  return g;
});
// 5 who is Surya
const A5 = mk(37.8, (lt, a) => {
  let g = bgDawn(lt, 190, 30, false).replace(sunFace(480, 190, 30), '') + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += glow(480, 260, 260, 0.8);
  g += fig(SURYA, 480, FL + 50, 0.6, false, { armF: -55 + sway(lt, 4, 2), armB: -6, eyeOpen: blink(lt) });
  g += at(a, 40.64, 200, 140, chip(0, 0, 'सूर्य नारायण', MC.red, 28));
  g += at(a, 43.37, 760, 140, chip(0, 0, 'आदित्य', MC.saffron, 30));
  g += at(a, 44.76, 760, 220, chip(0, 0, 'अदिति का पुत्र', MC.green, 24));
  return g;
});
// 6 Kashyap, Aditi, the Adityas
const A6 = mk(47.73, (lt, a) => {
  let g = bgForest(lt);
  g += fig(MUNI, 200, FL + 50, 0.5, false, { armF: -50, armB: -6, eyeOpen: blink(lt) }) + fig(ADITI, 330, FL + 50, 0.5, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.5) });
  g += at(a, 48.2, 200, 150, chip(0, 0, 'ऋषि कश्यप', MC.green, 22)) + at(a, 48.9, 330, 195, chip(0, 0, 'अदिति', MC.red, 22));
  const cols = [MC.red, MC.blue, MC.green, MC.saffron, MC.yellow, MC.pink];
  for (let i = 0; i < 12; i++) { const x = 480 + (i % 6) * 70, y = FL + 10 + Math.floor(i / 6) * 28; const t0 = 50.9 + i * 0.22; if (a > t0) g += `<g transform="translate(${x},${y}) scale(${pop(a, t0)})">${fig({ ...DEVA, uttariya: cols[i % 6] }, 0, 0, 0.17, false, { armF: 8, armB: -6 })}</g>`; }
  g += at(a, 53.76, 700, 200, chip(0, 0, 'बारह आदित्य', MC.saffron, 26));
  if (a > 55.47) g += glow(480 + 2 * 70, FL - 70, 80 * prog(a, 55.47, 56.2), 1) + at(a, 55.6, 620, 320, chip(0, 0, 'सूर्य', MC.red, 26));
  return g;
});
// 7 devas lose, Aditi sad
const A7 = mk(58.15, (lt, a) => {
  let g = bgPlain('#d9c3a0', '#8a6a4a');
  const r = prog(a, 65.11, 67.5);
  for (let i = 0; i < 3; i++) g += fig(DEVA, lerp(330, 130, r) - i * 70 + 200, FL + 40 + (i % 2) * 14, 0.3, false, { armF: 8, armB: -6, headTilt: 10 * r });
  for (let i = 0; i < 3; i++) g += fig(ASUR, lerp(800, 600, r) + i * 62, FL + 40 + (i % 2) * 14, 0.34, true, { armF: -60, armB: -6 });
  g += fig(ADITI, 470, FL + 60, 0.52, false, { armF: 30, armB: -6, headTilt: lerp(0, 22, prog(a, 66.8, 68)), eyeOpen: 0.4 });
  g += at(a, 63.03, 470, 120, chip(0, 0, 'देवताओं की माँ', MC.red, 24));
  g += at(a, 65.3, 190, 150, chip(0, 0, 'देवता', MC.blue, 24)) + at(a, 65.6, 760, 150, chip(0, 0, 'असुर', MC.maroon, 24));
  if (a > 67.25) for (let i = 0; i < 3; i++) { const yy = 300 + ((lt * 60 + i * 30) % 90); g += `<path d="M${462 + i * 8},${yy} q-5,12 0,16 q5,-4 0,-16Z" fill="#6aa0d0" ${S(1.5)}/>`; }
  return g;
});
// 8 tapasya, Surya promises, baby
const A8 = mk(68.86, (lt, a) => {
  let g = bgForest(lt).replace(sunFace(820, 110, 40), '');
  const sg = prog(a, 71.34, 73);
  g += glow(700, 170, 40 + 180 * sg, 0.3 + 0.7 * sg);
  g += fig(ADITI, 250, FL + 50, 0.55, false, { armF: -100, armB: -100, eyeOpen: 0.1 });
  g += at(a, 69.2, 250, 100, chip(0, 0, 'तपस्या', MC.green, 26));
  if (a > 71.34) g += `<g opacity="${sg}">${fig(SURYA, 700, FL + 20, 0.5, true, { armF: -60 + sway(lt, 5, 3), armB: -6, eyeOpen: blink(lt) })}</g>`;
  g += at(a, 76.12, 480, 340, baby(0, 0, 1.2));
  g += at(a, 78.84, 480, 250, chip(0, 0, 'आदित्य', MC.saffron, 28));
  return g;
});
// 9 Martanda egg
const A9 = mk(79.83, (lt, a) => {
  let g = bgPlain('#f7e2b0') + fig(ADITI, 190, FL + 50, 0.5, false, { armF: lt > 5.6 ? -50 : 8, armB: -6, eyeOpen: blink(lt) });
  const k = prog(a, 88.9, 92);
  g += glow(560, 280, 140 + 120 * k, 0.4 + 0.5 * k);
  if (k > 0) for (let i = 0; i < 12; i++) { const an = i * 30 * Math.PI / 180; g += `<line x1="${560 + 120 * Math.cos(an)}" y1="${280 + 150 * Math.sin(an)}" x2="${560 + (120 + 80 * k) * Math.cos(an)}" y2="${280 + (150 + 80 * k) * Math.sin(an)}" stroke="${MC.saffron}" stroke-width="6" stroke-linecap="round"/>`; }
  g += `<g transform="translate(560,${290 + 3 * Math.sin(lt * 3)}) rotate(${4 * Math.sin(lt * 2)})"><ellipse rx="92" ry="118" fill="${MC.cream}" ${S(5)}/><ellipse rx="70" ry="94" fill="url(#dotsY)" opacity=".7"/><path d="M-60,10 Q-30,-14 0,10 T60,10" fill="none" stroke="${MC.red}" stroke-width="5"/></g>`;
  g += at(a, 83.93, 560, 120, T(0, 0, 'मार्तंड', 72, MC.red));
  g += at(a, 89.1, 800, 440, chip(0, 0, 'अंडे जैसा', MC.green, 26));
  return g;
});
// 10 meanings differ
const A10 = mk(94.2, (lt, a) => {
  let g = bgPlain('#f7e2b0');
  const sc = (x: number, rot: number) => `<g transform="translate(${x},270) rotate(${rot})"><rect x="-120" y="-130" width="240" height="260" rx="14" fill="${MC.cream}" ${S(5)}/>` + [0, 1, 2, 3, 4].map((i) => `<path d="M-90,${-90 + i * 40} q22,-14 44,0 t44,0 t44,0" fill="none" stroke="${MC.red}" stroke-width="4"/>`).join('') + `</g>`;
  g += at(a, 94.5, 250, 0, sc(0, -4)) + at(a, 96.5, 710, 0, sc(0, 4));
  g += at(a, 98.97, 480, 270, T(0, 0, '?', 120, MC.red));
  g += at(a, 98.2, 480, 460, chip(0, 0, 'कथाएँ एक जैसी नहीं', MC.saffron, 28));
  return g;
});
// 11 Rigveda: Eye of the gods
const A11 = mk(102.08, (lt, a) => {
  let g = bgPlain(MC.maroon, MC.maroon) + `<rect x="30" y="30" width="900" height="460" fill="url(#dotsY)" opacity=".2"/>`;
  g += book(260, 260, 1.15, 0.7) + at(a, 102.6, 260, 120, chip(0, 0, 'ऋग्वेद', MC.yellow, 32));
  if (a > 106.09) g += `<g transform="translate(700,250) scale(${pop(a, 106.09)})">${glow(0, 0, 190, 0.7)}${sunFace(0, 0, 100)}${eyeSym(0, 0, 1.1)}</g>`;
  g += at(a, 106.4, 700, 420, chip(0, 0, 'देवताओं की आँख', MC.yellow, 28));
  g += at(a, 109.24, 480, 70, chip(0, 0, 'रोशनी और जीवन', MC.cream, 28));
  return g;
});
// 12 Aruna the legless charioteer
const A12 = mk(111.84, (lt, a) => {
  let g = bgDawn(lt, 120, 50, false) + cloud(180, 110, 0.8) + cloud(800, 140, 0.9) + `<path d="M0,450 Q240,420 480,440 T960,435 L960,${H} L0,${H}Z" fill="#d98a4a" ${S(3)}/>`;
  g += ratha7(lerp(60, 150, ease(prog(lt, 0, 8.4))), 400, 0.9, lt);
  g += at(a, 114.65, 220, 175, chip(0, 0, 'सारथी अरुण', MC.red, 26));
  g += at(a, 115.38, 260, 80, chip(0, 0, 'पाँव नहीं!', MC.maroon, 26));
  g += at(a, 118.03, 640, 80, chip(0, 0, 'सबसे तेज़ सारथी', MC.green, 26));
  return g;
});
// 13 one horse seven names / seven metres
const A13 = mk(120.24, (lt, a) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  const cols = [MC.red, MC.saffron, MC.yellow, MC.green, MC.blue, '#5a2a6a', MC.pink];
  if (a < 121.54) { g += at(a, 120.3, 480, 70, chip(0, 0, 'ऋग्वेद', MC.maroon, 28)); for (let i = 6; i >= 0; i--) g += horse(130 + i * 100, FL + 20, 0.55, lt + i * 0.3); }
  else {
    g += horse(300, FL + 30, 1.4, lt);
    cols.forEach((c, i) => { g += at(a, 121.9 + i * 0.4, 560 + (i % 4) * 90 - (i > 3 ? 45 : 0), 160 + Math.floor(i / 4) * 90, `<circle r="30" fill="${c}" ${S(4)}/>${T(0, 10, ['१', '२', '३', '४', '५', '६', '७'][i], 30, MC.cream, 'Hind')}`); });
    g += at(a, 121.6, 480, 60, chip(0, 0, 'एक घोड़ा, सात नाम', MC.red, 28));
    g += at(a, 125.12, 480, 460, chip(0, 0, 'पुराण: सात छंद', MC.green, 28));
  }
  return g;
});
// 14 seven colours, seven days
const A14 = mk(127.47, (lt, a) => {
  let g = bgPlain('#f7e2b0', '#f7e2b0');
  const cols = [MC.red, MC.saffron, MC.yellow, MC.green, MC.blue, '#3a4a9a', '#7a3a8a'];
  cols.forEach((c, i) => { g += fade(prog(a, 127.9 + i * 0.35, 128.4 + i * 0.35), `<path d="M${130 + i * 14},330 A${350 - i * 14},${300 - i * 14} 0 0,1 ${830 - i * 14},330" fill="none" stroke="${c}" stroke-width="16"/>`); });
  g += glow(480, 330, 90, 0.6) + sunFace(480, 330, 44);
  ['सो', 'मं', 'बु', 'गु', 'शु', 'श', 'र'].forEach((d, i) => { g += at(a, 129.8 + i * 0.3, 175 + i * 102, 440, `<circle r="34" fill="${cols[i]}" ${S(4)}/>${T(0, 12, d, 30, MC.cream, 'Hind')}`); });
  g += at(a, 132.4, 480, 80, chip(0, 0, 'बाद की व्याख्या', MC.maroon, 30));
  return g;
});
// 15 chariot turns north-east
const A15 = mk(134.63, (lt, a) => {
  let g = bgDawn(lt, 90, 40, false) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  let d = ''; for (let i = 0; i <= 20; i++) { const p = i / 20; d += `${i ? 'L' : 'M'}${lerp(120, 800, p)},${400 - 250 * p * p * p - 20 * p}`; }
  g += `<path d="${d}" fill="none" stroke="${MC.red}" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round"/>`;
  const p = ease(prog(lt, 0.5, 8.5)); g += ratha7(lerp(100, 700, p) - 100, 400 - 250 * p * p * p - 20 * p + 20, 0.3, lt, true);
  if (a > 138.25) g += at(a, 138.25, 800, 330, `<circle r="60" fill="${MC.cream}" ${S(4)}/>${arrow(-26, 26, 28, -28, MC.red)}${T(0, 92, 'उत्तर-पूर्व', 24, INK, 'Hind')}`);
  g += at(a, 138.6, 300, 90, chip(0, 0, 'रथ मुड़ता है', MC.red, 30));
  return g;
});
// 16 days lengthen, winter fades, spring
const A16 = mk(143.65, (lt, a) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  const arc = (r: number, col: string, w = 8, o = 1) => `<path d="M${480 - r},${FL - 20} A${r},${r * 0.8} 0 0,1 ${480 + r},${FL - 20}" fill="none" stroke="${col}" stroke-width="${w}" stroke-dasharray="3 12" stroke-linecap="round" opacity="${o}"/>`;
  g += arc(230, '#9aa8b8', 6, 0.7) + arc(lerp(230, 330, ease(prog(a, 143.8, 148))), MC.saffron, 9);
  const p = ease(prog(lt, 0, 8)); const an = Math.PI * (1 - p), R = lerp(230, 330, ease(prog(a, 143.8, 148)));
  g += sunFace(480 + R * Math.cos(an), FL - 20 - 0.8 * R * Math.sin(an), 36);
  g += at(a, 144.2, 480, 90, chip(0, 0, 'दिन लंबे होने लगे', MC.saffron, 28));
  if (a < 149.2) for (let i = 0; i < 6; i++) { const x = 120 + i * 150, y = 330 + 10 * Math.sin(lt * 2 + i); g += `<g transform="translate(${x},${y})" opacity="${1 - prog(a, 146.44, 149)}">` + [0, 60, 120].map((r) => `<line x1="-22" y1="0" x2="22" y2="0" stroke="#7aa0c8" stroke-width="5" stroke-linecap="round" transform="rotate(${r})"/>`).join('') + `</g>`; }
  if (a > 149.19) for (let i = 0; i < 6; i++) { const x = 120 + i * 150; g += at(a, 149.4 + i * 0.3, x, FL + 40, `<line x1="0" y1="0" x2="0" y2="-40" stroke="${MC.green}" stroke-width="6"/>${lotus(0, -40, 0.3)}`); }
  g += at(a, 150.5, 480, 480, chip(0, 0, 'वसंत की आहट', MC.green, 28));
  return g;
});
// 17 farmers, harvest
const A17 = mk(153.07, (lt, a) => {
  let g = bgDawn(lt, 120, 50, false) + `<rect x="0" y="${FL - 60}" width="${W}" height="${H}" fill="#e0b050"/><rect x="0" y="${FL - 64}" width="${W}" height="5" fill="${INK}"/>`;
  for (let i = 0; i < 18; i++) { const x = 40 + i * 54; const cut = x < 450 && lt > 2 + (x / 450) * 6; if (!cut) g += `<g transform="translate(${x},${FL - 40 + (i % 3) * 22})"><path d="M0,0 Q4,-40 0,-70" fill="none" stroke="#a87a1a" stroke-width="5"/><ellipse cx="0" cy="-76" rx="7" ry="16" fill="${MC.yellow}" ${S(2)}/></g>`; else g += `<rect x="${x - 3}" y="${FL - 40 + (i % 3) * 22 - 10}" width="6" height="10" fill="#a87a1a"/>`; }
  const fx = lerp(120, 460, ease(prog(lt, 2, 8)));
  g += fig(MAN, fx, FL + 70, 0.5, false, { armF: -30 + 25 * Math.sin(lt * 5), armB: -20, legSwing: walk(lt, lt < 8), eyeOpen: blink(lt) });
  g += at(a, 153.4, 300, 70, chip(0, 0, 'फ़सल कटाई', MC.saffron, 30));
  g += at(a, 157.07, 700, 70, chip(0, 0, 'खेती · नई शुरुआत', MC.green, 28));
  g += at(a, 159.5, 800, 300, `<ellipse cx="0" cy="40" rx="70" ry="20" fill="#e8c060" ${S(3)}/><path d="M-60,40 Q0,-60 60,40Z" fill="${MC.yellow}" ${S(4)}/>`);
  return g;
});
// 18 sun ripens grain and fruit
const A18 = mk(162.04, (lt, a) => {
  const k = prog(lt, 0, 4);
  let g = bgDawn(lt, 110, 70 + 6 * Math.sin(lt * 3), false) + `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  for (let i = 0; i < 12; i++) { const x = 60 + i * 76; g += `<g transform="translate(${x},${FL + 10})"><path d="M0,0 Q5,-50 0,-90" fill="none" stroke="#7a8a2a" stroke-width="5"/><ellipse cx="0" cy="-98" rx="8" ry="18" fill="${k > 0.5 ? MC.yellow : MC.leaf}" ${S(2)}/></g>`; }
  g += tree(780, FL + 20, 0.7);
  for (let i = 0; i < 5; i++) g += at(a, 164 + i * 0.3, 740 + (i % 3) * 36, 250 + Math.floor(i / 3) * 40 + (i % 2) * 20, `<circle r="14" fill="${MC.saffron}" ${S(3)}/>`);
  for (let i = 0; i < 9; i++) { const an = (i * 40 + lt * 20) * Math.PI / 180; g += `<line x1="${480 + 100 * Math.cos(an)}" y1="${110 + 100 * Math.sin(an)}" x2="${480 + 130 * Math.cos(an)}" y2="${110 + 130 * Math.sin(an)}" stroke="${MC.saffron}" stroke-width="6" stroke-linecap="round"/>`; }
  g += at(a, 162.5, 480, 480, chip(0, 0, 'सूरज बिना कुछ नहीं पकता', MC.red, 26));
  return g;
});
// 19 Samba's curse
const A19 = mk(167.76, (lt, a) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + at(a, 168, 480, 70, chip(0, 0, 'साम्ब पुराण', MC.red, 30));
  g += fig(KRISH, 200, FL + 50, 0.5, false, { armF: -40, armB: -6, eyeOpen: blink(lt) }, { feather: true });
  g += at(a, 172.3, 200, 130, chip(0, 0, 'श्रीकृष्ण', MC.blue, 22));
  g += fig(SAMBA, 600, FL + 50, 0.5, false, { armF: a > 174.89 ? 30 : 8, armB: -6, headTilt: a > 174.89 ? 14 : 0, eyeOpen: blink(lt + 1) });
  g += at(a, 173.5, 600, 130, chip(0, 0, 'पुत्र साम्ब', MC.green, 22));
  if (a > 174.89) { g += fade(prog(a, 174.89, 175.6), `<g transform="translate(600,150)">${cloud(0, 0, 0.9, '#6a5a7a')}<path d="M-6,20 L12,60 L0,60 L14,100" fill="none" stroke="${MC.yellow}" stroke-width="7" stroke-linejoin="round"/></g>`) + at(a, 175, 800, 300, chip(0, 0, 'श्राप', MC.maroon, 28)); }
  if (a > 176.2) for (let i = 0; i < 7; i++) g += at(a, 176.2 + i * 0.15, 580 + (i % 3) * 18, 230 + i * 20, `<circle r="6" fill="${MC.red}" ${S(1.5)}/>`);
  return g;
});
// 20 Samba worships, cured
const A20 = mk(177.89, (lt, a) => {
  let g = bgDawn(lt, 150, 62, true);
  g += glow(300, 330, 200, 0.6 * prog(a, 178, 180));
  g += fig(SAMBA, 300, FL + 50, 0.56, false, { armF: -100, armB: -100, eyeOpen: 0.1, headTilt: -6 });
  const sp = 1 - prog(a, 180.2, 181.53);
  if (sp > 0) for (let i = 0; i < 7; i++) g += `<circle cx="${290 + (i % 3) * 14}" cy="${300 + i * 16}" r="5" fill="${MC.red}" opacity="${sp}"/>`;
  g += at(a, 178.3, 700, 330, chip(0, 0, 'सूर्य की उपासना', MC.saffron, 26));
  g += at(a, 180.5, 700, 395, chip(0, 0, 'रोग से मुक्ति', MC.green, 26));
  g += at(a, 182.35, 480, 70, chip(0, 0, 'श्रद्धा की कथा', MC.red, 30));
  g += at(a, 185.8, 760, 230, `<g>${lotus(0, 20, 0.6)}${T(0, 70, 'आरोग्य', 34, MC.red)}</g>`);
  return g;
});
// 21 Andhra / Telangana pre-dawn bath
const A21 = mk(189.98, (lt, a) => {
  const dn = prog(lt, 0, 8);
  let g = bgNight(lt) + fade(dn, `<rect width="${W}" height="${H}" fill="url(#dawn)"/>`) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#7a5a3a"/>`;
  g += moon(150, 110, 40, 0.3) ;
  g += sunFace(780, lerp(480, 330, dn), 56);
  g += fig(MAN, 380, FL + 50, 0.55, false, { armF: -95, armB: -80, eyeOpen: blink(lt) });
  if (a > 195) { g += lota(440, 90, 1.1, 120); for (let i = 0; i < 8; i++) { const yy = 140 + ((lt * 200 + i * 38) % 300); g += `<path d="M${420 + 6 * Math.sin(i)},${yy} q-6,12 0,18 q6,-6 0,-18Z" fill="#6aa0d0" ${S(1.5)}/>`; } }
  g += at(a, 190.2, 480, 60, chip(0, 0, 'आंध्र प्रदेश · तेलंगाना', MC.red, 28));
  g += at(a, 193.9, 650, 150, chip(0, 0, 'सूरज निकलने से पहले', MC.blue, 24));
  return g;
});
// 22 arka leaves on head
const A22 = mk(198.78, (lt, a) => {
  let g = bgDawn(lt, 120, 50, false) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#7a5a3a"/>`;
  g += fig(MAN, 330, FL + 50, 0.62, false, { armF: -30, armB: -20, headTilt: 0, eyeOpen: 0.15 });
  const leaf = (x: number, y: number, r: number) => `<path d="M0,0 C20,-14 40,-6 50,10 C30,22 10,18 0,0Z" fill="${MC.leaf}" ${S(3)} transform="translate(${x},${y}) rotate(${r})"/>`;
  g += at(a, 199.4, 330, 150, `<g>${leaf(-40, 10, -20)}${leaf(-10, 0, 10)}${leaf(-60, 20, -50)}${leaf(0, 14, 40)}</g>`);
  g += lota(450, 130 + 4 * Math.sin(lt * 3), 1.2, 140);
  for (let i = 0; i < 9; i++) { const yy = 170 + ((lt * 180 + i * 36) % 260); g += `<path d="M${410 - (yy - 170) * 0.22 + 4 * Math.sin(i)},${yy} q-6,12 0,18 q6,-6 0,-18Z" fill="#6aa0d0" ${S(1.5)}/>`; }
  g += at(a, 198.9, 700, 140, chip(0, 0, 'आक के पत्ते', MC.green, 28));
  g += at(a, 202.5, 700, 215, chip(0, 0, 'सिर पर रखकर स्नान', MC.blue, 24));
  return g;
});
// 23 rangoli chariot + milk on dung-cakes
const A23 = mk(205.02, (lt, a) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += `<g transform="translate(250,330)"><circle r="170" fill="${MC.cream}" ${S(5)}/><circle r="150" fill="url(#dotsY)" opacity=".6"/>`;
  const cols = [MC.red, MC.saffron, MC.blue, MC.green, MC.pink, '#5a2a6a'];
  for (let i = 0; i < 24; i++) { const an = i * 15 * Math.PI / 180; g += fade(prog(a, 205.1 + i * 0.07, 205.3 + i * 0.07), `<circle cx="${(155 * Math.cos(an)).toFixed(1)}" cy="${(155 * Math.sin(an)).toFixed(1)}" r="8" fill="${cols[i % 6]}" ${S(2)}/>`); }
  g += fade(prog(a, 206, 207), `<g transform="translate(0,40) scale(0.55)">${horse(150, 0, 0.7, lt)}${chariot(-20, 0, 0.9, lt)}</g>`) + `</g>`;
  g += at(a, 205.2, 250, 100, chip(0, 0, 'रंगोली का रथ', MC.red, 28));
  g += at(a, 208.25, 700, 460, upla(0, 0, 1.2));
  g += `<g transform="translate(700,340)">${a > 208.5 ? fire(0, 100, 0.7, lt) : ''}</g>`;
  g += at(a, 209.5, 700, 330, pot(0, 0, 1.1));
  g += at(a, 208.6, 700, 150, chip(0, 0, 'उपलों पर दूध', MC.saffron, 28));
  g += at(a, 212.44, 700, 210, chip(0, 0, 'खुला आसमान', MC.blue, 24));
  return g;
});
// 24 milk boils over; kheer to the sun
const A24 = mk(214.27, (lt, a) => {
  let g = bgDawn(lt, 120, 56, false) + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  const ov = ease(prog(a, 214.3, 217.5));
  g += upla(240, FL + 40, 1.0) + fire(240, FL + 40, 0.6, lt) + pot(240, FL - 20, 1.0);
  g += `<path d="M180,${FL - 100} Q${210},${FL - 150 - 30 * ov} 240,${FL - 110 - 30 * ov} T300,${FL - 100} L300,${FL - 92} L180,${FL - 92}Z" fill="#fff" ${S(3)}/>`;
  if (ov > 0) g += `<path d="M190,${FL - 96} q-12,${60 * ov} -4,${90 * ov}" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M296,${FL - 96} q10,${50 * ov} 2,${80 * ov}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`;
  g += at(a, 214.5, 240, 150, chip(0, 0, 'उफनता दूध = शुभ', MC.green, 26));
  g += at(a, 218.48, 520, 420, `<ellipse rx="70" ry="22" cy="30" fill="${MC.yellow}" ${S(4)}/><path d="M-70,30 Q0,110 70,30Z" fill="${MC.cream}" ${S(4)}/><ellipse rx="60" ry="14" cy="26" fill="#fff6e0"/>`);
  g += at(a, 218.7, 520, 330, chip(0, 0, 'पायसम · खीर', MC.red, 28));
  g += `<g opacity="${prog(a, 221.84, 222.5)}">${fig(MAN, 780, FL + 55, 0.5, true, { armF: -100, armB: -90, eyeOpen: 1 })}</g>`;
  g += at(a, 222.6, 640, 140, chip(0, 0, 'सूर्य को अर्पण', MC.saffron, 26));
  return g;
});
// 25 Tirumala: Malayappa on seven vahanas
const A25 = mk(224.46, (lt, a) => {
  let g = bgDawn(lt, 120, 40, false) + `<path d="M0,360 Q200,250 420,330 T960,300 L960,${H} L0,${H}Z" fill="#8a6a4a" ${S(3)}/><rect x="0" y="${FL}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += temple(780, 340, 0.55);
  g += at(a, 224.6, 300, 70, chip(0, 0, 'तिरुमला', MC.red, 34));
  g += fig(VENK, 300, FL + 40, 0.52, false, { armF: -50, armB: -6, eyeOpen: blink(lt) });
  g += at(a, 226.2, 300, 150, chip(0, 0, 'मलयप्पा स्वामी', MC.blue, 24));
  for (let i = 0; i < 7; i++) g += at(a, 228.15 + i * 0.4, 520 + i * 52, 470, `<circle r="22" fill="${[MC.red, MC.saffron, MC.yellow, MC.green, MC.blue, '#5a2a6a', MC.pink][i]}" ${S(3)}/>${T(0, 9, ['१', '२', '३', '४', '५', '६', '७'][i], 24, MC.cream, 'Hind')}`);
  g += at(a, 229, 480, 400, chip(0, 0, 'सात अलग सवारियाँ', MC.saffron, 26));
  return g;
}, 0.03);
// 26 procession: Surya Prabha to Chandra Prabha
const A26 = mk(231.65, (lt, a) => {
  const n = prog(a, 234.6, 236.4);
  let g = bgDawn(lt, 110, 50, false) + fade(n, bgNight(lt)) + `<rect x="0" y="${FL + 20}" width="${W}" height="${H}" fill="#7a5a3a"/>`;
  const px = lerp(180, 500, ease(prog(lt, 0, 9)));
  g += `<g transform="translate(${px},0)">`;
  g += glow(0, 250, 150, 0.6) + (n < 0.5 ? sunFace(0, 250, 80) : moon(0, 250, 80, 0.5));
  g += seated(VENK, 0, 300, 0.45, false, { armF: -50, armB: -6, eyeOpen: 1 }, {}, MC.red);
  g += `<rect x="-140" y="360" width="280" height="22" rx="6" fill="${MC.yellow}" ${S(4)}/>`;
  for (let i = 0; i < 4; i++) g += fig(MAN, -110 + i * 74, FL + 60, 0.26, false, { armF: 8, armB: -6, legSwing: walk(lt, true, i) }, { uttariya: [MC.red, MC.green, MC.blue, MC.saffron][i] });
  g += `</g>`;
  g += win(a, 232, 235.4, at(a, 232, 480, 70, chip(0, 0, 'सूर्य प्रभा वाहन · सुबह', MC.saffron, 28)));
  g += win(a, 235.44, 238.4, at(a, 235.44, 480, 70, chip(0, 0, 'चंद्र प्रभा वाहन · रात', MC.blue, 28)));
  g += at(a, 238.47, 480, 70, chip(0, 0, 'लघु ब्रह्मोत्सव', MC.red, 30));
  return g;
}, 0.03);
// 27 Arasavalli
const A27 = mk(240.92, (lt, a) => {
  let g = bgDawn(lt, 100, 40, false) + `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += temple(480, FL - 20, 0.75) + sunFace(480, FL - 330, 22);
  for (let i = 0; i < 6; i++) { const x = lerp(i % 2 ? 1050 : -90, 140 + i * 130, ease(prog(lt, 0.5 + i * 0.3, 5 + i * 0.3))); g += fig(i % 2 ? WOMAN : MAN, x, FL + 55 + (i % 2) * 15, 0.3, x > 480, { armF: 8, armB: -6, legSwing: walk(lt, lt < 5 + i * 0.3, i) }, { uttariya: [MC.red, MC.green, MC.blue, MC.saffron, MC.pink, MC.yellow][i] }); }
  g += at(a, 241, 480, 60, chip(0, 0, 'अरसवल्ली · श्रीकाकुलम', MC.red, 28));
  g += at(a, 245.41, 160, 160, chip(0, 0, 'बहुत पुराना', MC.maroon, 24));
  if (a > 247.36) for (let i = 0; i < 7; i++) g += diya(100 + i * 125, FL + 100, 0.6, lt + i);
  g += at(a, 247.5, 800, 160, chip(0, 0, 'बड़ा उत्सव', MC.saffron, 26));
  return g;
});
// 28 Konark
const A28 = mk(250.78, (lt, a) => {
  let g = bgDawn(lt, 120, 44, false) + `<rect x="0" y="${FL - 10}" width="${W}" height="${H}" fill="#e0b070"/>`;
  g += temple(330, 330, 0.6);
  g += `<rect x="100" y="320" width="460" height="70" rx="10" fill="#c98a5a" ${S(5)}/><rect x="100" y="320" width="460" height="18" fill="url(#tri)"/>`;
  g += wheel(210, 400, 70, lt * 6) + wheel(450, 400, 70, lt * 6);
  for (let i = 6; i >= 0; i--) g += at(a, 259.7 + (6 - i) * 0.25, 600 + i * 46, 380 - (i % 2) * 8, horse(0, 0, 0.5, lt + i * 0.3));
  g += at(a, 250.9, 480, 55, chip(0, 0, 'कोणार्क · ओडिशा', MC.red, 30));
  g += at(a, 256.12, 190, 130, chip(0, 0, 'तेरहवीं सदी', MC.maroon, 24));
  g += at(a, 258.6, 330, 470, chip(0, 0, '१२ जोड़ी पहिये', MC.green, 26));
  g += at(a, 260.4, 780, 210, chip(0, 0, '७ घोड़े', MC.blue, 28));
  return g;
}, 0.03);
// 29 UNESCO + Chandrabhaga
const A29 = mk(262.67, (lt, a) => {
  let g = bgWater(lt);
  g += at(a, 262.9, 190, 180, badge(0, 0, 'यूनेस्को', 'विश्व धरोहर', MC.blue, 0.95));
  g += temple(480, 270, 0.3);
  for (let i = 0; i < 5; i++) { const x = 380 + i * 110; g += fig(i % 2 ? WOMAN : MAN, x, 400, 0.3, false, { armF: i % 2 ? -100 : -30, armB: -20, eyeOpen: blink(lt + i) }, { uttariya: [MC.red, MC.green, MC.blue, MC.saffron, MC.pink][i] }); g += `<path d="M${x - 40},${392 + 3 * Math.sin(lt * 2 + i)} q20,-8 40,0 t40,0 L${x + 40},470 L${x - 40},470Z" fill="#2f6fb5" opacity=".92"/>`; }
  g += at(a, 265.28, 640, 110, chip(0, 0, 'चंद्रभागा तट', MC.blue, 28));
  g += at(a, 268.19, 640, 480, chip(0, 0, 'माघ का स्नान', MC.cream, 26));
  return g;
});
// 30 offer water facing east
const A30 = mk(271.22, (lt, a) => {
  const glowk = prog(a, 282.86, 284);
  let g = `<rect width="${W}" height="${H}" fill="url(#dawn)"/>` + glow(650, 190, 220, 0.6) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += sunFace(650, 190, 70 + 20 * glowk);
  g += fig(MAN, 250, FL + 50, 0.58, false, { armF: a > 279.25 ? -110 : 8, armB: a > 279.25 ? -100 : -6, eyeOpen: blink(lt) });
  if (a > 279.8) { g += lota(300, FL - 270, 1, 80); for (let i = 0; i < 10; i++) { const p = ((lt * 0.8 + i / 10) % 1); g += `<circle cx="${lerp(320, 640, p)}" cy="${FL - 260 - 80 * Math.sin(Math.PI * p) + 30 * p}" r="5" fill="#8cc0ea" ${S(1)}/>`; } }
  g += at(a, 273.85, 480, 90, chip(0, 0, 'मूर्ति ज़रूरी नहीं', MC.maroon, 28));
  g += at(a, 277.72, 120, 110, chip(0, 0, 'सुबह उठिए', MC.green, 24));
  g += at(a, 279.4, 700, 400, chip(0, 0, 'पूरब की ओर · जल', MC.blue, 26));
  g += at(a, 282.86, 700, 320, chip(0, 0, 'सूरज सामने', MC.saffron, 28));
  return g;
});
// 31 sun gives light for free (village)
const A31 = mk(284.18, (lt, a) => {
  let g = bgDawn(lt, 150, 80, false) + `<rect x="0" y="${FL - 10}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  for (let i = 0; i < 14; i++) { const an = (i * 360 / 14 + lt * 10) * Math.PI / 180; g += `<line x1="${480 + 100 * Math.cos(an)}" y1="${150 + 100 * Math.sin(an)}" x2="${480 + 190 * Math.cos(an)}" y2="${150 + 190 * Math.sin(an)}" stroke="${MC.yellow}" stroke-width="7" stroke-linecap="round" opacity=".7"/>`; }
  g += house(180, FL + 20, 1.2, MC.cream, true) + house(480, FL + 50, 0.9, '#f2d99c', true) + house(790, FL + 20, 1.2, MC.cream, true);
  g += bird(300, 220, 0.4, Math.sin(lt * 6)) + bird(680, 250, 0.4, Math.sin(lt * 6 + 1));
  g += at(a, 284.69, 480, 275, chip(0, 0, 'बिना माँगे सबको', MC.saffron, 28));
  g += at(a, 288.19, 480, 345, T(0, 0, 'धन्यवाद', 56, MC.red));
  return g;
});
// 32 children learn gratitude
const A32 = mk(292.95, (lt, a) => {
  let g = bgDawn(lt, 140, 60, false) + `<rect x="0" y="${FL - 10}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += fig(MAN, 380, FL + 50, 0.56, false, { armF: -100, armB: -100, eyeOpen: 0.15 }) + fig({ ...MAN, uttariya: MC.red }, 520, FL + 55, 0.34, false, { armF: -100, armB: -100, eyeOpen: 0.15 });
  g += fig(WOMAN, 250, FL + 50, 0.52, false, { armF: -100, armB: -100, eyeOpen: 0.15 });
  g += at(a, 293.2, 740, 260, chip(0, 0, 'बच्चे सीखते हैं', MC.green, 28));
  g += at(a, 297.15, 720, 330, chip(0, 0, 'क़द्र करना भी पूजा', MC.red, 28));
  g += petals(lt, 9, 16);
  return g;
});
// 33 teaser: pillar of fire at night
const A33 = mk(300.68, (lt, a) => {
  let g = bgNight(lt) + moon(160, 100, 36, 0.4) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#2a1a2a"/>`;
  g += house(150, FL + 20, 1, '#6a5a6a') + house(300, FL + 10, 0.8, '#6a5a6a') + house(780, FL + 20, 1, '#6a5a6a') + house(880, FL + 10, 0.8, '#6a5a6a');
  g += at(a, 301, 480, 60, chip(0, 0, 'अब अगली कहानी', MC.yellow, 30));
  g += at(a, 302.4, 150, 220, T(0, 0, 'z z', 36, MC.cream, 'Hind'));
  if (a > 305.37) g += pillar(530, FL + 20, lerp(FL, 50, ease(prog(a, 305.37, 308.8))), lt);
  return g;
});
// 34 Brahma up, Vishnu down
const A34 = mk(309.26, (lt, a) => {
  let g = bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#2a1a2a"/>` + pillar(480, FL + 20, 40, lt);
  const by = lerp(300, 120, ease(prog(lt, 0, 5))), vy = lerp(FL + 10, FL + 60, ease(prog(lt, 0, 5)));
  g += fig(BRAHMA, 250, by + 150, 0.3, false, { armF: -60, armB: -6, eyeOpen: 1 }) + bird(250, by + 190, 0.8, Math.sin(lt * 6));
  g += arrow(250, 200, 250, 90, MC.yellow);
  g += at(a, 309.5, 250, 300, chip(0, 0, 'ब्रह्मा · ऊपरी सिरा', MC.yellow, 22));
  g += fig(VENK, 720, vy, 0.3, true, { armF: 40, armB: -6, eyeOpen: 1 });
  g += arrow(720, FL - 120, 720, FL - 20, MC.cream);
  g += at(a, 313.43, 720, 120, chip(0, 0, 'विष्णु · जड़', MC.cream, 24));
  return g;
});
// 35 whose pillar? Shiva-Parvati; next: Mahashivratri
const A35 = mk(315.38, (lt, a) => {
  let g = bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#2a1a2a"/>` + pillar(190, FL + 20, 120, lt);
  g += at(a, 315.5, 190, 90, T(0, 0, '?', 100, MC.yellow));
  if (a > 316.85) { g += glow(650, 300, 240, 0.35); g += fig(SHIVA, 600, FL + 50, 0.52, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }) + moon(603, FL - 270, 20, 0.3); g += fig(PARVATI, 760, FL + 50, 0.5, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }); g += garland(680, FL - 130, 50, 30); g += at(a, 317, 680, 130, chip(0, 0, 'विवाह की रात', MC.pink, 26)); }
  g += at(a, 320.54, 480, 480, T(0, 0, 'महाशिवरात्रि', 62, MC.yellow));
  g += at(a, 321.6, 480, 520, `<g transform="scale(0.6)">${chip(0, 0, 'अगले वीडियो में', MC.cream, 26)}</g>`);
  return g;
});
// 36 comment question; Jai Surya Dev
const A36 = mk(324.53, (lt, a) => {
  let g = bgDawn(lt, 150, 70, false) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  if (a < 331.94) {
    g += fig(MAN, 280, FL + 50, 0.56, false, { armF: a > 326 ? -100 : 8, armB: -6, eyeOpen: blink(lt) }) + lota(330, FL - 270, 0.9, 80);
    g += at(a, 325.95, 700, 330, bubble(0, 0, 'जल चढ़ाते हैं?', 320, 32));
    g += at(a, 330.13, 700, 420, chip(0, 0, 'कमेंट में बताइए', MC.red, 28));
  } else {
    g += glow(480, 220, 280, 0.7) + sunFace(480, 190, 80 + 4 * Math.sin(lt * 3)) + at(a, 332, 480, 360, T(0, 0, 'जय सूर्य देव', 66, MC.red)) + petals(lt, 11, 24);
    g += fig(SURYA, 220, FL + 50, 0.45, false, { armF: -60, armB: -6, eyeOpen: blink(lt) }) + fig(MAN, 740, FL + 50, 0.45, true, { armF: -100, armB: -100, eyeOpen: 0.15 });
  }
  return g;
});

const LIST: [number, number, any][] = [
  [0, 6.01, A1], [6.01, 15.52, A2], [15.52, 26.77, A3], [26.77, 37.8, A4], [37.8, 47.73, A5], [47.73, 58.15, A6], [58.15, 68.86, A7], [68.86, 79.83, A8],
  [79.83, 94.2, A9], [94.2, 102.08, A10], [102.08, 111.84, A11], [111.84, 120.24, A12], [120.24, 127.47, A13], [127.47, 134.63, A14], [134.63, 143.65, A15],
  [143.65, 153.07, A16], [153.07, 162.04, A17], [162.04, 167.76, A18], [167.76, 177.89, A19], [177.89, 189.98, A20], [189.98, 198.78, A21], [198.78, 205.02, A22],
  [205.02, 214.27, A23], [214.27, 224.46, A24], [224.46, 231.65, A25], [231.65, 240.92, A26], [240.92, 250.78, A27], [250.78, 262.67, A28], [262.67, 271.22, A29],
  [271.22, 284.18, A30], [284.18, 292.95, A31], [292.95, 300.68, A32], [300.68, 309.26, A33], [309.26, 315.38, A34], [315.38, 324.53, A35], [324.53, 335.1, A36],
];
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
