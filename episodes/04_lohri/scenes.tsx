// @ts-nocheck
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, garland, sunFace, bird, tree, prog, ease, lerp, clamp, palace, cloud, fire, lotus, moon, temple, chariot, horse, chip, pop, xdefs, rnd, blink, sway,
  BHISHMA, MUNI, QUEEN, MAN, WOMAN,
  book, frame, bgCourt, bgForest, bgNight, bgPlain, diya, bubble, lying, badge,
} from './mb3';
import { KING2, KING3, chest, baby } from './mb2';

type Fn = (lt: number, d: number, x: (g: number) => number) => string;
const mkS = (start: number, fn: Fn, push = 0.035) => ({ dur }: { t0: number; dur: number }) => {
  const f = useCurrentFrame();
  const lt = f / 30, d = dur / 30;
  return (
    <Stage dur={dur} push={push}>
      <g dangerouslySetInnerHTML={{ __html: defs() + xdefs() + fn(lt, d, (g) => g - start) + frame() }} />
    </Stage>
  );
};
const glow = (x: number, y: number, r: number, o = 1) => `<circle cx="${x}" cy="${y}" r="${Math.max(1, r)}" fill="url(#glowY)" opacity="${o}"/>`;
const T = (x: number, y: number, txt: string, size = 34, col = INK, fam = 'NSB') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${fam}" font-weight="800" font-size="${size}" fill="${col}">${txt}</text>`;
const at = (lt: number, t: number, x: number, y: number, inner: string) => (lt > t ? `<g transform="translate(${x},${y}) scale(${pop(lt, t)})">${inner}</g>` : '');
const fade = (o: number, inner: string) => `<g opacity="${clamp(o).toFixed(3)}">${inner}</g>`;
const walk = (lt: number, on: boolean, k = 0) => (on ? 12 * Math.sin(lt * 7 + k) : 0);
const P = { armF: 8, armB: -6 };

// ---- cast (existing figure options only) ----
const DULLA = { skin: '#d9915a', bun: true, bunColor: MC.red, beard: true, dhoti: MC.green, uttariya: MC.red };
const SUND = { ...WOMAN, skin: '#e0a06a' };
const MUND = { ...QUEEN };
const KID = { skin: '#8a5a3a', beard: true, dhoti: '#5a2a6a', uttariya: INK };
const UNCLE = { ...MAN, beard: true, uttariya: MC.maroon, dhoti: MC.yellow };
const BOY = { ...MAN, skin: '#e6b07c', uttariya: MC.yellow };
const BOY2 = { ...MAN, skin: '#c98a5a', uttariya: MC.blue };
const ELDER = { ...MAN, beard: true, bun: true, bunColor: '#f4f1ea', dhoti: MC.white, uttariya: MC.saffron };
const AGNI = { skin: '#d6452c', crown: 'king', dhoti: MC.saffron, uttariya: MC.yellow };
const SURYA = { skin: '#f2a33a', crown: 'king', dhoti: MC.red, uttariya: MC.saffron };
const SHANI = { skin: '#3a4a7a', crown: 'king', dhoti: '#2b2b3a', uttariya: MC.blue };

// ---- props / backgrounds ----
const ngd = (lt: number) => bgNight(lt) + moon(820, 90, 38, 0.45) + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#3d2216"/>`;
const hut = (x: number, b: number, s = 1) => `<g transform="translate(${x},${b}) scale(${s})"><rect x="-70" y="-90" width="140" height="90" fill="#c98a5a" ${S(4)}/><path d="M-92,-90 L0,-150 L92,-90Z" fill="#8a5a2b" ${S(4)}/><rect x="-18" y="-60" width="36" height="60" fill="#3a1f24" ${S(3)}/></g>`;
const sparks = (lt: number, x: number, y: number, n = 14, seed = 4) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const sp = 40 + r() * 60, ph = r() * 5, dx = (r() - 0.5) * 90; const k = ((lt * sp / 200 + ph) % 1); g += `<circle cx="${(x + dx * k + 8 * Math.sin(lt * 3 + i)).toFixed(1)}" cy="${(y - k * 220).toFixed(1)}" r="${(3.2 - 2.2 * k).toFixed(1)}" fill="${i % 2 ? MC.yellow : MC.saffron}" opacity="${(1 - k).toFixed(2)}"/>`; } return g; };
const wheat = (x: number, y: number, s = 1, lt = 0, col = MC.yellow) => { let g = `<g transform="translate(${x},${y}) scale(${s}) rotate(${(3 * Math.sin(lt * 2 + x)).toFixed(1)})"><path d="M0,0 L0,-90" stroke="#8a6a2b" stroke-width="4"/>`; for (let i = 0; i < 5; i++) g += `<ellipse cx="${i % 2 ? 7 : -7}" cy="${-95 - i * 12}" rx="5" ry="10" fill="${col}" ${S(2)} transform="rotate(${i % 2 ? 24 : -24} ${i % 2 ? 7 : -7} ${-95 - i * 12})"/>`; return g + `<ellipse cx="0" cy="-165" rx="5" ry="10" fill="${col}" ${S(2)}/></g>`; };
const cane = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-7" y="-210" width="14" height="210" fill="#7a3a6a" ${S(3)}/><line x1="-7" y1="-140" x2="7" y2="-140" stroke="${INK}" stroke-width="2"/><line x1="-7" y1="-70" x2="7" y2="-70" stroke="${INK}" stroke-width="2"/><path d="M0,-210 Q-50,-250 -70,-200 M0,-210 Q50,-250 70,-200" fill="none" stroke="${MC.green}" stroke-width="8" stroke-linecap="round"/></g>`;
const logs = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [[-30, 0], [0, 0], [30, 0], [-15, -18], [15, -18]].map(([a, b]) => `<rect x="${a - 12}" y="${b - 60}" width="24" height="60" rx="6" transform="rotate(90 ${a} ${b - 30})" fill="#8a5a2b" ${S(3)}/>`).join('') + `</g>`;
const pile = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [[-60, 0, 10], [0, 4, -8], [60, 0, 6], [-30, -22, -14], [30, -22, 12], [0, -44, 4]].map(([a, b, r]) => `<rect x="${a - 62}" y="${b - 18}" width="124" height="22" rx="10" transform="rotate(${r} ${a} ${b})" fill="#8a5a2b" ${S(4)}/>`).join('') + `</g>`;
const sack = (x: number, y: number, s = 1, col = MC.cream) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 C-52,-40 -36,-70 -16,-80 L16,-80 C36,-70 52,-40 40,0Z" fill="${col}" ${S(4)}/><path d="M-18,-80 L18,-80 L10,-96 L-10,-96Z" fill="${col}" ${S(3)}/><path d="M-14,-84 Q0,-76 14,-84" fill="none" stroke="${MC.red}" stroke-width="4"/></g>`;
const heart = (x: number, y: number, s = 1, col = MC.red) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,30 C-60,-10 -40,-50 0,-24 C40,-50 60,-10 0,30Z" fill="${col}" ${S(4)}/></g>`;
const note = (x: number, y: number, s = 1, col = MC.red) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="12" ry="9" fill="${col}" ${S(2)}/><line x1="11" y1="0" x2="11" y2="-44" ${S(4)}/><path d="M11,-44 q18,6 14,22" fill="none" ${S(4)}/></g>`;
const notes = (lt: number, x: number, y: number, n = 4) => { let g = ''; for (let i = 0; i < n; i++) { const k = ((lt * 0.5 + i / n) % 1); g += `<g opacity="${(1 - k).toFixed(2)}">${note(x + 40 * Math.sin(lt + i * 2) + i * 24 - 40, y - k * 150, 0.8, [MC.red, MC.blue, MC.green, MC.saffron][i % 4])}</g>`; } return g; };
const rider = (o: any, x: number, y: number, s: number, lt: number, flip = false, pose: any = P) =>
  fig(o, x + (flip ? -8 : 8) * s, y - 98 * s, 0.4 * s * 1.15, flip, { ...pose, legSwing: 0, eyeOpen: blink(lt) }) + horse(x, y, s, lt, flip);
const ring = (lt: number, cx: number, cy: number, list: any[], rx = 250, ry = 40, sc = 0.3, sp = 0) => {
  let g = '';
  const items = list.map((o, i) => { const a = (i / list.length) * Math.PI * 2 + lt * sp; return { o, i, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) }; }).sort((a, b) => a.y - b.y);
  items.forEach(({ o, i, x, y }) => { g += fig(o, x, y, sc * (0.9 + 0.2 * (y - (cy - ry)) / (2 * ry)), x > cx, { armF: -50 + 20 * Math.sin(lt * 4 + i), armB: -30, headTilt: 4, eyeOpen: blink(lt + i) }); });
  return g;
};
const bonfire = (lt: number, x: number, y: number, s = 1) => fire(x, y, s, lt) + sparks(lt, x, y - 100 * s, 12, 7);
const mark = (txt: string, col = MC.red, s = 60) => T(0, 0, txt, s, col, 'NSB');

const SC: [number, Fn, number?][] = [];
const add = (start: number, fn: Fn, push?: number) => SC.push([start, fn, push]);

// 1 night: two girls dragged off (0-7.5)
add(0, (lt, d, x) => {
  let g = ngd(lt) + hut(110, FL - 20, 1.1) + hut(840, FL - 20, 0.8) + tree(560, FL - 20, 0.5);
  g += `<g opacity="${0.5 * prog(lt, 0, 1.5)}"><circle cx="150" cy="${FL - 120}" r="60" fill="url(#glowY)"/></g>`;
  const k = ease(prog(lt, 0.8, 7.2)), vx = lerp(260, 800, k);
  const sw = lt < 7 ? 1 : 0;
  g += fig(SUND, vx - 150, FL + 30, 0.4, false, { armF: -70, armB: -20, headTilt: -14, legSwing: walk(lt, sw, 1), eyeOpen: 0.3 });
  g += fig(MUND, vx - 80, FL + 40, 0.36, false, { armF: -70, armB: -20, headTilt: -14, legSwing: walk(lt, sw, 2), eyeOpen: 0.3 });
  g += fig(KID, vx, FL + 36, 0.44, false, { armF: -70, armB: 20, legSwing: walk(lt, sw, 0) });
  g += fig(KID, vx + 80, FL + 46, 0.42, false, { armF: -60, armB: 20, legSwing: walk(lt, sw, 3) });
  g += at(lt, 4.0, 150, 80, T(0, 0, '!', 64, MC.red, 'Hind'));
  return g;
});
// 2 orphan sisters alone (7.5-11.5)
add(7.5, (lt, d, x) => {
  let g = ngd(lt) + hut(780, FL - 20, 1) + diya(480, FL + 50, 1, lt);
  g += glow(480, FL - 20, 150, 0.4);
  g += fig(SUND, 400, FL + 30, 0.44, false, { armF: 30, armB: -6, headTilt: 22, eyeOpen: 0.2 }) + fig(MUND, 560, FL + 36, 0.4, true, { armF: 30, armB: -6, headTilt: 22, eyeOpen: 0.2 });
  for (let i = 0; i < 2; i++) { const k = ((lt * 0.8 + i * 0.5) % 1); g += `<path d="M${430 + i * 130},${FL - 160 + k * 60} q6,10 0,16 q-6,-6 0,-16Z" fill="#9cc3ea" opacity="${1 - k}"/>`; }
  g += at(lt, x(9.6), 480, 90, mark('?', MC.red, 80));
  return g;
});
// 3 Dulla arrives on horseback (11.5-24.7)
add(11.5, (lt, d, x) => {
  let g = ngd(lt) + hut(90, FL - 20, 0.9) + tree(480, FL - 20, 0.45);
  const rx = lerp(-200, 330, ease(prog(lt, x(11.94), x(14.8))));
  const gal = lt < x(14.8);
  const hy = FL + 24 - (gal ? 4 * Math.abs(Math.sin(lt * 12)) : 0);
  if (lt > x(12) && lt < x(14.8)) for (let i = 0; i < 4; i++) g += `<line x1="${rx - 140 - i * 40}" y1="${FL - 120 + i * 24}" x2="${rx - 200 - i * 50}" y2="${FL - 120 + i * 24}" stroke="${MC.cream}" stroke-width="4" opacity=".6"/>`;
  const flee = ease(prog(lt, x(19.8), x(24)));
  g += fig(SUND, 700 + 60 * flee, FL + 30, 0.4, true, { armF: 8, armB: -6, headTilt: 10, eyeOpen: 0.3 }) + fig(MUND, 790 + 60 * flee, FL + 36, 0.37, true, { armF: 8, armB: -6, headTilt: 10, eyeOpen: 0.3 });
  g += fig(KID, 640 + 160 * flee, FL + 40, 0.44, true, { armF: -50, armB: 20, legSwing: walk(lt, flee > 0 && flee < 1, 1) }) + fig(KID, 880 + 160 * flee, FL + 40, 0.42, true, { armF: -60, armB: 20 });
  g += rider(DULLA, rx, hy, 1, lt, false, { armF: lt > x(19) ? -90 : 8, armB: -6 });
  if (lt > x(19.0) && lt < x(20.1)) g += at(lt, x(19.0), 400, 90, bubble(0, 0, 'इन्हें छोड़ दो', 270, 30));
  if (lt > x(20.3) && lt < x(24.3)) g += at(lt, x(20.3), 400, 90, bubble(0, 0, 'ये मेरी बेटियाँ हैं', 340, 28));
  if (lt > x(23.2)) g += at(lt, x(23.2), 150, 230, chip(0, 0, 'दुल्ला भट्टी', MC.saffron, 26));
  return g;
});
// 4 Punjab courtyards glow (24.7-32.3)
add(24.7, (lt, d, x) => {
  let g = ngd(lt) + hut(110, FL - 20, 1.0) + hut(850, FL - 20, 1.0) + glow(480, 300, 280, 0.5);
  g += bonfire(lt, 480, FL + 40, 1.2);
  const ppl = [MAN, WOMAN, { ...MAN, uttariya: MC.red }, { ...WOMAN, skin: '#e0a06a' }, MAN, WOMAN];
  g += ring(lt, 480, FL + 30, ppl, 270, 36, 0.3, 0);
  g += at(lt, x(27.25), 480, 90, chip(0, 0, 'पंजाब की ठंडी रात', MC.blue, 26));
  return g;
}, 0.05);
// 5 festival name + regions (32.3-43.0)
add(32.3, (lt, d, x) => {
  let g = bgPlain('#fbe3b0', '#c9a25e') + sunFace(130, 110, 40);
  g += bonfire(lt, 480, FL + 50, 1.3);
  g += wheat(180, FL + 40, 1.2, lt) + wheat(240, FL + 50, 1.0, lt) + wheat(780, FL + 40, 1.2, lt) + wheat(720, FL + 50, 1.0, lt);
  g += at(lt, x(34.0), 480, 90, T(0, 0, 'लोहड़ी', 72, MC.red));
  g += at(lt, x(35.9), 200, 200, chip(0, 0, 'फ़सल का त्योहार', MC.green, 22));
  g += at(lt, x(38.5), 200, 280, chip(0, 0, 'पंजाब', MC.saffron, 24)) + at(lt, x(40.4), 760, 200, chip(0, 0, 'हरियाणा', MC.blue, 24)) + at(lt, x(41.6), 760, 280, chip(0, 0, 'दिल्ली', MC.red, 24));
  return g;
});
// 6 date: 13 Jan 2027, day before Sankranti (43.0-51.7)
add(43.0, (lt, d, x) => {
  let g = bgPlain('#e9f0f8', '#c9d6e6');
  const pg = pop(lt, 0.2);
  g += `<g transform="translate(300,235) scale(${pg})"><rect x="-150" y="-170" width="300" height="340" rx="20" fill="${MC.cream}" ${S(5)}/><rect x="-150" y="-170" width="300" height="70" rx="20" fill="${MC.red}" ${S(5)}/>${T(0, -118, 'जनवरी २०२७', 38, MC.cream)}${T(0, 50, '१३', 140, MC.red)}</g>`;
  g += at(lt, x(47.2), 300, 395, chip(0, 0, 'बुधवार', MC.blue, 26));
  g += at(lt, x(48.7), 700, 150, sunFace(0, 0, 54 + 3 * Math.sin(lt * 2)));
  g += at(lt, x(49.4), 700, 270, chip(0, 0, 'मकर संक्रांति', MC.saffron, 28));
  if (lt > x(49.6)) { const k = ease(prog(lt, x(49.6), x(50.8))); g += `<path d="M460,235 L${460 + 90 * k},235" stroke="${MC.red}" stroke-width="8" stroke-linecap="round"/><path d="M${548 * 0 + 460 + 90 * k},225 l16,10 l-16,10" fill="none" stroke="${MC.red}" stroke-width="8" stroke-linecap="round"/>`; }
  return g;
});
// 7 fields: wheat growing, cane cutting, coldest days (51.7-60.5)
add(51.7, (lt, d, x) => {
  let g = `<rect width="${W}" height="${H}" fill="#f4e6c4"/>` + `<circle cx="820" cy="110" r="42" fill="#fff6dc" ${S(3)}/>` + `<rect x="0" y="${FL - 90}" width="${W}" height="${H}" fill="#9fc46a"/>`;
  for (let i = 0; i < 7; i++) g += `<path d="M0,${FL - 70 + i * 24} Q480,${FL - 90 + i * 24} 960,${FL - 70 + i * 24}" fill="none" stroke="#6f9a3a" stroke-width="4"/>`;
  const gr = prog(lt, 0.2, 3);
  for (let i = 0; i < 10; i++) g += wheat(40 + i * 48, FL - 40 + (i % 2) * 24, 0.35 + 0.35 * gr, lt, MC.green);
  g += cane(640, FL + 20, 0.9) + cane(700, FL + 14, 0.8) + cane(760, FL + 22, 0.9);
  const sw = lt > x(55.4) ? 20 * Math.sin(lt * 6) : 0;
  g += fig(MAN, 560, FL + 50, 0.42, false, { armF: -50 + sw, armB: -40, headTilt: 8, eyeOpen: blink(lt) });
  g += at(lt, x(55.5), 700, 100, chip(0, 0, 'गन्ने की कटाई', MC.green, 22)) + at(lt, x(52.2), 240, 100, chip(0, 0, 'बढ़ता गेहूँ', MC.green, 22));
  if (lt > x(58.2)) { g += fade(prog(lt, x(58.2), x(59)), `<rect width="${W}" height="${H}" fill="#9cc3ea" opacity=".28"/>`); for (let i = 0; i < 18; i++) { const r = rnd(i + 5); const k = ((lt * 0.3 + r()) % 1); g += `<circle cx="${(r() * 900 + 20 * Math.sin(lt + i)).toFixed(0)}" cy="${(k * 460).toFixed(0)}" r="4" fill="#fff" opacity=".9"/>`; } g += at(lt, x(58.6), 480, 160, chip(0, 0, 'सबसे ठंडे दिन', MC.blue, 28)); }
  return g;
});
// 8 evening: gather wood, light the fire (60.5-70.7)
add(60.5, (lt, d, x) => {
  let g = bgPlain('#f9c98a', '#b88a52') + sunFace(130, 160, 44) + hut(100, FL - 10, 0.9) + hut(860, FL - 10, 0.9);
  const lit = lt > x(66.06);
  g += lit ? glow(480, 330, 270, ease(prog(lt, x(66.06), x(67.5))) * 0.7) + bonfire(lt, 480, FL + 40, 1.1) : pile(480, FL + 30, 1.1);
  const ws = [[0, 80, MAN], [1.2, 880, WOMAN], [2.2, 20, { ...MAN, uttariya: MC.red }], [3.0, 960, { ...WOMAN, skin: '#e0a06a' }]];
  ws.forEach(([t0, sx, o], i) => { const tx = sx < 480 ? 360 - (i % 2) * 60 : 600 + (i % 2) * 60; const k = ease(prog(lt, 0.2 + t0, 3.4 + t0)); const px = lerp(sx, tx, k); g += fig(o, px, FL + 50 + (i % 2) * 14, 0.34, sx > 480, { armF: -60, armB: -50, legSwing: walk(lt, k < 1, i), eyeOpen: blink(lt + i) }); if (k < 1) g += logs(px + (sx > 480 ? -22 : 22), FL - 70 + (i % 2) * 14, 0.5); });
  g += at(lt, x(69.1), 480, 90, chip(0, 0, 'लोहड़ी की आग', MC.red, 30));
  return g;
});
// 9 16th century: Delhi throne (70.7-82.8)
add(70.7, (lt, d, x) => {
  let g = bgCourt(lt) + at(lt, x(71.5), 480, 120, T(0, 0, 'अब कहानी…', 40, MC.cream));
  g += seated(KING3, 480, FL - 40, 0.55, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.maroon);
  g += at(lt, x(74.8), 200, 180, badge(0, 0, '१६', 'वीं सदी', MC.maroon, 0.62));
  g += at(lt, x(78.9), 760, 180, chip(0, 0, 'दिल्ली का तख़्त', MC.blue, 24));
  g += at(lt, x(80.6), 480, 345, chip(0, 0, 'बादशाह अकबर', MC.red, 24));
  return g;
});
// 10 Pindi Bhattian, Bhatti family, young Dulla (82.8-97.0)
add(82.8, (lt, d, x) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + sunFace(840, 100, 40) + hut(160, FL - 10, 1.1) + hut(500, FL - 30, 0.8) + hut(820, FL - 10, 1.1) + tree(330, FL - 20, 0.5);
  g += at(lt, x(83.6), 480, 80, chip(0, 0, 'पिंडी भट्टियाँ, पंजाब', MC.green, 26));
  g += fade(prog(lt, x(87), x(87.8)), fig(ELDER, 330, FL + 60, 0.4, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }) + fig(WOMAN, 410, FL + 62, 0.38, false, { armF: 8, armB: -6 }) + fig(UNCLE, 250, FL + 62, 0.4, false, { armF: 8, armB: -6 }));
  g += at(lt, x(87.9), 330, 160, chip(0, 0, 'राजपूत भट्टी परिवार', MC.red, 20));
  const dx = lerp(1000, 640, ease(prog(lt, x(89.5), x(91.5))));
  g += fig(DULLA, dx, FL + 60, 0.46, true, { armF: lt > x(93.6) ? -80 + sway(lt, 8, 3) : 8, armB: -6, legSwing: walk(lt, lt < x(91.5)), eyeOpen: blink(lt + 1) });
  g += at(lt, x(92.0), 700, 130, chip(0, 0, 'अब्दुल्ला भट्टी', MC.saffron, 24)) + at(lt, x(94.2), 700, 200, chip(0, 0, 'दुल्ला भट्टी', MC.red, 28));
  return g;
});
// 11 father & grandfather punished; Dulla stands against officials (97.0-109.5)
add(97.0, (lt, d, x) => {
  let g = bgCourt(lt);
  g += seated(KING2, 760, FL - 40, 0.5, true, { armF: lt > x(98) ? -70 : 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.maroon);
  g += fig(ELDER, 190, FL + 40, 0.42, false, { armF: 30, armB: 30, headTilt: 18, eyeOpen: 0.4 }) + fig({ ...ELDER, bunColor: '#d8d2c6', uttariya: MC.maroon }, 290, FL + 44, 0.4, false, { armF: 30, armB: 30, headTilt: 18, eyeOpen: 0.4 });
  g += at(lt, x(100.9), 240, 330, `<circle cx="-22" cy="0" r="18" fill="none" stroke="#6b6b6b" stroke-width="7"/><circle cx="12" cy="0" r="18" fill="none" stroke="#6b6b6b" stroke-width="7"/><circle cx="46" cy="0" r="18" fill="none" stroke="#6b6b6b" stroke-width="7"/>`);
  g += at(lt, x(98), 260, 100, chip(0, 0, 'बग़ावत की सज़ा', MC.red, 24));
  const dk = ease(prog(lt, x(104.7), x(106.2)));
  if (lt > x(104.7)) g += fig(DULLA, lerp(-60, 480, dk), FL + 46, 0.48, false, { armF: lt > x(107) ? -110 : 8, armB: -6, legSwing: walk(lt, dk < 1), eyeOpen: blink(lt) });
  if (lt > x(107.4)) g += at(lt, x(107.4), 480, 200, chip(0, 0, 'हाकिमों के ख़िलाफ़', MC.maroon, 24));
  return g;
});
// 12 Robin Hood of Punjab (109.5-118.4)
add(109.5, (lt, d, x) => {
  let g = bgForest(lt);
  g += at(lt, x(110.3), 480, 70, chip(0, 0, 'पंजाब का रॉबिन हुड', MC.green, 28));
  const k = ease(prog(lt, 0, 4));
  g += chest(130, FL + 30, 0.4) + fig(KING3, 250, FL + 50, 0.38, false, { armF: lt > x(115) ? -90 : 8, armB: -6, eyeOpen: blink(lt) }) + fig(KING2, 330, FL + 56, 0.34, false, P);
  g += at(lt, x(114.5), 190, 150, chip(0, 0, 'अमीर क़ाफ़िला', MC.maroon, 20));
  g += rider(DULLA, lerp(-100, 520, k), FL + 24, 0.95, lt, false, { armF: lt > x(114.8) ? -70 : 8, armB: -6 });
  if (lt > x(115.8)) { for (let i = 0; i < 2; i++) { const kk = ease(prog(lt, x(115.8) + i * 0.5, x(117.5) + i * 0.5)); g += `<g transform="translate(${lerp(520, 780 + i * 80, kk)},${lerp(FL - 120, FL + 30, kk) - 70 * Math.sin(Math.PI * kk)})">${sack(0, 0, 0.5, i ? MC.yellow : MC.cream)}</g>`; } g += fade(prog(lt, x(116.2), x(116.8)), fig(MAN, 800, FL + 50, 0.34, true, { armF: -60, armB: -50 }) + fig(WOMAN, 880, FL + 54, 0.32, true, { armF: -60, armB: -50 })); }
  return g;
});
// 13 kidnappers selling girls; Dulla hears (118.4-126.4)
add(118.4, (lt, d, x) => {
  let g = ngd(lt) + hut(110, FL - 20, 0.8);
  const kx = lerp(120, 520, ease(prog(lt, 0.5, 7)));
  g += fig(KID, kx + 70, FL + 40, 0.44, false, { armF: -60, armB: 20, legSwing: walk(lt, true, 1) }) + fig(SUND, kx, FL + 36, 0.38, false, { armF: -60, armB: -20, headTilt: -14, legSwing: walk(lt, true, 2), eyeOpen: 0.3 });
  g += at(lt, x(122.7), 330, 120, chip(0, 0, 'लड़कियों का सौदा', MC.red, 24));
  g += rider(DULLA, 840, FL + 20, 0.9, lt, true, { armF: lt > x(120) ? -90 : 8, armB: -6 });
  g += at(lt, x(119.4), 760, 110, mark('!', MC.red, 70));
  return g;
});
// 14 Sundri & Mundri, uncle sells them (126.4-137.0)
add(126.4, (lt, d, x) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + hut(120, FL - 20, 1.0);
  g += fig(SUND, 250, FL + 56, 0.46, false, { armF: 20, armB: -6, headTilt: 14, eyeOpen: 0.3 }) + fig(MUND, 360, FL + 60, 0.42, false, { armF: 20, armB: -6, headTilt: 14, eyeOpen: 0.3 });
  g += at(lt, x(127.4), 250, 140, chip(0, 0, 'सुंदरी', MC.red, 24)) + at(lt, x(128.8), 380, 190, chip(0, 0, 'मुंदरी', MC.blue, 24));
  g += at(lt, x(130.9), 480, 90, chip(0, 0, 'माता-पिता नहीं', MC.maroon, 22));
  g += fig(UNCLE, 640, FL + 50, 0.46, true, { armF: lt > x(133) ? -50 : 8, armB: -6, eyeOpen: blink(lt) }) + fig(KID, 800, FL + 54, 0.46, true, { armF: lt > x(134) ? -50 : 8, armB: -6 });
  if (lt > x(134)) { const k = ease(prog(lt, x(134), x(135.5))); g += `<g transform="translate(${lerp(760, 700, k)},${FL - 140 + 20 * Math.sin(k * 3)})"><circle r="22" fill="${MC.yellow}" ${S(3)}/>${T(0, 9, '₹', 26, INK, 'Hind')}</g>`; }
  g += at(lt, x(133.0), 700, 150, chip(0, 0, 'चाचा का सौदा', MC.red, 22));
  return g;
});
// 15 groom's family backs away (137.0-143.2)
add(137.0, (lt, d, x) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + hut(160, FL - 20, 0.9);
  g += fig(SUND, 220, FL + 56, 0.44, false, { armF: 30, armB: -6, headTilt: 16, eyeOpen: 0.3 }) + fig(MUND, 320, FL + 60, 0.4, false, { armF: 30, armB: -6, headTilt: 16, eyeOpen: 0.3 });
  const back = ease(prog(lt, x(139.8), x(142.8)));
  g += at(lt, x(137.2), 560, 110, chip(0, 0, 'ब्याह होने वाला था', MC.green, 22));
  g += fig(BOY, lerp(600, 800, back), FL + 54, 0.38, true, { armF: lt > x(139.8) ? -60 : 8, armB: -6, legSwing: walk(lt, back > 0 && back < 1, 1) }) + fig(ELDER, lerp(690, 880, back), FL + 50, 0.4, true, { armF: lt > x(139.8) ? -60 : 8, armB: -6, legSwing: walk(lt, back > 0 && back < 1, 2) }) + fig(WOMAN, lerp(770, 950, back), FL + 56, 0.38, true, { armF: lt > x(139.8) ? -60 : 8, armB: -6 });
  if (lt > x(139.9)) for (let i = 0; i < 3; i++) g += `<path d="M${640 + i * 90},${FL - 190 + 8 * Math.sin(lt * 9 + i)} q6,10 0,16 q-6,-6 0,-16Z" fill="#9cc3ea"/>`;
  return g;
});
// 16 Dulla rescues (143.2-148.0)
add(143.2, (lt, d, x) => {
  let g = ngd(lt) + hut(110, FL - 20, 0.8);
  const rx = lerp(-200, 360, ease(prog(lt, 0, 2.4)));
  const flee = ease(prog(lt, 1.8, 4.5));
  g += fig(KID, lerp(560, 960, flee), FL + 40, 0.44, true, { armF: -50, armB: 20, legSwing: walk(lt, flee > 0 && flee < 1) }) + fig(UNCLE, lerp(660, 1060, flee), FL + 46, 0.44, true, { armF: -50, armB: 20, legSwing: walk(lt, flee > 0 && flee < 1, 1) });
  g += fig(SUND, 600, FL + 40, 0.42, true, { armF: lt > x(145.6) ? -100 : 8, armB: lt > x(145.6) ? -100 : -6 }) + fig(MUND, 690, FL + 44, 0.38, true, { armF: lt > x(145.6) ? -100 : 8, armB: lt > x(145.6) ? -100 : -6 });
  g += rider(DULLA, rx, FL + 24, 0.95, lt, false, { armF: -90, armB: -6 });
  g += at(lt, x(146.0), 600, 90, glow(0, 0, 40, 1) + heart(0, 0, 0.8));
  return g;
});
// 17 searching grooms, forest fire (148.0-153.7)
add(148.0, (lt, d, x) => {
  let g = ngd(lt) + tree(80, FL - 10, 0.7) + tree(240, FL - 30, 0.5) + tree(880, FL - 10, 0.7) + tree(730, FL - 30, 0.5);
  g += fig(DULLA, 330, FL + 50, 0.48, false, { armF: lt > x(148.4) ? -70 + sway(lt, 6, 3) : 8, armB: -6, eyeOpen: blink(lt) });
  g += fade(prog(lt, x(148.5), x(149.3)), fig(BOY, 150, FL + 56, 0.4, false, P) + fig(BOY2, 70, FL + 60, 0.38, false, P));
  g += at(lt, x(148.6), 120, 170, chip(0, 0, 'दो वर', MC.green, 22));
  if (lt > x(150.86)) g += glow(640, 330, 200 * prog(lt, x(150.86), x(152)), 0.6) + at(lt, x(150.86), 640, FL + 40, bonfire(lt, 0, 0, 1)) ;
  g += fade(prog(lt, x(151.3), x(152)), fig(SUND, 820, FL + 50, 0.4, true, P) + fig(MUND, 890, FL + 54, 0.38, true, P));
  return g;
});
// 18 wedding around the fire, kanyadaan (153.7-161.0)
add(153.7, (lt, d, x) => {
  let g = ngd(lt) + tree(60, FL - 10, 0.7) + tree(900, FL - 10, 0.7) + glow(480, 300, 300, 0.6);
  g += bonfire(lt, 480, FL + 20, 1.1);
  const a = lt * 0.9;
  const couple = (ph: number, gr: any, br: any, k: number) => { const cxp = 480 + 200 * Math.cos(a + ph), cyp = FL + 30 + 38 * Math.sin(a + ph), dx = Math.sin(a + ph) > 0 ? 1 : -1; return { y: cyp, s: fig(gr, cxp, cyp, 0.32, Math.sin(a + ph) < 0, { armF: 8, armB: -6, legSwing: 6 * Math.sin(lt * 7 + k) }) + fig(br, cxp - 40 * dx * -1 * -1, cyp, 0.3, Math.sin(a + ph) < 0, { armF: 8, armB: -6, legSwing: 6 * Math.sin(lt * 7 + k), headTilt: 8 }) }; };
  const c1 = couple(0, BOY, SUND, 0), c2 = couple(Math.PI, BOY2, MUND, 1);
  g += c1.y < c2.y ? c1.s + c2.s : c2.s + c1.s;
  g += fig(DULLA, 120, FL + 56, 0.46, false, { armF: lt > x(157.9) ? -80 : 8, armB: -6, eyeOpen: blink(lt) });
  g += at(lt, x(155), 480, 80, chip(0, 0, 'अग्नि के फेरे', MC.saffron, 26));
  if (lt > x(157.9)) g += at(lt, x(157.9), 160, 130, chip(0, 0, 'कन्यादान', MC.red, 26)) + fade(prog(lt, x(157.9), x(158.8)), glow(190, FL - 100, 40, 0.8));
  return g;
});
// 19 farewell: a seer of sugar (161.0-174.5)
add(161.0, (lt, d, x) => {
  let g = bgPlain('#fbe3b0', '#c9a25e') + sunFace(480, 110, 50) + glow(480, 110, 120, 0.3);
  g += fig(DULLA, 380, FL + 56, 0.5, false, { armF: lt > x(165.2) ? -60 : 8, armB: -6, eyeOpen: blink(lt) });
  g += fig(BOY, 640, FL + 56, 0.4, true, P) + fig(SUND, 710, FL + 60, 0.38, true, { armF: 8, armB: -6, headTilt: 8 }) + fig(BOY2, 800, FL + 56, 0.4, true, P) + fig(MUND, 870, FL + 60, 0.38, true, { armF: 8, armB: -6, headTilt: 8 });
  if (lt > x(161.5) && lt < x(164.6)) g += at(lt, x(161.5), 480, 280, chest(0, 0, 0.4)) + at(lt, x(163.2), 480, 200, `<path d="M-30,-30 L30,30 M30,-30 L-30,30" stroke="${MC.red}" stroke-width="8" stroke-linecap="round"/>`);
  if (lt > x(165.2)) { const k = ease(prog(lt, x(165.2), x(167.5))); g += `<g transform="translate(${lerp(450, 600, k)},${FL - 90 - 30 * Math.sin(Math.PI * k)})">${sack(0, 0, 0.7)}</g>`; g += at(lt, x(166.3), 700, 260, chip(0, 0, 'सेर भर शक्कर', MC.saffron, 26)); }
  if (lt > x(169.2)) g += at(lt, x(169.4), 220, 170, heart(0, 0, 1.4 + 0.1 * Math.sin(lt * 4))) + at(lt, x(171.6), 220, 260, chip(0, 0, 'ख़ज़ाने से बढ़कर', MC.red, 24));
  return g;
});
// 20 children gather around the fire (174.5-180.0)
add(174.5, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 280, 0.5) + bonfire(lt, 480, FL + 30, 1.1) + notes(lt, 480, 160, 5);
  g += ring(lt, 480, FL + 30, [MAN, WOMAN, MAN, WOMAN, MAN, WOMAN, MAN], 280, 36, 0.22, 0);
  g += at(lt, x(176.0), 480, 70, chip(0, 0, 'आग की याद में', MC.red, 26));
  return g;
}, 0.05);
// 21 the song (180.0-197.0)
add(180.0, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 300, 0.5) + bonfire(lt, 480, FL + 30, 1.1) + notes(lt, 480, 190, 5);
  g += ring(lt, 480, FL + 30, [MAN, WOMAN, MAN, WOMAN, MAN, WOMAN, MAN, WOMAN], 300, 36, 0.24, 0);
  const lines: [number, string, string][] = [[180.34, 'सुंदर मुंदरिए', MC.red], [185.58, 'दुल्ला भट्टी वाला', MC.saffron], [188.33, 'दुल्ले धी ब्याही', MC.green], [190.89, 'सेर शक्कर पाई', MC.blue], [193.89, 'हो!', MC.red]];
  lines.forEach(([t0, w, c], i) => { const t1 = i < 4 ? lines[i + 1][0] - 0.2 : 197; if (lt > x(t0) && lt < x(t1)) g += at(lt, x(t0), 480, 80, chip(0, 0, w, c, 30)); });
  if (lt > x(190.89) && lt < x(193.8)) g += at(lt, x(191.2), 800, 150, sack(0, 0, 0.8));
  return g;
}, 0.04);
// 22 capture in Lahore (197.0-209.5)
add(197.0, (lt, d, x) => {
  let g = bgPlain('#e6ddd0', '#a89880') + palace(480, FL - 30, 0.55);
  g += at(lt, x(202.5), 480, 60, chip(0, 0, 'लाहौर', MC.maroon, 28));
  g += fig({ ...KING2, crown: 'none', dhoti: MC.maroon }, 180, FL + 56, 0.42, false, { armF: -20, armB: -6 }) + `<line x1="215" y1="${FL - 170}" x2="215" y2="${FL + 40}" ${S(5)}/><path d="M215,${FL - 170} l-8,-20 l16,0Z" fill="#cfd6dc" ${S(3)}/>`;
  g += fig(KING2, 780, FL + 56, 0.42, true, { armF: -20, armB: -6 }) + `<line x1="745" y1="${FL - 170}" x2="745" y2="${FL + 40}" ${S(5)}/><path d="M745,${FL - 170} l-8,-20 l16,0Z" fill="#cfd6dc" ${S(3)}/>`;
  g += fig(DULLA, 480, FL + 60, 0.48, false, { armF: 30, armB: 30, headTilt: 10 + 4 * Math.sin(lt * 2), eyeOpen: blink(lt) });
  g += at(lt, x(205.3), 770, 130, chip(0, 0, 'सन् १५९९ के आसपास', MC.red, 24));
  return g;
});
// 23 history vs folklore; remembered (209.5-222.5)
add(209.5, (lt, d, x) => {
  if (lt < x(218.8)) {
    const bal = lt < x(213.6) ? 0.25 * Math.sin(lt * 2.2) * (1 - prog(lt, 0, 4.1) * 0.6) : 0;
    let g = bgPlain('#f7e2b0', '#c9a25e');
    const a = bal * 25;
    g += `<rect x="470" y="150" width="20" height="270" fill="${MC.maroon}" ${S(4)}/><rect x="400" y="${FL - 6}" width="160" height="26" rx="8" fill="${MC.maroon}" ${S(4)}/>`;
    g += `<g transform="translate(480,160) rotate(${a})"><rect x="-230" y="-8" width="460" height="16" rx="8" fill="${MC.yellow}" ${S(4)}/>`;
    g += `<g transform="translate(-220,0) rotate(${-a})"><line x1="-60" y1="0" x2="0" y2="110" ${S(3)}/><line x1="60" y1="0" x2="0" y2="110" ${S(3)}/><rect x="-80" y="108" width="160" height="14" rx="7" fill="${MC.cream}" ${S(4)}/><g transform="translate(0,104)">${book(0, 0, 0.5, 0)}</g></g>`;
    g += `<g transform="translate(220,0) rotate(${-a})"><line x1="-60" y1="0" x2="0" y2="110" ${S(3)}/><line x1="60" y1="0" x2="0" y2="110" ${S(3)}/><rect x="-80" y="108" width="160" height="14" rx="7" fill="${MC.cream}" ${S(4)}/><g transform="translate(0,108)">${fire(0, 0, 0.4, lt)}</g></g></g>`;
    g += at(lt, x(210.0), 220, 80, chip(0, 0, 'इतिहास', MC.blue, 26)) + at(lt, x(211.2), 740, 80, chip(0, 0, 'लोक कथा', MC.red, 26));
    if (lt > x(213.6)) g += at(lt, x(214), 480, 90, chip(0, 0, 'सच + लोक कथा', MC.green, 28));
    return g;
  }
  let g = ngd(lt) + glow(480, 300, 300, 0.5) + bonfire(lt, 480, FL + 30, 1.1);
  const k = prog(lt, x(218.8), x(220.3));
  g += `<g opacity="${0.45 * k}">${rider(DULLA, 480, FL - 120, 0.8, lt, false, { armF: -60, armB: -6 })}</g>`;
  g += ring(lt, 480, FL + 40, [MAN, WOMAN, MAN, WOMAN, MAN, WOMAN], 280, 34, 0.26, 0);
  g += at(lt, x(219.8), 480, 70, chip(0, 0, 'कभी नहीं भुलाया', MC.red, 26));
  return g;
}, 0.04);
// 24 the word Lohri: til + rori (222.5-238.0)
add(222.5, (lt, d, x) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  if (lt < x(229.0)) {
    g += at(lt, x(222.8), 480, 230, T(0, 0, 'लोहड़ी', 100, MC.red)) + at(lt, x(226.8), 480, 360, mark('?', MC.blue, 110));
    g += at(lt, x(224.2), 200, 400, chip(0, 0, 'नाम कहाँ से?', MC.green, 26));
    return g;
  }
  g += at(lt, x(229.3), 480, 80, chip(0, 0, 'तिलोड़ी', MC.red, 34));
  const heap = () => { let s = `<path d="M-90,60 Q0,-40 90,60Z" fill="#e8d8b0" ${S(3)}/>`; const r = rnd(9); for (let i = 0; i < 40; i++) s += `<ellipse cx="${((r() - 0.5) * 120).toFixed(0)}" cy="${(52 - r() * 40).toFixed(0)}" rx="6" ry="3.5" fill="${MC.cream}" ${S(1.5)} transform="rotate(${(r() * 180).toFixed(0)})"/>`; return s; };
  g += at(lt, x(232.05), 250, 340, heap() + chip(0, -80, 'तिल', MC.saffron, 30));
  g += at(lt, x(233.7), 700, 340, [-60, 0, 60].map((a, i) => `<rect x="${a - 36}" y="${60 - (i % 2) * 30}" width="72" height="50" rx="8" fill="#a8602a" ${S(4)}/>`).join('') + chip(0, -80, 'गुड़', MC.maroon, 30));
  g += at(lt, x(234.6), 480, 180, `<path d="M-30,0 L30,0 M0,-30 L0,30" stroke="${MC.red}" stroke-width="10" stroke-linecap="round"/>`);
  if (lt > x(237.11) - 2.4) g += bonfire(lt, 480, FL + 40, 0.8);
  return g;
});
// 25 three theories (238.0-253.0)
add(238.0, (lt, d, x) => {
  let g = bgPlain('#f2e6d0', '#b99a6a');
  // loom
  g += at(lt, x(238.3), 200, 330, `<rect x="-90" y="-120" width="180" height="170" fill="none" stroke="#6b4423" stroke-width="10"/>` + Array.from({ length: 9 }, (_, i) => `<line x1="${-80 + i * 20}" y1="-114" x2="${-80 + i * 20}" y2="44" stroke="${[MC.red, MC.blue, MC.saffron][i % 3]}" stroke-width="4"/>`).join('') + `<rect x="-86" y="${-40 + 10 * Math.sin(lt * 3)}" width="172" height="14" fill="#8a5a2b" ${S(3)}/>`);
  g += at(lt, x(239), 200, 130, chip(0, 0, 'कबीर की पत्नी लोई', MC.blue, 20));
  g += at(lt, x(242.9), 480, 330, bonfire(lt, 0, 40, 0.7) + lotus(0, 70, 0.5));
  g += at(lt, x(243.2), 520, 130, chip(0, 0, 'देवी सती', MC.red, 22));
  g += at(lt, x(247.6), 760, 330, `<g>` + [0, 1, 2].map((i) => `<g transform="translate(${(i - 1) * 70},${-10 * Math.abs(Math.sin(lt * 3 + i))})">${T(0, 0, '?', 90, [MC.red, MC.blue, MC.green][i])}</g>`).join('') + `</g>`);
  g += at(lt, x(250.3), 760, 130, chip(0, 0, 'सब मान्यताएँ', MC.green, 26));
  return g;
});
// 26 family and neighbours at the bonfire (253.0-262.0)
add(253.0, (lt, d, x) => {
  let g = ngd(lt) + hut(100, FL - 20, 1) + hut(860, FL - 20, 1) + glow(480, 300, 300, 0.55) + bonfire(lt, 480, FL + 30, 1.2) + notes(lt, 480, 190, 3);
  g += ring(lt, 480, FL + 40, [MAN, WOMAN, { ...MAN, uttariya: MC.red }, WOMAN, ELDER, { ...WOMAN, skin: '#e0a06a' }, MAN], 290, 36, 0.3, 0);
  g += at(lt, x(253.6), 480, 70, chip(0, 0, 'आज की लोहड़ी', MC.red, 28));
  return g;
}, 0.05);
// 27 offerings into the fire, parikrama, prasad (262.0-274.0)
add(262.0, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 280, 0.55) + bonfire(lt, 480, FL + 30, 1.1);
  const items: [number, string, string, number][] = [[262.6, 'तिल', '#f3e7cc', 150], [264.0, 'गुड़', '#a8602a', 150], [265.1, 'मूँगफली', '#c98a5a', 120], [266.8, 'रेवड़ी', '#e8c27a', 160], [268.0, 'पॉपकॉर्न', '#fff8ec', 130]];
  items.forEach(([t0, w, c, h], i) => { const tt = (lt - x(t0)) / 1.2; if (tt > 0 && tt < 1) g += `<circle cx="${lerp(140, 480, tt)}" cy="${lerp(FL - 80, FL - 20, tt) - h * Math.sin(Math.PI * tt)}" r="10" fill="${c}" ${S(2.5)}/>`; if (lt > x(t0) && lt < x(t0) + 2) g += at(lt, x(t0), 140 + (i % 2) * 90, 100 + (i % 3) * 40, chip(0, 0, w, MC.saffron, 22)); });
  g += fig(MAN, 130, FL + 50, 0.38, false, { armF: lt % 1.3 < 0.5 ? -100 : -40, armB: -20, eyeOpen: blink(lt) });
  g += ring(lt, 480, FL + 30, [WOMAN, MAN, WOMAN, MAN, WOMAN], 300, 38, 0.26, 0.5);
  if (lt > x(270.4)) g += at(lt, x(270.4), 800, 150, `<ellipse rx="70" ry="16" cy="30" fill="${MC.cream}" ${S(4)}/>` + [-30, 0, 30].map((a, i) => `<circle cx="${a}" cy="12" r="12" fill="${['#e8c27a', '#a8602a', '#fff8ec'][i]}" ${S(2)}/>`).join('')) + at(lt, x(270.6), 800, 80, chip(0, 0, 'प्रसाद', MC.green, 26));
  return g;
}, 0.04);
// 28 dhol, bhangra, giddha, food (274.0-283.0)
add(274.0, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 300, 0.5) + bonfire(lt, 480, FL + 30, 1.0);
  const hit = Math.abs(Math.sin(lt * 7));
  g += `<g transform="translate(160,${FL - 40})"><ellipse rx="${58 + 4 * hit}" ry="34" fill="${MC.red}" ${S(4)}/><rect x="-58" y="-34" width="116" height="68" fill="${MC.maroon}" ${S(4)}/><ellipse cx="-58" cy="0" rx="14" ry="34" fill="${MC.cream}" ${S(3)}/><ellipse cx="58" cy="0" rx="14" ry="34" fill="${MC.cream}" ${S(3)}/></g>`;
  g += fig({ ...MAN, uttariya: MC.red }, 160, FL + 50, 0.38, false, { armF: -50 + 30 * Math.sin(lt * 14), armB: -50 - 30 * Math.sin(lt * 14), headTilt: 6 });
  for (let i = 0; i < 3; i++) { const j = 12 * Math.abs(Math.sin(lt * 5 + i)); g += fig(i % 2 ? BOY : BOY2, 640 + i * 80, FL + 52 - j, 0.34, false, { armF: -130 + 30 * Math.sin(lt * 5 + i), armB: -130 - 30 * Math.sin(lt * 5 + i) }); }
  for (let i = 0; i < 2; i++) { const j = 8 * Math.abs(Math.sin(lt * 4 + i)); g += fig(i ? MUND : SUND, 300 + i * 80, FL + 56 - j, 0.32, false, { armF: -60, armB: -50 + 20 * Math.sin(lt * 4 + i), headTilt: 6 * Math.sin(lt * 4 + i) }); }
  g += at(lt, x(274.4), 160, 110, chip(0, 0, 'ढोल', MC.red, 28)) + at(lt, x(276.2), 700, 110, chip(0, 0, 'भाँगड़ा', MC.saffron, 26)) + at(lt, x(277.6), 380, 150, chip(0, 0, 'गिद्धा', MC.blue, 26));
  if (lt > x(279.3)) g += at(lt, x(279.3), 820, 150, `<ellipse rx="64" ry="18" cy="20" fill="${MC.cream}" ${S(4)}/><ellipse cx="-24" cy="6" rx="34" ry="12" fill="#f3c04a" ${S(3)}/><ellipse cx="26" cy="8" rx="30" ry="14" fill="#5a8a2a" ${S(3)}/>`) + at(lt, x(280.2), 820, 90, chip(0, 0, 'मक्के की रोटी, सरसों का साग', MC.green, 18));
  return g;
}, 0.04);
// 29 newly weds & newborn: first Lohri (283.0-290.2)
add(283.0, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 280, 0.5) + bonfire(lt, 480, FL + 30, 1.1);
  g += fig(BOY, 220, FL + 56, 0.44, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }) + fig(SUND, 300, FL + 60, 0.42, false, { armF: 8, armB: -6, headTilt: 8 });
  g += at(lt, x(283.4), 260, 110, chip(0, 0, 'नई शादी', MC.red, 26));
  g += fig(WOMAN, 700, FL + 56, 0.44, true, { armF: -70, armB: -60, eyeOpen: blink(lt) }) + at(lt, x(285.7), 650, FL - 130, baby(0, 0, 0.7)) + fig(MAN, 800, FL + 56, 0.44, true, P);
  g += at(lt, x(285.8), 720, 110, chip(0, 0, 'नया बच्चा', MC.blue, 26));
  g += at(lt, x(287.6), 480, 250, chip(0, 0, 'पहली लोहड़ी', MC.saffron, 36));
  return g;
}, 0.04);
// 30 daughters' Lohri (290.2-300.4)
add(290.2, (lt, d, x) => {
  let g = ngd(lt) + hut(110, FL - 20, 0.9) + glow(480, 300, 280, 0.5) + bonfire(lt, 480, FL + 30, 1.0);
  g += fig(WOMAN, 420, FL + 56, 0.46, false, { armF: -70, armB: -60, eyeOpen: blink(lt) }) + baby(468, FL - 140, 0.55) + fig(MAN, 330, FL + 56, 0.46, false, P);
  g += at(lt, x(290.8), 480, 80, chip(0, 0, 'बेटियों की लोहड़ी', MC.red, 30));
  g += fade(prog(lt, x(294.9), x(296)) * 0.9, fig(SUND, 700, FL + 56, 0.4, true, P) + fig(MUND, 780, FL + 60, 0.38, true, P));
  g += at(lt, x(296.9), 740, 210, heart(0, 0, 1.2)) + at(lt, x(298.2), 740, 330, chip(0, 0, 'सम्मान', MC.green, 28));
  g += `<g opacity="${prog(lt, x(297), x(298))}">${sparks(lt, 740, 290, 10, 9)}</g>`;
  return g;
}, 0.04);
// 31 children go door to door (300.4-315.2)
add(300.4, (lt, d, x) => {
  let g = bgPlain('#fbd9a0', '#b88a52') + hut(170, FL - 10, 1.2) + hut(520, FL - 10, 1.2) + hut(860, FL - 10, 1.2);
  const mv = ease(prog(lt, 0.4, 4.2));
  const kids = [MAN, WOMAN, BOY2, SUND];
  const gx = lerp(-40, 450, mv);
  kids.forEach((o, i) => { g += fig(o, gx - i * 55, FL + 62, 0.24, false, { armF: -50 + 15 * Math.sin(lt * 6 + i), armB: -30, legSwing: walk(lt, mv < 1, i), headTilt: 4 }); });
  g += notes(lt, gx - 80, FL - 90, 3);
  g += at(lt, x(302.8), 250, 100, chip(0, 0, 'बच्चों की टोली', MC.green, 26));
  g += fig(WOMAN, 590, FL + 40, 0.38, true, { armF: lt > x(307.9) ? -40 : 8, armB: -6, eyeOpen: blink(lt) });
  if (lt > x(307.9)) { for (let i = 0; i < 3; i++) { const k = ease(prog(lt, x(307.9) + i * 0.4, x(309.5) + i * 0.4)); g += `<g transform="translate(${lerp(560, 440 - i * 30, k)},${lerp(FL - 100, FL - 40, k) - 40 * Math.sin(Math.PI * k)})"><circle r="${i === 2 ? 9 : 11}" fill="${i === 2 ? MC.yellow : ['#e8c27a', '#a8602a'][i]}" ${S(2.5)}/></g>`; } g += at(lt, x(308.4), 700, 100, chip(0, 0, 'गुड़, रेवड़ी, पैसे', MC.saffron, 22)); }
  if (lt > x(311.92)) g += at(lt, x(311.92), 480, 190, `<circle r="40" fill="${MC.cream}" ${S(4)}/><path d="M-18,6 q18,-30 36,0 M-12,8 h24" fill="none" ${S(4)}/><path d="M-30,-30 L30,30" stroke="${MC.red}" stroke-width="8" stroke-linecap="round"/>`) + at(lt, x(312.4), 480, 280, chip(0, 0, 'ख़ाली हाथ नहीं', MC.red, 24));
  return g;
});
// 32 offering to Agni (315.2-326.5)
add(315.2, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 300, 0.6) + bonfire(lt, 480, FL + 40, 1.3);
  if (lt > x(318.1)) g += fade(prog(lt, x(318.1), x(319.4)) * 0.85, fig(AGNI, 480, FL - 110, 0.5, false, { armF: -60, armB: -40, eyeOpen: 1 }) + glow(480, 190, 120, 0.8));
  if (lt > x(318.1)) g += at(lt, x(318.7), 700, 110, chip(0, 0, 'अग्निदेव', MC.red, 30));
  g += fig(MAN, 190, FL + 56, 0.42, false, { armF: lt > x(321.4) ? -80 : 8, armB: -6, headTilt: lt > x(324.7) ? 22 : 0 }) + fig(WOMAN, 770, FL + 56, 0.42, true, { armF: lt > x(321.4) ? -80 : 8, armB: -6, headTilt: lt > x(324.7) ? 22 : 0 });
  if (lt > x(321.4)) for (let i = 0; i < 2; i++) { const k = ease(prog(lt, x(321.8) + i * 0.4, x(323.4) + i * 0.4)); g += `<g transform="translate(${lerp(i ? 740 : 220, 480, k)},${lerp(FL - 130, FL - 20, k) - 80 * Math.sin(Math.PI * k)})">${wheat(0, 20, 0.28, lt)}</g>`; }
  g += at(lt, x(321.6), 260, 180, chip(0, 0, 'पहली फ़सल', MC.yellow, 24));
  g += at(lt, x(324.8), 700, 180, chip(0, 0, 'धन्यवाद', MC.green, 26));
  return g;
}, 0.04);
// 33 winter leaves, long days, farmers' new year (326.5-334.0)
add(326.5, (lt, d, x) => {
  const up = ease(prog(lt, 0, 6));
  let g = `<rect width="${W}" height="${H}" fill="url(#warg)"/>` + sunFace(480, lerp(330, 130, up), 70) + glow(480, lerp(330, 130, up), 200 * up + 60, 0.5);
  g += `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="#9fc46a"/>`;
  for (let i = 0; i < 12; i++) g += wheat(40 + i * 80, FL - 6 + (i % 2) * 20, 0.7, lt, MC.yellow);
  g += fig(MAN, 300, FL + 54, 0.46, false, { armF: -100, armB: -100, eyeOpen: blink(lt) }) + fig(WOMAN, 380, FL + 58, 0.44, false, { armF: -100, armB: -100 });
  g += at(lt, x(327.2), 480, 60, chip(0, 0, 'लंबे दिन आ रहे हैं', MC.saffron, 26));
  g += at(lt, x(331.3), 700, 250, chip(0, 0, 'किसानों का नया साल', MC.green, 26));
  return g;
});
// 34 share wood; all sit together (334.0-349.3)
add(334.0, (lt, d, x) => {
  if (lt < x(340.2)) {
    let g = bgPlain('#fbd9a0', '#b88a52') + hut(120, FL - 10, 1) + hut(840, FL - 10, 1);
    const mv = ease(prog(lt, 0.2, 5.8));
    [WOMAN, MAN, SUND, MUND, WOMAN].forEach((o, i) => { const px = lerp(-80 - i * 70, 700 - i * 70, mv); g += fig(o, px, FL + 56, i < 2 ? 0.34 : 0.24, false, { armF: -60, armB: -50, legSwing: walk(lt, mv < 1, i) }) + logs(px + 22, FL - 70 + (i < 2 ? 6 : 0) + (i > 1 ? 40 : 0), i < 2 ? 0.5 : 0.35); });
    g += at(lt, x(335), 480, 80, chip(0, 0, 'घर-घर से लकड़ी', MC.green, 26));
    return g;
  }
  let g = ngd(lt) + glow(480, 300, 300, 0.55) + bonfire(lt, 480, FL + 30, 1.2);
  const rich = { ...MAN, crown: 'king', dhoti: MC.red, uttariya: MC.yellow };
  g += ring(lt, 480, FL + 40, [rich, WOMAN, { ...MAN, uttariya: '#8a6a4a', dhoti: '#d9c9a8' }, { ...WOMAN, skin: '#e0a06a' }, ELDER, { ...MAN, uttariya: '#8a6a4a', dhoti: '#d9c9a8' }, MAN], 290, 36, 0.3, 0);
  g += at(lt, x(340.5), 480, 70, chip(0, 0, 'मिल-बाँटकर', MC.saffron, 30));
  g += at(lt, x(345.0), 480, 160, chip(0, 0, 'अमीर हो या ग़रीब', MC.green, 24));
  return g;
}, 0.04);
// 35 remembered: Dulla behind the flames (349.3-359.2)
add(349.3, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 280, 300, 0.6) + bonfire(lt, 480, FL + 40, 1.2);
  const k = prog(lt, x(352.9), x(354.6));
  g = ngd(lt) + glow(480, 280, 300, 0.6) + `<g opacity="${0.6 * k}">${rider(DULLA, 480, FL + 10, 1.0, lt, false, { armF: -70, armB: -6 })}</g>` + bonfire(lt, 480, FL + 40, 1.2);
  g += fig(SUND, 250, FL + 56, 0.44, false, { armF: -90, armB: -90, eyeOpen: blink(lt) }) + fig(MUND, 710, FL + 60, 0.42, true, { armF: -90, armB: -90, eyeOpen: blink(lt + 0.5) });
  g += at(lt, x(352.93), 480, 70, chip(0, 0, 'दुल्ला भट्टी', MC.saffron, 30));
  g += at(lt, x(356.5), 480, 330, heart(0, 0, 1.2 + 0.08 * Math.sin(lt * 4)));
  return g;
}, 0.04);
// 36a sun changes course (359.2-363.2)
add(359.2, (lt, d, x) => {
  let g = `<rect width="${W}" height="${H}" fill="url(#warg)"/>` + sunFace(480, 150, 60 + 3 * Math.sin(lt * 2)) + glow(480, 150, 180, 0.5);
  g += `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  const k = ease(prog(lt, 0.2, 3.8));
  g += `<g transform="translate(${lerp(120, 560, k)},${lerp(FL + 30, FL - 80, k)}) rotate(${lerp(0, -12, k)})">${horse(250, 0, 0.65, lt)}${horse(310, -4, 0.62, lt + 1)}${chariot(0, 0, 0.8, lt)}</g>`;
  g += at(lt, x(360.6), 480, 90, chip(0, 0, 'सूरज बदलता है राह', MC.saffron, 28));
  return g;
});
// 36b Bhishma on arrow bed (363.2-367.7)
add(363.2, (lt, d, x) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + sunFace(800, 110, 44 + 2 * Math.sin(lt * 2)) + glow(800, 110, 140, 0.4);
  for (let i = 0; i < 16; i++) { const ax = 190 + i * 38; g += `<line x1="${ax - 14}" y1="${FL + 50}" x2="${ax + 12}" y2="${FL - 52}" stroke="#6b4423" stroke-width="5"/><path d="M${ax + 12},${FL - 52} l-8,12 l16,2Z" fill="#cfd6dc" ${S(2)}/>`; }
  g += lying(BHISHMA, 480, FL - 88, 0.52);
  g += at(lt, x(363.5), 320, 130, chip(0, 0, 'भीष्म पितामह', MC.saffron, 26));
  g += at(lt, x(365.9), 640, 190, chip(0, 0, 'उत्तरायण का इंतज़ार', MC.blue, 24));
  return g;
});
// 36c Surya visits Shani; next video card (367.7-375.0)
add(367.7, (lt, d, x) => {
  let g = bgPlain('#e9f0f8', '#c9a25e') + hut(780, FL - 10, 1.4) + at(lt, x(368), 780, 60, chip(0, 0, 'शनि का घर', MC.blue, 22));
  g += fig(SHANI, 780, FL + 54, 0.46, true, { armF: lt > x(371.2) ? -60 : 8, armB: -6, eyeOpen: blink(lt) });
  const sx = lerp(-60, 480, ease(prog(lt, x(368.2), x(371))));
  g += glow(sx, FL - 130, 110, 0.6) + fig(SURYA, sx, FL + 54, 0.46, false, { armF: 8, armB: -6, legSwing: walk(lt, sx < 478, 1), eyeOpen: blink(lt + 1) });
  g += at(lt, x(369.0), 200, 90, chip(0, 0, 'सूर्य देव', MC.saffron, 24));
  if (lt > x(371.74)) g += fade(prog(lt, x(371.74), x(372.4)), `<rect width="${W}" height="${H}" fill="${MC.maroon}" opacity=".92"/>`) + at(lt, x(372.0), 480, 190, chip(0, 0, 'अगला वीडियो', MC.yellow, 26)) + at(lt, x(372.4), 480, 290, T(0, 0, 'मकर संक्रांति', 66, MC.yellow));
  return g;
});
// 37 comment + greeting (375.0-384.5)
add(375.0, (lt, d, x) => {
  let g = ngd(lt) + glow(480, 300, 300, 0.55) + bonfire(lt, 480, FL + 30, 1.2);
  if (lt < x(379.74)) {
    g += ring(lt, 480, FL + 40, [MAN, WOMAN, MAN, WOMAN, MAN, WOMAN], 290, 36, 0.3, 0);
    g += at(lt, x(375.4), 480, 90, bubble(0, 0, 'आपके घर में लोहड़ी?', 400, 30));
    g += at(lt, x(378.2), 800, 200, chip(0, 0, 'कमेंट करें', MC.green, 26));
  } else {
    g += fig(MAN, 330, FL + 54, 0.5, false, { armF: -100, armB: -100, eyeOpen: blink(lt) }) + fig(WOMAN, 630, FL + 58, 0.48, true, { armF: -100, armB: -100, eyeOpen: blink(lt + 0.4) });
    g += at(lt, x(379.9), 480, 90, T(0, 0, 'सत श्री अकाल', 64, MC.yellow)) + at(lt, x(381), 480, 160, chip(0, 0, 'लोहड़ी की लख-लख बधाइयाँ', MC.red, 26));
  }
  return g;
}, 0.04);

const TOTAL_END = 384.5;
export const SCENES = SC.map(([s, fn, push], i) => ({ s, e: i + 1 < SC.length ? SC[i + 1][0] : TOTAL_END, C: mkS(s, fn, push) }));
