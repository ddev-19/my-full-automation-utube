// @ts-nocheck
// Episode 05 — Makar Sankranti. Madhubani scenes, no sentence text on screen.
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, bowShape, sunFace, bird, tree, prog, ease, lerp, clamp, cloud, fire, lotus, moon, temple, chip, pop, xdefs, rnd, blink, sway,
  KRISH, YUDH, BHISHMA, MUNI, QUEEN, MAN, WOMAN, VAIKH,
  book, frame, bgForest, bgNight, bgPlain, bgWater, diya, bubble, lying,
} from './mb3';
import { ox } from './mb2';

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

// ---- cast ----
const SURYA = { skin: '#e8892f', crown: 'ram', dhoti: MC.red, uttariya: MC.yellow };
const SHANI = { skin: '#3a3f6e', crown: 'king', dhoti: MC.blue, uttariya: INK };
const SAGAR = { skin: '#d9915a', crown: 'king', beard: true, dhoti: MC.green, uttariya: MC.saffron };
const BHAGI = { skin: '#d9915a', bun: true, dhoti: MC.saffron, uttariya: MC.green };
const KAPIL = { ...MUNI, skin: '#c97b4a', uttariya: MC.red };
const BRAHMA = { skin: '#e8892f', bun: true, beard: true, dhoti: MC.white, uttariya: MC.yellow };
const SARAS = { female: true, skin: '#f4efe6' };
const BLACK = { skin: '#d9915a', dhoti: INK, uttariya: INK };
const KID = (c) => ({ skin: '#e6a974', dhoti: MC.yellow, uttariya: c });

// ---- props ----
const arrowShape = (x, y, len, ang, col = '#8a5a2b') => `<g transform="translate(${x},${y}) rotate(${ang})"><line x1="0" y1="0" x2="${len}" y2="0" ${S(7)}/><line x1="0" y1="0" x2="${len}" y2="0" stroke="${col}" stroke-width="3.5"/><path d="M${len},0 l-12,-8 l0,16Z" fill="#cfd6dc" ${S(2)}/><path d="M0,0 l-14,-9 l8,9 l-8,9Z" fill="${MC.red}" ${S(2)}/></g>`;
// bed of arrows (head to the left); top surface at y
const bed = (x0, x1, y, lt = 0, glowAmt = 0) => {
  let g = '';
  if (glowAmt > 0) g += glow((x0 + x1) / 2, y, (x1 - x0) * 0.5, glowAmt);
  for (let x = x0; x < x1; x += 22) g += arrowShape(x, y + 52, 76, -64);
  for (let x = x0 + 8; x < x1; x += 22) g += arrowShape(x, y + 52, 76, -116 + 180);
  g += `<path d="M${x0 - 10},${y + 6} Q${(x0 + x1) / 2},${y - 4} ${x1 + 10},${y + 6} L${x1 + 10},${y + 16} Q${(x0 + x1) / 2},${y + 8} ${x0 - 10},${y + 16}Z" fill="${MC.maroon}" ${S(3)}/>`;
  return g;
};
const bhLying = (x, y, s, lt, nArr = 8, eye = 0.9, extra = {}) => {
  let g = lying(BHISHMA, x, y, s, extra);
  for (let i = 0; i < nArr; i++) { const px = x - 30 * s * 2 - i * 52 * s; g += `<g transform="translate(${px},${y - 6 * s}) rotate(${-38 + (i % 3) * 14})"><line x1="0" y1="-70" x2="0" y2="${14 * s * 2}" ${S(5)}/><line x1="0" y1="-70" x2="0" y2="${14 * s * 2}" stroke="#8a5a2b" stroke-width="2.5"/><path d="M0,-70 l-7,-12 l14,0Z" fill="${MC.red}" ${S(2)}/></g>`; }
  return g;
};
const kite = (x, y, s, rot, col, lt = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M0,0 Q${-10 + 8 * Math.sin(lt * 3)},70 ${4 * Math.sin(lt * 3)},120" fill="none" stroke="${INK}" stroke-width="2.4" transform="translate(0,34)"/><path d="M0,-40 L28,0 L0,36 L-28,0Z" fill="${col}" ${S(3)}/><path d="M0,-40 L0,36 M-28,0 L28,0" stroke="${INK}" stroke-width="2"/><path d="M0,-40 L28,0 L0,0Z" fill="${MC.yellow}" opacity=".8"/></g>`;
const pot = (x, y, s = 1, lt = 0, boil = 0, rice = 1) => {
  let g = `<g transform="translate(${x},${y}) scale(${s})">`;
  if (boil > 0) { for (let i = 0; i < 6; i++) { const k = (lt * 1.4 + i * 0.3) % 1; g += `<circle cx="${-40 + i * 16}" cy="${-110 - 40 * k}" r="${8 + 4 * (i % 2)}" fill="${MC.cream}" ${S(2)} opacity="${(1 - k) * boil}"/>`; } g += `<path d="M-62,-96 C-70,-70 -66,-40 -58,-20 L-70,-10 C-80,-50 -82,-80 -62,-96Z M62,-96 C70,-70 66,-40 58,-20 L70,-10 C80,-50 82,-80 62,-96Z" fill="${MC.cream}" ${S(3)} opacity="${boil}" transform="translate(0,${6 * Math.sin(lt * 6)})"/>`; }
  g += `<path d="M-60,-100 C-84,-60 -80,-10 -52,0 L52,0 C80,-10 84,-60 60,-100Z" fill="#b8532a" ${S(5)}/><ellipse cx="0" cy="-100" rx="62" ry="14" fill="${MC.cream}" ${S(4)}/>`;
  g += `<path d="M-70,-60 Q0,-40 70,-60" fill="none" stroke="${MC.yellow}" stroke-width="6"/><path d="M-66,-36 Q0,-18 66,-36" fill="none" stroke="${MC.red}" stroke-width="5"/>`;
  for (let i = 0; i < 5; i++) g += `<circle cx="${-40 + i * 20}" cy="${-48 + 4 * (i % 2)}" r="4" fill="${MC.cream}"/>`;
  return g + `</g>`;
};
const ladoo = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="20" fill="#9a5a2a" ${S(3)}/>` + [[-8, -8], [6, -10], [10, 4], [-6, 8], [0, 0]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="${MC.cream}"/>`).join('') + `</g>`;
const steam = (x, y, lt, n = 3, h = 70) => { let g = ''; for (let i = 0; i < n; i++) { const k = (lt * 0.7 + i / n) % 1; g += `<path d="M${x + (i - 1) * 22},${y} q10,-${h * 0.3} 0,-${h * 0.5} t0,-${h * 0.5}" fill="none" stroke="${MC.cream}" stroke-width="5" stroke-linecap="round" opacity="${(1 - k) * 0.9}" transform="translate(0,${-h * k * 0.6})"/>`; } return g; };
const wheat = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [-24, -12, 0, 12, 24].map((a) => `<g transform="rotate(${a})"><line x1="0" y1="0" x2="0" y2="-90" stroke="#8a5a2b" stroke-width="4"/>${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${i % 2 ? 7 : -7}" cy="${-92 - i * 12}" rx="5" ry="10" fill="${MC.yellow}" ${S(2)} transform="rotate(${i % 2 ? 20 : -20} ${i % 2 ? 7 : -7} ${-92 - i * 12})"/>`).join('')}</g>`).join('') + `<path d="M-20,-30 L20,-30 L14,-18 L-14,-18Z" fill="${MC.red}" ${S(3)}/></g>`;
const sugarcane = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [-14, 0, 14].map((o, i) => `<line x1="${o}" y1="0" x2="${o * 2}" y2="-200" stroke="#6a3a8a" stroke-width="9" stroke-linecap="round"/><path d="M${o * 2},-200 q-30,-10 -44,16 M${o * 2},-200 q30,-10 44,16" fill="none" stroke="${MC.leaf}" stroke-width="6"/>`).join('') + `</g>`;
const house = (x, y, s = 1, col = MC.cream) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-130" width="180" height="130" fill="${col}" ${S(5)}/><path d="M-110,-130 L0,-210 L110,-130Z" fill="${MC.red}" ${S(5)}/><rect x="-24" y="-80" width="48" height="80" rx="24" fill="${MC.maroon}" ${S(4)}/><rect x="-80" y="-110" width="36" height="30" fill="url(#tri)" ${S(3)}/><rect x="44" y="-110" width="36" height="30" fill="url(#tri)" ${S(3)}/></g>`;
const mount = (x, y, w, h, col = '#8a9ab5') => `<path d="M${x - w / 2},${y} L${x},${y - h} L${x + w / 2},${y}Z" fill="${col}" ${S(4)}/><path d="M${x - w * 0.14},${y - h * 0.72} L${x},${y - h} L${x + w * 0.14},${y - h * 0.72} L${x + w * 0.05},${y - h * 0.62} L${x - w * 0.04},${y - h * 0.7}Z" fill="#fff" ${S(3)}/>`;
const wheel = (cx, cy, r, rot, hi = -1, lt = 0) => {
  let g = `<g transform="translate(${cx},${cy}) rotate(${rot})">`;
  for (let i = 0; i < 12; i++) { const a = i * 30 - 90; const x1 = r * Math.cos((a - 15) * Math.PI / 180), y1 = r * Math.sin((a - 15) * Math.PI / 180), x2 = r * Math.cos((a + 15) * Math.PI / 180), y2 = r * Math.sin((a + 15) * Math.PI / 180); g += `<path d="M0,0 L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0,1 ${x2.toFixed(1)},${y2.toFixed(1)}Z" fill="${i === hi ? MC.saffron : i % 2 ? MC.cream : '#f2d99c'}" ${S(2.5)}/>`; const mx = r * 0.68 * Math.cos(a * Math.PI / 180), my = r * 0.68 * Math.sin(a * Math.PI / 180); g += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${r * 0.07}" fill="${[MC.red, MC.blue, MC.green][i % 3]}" ${S(2)}/>`; }
  return g + `<circle r="${r * 0.15}" fill="${MC.maroon}" ${S(3)}/></g>`;
};
const food = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse rx="40" ry="14" fill="${MC.leaf}" ${S(3)}/><ellipse cy="-6" rx="22" ry="9" fill="${MC.cream}" ${S(2)}/><circle cx="26" cy="-6" r="7" fill="${MC.red}" ${S(2)}/><circle cx="-28" cy="-4" r="6" fill="${MC.yellow}" ${S(2)}/></g>`;
const veena = (x, y, s = 1, rot = -30) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><line x1="-110" y1="0" x2="110" y2="0" ${S(10)}/><line x1="-110" y1="0" x2="110" y2="0" stroke="${MC.yellow}" stroke-width="5"/><circle cx="-100" cy="14" r="28" fill="${MC.red}" ${S(4)}/><circle cx="90" cy="14" r="22" fill="${MC.red}" ${S(4)}/><path d="M-100,-4 L96,-2" stroke="${INK}" stroke-width="2"/></g>`;
const hearts = (lt, x, y, n = 5) => { let g = ''; for (let i = 0; i < n; i++) { const k = (lt * 0.6 + i / n) % 1; g += `<path d="M0,0 C-10,-12 -24,0 0,18 C24,0 10,-12 0,0Z" fill="${MC.pink}" ${S(2)} transform="translate(${x + (i - 2) * 26 + 8 * Math.sin(lt * 3 + i)},${y - 90 * k}) scale(${0.7 + 0.4 * (i % 2)})" opacity="${1 - k}"/>`; } return g; };
const muted = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="46" fill="${MC.cream}" ${S(4)}/><path d="M-22,-8 L-8,-8 L8,-22 L8,22 L-8,8 L-22,8Z" fill="${INK}"/><path d="M16,-14 L36,14 M36,-14 L16,14" stroke="${MC.red}" stroke-width="7" stroke-linecap="round"/></g>`;
const sky = (c1 = '#ffd59a', c2 = '#f3a15e') => `<rect width="${W}" height="${H}" fill="url(#dawn)"/>`;
const horizon = (col = '#c9a25e') => `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="${col}"/>`;
const card = (x, y, w, h, col = MC.cream, st = MC.red) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="22" fill="${col}" stroke="${st}" stroke-width="5"/>`;
const rays = (cx, cy, r, lt, n = 14) => { let g = ''; for (let i = 0; i < n; i++) { const a = i * 2 * Math.PI / n + lt * 0.2; g += `<path d="M${cx + r * Math.cos(a - 0.05)},${cy + r * Math.sin(a - 0.05)} L${cx + (r + 70) * Math.cos(a)},${cy + (r + 70) * Math.sin(a)} L${cx + r * Math.cos(a + 0.05)},${cy + r * Math.sin(a + 0.05)}Z" fill="${MC.yellow}" opacity=".35"/>`; } return g; };

// 1 (0–11.18) Bhishma on the bed of arrows at dawn
const A1 = mk((lt) => {
  let g = sky() + glow(560, 250, 300, 0.6) + sunFace(560, lerp(380, 220, ease(prog(lt, 0, 6))), 70) + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#7a3a22"/>`;
  g += bed(300, 800, FL - 8, lt, 0.5 * prog(lt, 3.5, 5.5));
  const n = Math.min(8, Math.floor(lt * 3));
  g += bhLying(780, FL - 36, 0.5, lt, n);
  const beat = 1 + 0.12 * Math.sin(lt * 4);
  if (lt > 8.2) g += glow(620, FL - 40, 60 * beat, 0.9) + `<path d="M620,${FL - 72} C632,${FL - 56} 632,${FL - 44} 620,${FL - 36} C608,${FL - 44} 608,${FL - 56} 620,${FL - 72}Z" fill="${MC.yellow}" ${S(2)}/>`;
  g += at(lt, 4.6, 480, 110, chip(0, 0, 'तीरों की सेज', MC.red, 28));
  return g;
}, 0.05);
// 2 (11.18–18.69) waiting for the sun to turn
const A2 = mk((lt) => {
  let g = sky() + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#7a3a22"/>`;
  g += `<path d="M80,330 Q480,-20 880,330" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="4 12"/>`;
  const k = ease(prog(lt, 1.5, 7)); const a = lerp(Math.PI * 0.95, Math.PI * 0.05, k); const sx = 480 + 400 * Math.cos(a), sy = 330 - 350 * Math.sin(a) * 0.95;
  g += glow(sx, sy, 90, 0.8) + sunFace(sx, sy, 38);
  g += bed(300, 800, FL - 8, lt) + bhLying(780, FL - 36, 0.5, lt, 8);
  g += at(lt, 5.0, 520, 470, chip(0, 0, 'भीष्म पितामह', MC.saffron, 26));
  return g;
});
// 3 (18.69–31.22) the day still celebrated → four names
const A3 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  if (lt < 5.2) {
    g += glow(480, 220, 260, 0.6) + sunFace(480, 190, 64) + bed(420, 880, FL - 8, lt) + bhLying(850, FL - 36, 0.34, lt, 7);
    g += at(lt, 2.4, 160, 300, card(0, 0, 170, 190) + `<rect x="-85" y="-95" width="170" height="44" rx="22" fill="${MC.red}" ${S(3)}/>` + [0, 1, 2].map((i) => `<circle cx="${-40 + i * 40}" cy="-73" r="7" fill="${MC.cream}"/>`).join('') + sunFace(0, 20, 28));
  } else {
    const items = [
      [5.2, 'मकर संक्रांति', MC.saffron, (x) => sunFace(x, 250, 40)],
      [8.0, 'पोंगल', MC.green, (x) => pot(x, 300, 0.7, lt, 1) ],
      [9.3, 'बिहू', MC.red, (x) => fire(x, 310, 0.6, lt)],
      [10.6, 'उत्तरायण', MC.blue, (x) => kite(x, 240, 1.3, 14, MC.pink, lt)],
    ];
    items.forEach(([t0, lab, col, f], i) => { const x = 150 + 220 * i; g += at(lt, t0, x, 0, '') ; if (lt > t0) { const sc = pop(lt, t0); g += `<g transform="translate(${x},270) scale(${sc}) translate(${-x},-270)">${card(x, 270, 196, 290, MC.cream, col)}${f(x)}${chip(x, 380, lab, col, lab.length > 8 ? 17 : 24)}</g>`; } });
  }
  return g;
});
// 4 (31.22–43.33) the sky: sun passes through twelve signs
const A4 = mk((lt) => {
  let g = bgNight(lt);
  g += `<g opacity="${prog(lt, 1.8, 2.6)}">${wheel(360, 270, 190, 0, 9)}</g>`;
  const a0 = (-90 + 8 * 30 + 15) * Math.PI / 180, ang = lerp(a0, a0 + 30 * Math.PI / 180, ease(prog(lt, 6.5, 9.5)));
  if (lt > 2.2) g += `<g transform="translate(${360 + 215 * Math.cos(ang)},${270 + 215 * Math.sin(ang)})">${glow(0, 0, 60, 0.9)}${sunFace(0, 0, 22)}</g>`;
  g += at(lt, 9.8, 740, 270, `<path d="M-60,40 C-80,-20 -20,-60 20,-30 C40,-10 10,10 30,40 C60,60 90,30 70,-10" fill="none" stroke="${MC.yellow}" stroke-width="10" stroke-linecap="round"/>` + chip(0, 110, 'संक्रांति', MC.saffron, 30));
  g += moon(860, 90, 36, 0.3);
  return g;
});
// 5 (43.33–51.98) twelve per year, Makar is special
const A5 = mk((lt) => {
  let g = bgNight(lt, 'nightg');
  const hi = lt > 3.4 ? 9 : -1;
  g += wheel(480, 270, 210, 0, hi);
  for (let i = 0; i < 12; i++) if (lt > 0.6 + i * 0.2 && lt < 3.4) g += at(lt, 0.6 + i * 0.2, 480 + 245 * Math.cos((i * 30 - 90) * Math.PI / 180), 270 + 245 * Math.sin((i * 30 - 90) * Math.PI / 180), sunFace(0, 0, 14));
  if (lt > 3.6) { const a = (9 * 30 - 90) * Math.PI / 180; g += glow(480 + 140 * Math.cos(a), 270 + 140 * Math.sin(a), 90 + 8 * Math.sin(lt * 5), 0.9); g += at(lt, 4.3, 480 + 140 * Math.cos(a), 270 + 140 * Math.sin(a), `<path d="M-30,24 C-40,-20 -10,-36 12,-16 C22,-4 6,8 16,24 C30,34 44,16 34,-6" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`); g += at(lt, 4.5, 480, 500, chip(0, 0, 'मकर', MC.saffron, 30)); }
  return g;
});
// 6 (51.98–63.72) Uttarayan: sun heads north, days lengthen
const A6 = mk((lt) => {
  let g = sky() + horizon('#c9a25e');
  g += `<path d="M80,400 Q480,-60 880,400" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="4 12"/>`;
  const k = ease(prog(lt, 0.5, 6)); const sx = lerp(250, 560, k), sy = lerp(330, 150, k);
  g += glow(sx, sy, 110, 0.8) + sunFace(sx, sy, 44);
  g += arrowShape(sx + 90, sy - 30, 90, -20, MC.red);
  g += `<g transform="translate(870,110)"><circle r="46" fill="${MC.cream}" ${S(4)}/><path d="M0,-34 L10,0 L0,34 L-10,0Z" fill="${MC.red}" ${S(2)}/><path d="M0,-34 L10,0 L-10,0Z" fill="${INK}"/></g>`;
  g += at(lt, 4.65, 480, 70, chip(0, 0, 'उत्तरायण', MC.blue, 32));
  if (lt > 7.1) for (let i = 0; i < 5; i++) { const t0 = 7.2 + i * 0.35; const w = lerp(160, 320, prog(lt, t0, t0 + 2.2)) * (1); g += fade(prog(lt, t0, t0 + 0.4), `<rect x="${130}" y="${FL - 20 + i * 0}" width="0" height="0"/><g transform="translate(${180 + i * 0},${300 + i * 0})"></g>`); }
  if (lt > 7.1) { const p = prog(lt, 7.1, 10); for (let i = 0; i < 4; i++) g += `<g transform="translate(160,${FL - 10 + i * 20})"><rect width="${220 + 60 * i}" height="14" rx="7" fill="${MC.cream}" ${S(2)}/><rect width="${(120 + 40 * i) * 1 + p * 110}" height="14" rx="7" fill="${MC.yellow}" ${S(2)}/></g>`; }
  return g;
});
// 7 (63.72–75.10) Jan 14 night -> 15 (calendar)
const A7 = mk((lt) => {
  let g = bgNight(lt) + moon(130, 100, 40, 0.3);
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'जनवरी २०२७', MC.blue, 28));
  const second = lt > 5.9;
  g += `<g transform="translate(480,290)">${card(0, 0, 300, 300, MC.cream, MC.red)}<rect x="-150" y="-150" width="300" height="70" rx="22" fill="${MC.red}" ${S(4)}/>` + [-90, 90].map((x) => `<circle cx="${x}" cy="-150" r="10" fill="${MC.yellow}" ${S(3)}/>`).join('') + T(0, 62, second ? '१५' : '१४', 150, second ? MC.red : MC.maroon) + `</g>`;
  if (lt > 1.6 && !second) g += `<g transform="translate(790,260)">${glow(0, 0, 120, 0.7)}${wheel(0, 0, 70, lt * 10, 9)}${sunFace(-10, -86, 18)}</g>`;
  if (second) g += at(lt, 6.0, 480, 290, `<circle r="165" fill="none" stroke="${MC.saffron}" stroke-width="8" stroke-dasharray="16 10"/>`) + at(lt, 8.6, 480, 490, chip(0, 0, 'शुक्रवार', MC.green, 30));
  return g;
});
// 8 (75.10–81.99) both dates; check your panchang
const A8 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  const cal = (x, n, c, o) => at(lt, o, x, 250, `${card(0, 0, 200, 220, MC.cream, c)}<rect x="-100" y="-110" width="200" height="50" rx="22" fill="${c}" ${S(3)}/>${T(0, 50, n, 100, c)}`);
  g += cal(190, '१४', MC.blue, 0.3) + cal(770, '१५', MC.red, 0.9);
  g += fig(MAN, 480, FL + 50, 0.46, false, { armF: lt > 3.2 ? -70 + sway(lt, 8, 3) : 8, armB: -6, eyeOpen: blink(lt) });
  g += at(lt, 3.2, 480, 190, book(0, 0, 0.6, 0.4)) + at(lt, 3.3, 480, 110, chip(0, 0, 'पंचांग', MC.saffron, 28));
  return g;
});
// 9 (81.99–89.03) Bhishma, the boon of choosing his death
const A9 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(380, 250, 230, 0.6) + petals(lt, 4, 20);
  g += fig(BHISHMA, 380, FL + 40, 0.6, false, { armF: lt > 2.5 ? -70 + sway(lt, 7, 3) : 8, armB: -6, eyeOpen: blink(lt) });
  g += at(lt, 0.4, 720, 300, book(0, 0, 1.1, 0.5)) + at(lt, 1.0, 720, 170, chip(0, 0, 'महाभारत', MC.red, 28));
  g += at(lt, 2.8, 380, 62, chip(0, 0, 'इच्छा-मृत्यु का वरदान', MC.saffron, 24));
  return g;
});
// 10 (89.03–100.21) falls on the arrows; sun still in the south
const A10 = mk((lt) => {
  let g = sky() + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#7a3a22"/>`;
  const fall = ease(prog(lt, 3.7, 5.2));
  if (lt > 3.7) g += fade(fall, bed(300, 800, FL - 8, lt));
  if (lt < 3.7) {
    g += glow(520, 250, 200, 0.5) + fig(BHISHMA, 520, FL + 40, 0.6, false, { armF: -60, armB: -6, eyeOpen: 1 });
    g += at(lt, 1.0, 520, 90, `<path d="M0,0 C14,-20 14,-40 0,-56 C-14,-40 -14,-20 0,0Z" fill="${MC.yellow}" ${S(3)}/>` + chip(0, 50, 'जब चाहें', MC.saffron, 22)).replace('<g', '<g');
  } else {
    g += `<g transform="translate(790,${FL - 36}) rotate(${-90 * fall}) scale(0.5)">${figure({ ...BHISHMA, pose: { armF: 8, armB: -6, eyeOpen: 0.9 } })}</g>`;
    if (fall >= 1) for (let i = 0; i < 8; i++) { const px = 790 - 30 - i * 26; g += `<g transform="translate(${px},${FL - 40}) rotate(${-38 + (i % 3) * 14})"><line x1="0" y1="-70" x2="0" y2="14" ${S(5)}/><line x1="0" y1="-70" x2="0" y2="14" stroke="#8a5a2b" stroke-width="2.5"/><path d="M0,-70 l-7,-12 l14,0Z" fill="${MC.red}" ${S(2)}/></g>`; }
  }
  const sx = 170, sy = lerp(330, 350, prog(lt, 5, 8));
  if (lt > 3.9) g += at(lt, 3.9, sx, sy - 60, `${glow(0, 0, 80, 0.5)}${sunFace(0, 0, 36)}`) + at(lt, 5.9, 170, 460, chip(0, 0, 'दक्षिणायन', MC.red, 26));
  if (lt > 7.8) g += at(lt, 7.8, 740, 150, chip(0, 0, 'उत्तरायण…', MC.blue, 28));
  return g;
});
// 11 (100.21–111.25) teaches Yudhishthira; at Uttarayan he leaves
const A11 = mk((lt) => {
  let g = sky() + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#7a3a22"/>`;
  g += bed(120, 560, FL - 8, lt) + bhLying(540, FL - 36, 0.5, lt, 7);
  g += seated(YUDH, 760, FL - 40, 0.46, true, { armF: -100, armB: -100, eyeOpen: blink(lt) }, {}, MC.red);
  g += at(lt, 2.0, 360, 190, book(0, 0, 0.7, 0.5)) + at(lt, 3.0, 360, 110, chip(0, 0, 'राजधर्म', MC.red, 28)) + at(lt, 4.0, 640, 110, chip(0, 0, 'शांति पर्व', MC.green, 24));
  if (lt > 7) { const k = ease(prog(lt, 7, 10)); g += glow(890, 70, 90 + 20 * k, 0.8) + sunFace(890, 70, 30); if (lt > 8.4) { const up = ease(prog(lt, 8.4, 10.8)); g += glow(420, lerp(FL - 80, 120, up), 60, 1 - up * 0.3) + `<path d="M420,${lerp(FL - 80, 100, up)} C440,${lerp(FL - 110, 70, up)} 440,${lerp(FL - 140, 40, up)} 420,${lerp(FL - 160, 20, up)} C400,${lerp(FL - 140, 40, up)} 400,${lerp(FL - 110, 70, up)} 420,${lerp(FL - 80, 100, up)}Z" fill="${MC.yellow}" ${S(3)}/>`; } }
  return g;
});
// 12 (111.25–118.36) eight days after
const A12 = mk((lt) => {
  let g = bgNight(lt) + at(lt, 0.2, 480, 70, chip(0, 0, 'माघ शुक्ल अष्टमी', MC.saffron, 30));
  g += at(lt, 0.6, 120, 270, `${glow(0, 0, 80, 0.8)}${sunFace(0, 0, 36)}`);
  for (let i = 0; i < 8; i++) { const x = 200 + i * 90; const t0 = 1.0 + i * 0.5; const ph = lerp(0.04, 0.5, i / 7); if (lt > t0) g += `<g transform="translate(${x},${270}) scale(${pop(lt, t0)})">${moon(0, 0, i === 7 ? 44 : 30, ph)}</g>`; }
  if (lt > 4.2) g += at(lt, 4.2, 930 - 110, 380, `<g>${glow(0, 0, 70 + 6 * Math.sin(lt * 6), 0.9)}${diya(0, 20, 1.1, lt)}</g>`);
  g += at(lt, 4.5, 480, 470, chip(0, 0, 'कुछ दिन बाद', MC.blue, 28));
  return g;
});
// 13 (118.36–126.88) Surya and Shani
const A13 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += glow(260, 230, 200, 0.7) + sunFace(260, 120, 46);
  g += fig(SURYA, 260, FL + 40, 0.55, false, { armF: lt > 2 ? -60 + sway(lt, 6, 3) : 8, armB: -6, eyeOpen: blink(lt) });
  g += at(lt, 2.2, 260, 480, chip(0, 0, 'सूर्य देव', MC.saffron, 26));
  g += fade(prog(lt, 1.8, 2.8), fig(SHANI, 700, FL + 40, 0.55, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }));
  g += at(lt, 5.6, 700, 480, chip(0, 0, 'शनि देव', MC.blue, 26));
  g += at(lt, 5.4, 860, 200, `<g transform="scale(0.5)">${`<path d="M-30,24 C-40,-20 -10,-36 12,-16 C22,-4 6,8 16,24 C30,34 44,16 34,-6" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" transform="translate(0,0) scale(1.6)"/>`}</g>`);
  return g;
});
// 14 (126.88–138.90) estranged; Surya visits Shani's house
const A14 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + house(790, FL + 10, 1.0) + at(lt, 0.4, 790, 130, chip(0, 0, 'मकर', MC.blue, 24));
  const k = ease(prog(lt, 2.6, 7));
  const sx = lerp(130, 560, k);
  g += fig(SURYA, sx, FL + 40, 0.52, lt < 2.4, { armF: lt > 7.5 ? -90 : 8, armB: lt > 7.5 ? -90 : -6, legSwing: walk(lt, lt > 2.6 && lt < 7), eyeOpen: blink(lt) }) + glow(sx, 220, 110, 0.5);
  g += fig(SHANI, 700, FL + 40, 0.52, lt < 2.4 ? false : true, { armF: lt > 7.8 ? -90 : 8, armB: lt > 7.8 ? -90 : -6, eyeOpen: blink(lt + 1) });
  if (lt < 2.4) g += `<path d="M430,150 L470,230 L440,230 L480,320" fill="none" stroke="${MC.red}" stroke-width="10" stroke-linejoin="round"/>`;
  if (lt > 8.0) g += hearts(lt, 630, 200) + petals(lt, 14, 22);
  g += at(lt, 8.4, 480, 80, chip(0, 0, 'पिता और पुत्र', MC.green, 28));
  return g;
});
// 15 (138.90–145.70) versions differ -> faith
const A15 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  const sc = (x, c, rot, o) => at(lt, o, x, 240, `<g transform="rotate(${rot})"><rect x="-120" y="-120" width="240" height="240" rx="20" fill="${MC.cream}" ${S(4)}/><rect x="-136" y="-128" width="14" height="256" rx="7" fill="${c}" ${S(3)}/><rect x="122" y="-128" width="14" height="256" rx="7" fill="${c}" ${S(3)}/>` + [0, 1, 2, 3, 4].map((i) => `<path d="M-90,${-80 + i * 40} q${40 + 20 * (o > 1 ? 1 : 0)},${-20 + i * 6} 180,0" fill="none" stroke="${c}" stroke-width="5" opacity=".6"/>`).join('') + `</g>`);
  g += sc(200, MC.red, -4, 0.3) + sc(760, MC.blue, 4, 1.2);
  g += at(lt, 2.6, 480, 300, `${glow(0, 0, 120, 0.9)}${diya(0, 40, 1.8, lt)}`) + at(lt, 3.6, 480, 470, chip(0, 0, 'श्रद्धा की कथा', MC.saffron, 30));
  return g;
});
// 16 (145.70–155.22) Gangasagar; King Sagar's sixty thousand sons
const A16 = mk((lt) => {
  let g = bgWater(lt) + at(lt, 0.4, 480, 80, chip(0, 0, 'गंगासागर', MC.blue, 32));
  if (lt < 5.2) g += sunFace(780, 150, 40) + `<path d="M0,360 Q200,330 400,370 L400,${H} L0,${H}Z" fill="#e7c98a"/>`;
  else {
    g += fade(prog(lt, 5, 5.6), `<rect x="0" y="${FL - 70}" width="${W}" height="${H}" fill="#e7c98a"/>`);
    g += fig(SAGAR, 160, FL + 40, 0.5, false, { armF: -50, armB: -6, eyeOpen: blink(lt) });
    const r = rnd(9); for (let i = 0; i < 42; i++) { const t0 = 5.8 + i * 0.07; const x = 330 + (i % 14) * 44, y = FL - 20 + Math.floor(i / 14) * 40; if (lt > t0) g += fig({ ...MAN, uttariya: [MC.red, MC.green, MC.blue][i % 3] }, x, y, 0.18, false, { armF: 8, armB: -6 }); }
    g += at(lt, 7.6, 600, 140, chip(0, 0, '६०,००० पुत्र', MC.maroon, 28));
  }
  return g;
});
// 17 (155.22–164.43) Bhagirath brings Ganga to Kapil Muni's ashram near the sea
const A17 = mk((lt) => {
  let g = sky() + `<rect x="0" y="${FL - 60}" width="${W}" height="${H}" fill="#e7c98a"/>` + mount(170, 300, 340, 250) + mount(60, 300, 200, 160, '#9aa8c4');
  g += `<rect x="560" y="320" width="${W}" height="${H}" fill="#2f6fb5"/>`;
  const k = prog(lt, 0.8, 5.6);
  g += `<path d="M180,110 C240,200 160,260 300,320 C420,370 500,330 640,380 S800,400 900,380" fill="none" stroke="#8cc3f0" stroke-width="22" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${(1 - k).toFixed(3)}"/><path d="M180,110 C240,200 160,260 300,320 C420,370 500,330 640,380 S800,400 900,380" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" pathLength="1" stroke-dasharray="0.04 0.08" stroke-dashoffset="${(-lt * 0.3).toFixed(3)}" opacity="${k > 0 ? 1 : 0}"/>`;
  g += fig(BHAGI, 300, FL + 60, 0.44, false, { armF: -100, armB: -100, eyeOpen: blink(lt) }) + at(lt, 0.6, 300, 120, chip(0, 0, 'भगीरथ', MC.green, 26));
  if (lt > 3.9) g += `<g transform="translate(620,${FL - 10})"><path d="M-60,-10 L-60,-90 L0,-130 L60,-90 L60,-10Z" fill="#a0603a" ${S(4)}/><path d="M-76,-90 L0,-150 L76,-90Z" fill="#6b3a1a" ${S(4)}/></g>` + fig(KAPIL, 790, FL + 60, 0.4, true, { armF: -50, armB: -6, eyeOpen: blink(lt) }) + at(lt, 4.6, 790, 140, chip(0, 0, 'कपिल मुनि', MC.red, 24));
  return g;
});
// 18 (164.43–173.02) the Ganga Sagar fair
const A18 = mk((lt) => {
  let g = bgWater(lt) + sunFace(160, 120, 40) + at(lt, 0.4, 480, 70, chip(0, 0, 'पश्चिम बंगाल', MC.green, 26));
  const r = rnd(21);
  for (let i = 0; i < 26; i++) { const t0 = i < 10 ? 0.6 + i * 0.1 : 5.2 + (i - 10) * 0.18; const x = 60 + (i * 83) % 860, row = i % 4; const y = 330 + row * 38 + 5 * Math.sin(lt * 2 + i); if (lt > t0) g += fade(prog(lt, t0, t0 + 0.4), fig(i % 2 ? WOMAN : { ...MAN, uttariya: [MC.red, MC.saffron, MC.blue][i % 3] }, x, y + 70, 0.16, false, { armF: i % 3 === 0 ? -100 : 8, armB: -6 }) + `<path d="M${x - 40},${y + 2} q10,-8 20,0 t20,0 t20,0 t20,0" fill="none" stroke="#9cc3ea" stroke-width="3"/><rect x="${x - 42}" y="${y + 4}" width="84" height="40" fill="#2f6fb5" opacity=".72"/>`); }
  g += at(lt, 4.9, 480, 160, chip(0, 0, 'गंगासागर मेला', MC.blue, 30));
  return g;
});
// 19 (173.02–180.43) two forms: sun's course / harvest
const A19 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'कथा के दो रूप', MC.red, 30));
  g += card(480, 300, 880, 340, '#fff3d6', MC.saffron) + `<line x1="480" y1="150" x2="480" y2="450" stroke="${MC.saffron}" stroke-width="4" stroke-dasharray="10 8"/>`;
  g += at(lt, 1.6, 250, 300, `<path d="M-130,60 Q0,-120 130,60" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="4 10"/>${glow(0, -10, 70, 0.8)}${sunFace(-50 + 100 * ease(prog(lt, 1.8, 5)), -40 + 0, 34)}`);
  g += at(lt, 5.7, 250, 400, wheat(0, 0, 0.6)) + at(lt, 5.7, 200, 400, wheat(0, 0, 0.6)) + at(lt, 5.8, 300, 400, wheat(0, 0, 0.6));
  g += at(lt, 6.0, 710, 300, `<text text-anchor="middle" y="40" font-family="NSB" font-weight="800" font-size="130" fill="${MC.saffron}" opacity=".5">?</text>`);
  return g;
});
// 20 (180.43–191.51) other form: Bhishma, Shani, Ganga; both walk together
const A20 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + card(480, 300, 880, 340, '#fff3d6', MC.saffron) + `<line x1="480" y1="150" x2="480" y2="450" stroke="${MC.saffron}" stroke-width="4" stroke-dasharray="10 8"/>`;
  g += `<path d="M120,360 Q250,150 380,360" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="4 10"/>${sunFace(250, 230, 34)}` + wheat(160, 410, 0.5) + wheat(340, 410, 0.5);
  g += at(lt, 0.2, 560, 330, fig(BHISHMA, 0, 70, 0.28, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }));
  g += at(lt, 2.3, 690, 330, fig(SHANI, 0, 70, 0.28, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }));
  g += at(lt, 3.0, 810, 330, `<path d="M-40,-60 C-10,-20 -50,20 0,60 S-20,100 20,110" fill="none" stroke="#8cc3f0" stroke-width="20" stroke-linecap="round"/>`);
  if (lt > 5.6) g += fade(prog(lt, 5.6, 6.4), `<path d="M380,300 L500,300" stroke="${MC.red}" stroke-width="8" stroke-linecap="round" stroke-dasharray="16 12"/>`) + glow(480, 300, 60 + 8 * Math.sin(lt * 5), 0.9);
  if (lt > 7.6) g += fade(prog(lt, 7.6, 8.4), `<rect x="0" y="0" width="${W}" height="${H}" fill="#f7e2b0"/>`) + (lt > 8 ? bgPlain('#f7e2b0') + fig(MAN, 250, FL + 40, 0.5, false, { armF: -40 + 10 * Math.sin(lt * 3), armB: -30, eyeOpen: blink(lt) }) + wheat(120, FL + 40, 0.8) + fig(MUNI, 720, FL + 40, 0.5, true, { armF: -60, armB: -6, eyeOpen: blink(lt) }) + at(lt, 8.6, 880, 340, book(0, 0, 0.7, 0.4)) + at(lt, 8.4, 250, 110, chip(0, 0, 'खेत', MC.green, 28)) + at(lt, 9.0, 720, 110, chip(0, 0, 'पुराण', MC.red, 28)) : '');
  return g;
});
// 21 (191.51–201.56) north India: holy dip, charity
const A21 = mk((lt) => {
  let g = bgWater(lt) + at(lt, 0.3, 480, 70, chip(0, 0, 'पूरे देश में', MC.red, 30));
  if (lt > 3.5) {
    g = bgWater(lt);
    g += at(lt, 3.5, 480, 70, chip(0, 0, 'उत्तर भारत', MC.saffron, 30)) + sunFace(850, 120, 40);
    for (let i = 0; i < 6; i++) { const x = 120 + i * 130, y = 330 + (i % 2) * 40; g += fig(i % 2 ? WOMAN : MAN, x, y + 70, 0.2, false, { armF: -100, armB: -100 }) + `<rect x="${x - 36}" y="${y + 6}" width="72" height="40" fill="#2f6fb5" opacity=".72"/>`; }
    if (lt > 6.8) g = g.replace('', '') + fade(prog(lt, 6.8, 7.4), `<rect x="0" y="0" width="${W}" height="${H}" fill="#f7e2b0"/>`) + (lt > 7.1 ? bgPlain('#f7e2b0') + fig(MAN, 260, FL + 40, 0.5, false, { armF: lt > 7.8 ? -60 : 8, armB: -6, eyeOpen: blink(lt) }) + fig({ ...MAN, dhoti: MC.cream, uttariya: MC.cream }, 620, FL + 50, 0.42, true, { armF: -100, armB: -100 }) + at(lt, 8.0, 450, 330, `<circle r="14" fill="${MC.yellow}" ${S(3)}/><circle r="6" fill="none" ${S(2)}/>`) + at(lt, 8.4, 860, 330, `<g>${pot(0, 60, 0.9, lt, 0)}${steam(0, -40, lt)}</g>`) + at(lt, 8.6, 480, 110, chip(0, 0, 'दान', MC.green, 30)) : '');
  } else g += glow(480, 250, 200, 0.5) + sunFace(480, 230, 60) + `<path d="M0,420 Q240,380 480,420 T960,420" fill="none" stroke="#9cc3ea" stroke-width="6"/>`;
  return g;
});
// 22 (201.56–205.59) khichdi
const A22 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(480, 250, 220, 0.5) + fire(480, FL + 30, 0.7, lt) ;
  g += `<g transform="translate(0,0)">${pot(480, FL - 40, 1.4, lt, 0)}${steam(480, FL - 190, lt, 3, 90)}</g>`;
  g += at(lt, 0.4, 480, 80, chip(0, 0, 'खिचड़ी', MC.saffron, 40));
  g += at(lt, 1.8, 230, 150, chip(0, 0, 'उत्तर प्रदेश', MC.red, 22)) + at(lt, 2.2, 730, 150, chip(0, 0, 'बिहार', MC.green, 22));
  return g;
});
// 23 (205.59–216.18) Maharashtra til-gud
const A23 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + at(lt, 0.3, 480, 70, chip(0, 0, 'महाराष्ट्र', MC.red, 30));
  g += fig(MAN, 220, FL + 40, 0.5, false, { armF: lt > 1 ? -50 : 8, armB: -6, eyeOpen: blink(lt) }) + fig({ ...WOMAN, skin: '#eab88a' }, 740, FL + 40, 0.5, true, { armF: lt > 1 ? -50 : 8, armB: -6, eyeOpen: blink(lt + 1) });
  g += `<g transform="translate(480,${FL - 60})"><ellipse rx="130" ry="26" fill="${MC.cream}" ${S(4)}/>` + [-80, -40, 0, 40, 80].map((x, i) => (lt > 0.8 + i * 0.3 ? ladoo(x, -26 - 6, 1) : '')).join('') + `</g>`;
  g += at(lt, 3.2, 480, 160, `<g>${ladoo(-46, 0, 1.4)}<path d="M0,-6 l16,0 M8,-14 l0,16" stroke="${MC.red}" stroke-width="6"/>${`<rect x="14" y="-18" width="50" height="34" rx="6" fill="#7a4a2a" ${S(3)}/>`}</g>`) + at(lt, 3.4, 480, 235, chip(0, 0, 'तिल + गुड़', MC.saffron, 28));
  if (lt > 5) g += hearts(lt, 480, 200, 4);
  g += at(lt, 8.9, 480, 110, chip(0, 0, 'मीठा बोलो', MC.pink, 34));
  return g;
});
// 24 (216.18–227.80) Gujarat kites
const A24 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="#9fd0ee"/>` + cloud(200, 90, 1.1) + cloud(760, 150, 1) + sunFace(880, 80, 34);
  const cols = [MC.red, MC.pink, MC.yellow, MC.green, MC.saffron, MC.blue];
  for (let i = 0; i < 9; i++) { const x = 90 + i * 100, y = 120 + (i * 53) % 190 + 14 * Math.sin(lt * 1.6 + i); if (!(i === 4 && lt > 9.2 && lt < 13)) g += kite(x, y, 1.2, 10 * Math.sin(lt * 1.5 + i), cols[i % 6], lt); }
  if (lt > 9) { const k = prog(lt, 9, 11.2); g += `<g transform="translate(${490 + 120 * k},${290 + 120 * k}) rotate(${60 * k})" opacity="${1 - k * 0.6}">${kite(0, 0, 1.2, 0, MC.green, lt)}</g>`; g += at(lt, 9.0, 480, 130, chip(0, 0, 'पतंग कट गई!', MC.red, 30)); }
  g += `<rect x="0" y="${FL - 10}" width="${W}" height="${H}" fill="#e7c98a"/><rect x="60" y="${FL - 60}" width="360" height="70" fill="${MC.cream}" ${S(4)}/><rect x="540" y="${FL - 60}" width="360" height="70" fill="${MC.cream}" ${S(4)}/>`;
  g += at(lt, 0.3, 480, 60, chip(0, 0, 'गुजरात', MC.red, 28));
  if (lt > 4.3) [[130, MAN], [200, WOMAN], [260, KID(MC.red)], [600, WOMAN], [680, MAN], [760, KID(MC.blue)]].forEach(([x, o], i) => { g += fade(prog(lt, 4.3 + i * 0.3, 4.8 + i * 0.3), fig(o, x, FL - 56, i % 3 === 2 ? 0.2 : 0.3, i > 2, { armF: -140 + 12 * Math.sin(lt * 5 + i), armB: -110, eyeOpen: blink(lt + i) })); });
  if (lt > 6.5 && lt < 9) g += at(lt, 6.5, 480, 130, bubble(0, 0, 'काय पो छे!', 260, 30));
  return g;
});
// 25 (227.80–235.92) Tamil Nadu: four-day Pongal
const A25 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + at(lt, 0.3, 480, 70, chip(0, 0, 'तमिलनाडु · पोंगल', MC.green, 30));
  for (let i = 0; i < 4; i++) { const x = 150 + i * 220, t0 = 1.6 + i * 0.5; g += at(lt, t0, x, 250, `${card(0, 0, 180, 200, MC.cream, [MC.red, MC.green, MC.blue, MC.saffron][i])}${T(0, 36, ['१', '२', '३', '४'][i], 100, [MC.red, MC.green, MC.blue, MC.saffron][i])}`); }
  if (lt > 3.6) g += at(lt, 3.6, 150, 440, `${fire(0, 20, 0.5, lt)}`) + at(lt, 4.2, 150, 390, `<path d="M-30,10 L-10,-20 L10,10Z" fill="#8a5a2b" ${S(2)}/><rect x="-20" y="-6" width="40" height="14" fill="#6b4423" ${S(2)}/>`) + at(lt, 4.0, 340, 440, chip(0, 0, 'भोगी', MC.red, 24));
  return g;
});
// 26 (235.92–249.10) Thai Pongal: milk boils over
const A26 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + sunFace(480, 55, 30) + glow(480, 55, 110, 0.4);
  g += sugarcane(180, FL + 40, 1) + sugarcane(780, FL + 40, 1);
  g += at(lt, 0.3, 480, 150, chip(0, 0, 'थाई पोंगल', MC.green, 28));
  const boil = prog(lt, 6.6, 7.6);
  g += fire(480, FL + 50, 0.55, lt) + pot(480, FL - 20, 1.5, lt, boil);
  if (lt > 2.1 && lt < 6.4) { const k = prog(lt, 2.1, 4.5); g += `<g transform="translate(${480 + 120 * (1 - k)},${FL - 240 - 90 * Math.sin(Math.PI * k)})"><circle r="10" fill="${MC.cream}" ${S(2)}/><circle cx="14" cy="6" r="8" fill="${MC.white}" ${S(2)}/></g>`; }
  if (lt > 10.8) [[240, WOMAN], [330, KID(MC.red)], [630, MAN], [720, WOMAN]].forEach(([x, o], i) => { g += fig(o, x, FL + 70, i % 4 === 1 ? 0.3 : 0.44, i > 1, { armF: -150 + 10 * Math.sin(lt * 8 + i), armB: -130, eyeOpen: blink(lt + i) }); }) , g += at(lt, 10.9, 480, 90, chip(0, 0, 'पोंगलो पोंगल!', MC.red, 34)) + petals(lt, 22, 20);
  return g;
});
// 27 (249.10–257.30) Mattu Pongal: thanking the bulls and cows
const A27 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#9aa85a') + at(lt, 0.3, 480, 70, chip(0, 0, 'मट्टू पोंगल', MC.blue, 30));
  const deco = (x, y, s, flip = false) => `<g transform="translate(${x},${y}) scale(${flip ? -1 : 1},1)">${ox(0, 0, s, lt)}<path d="M-34,-86 Q0,-60 34,-86" fill="none" stroke="${MC.pink}" stroke-width="10" transform="scale(${s})"/><circle cx="${40 * s}" cy="${-70 * s}" r="${8 * s}" fill="${MC.yellow}" ${S(2)}/></g>`;
  g += deco(300, FL + 20, 1.05) + deco(560, FL + 30, 0.9) ;
  g += fig(MAN, 800, FL + 50, 0.5, true, { armF: lt > 2.5 ? -100 : 8, armB: lt > 2.5 ? -100 : -6, headTilt: lt > 2.5 ? 14 : 0, eyeOpen: blink(lt) });
  g += petals(lt, 31, 14, [MC.pink, MC.yellow]);
  if (lt > 5.7) g += `<g transform="translate(130,${FL + 10})"><path d="M-60,-80 L0,-20 L60,-60" fill="none" stroke="#8a5a2b" stroke-width="12" stroke-linecap="round"/></g>` + at(lt, 5.9, 120, FL - 90, chip(0, 0, 'खेत के साथी', MC.green, 24));
  return g;
});
// 28 (257.30–264.04) Assam: Magh Bihu feast
const A28 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + at(lt, 0.3, 480, 70, chip(0, 0, 'माघ बिहू', MC.red, 34));
  const gam = (o) => ({ ...o, uttariya: MC.red });
  const ppl = [MAN, WOMAN, { ...MAN, skin: '#e0a06a' }, WOMAN, MAN];
  ppl.forEach((p, i) => { g += seated(gam(p), 120 + i * 180, FL - 40, 0.4, i > 2, { armF: lt > 4 ? -50 : 8, armB: -6, eyeOpen: blink(lt + i) }, {}, MC.saffron); });
  if (lt > 3.6) for (let i = 0; i < 5; i++) g += at(lt, 3.8 + i * 0.3, 120 + i * 180, FL + 60, food(0, 0, 1.3));
  g += `<rect x="40" y="${FL + 52}" width="880" height="12" fill="${MC.leaf}" opacity=".0"/>`;
  return g;
});
// 29 (264.04–275.61) Meji: build hut at night, burn at dawn
const A29 = mk((lt) => {
  const night = lt < 6.1;
  let g = night ? bgNight(lt) + `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="#3d2a1a"/>` : sky() + sunFace(480, lerp(420, 130, ease(prog(lt, 6.2, 11))), 50) + `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  const b = prog(lt, 0.2, 5.4);
  const poles = 9; for (let i = 0; i < poles; i++) { const k = clamp(b * poles - i, 0, 1); if (k > 0) g += `<line x1="${480 + (i - 4) * 55}" y1="${FL - 10}" x2="${480 + (i - 4) * 12}" y2="${lerp(FL - 10, 200, k)}" stroke="#a0722b" stroke-width="10" stroke-linecap="round"/>`; }
  if (night && b > 0.5) g += `<path d="M${480 - 215},${FL - 10} L480,170 L${480 + 215},${FL - 10}Z" fill="#6aa04f" opacity="${(b - 0.5) * 1.6 > 0.9 ? 0.9 : (b - 0.5) * 1.6}" ${S(3)}/>`;
  if (!night) { g += `<path d="M265,${FL - 10} L480,170 L695,${FL - 10}Z" fill="#6aa04f" ${S(3)}/>`; g += fade(prog(lt, 6.4, 7.2), fire(480, FL + 20, 1.5, lt)); }
  g += fig(MAN, 150, FL + 50, 0.42, false, { armF: -90 + 20 * Math.sin(lt * 5), armB: -80, eyeOpen: blink(lt) }) + fig(WOMAN, 810, FL + 50, 0.42, true, { armF: night ? -80 + 20 * Math.sin(lt * 5 + 1) : -100, armB: night ? -70 : -100, eyeOpen: blink(lt) });
  g += at(lt, 4.4, 480, 80, chip(0, 0, 'मेजी', MC.saffron, 32));
  if (lt > 8.2) g += petals(lt, 40, 10, [MC.yellow, MC.saffron]);
  return g;
});
// 30 (275.61–283.01) Prayagraj Magh Mela: tents by the sangam
const A30 = mk((lt) => {
  let g = sky() + `<rect x="0" y="${FL - 100}" width="${W}" height="${H}" fill="#e7c98a"/>`;
  g += `<path d="M0,${FL - 100} L${W},${FL - 140} L${W},${FL - 40} L0,${FL - 10}Z" fill="#2f6fb5"/><path d="M0,${FL - 70} Q300,${FL - 100} ${W},${FL - 100}" fill="none" stroke="#7fb06a" stroke-width="22" opacity=".8"/>`;
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'प्रयागराज · माघ मेला', MC.saffron, 28));
  for (let i = 0; i < 7; i++) { const x = 80 + i * 135, c = [MC.red, MC.yellow, MC.saffron, MC.green][i % 4]; if (lt > 0.8 + i * 0.25) g += at(lt, 0.8 + i * 0.25, x, FL + 70, `<path d="M-60,0 L0,-100 L60,0Z" fill="${c}" ${S(4)}/><path d="M-12,0 L0,-40 L12,0Z" fill="${INK}"/><line x1="0" y1="-100" x2="0" y2="-130" ${S(3)}/><path d="M0,-130 l24,8 l-24,8Z" fill="${MC.saffron}" ${S(2)}/>`); }
  if (lt > 3.6) for (let i = 0; i < 12; i++) if (lt > 3.6 + i * 0.15) g += fig(i % 2 ? WOMAN : { ...MAN, uttariya: [MC.red, MC.blue, MC.green][i % 3] }, 60 + i * 76 + 20 * Math.sin(lt * 0.8 + i), FL + 10 + (i % 3) * 18, 0.14, i % 3 === 1, { armF: 8, armB: -6, legSwing: walk(lt, true, i) * 0.4 });
  return g;
});
// 31 (283.01–294.23) cold morning bath, bhajan, sangam
const A31 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="#c9dbe8"/>` + sunFace(480, 190 + (1 - ease(prog(lt, 0, 5))) * 80, 44) + `<rect x="0" y="300" width="${W}" height="${H}" fill="#2f6fb5"/>`;
  for (let i = 0; i < 4; i++) g += cloud(100 + i * 260, 120 + (i % 2) * 40, 0.8, '#f4f1ea');
  for (let i = 0; i < 6; i++) { const x = 100 + i * 150, y = 330 + (i % 2) * 40; g += fig(i % 2 ? WOMAN : MAN, x, y + 80, 0.22, false, { armF: lt > 3.2 ? -100 : -40, armB: lt > 3.2 ? -100 : -30 }) + `<rect x="${x - 44}" y="${y + 10}" width="88" height="60" fill="#2f6fb5" opacity=".75"/><path d="M${x - 44},${y + 10} q11,-8 22,0 t22,0 t22,0 t22,0" fill="none" stroke="#9cc3ea" stroke-width="3"/>`; }
  if (lt > 3.2 && lt < 5.7) for (let i = 0; i < 5; i++) g += `<text x="${150 + i * 170}" y="${250 - 30 * ((lt * 0.8 + i * 0.2) % 1)}" font-size="40" fill="${MC.maroon}" opacity=".8" font-family="NSB">♪</text>`;
  if (lt > 5.8) g += glow(480, 400, 140, 0.7) + at(lt, 5.9, 480, 500, chip(0, 0, 'संगम', MC.blue, 30));
  return g;
});
// 32 (294.23–305.09) Sabarimala, Makara Vilakku
const A32 = mk((lt) => {
  let g = bgNight(lt) + `<path d="M0,${H} L0,330 Q160,260 330,360 L330,${H}Z" fill="#2b3a2a" ${S(3)}/><path d="M330,${H} L640,240 L960,360 L960,${H}Z" fill="#33463a" ${S(3)}/>`;
  g += temple(480, 400, 0.38).replace('<g', '<g');
  g += at(lt, 0.3, 480, 62, chip(0, 0, 'सबरीमला · मकर विलक्कु', MC.saffron, 26));
  for (let i = 0; i < 16; i++) { const x = 300 + i * 22, y = FL - 20 - i * 10 + (i % 3) * 8; g += `<circle cx="${x}" cy="${y}" r="5" fill="${MC.yellow}" opacity="${0.5 + 0.5 * Math.sin(lt * 3 + i)}"/>`; }
  if (lt > 5.8) { const o = prog(lt, 5.8, 6.8) * (0.8 + 0.2 * Math.sin(lt * 9)); g += `<g transform="translate(780,230)">${glow(0, 0, 80 * o, o)}<path d="M0,-34 C14,-16 14,2 0,12 C-14,2 -14,-16 0,-34Z" fill="${MC.yellow}" ${S(2)}/></g>`; }
  if (lt > 8.5) g += fig(BLACK, 200, FL + 80, 0.34, false, { armF: -100, armB: -100 }) + fig(BLACK, 300, FL + 90, 0.3, false, { armF: -100, armB: -100 }) + fig(BLACK, 760, FL + 80, 0.34, true, { armF: -100, armB: -100 });
  return g;
});
// 33 (305.09–313.78) chanting, faith
const A33 = mk((lt) => {
  let g = bgNight(lt) + glow(480, 120, 220, 0.5 + 0.2 * Math.sin(lt * 6)) + `<path d="M0,${FL - 20} L${W},${FL - 20} L${W},${H} L0,${H}Z" fill="#2b3a2a"/>`;
  g += `<g transform="translate(480,130)"><path d="M0,-34 C14,-16 14,2 0,12 C-14,2 -14,-16 0,-34Z" fill="${MC.yellow}" ${S(2)}/></g>`;
  const up = lt < 4.3;
  [[160, 0.5], [300, 0.56], [480, 0.6], [660, 0.56], [800, 0.5]].forEach(([x, s], i) => { g += fig(BLACK, x, FL + 90, s, false, { armF: up ? -150 + 14 * Math.sin(lt * 8 + i) : -100, armB: up ? -140 : -100, headTilt: up ? -6 : 8, eyeOpen: up ? 1 : 0.15 }); });
  if (lt > 4.6) g += at(lt, 4.6, 480, 480, chip(0, 0, 'आस्था', MC.saffron, 36));
  return g;
});
// 34 (313.78–327.35) Andhra/Telangana: Bhogi fire, rangoli, cattle
const A34 = mk((lt) => {
  let g = '';
  if (lt < 9.2) {
    g += sky() + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#c9a25e"/>`;
    g += at(lt, 0.3, 480, 70, chip(0, 0, 'आंध्र · तेलंगाना', MC.green, 28));
    g += fire(480, FL + 30, 1.1, lt);
    if (lt > 4.3) for (let i = 0; i < 5; i++) { const k = ((lt - 4.3) * 0.45 + i * 0.2) % 1; const x0 = i % 2 ? 150 : 810; g += `<g transform="translate(${lerp(x0, 480, k)},${FL - 40 - 200 * Math.sin(Math.PI * k)}) rotate(${k * 360})"><rect x="-26" y="-6" width="52" height="12" fill="#8a5a2b" ${S(3)}/></g>`; }
    g += fig(MAN, 150, FL + 60, 0.44, false, { armF: lt > 4.3 ? -120 : 8, armB: -60, eyeOpen: blink(lt) }) + fig(WOMAN, 810, FL + 60, 0.44, true, { armF: lt > 4.3 ? -120 : 8, armB: -60, eyeOpen: blink(lt) });
  } else {
    g += bgPlain('#f8e7bf', '#c9a25e');
    const k = prog(lt, 9.4, 12.4);
    g += `<g transform="translate(300,${FL - 20})"><ellipse rx="170" ry="60" fill="#fff8ec" opacity=".6"/>` + Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8 * 1; return i / 16 < k ? `<ellipse cx="${(130 * Math.cos(a)).toFixed(0)}" cy="${(44 * Math.sin(a)).toFixed(0)}" rx="14" ry="8" fill="${[MC.red, MC.yellow, MC.pink, MC.green][i % 4]}" ${S(2)}/>` : ''; }).join('') + `<circle r="26" fill="${MC.saffron}" ${S(3)}/></g>`;
    g += `<g transform="translate(660,${FL + 20})">${ox(0, 0, 1.0, lt)}<path d="M-34,-86 Q0,-60 34,-86" fill="none" stroke="${MC.pink}" stroke-width="10"/></g>` + `<g transform="translate(850,${FL + 40})">${ox(0, 0, 0.5, lt + 1)}</g>`;
    g += at(lt, 10, 300, 90, chip(0, 0, 'रंगोली', MC.pink, 30));
  }
  return g;
});
// 35 (327.35–337.88) one thread: new crop, sun, family meal
const A35 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  if (lt < 5.3) {
    g += at(lt, 0.2, 480, 80, `${glow(0, 0, 60, 0.7)}<circle r="22" fill="${MC.yellow}" ${S(3)}/>`);
    const items = [(x, y) => kite(x, y, 1.2, 12, MC.pink, lt), (x, y) => pot(x, y + 60, 0.8, lt, 0.8), (x, y) => fire(x, y + 70, 0.55, lt), (x, y) => ladoo(x, y + 20, 2.4), (x, y) => sunFace(x, y + 20, 36)];
    items.forEach((f, i) => { const t0 = 1.8 + i * 0.5; const k = ease(prog(lt, t0 + 0.6, t0 + 2.4)); const x0 = 120 + i * 180, y0 = 280; if (lt > t0) g += `<g opacity="${1 - k * 0.5}">${f(lerp(x0, 480, k), lerp(y0, 250, k))}</g>`; });
  } else {
    const med = (x, t0, col, inner, lab) => at(lt, t0, x, 270, `${card(0, 0, 250, 330, MC.cream, col)}${inner}`) + at(lt, t0 + 0.3, x, 470, chip(0, 0, lab, col, 24));
    g += med(170, 5.4, MC.green, wheat(0, 60, 1.0), 'नई फ़सल') + med(480, 6.6, MC.saffron, sunFace(0, 0, 56), 'धन्यवाद') + med(790, 7.9, MC.red, [-60, 0, 60].map((x, i) => fig(i === 1 ? WOMAN : MAN, x, 90, 0.2, false, { armF: -50, armB: -6 })).join('') + food(0, 100, 1.3), 'अपनों के साथ');
  }
  return g;
});
// 36 (337.88–351.35) sesame & jaggery, winter foods, kitchen
const A36 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  if (lt < 8.6) {
    g += at(lt, 0.2, 200, 300, `<ellipse rx="100" ry="34" fill="#b8532a" ${S(4)}/><ellipse cy="-8" rx="84" ry="24" fill="#f4f1ea" ${S(3)}/>` + Array.from({ length: 14 }, (_, i) => `<circle cx="${-60 + (i * 37) % 120}" cy="${-14 + (i % 3) * 6}" r="3" fill="${INK}"/>`).join('') + chip(0, 80, 'तिल', MC.blue, 26));
    g += at(lt, 0.7, 440, 300, `<ellipse rx="100" ry="34" fill="#b8532a" ${S(4)}/>` + [-60, -20, 20, 60].map((x, i) => `<rect x="${x - 20}" y="${-34 - (i % 2) * 6}" width="40" height="30" rx="6" fill="#9a5a2a" ${S(3)}/>`).join('') + chip(0, 80, 'गुड़', MC.saffron, 26));
    g += at(lt, 2.0, 700, 300, ladoo(0, 0, 3.2));
    if (lt > 2.4) g += fig({ ...MAN, uttariya: MC.cream }, 840, FL + 80, 0.34, true, { armF: -60 + 20 * Math.sin(lt * 15), armB: -50 + 20 * Math.sin(lt * 15 + 1), eyeOpen: blink(lt) }) + `<path d="M828,${FL - 80} q20,-30 40,0" fill="none" stroke="${MC.blue}" stroke-width="4" opacity="0"/>`;
    if (lt > 4.9) { g += `<rect x="0" y="0" width="${W}" height="${H}" fill="#f8e7bf" opacity="${prog(lt, 4.9, 5.4)}"/>`; g += bgPlain('#f8e7bf', '#c9a25e').length ? '' : ''; }
    if (lt > 5.1) { ['मूँगफली', 'नया चावल'].forEach((lab, i) => { g += at(lt, 5.2 + i * 0.8, 260 + i * 440, 300, card(0, 0, 330, 260, MC.cream, [MC.saffron, MC.green][i]) + (i === 0 ? Array.from({ length: 7 }, (_, j) => `<ellipse cx="${-90 + j * 30}" cy="${-20 + (j % 2) * 30}" rx="14" ry="22" fill="#d9a46a" ${S(3)} transform="rotate(${j * 20 - 60} ${-90 + j * 30} ${-20 + (j % 2) * 30})"/>`).join('') : pot(0, 60, 1, lt, 0.8)) + chip(0, 160, lab, [MC.saffron, MC.green][i], 24)); }); }
  } else {
    g += glow(480, 300, 240, 0.4);
    if (lt > 8.7) g += at(lt, 8.7, 160, 330, `${glow(0, -40, 70, 0.9)}${diya(0, 20, 1.4, lt)}${chip(0, 80, 'पूजा', MC.red, 24)}`);
    g += at(lt, 11.0, 560, 380, `${fire(0, 60, 0.9, lt)}${pot(0, 10, 1.3, lt, 0)}${steam(0, -150, lt, 3, 90)}`) + at(lt, 11.4, 560, 110, chip(0, 0, 'रसोई का त्योहार', MC.red, 32));
  }
  return g;
});
// 37 (351.35–357.88) grandmother's kitchen
const A37 = mk((lt) => {
  let g = bgPlain('#f4dcae', '#c9a25e') + `<rect x="0" y="0" width="${W}" height="${FL - 40}" fill="#f4dcae"/>`;
  g += `<g transform="translate(250,${FL - 10})"><rect x="-90" y="-80" width="180" height="90" rx="14" fill="#a0603a" ${S(5)}/>${fire(0, -20, 0.5, lt)}</g>` + pot(250, FL - 80, 1.1, lt, 0) + steam(250, FL - 200, lt, 3, 100);
  g += fig({ ...WOMAN, uttariya: '#d9d9d9' }, 400, FL + 40, 0.5, false, { armF: -50 + 18 * Math.sin(lt * 4), armB: -30, eyeOpen: blink(lt) });
  for (let i = 0; i < 4; i++) g += `<path d="M${460 + i * 50},${300 - i * 10} q-14,-20 0,-40 t0,-40" fill="none" stroke="${MC.saffron}" stroke-width="5" opacity="${0.4 + 0.4 * Math.sin(lt * 3 + i)}"/>`;
  if (lt > 3.8) { [[640, KID(MC.red)], [740, MAN], [840, WOMAN]].forEach(([x, o], i) => { g += fade(prog(lt, 3.8 + i * 0.4, 4.3 + i * 0.4), seated(o, x, FL - 20, i === 0 ? 0.3 : 0.38, true, { armF: -50, armB: -6, eyeOpen: blink(lt + i) }, {}, MC.saffron)); }); g += at(lt, 4.4, 740, FL + 40, `<ellipse rx="110" ry="24" fill="${MC.cream}" ${S(4)}/>` + food(-50, 0, 1) + food(40, 0, 1)); }
  return g;
});
// 38 (357.88–367.85) Bhishma and kite kids — one sun
const A38 = mk((lt) => {
  let g = sky() + glow(480, 90, 160, 0.7);
  const rev = prog(lt, 7.2, 8);
  g += `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#7a3a22"/><rect x="480" y="${FL - 20}" width="480" height="${H}" fill="#e7c98a"/>`;
  g += at(lt, 0.6, 250, 0, '') + bed(60, 440, FL - 4, lt) + bhLying(430, FL - 28, 0.42, lt, 6);
  if (lt > 3.6) { g += fade(prog(lt, 3.6, 4.2), `<rect x="560" y="${FL - 50}" width="340" height="60" fill="${MC.cream}" ${S(4)}/>` + fig(KID(MC.red), 640, FL - 46, 0.28, false, { armF: -140 + 10 * Math.sin(lt * 5), armB: -110 }) + fig(KID(MC.blue), 760, FL - 46, 0.28, true, { armF: -140 + 10 * Math.sin(lt * 5 + 1), armB: -110 }) + kite(620, 240, 1.3, 10, MC.red, lt) + kite(780, 190, 1.3, -10, MC.green, lt) + kite(700, 300, 1.0, 5, MC.pink, lt)); }
  g += `<line x1="480" y1="140" x2="480" y2="${H}" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8" opacity=".35"/>`;
  g += sunFace(480, 90, 46);
  if (lt > 7.2) g += fade(prog(lt, 7.2, 8), `<path d="M455,140 L240,${FL - 140}" stroke="${MC.yellow}" stroke-width="10" opacity=".7" stroke-linecap="round"/><path d="M505,140 L720,${FL - 140}" stroke="${MC.yellow}" stroke-width="10" opacity=".7" stroke-linecap="round"/>`);
  return g;
});
// 39 (367.85–375.37) what's cooking at your home? comment
const A39 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(480, 250, 260, 0.5);
  g += fig(WOMAN, 130, FL + 50, 0.5, false, { armF: lt > 2 ? -60 + sway(lt, 8, 4) : 8, armB: -6, eyeOpen: blink(lt) });
  g += at(lt, 3.0, 340, 330, `<g>${pot(0, 60, 0.9, lt, 0)}${steam(0, -30, lt)}</g>`) + at(lt, 3.1, 340, 470, chip(0, 0, 'खिचड़ी', MC.saffron, 24));
  g += at(lt, 4.1, 560, 330, `<ellipse cy="40" rx="80" ry="20" fill="${MC.cream}" ${S(4)}/>` + [-40, 0, 40].map((x) => ladoo(x, 10, 1.3)).join('')) + at(lt, 4.2, 560, 470, chip(0, 0, 'तिल के लड्डू', MC.blue, 24));
  g += at(lt, 5.9, 780, 330, pot(0, 60, 0.9, lt, 1)) + at(lt, 6.0, 780, 470, chip(0, 0, 'पोंगल', MC.green, 24));
  g += at(lt, 6.4, 860, 110, bubble(0, 0, '…', 160, 30));
  return g;
});
// 40 (375.37–384.12) teaser: a world without sound
const A40 = mk((lt) => {
  let g = bgPlain('#e8dcc2', '#cdbf9a') + `<path d="M0,${FL - 60} Q240,${FL - 160} 480,${FL - 70} T960,${FL - 80} L960,${H} L0,${H}Z" fill="#c4b58c"/>`;
  g += mount(220, FL - 60, 360, 230, '#b8b8b0') + mount(740, FL - 60, 300, 170, '#c4c4bc') + tree(880, FL + 20, 0.6) + tree(80, FL + 20, 0.5);
  g += `<path d="M300,${H} Q460,${FL + 20} 520,${FL - 40} L560,${FL - 40} Q580,${FL + 10} 700,${H}Z" fill="#a8c0d0"/>`;
  g += at(lt, 0.5, 480, 100, `<text text-anchor="middle" font-family="NSB" font-weight="800" font-size="40" fill="${MC.maroon}">अगली कहानी…</text>`.replace(/<text.*<\/text>/, chip(0, 0, 'अगली कहानी', MC.red, 30)));
  if (lt > 3.9) g += at(lt, 3.9, 480, 250, muted(0, 0, 1.4));
  if (lt > 5.9) g += bird(300, 230, 0.8, 0) + at(lt, 6.2, 300, 150, `<text text-anchor="middle" font-size="46" fill="${INK}" font-family="NSB">♪</text><path d="M-26,-30 L26,16 M26,-30 L-26,16" stroke="${MC.red}" stroke-width="7" stroke-linecap="round"/>`);
  g += `<rect width="${W}" height="${H}" fill="#e8dcc2" opacity=".18"/>`;
  return g;
});
// 41 (384.12–388.94) Brahma worried; who gave the world a voice?
const A41 = mk((lt) => {
  let g = bgPlain('#e8dcc2', '#cdbf9a') + glow(280, 220, 200, 0.5);
  g += fig(BRAHMA, 280, FL + 50, 0.56, false, { armF: -122, armB: 8, headTilt: 10, eyeOpen: 0.7 });
  for (let i = 0; i < 3; i++) g += `<path d="M${300 + i * 22},${130 + (lt * 30 + i * 20) % 40} q-6,10 0,16 q6,-6 0,-16Z" fill="${MC.blue}" ${S(1.5)}/>`;
  g += at(lt, 0.4, 280, 90, chip(0, 0, 'ब्रह्मा जी', MC.saffron, 26));
  if (lt > 2.1) g += `<g opacity="${prog(lt, 2.1, 3)}">${glow(720, 250, 160, 0.7)}${fig({ ...SARAS, skin: '#2a2346', female: true }, 720, FL + 50, 0.52, true, { armF: 8, armB: -6, eyeOpen: 0 })}</g>` + at(lt, 2.5, 720, 100, `<text text-anchor="middle" font-family="NSB" font-weight="800" font-size="90" fill="${MC.red}">?</text>`);
  return g;
});
// 42 (388.94–393.02) Vasant Panchami: Saraswati
const A42 = mk((lt) => {
  let g = bgPlain('#fff0a8', '#f2d34c') + glow(300, 250, 260, 0.6) + petals(lt, 52, 36, [MC.yellow, '#fff3a0', MC.saffron]);
  g += fig(SARAS, 300, FL + 50, 0.56, false, { armF: lt > 0.5 ? -60 + sway(lt, 6, 3) : 8, armB: -6, eyeOpen: blink(lt) });
  g += `<g transform="translate(300,${FL - 150})">${lotus(0, 40, 0.5)}</g>`.replace(/^/, '');
  g += veena(420, 330, 0.7, -35);
  g += at(lt, 0.4, 700, 220, chip(0, 0, 'वसंत पंचमी', MC.red, 44));
  g += at(lt, 2.5, 700, 320, chip(0, 0, 'अगले वीडियो में', MC.blue, 26));
  return g;
});
// 43 (393.02–398.2) Jai Surya Dev
const A43 = mk((lt) => {
  let g = bgPlain('#ffd59a', MC.saffron) + rays(480, 210, 110, lt) + glow(480, 210, 260 + 10 * Math.sin(lt * 3), 0.8) + sunFace(480, 210, 80 + 4 * Math.sin(lt * 3));
  g += petals(lt, 61, 30);
  g += fig(MAN, 250, FL + 50, 0.4, false, { armF: -100, armB: -100, eyeOpen: blink(lt) }) + fig(WOMAN, 710, FL + 50, 0.4, true, { armF: -100, armB: -100, eyeOpen: blink(lt + 1) });
  g += at(lt, 2.0, 480, 440, T(0, 0, 'जय सूर्य देव', 64, MC.red));
  return g;
});

const LIST: [number, number, any][] = [
  [0, 11.18, A1], [11.18, 18.69, A2], [18.69, 31.22, A3], [31.22, 43.33, A4], [43.33, 51.98, A5], [51.98, 63.72, A6], [63.72, 75.10, A7], [75.10, 81.99, A8],
  [81.99, 89.03, A9], [89.03, 100.21, A10], [100.21, 111.25, A11], [111.25, 118.36, A12], [118.36, 126.88, A13], [126.88, 138.90, A14], [138.90, 145.70, A15],
  [145.70, 155.22, A16], [155.22, 164.43, A17], [164.43, 173.02, A18], [173.02, 180.43, A19], [180.43, 191.51, A20], [191.51, 201.56, A21], [201.56, 205.59, A22],
  [205.59, 216.18, A23], [216.18, 227.80, A24], [227.80, 235.92, A25], [235.92, 249.10, A26], [249.10, 257.30, A27], [257.30, 264.04, A28], [264.04, 275.61, A29],
  [275.61, 283.01, A30], [283.01, 294.23, A31], [294.23, 305.09, A32], [305.09, 313.78, A33], [313.78, 327.35, A34], [327.35, 337.88, A35], [337.88, 351.35, A36],
  [351.35, 357.88, A37], [357.88, 367.85, A38], [367.85, 375.37, A39], [375.37, 384.12, A40], [384.12, 388.94, A41], [388.94, 393.02, A42], [393.02, 398.2, A43],
];
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
