// @ts-nocheck
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp, palace, cloud, fire, lotus, moon, temple, chariot, horse, parrots, chip, pop, xdefs, rnd, blink, sway,
  KRISH, ARJ, VAIKH, MUNI, QUEEN, MAN, WOMAN, gandiva, conch, book, frame, bgCourt, bgBattle, bgForest, bgNight, bgPlain, bgWater, diya, bubble, couch,
} from './mb3';
import { RAM, SITA } from './mb2';

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
const at = (lt: number, t: number, x: number, y: number, inner: string, s = 1) => (lt > t ? `<g transform="translate(${x},${y}) scale(${pop(lt, t) * s})">${inner}</g>` : '');
const fade = (o: number, inner: string) => `<g opacity="${clamp(o).toFixed(3)}">${inner}</g>`;
const petals = (lt: number, seed = 3, n = 36) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const x0 = 30 + r() * 900, sp = 70 + r() * 70, ph = r() * 10; const y = ((lt * sp + r() * 500) % 460) + 20; const x = x0 + 20 * Math.sin(lt * 2 + ph); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="4" fill="${i % 3 ? MC.saffron : MC.pink}" ${S(1.2)} transform="rotate(${((lt * 120 + ph * 40) % 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return g; };
const ELDER = { ...MUNI, dhoti: MC.white, uttariya: MC.red };
const GRANNY = { female: true, skin: '#d9915a' };
const CHILD = { ...MAN, skin: '#f0c28e', dhoti: MC.yellow, uttariya: MC.red };
const GIRL = { female: true, skin: '#f0c28e' };

// ---- festival icons (no text) ----
const I: Record<string, (t?: number) => string> = {
  diya: (t = 0) => diya(0, 30, 1.6, t),
  colour: () => [[-30, 0, MC.pink], [20, -20, MC.yellow], [30, 25, MC.green], [-10, 30, MC.blue], [0, -5, MC.red]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="26" fill="${c}" ${S(3)}/>`).join(''),
  rakhi: () => `<path d="M-70,0 L70,0" stroke="${MC.red}" stroke-width="8"/><circle r="32" fill="${MC.yellow}" ${S(3)}/>` + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<ellipse cx="0" cy="-30" rx="9" ry="14" fill="${MC.saffron}" ${S(2)} transform="rotate(${a})"/>`).join('') + `<circle r="14" fill="${MC.red}" ${S(2)}/>`,
  kalash: () => `<path d="M-40,40 Q-56,0 -26,-20 L26,-20 Q56,0 40,40Z" fill="${MC.saffron}" ${S(3)}/><rect x="-22" y="-34" width="44" height="16" fill="${MC.red}" ${S(2)}/>` + [-24, -8, 8, 24].map((x) => `<path d="M${x},-34 Q${x - 10},-60 ${x},-70 Q${x + 10},-60 ${x},-34Z" fill="${MC.green}" ${S(2)}/>`).join('') + `<ellipse cx="0" cy="-66" rx="18" ry="16" fill="#b5651d" ${S(2)}/>`,
  garland: () => garland(0, 0, 40, 54),
  book: () => book(0, 0, 0.6),
  bonfire: (t = 0) => `<path d="M-50,40 L50,10 M-50,10 L50,40" ${S(10)}/>` + fire(0, 30, 0.6, t),
  kite: (t = 0) => `<g transform="rotate(${8 * Math.sin(t * 3)})"><path d="M0,-50 L40,0 L0,50 L-40,0Z" fill="${MC.red}" ${S(3)}/><path d="M0,-50 L0,50 M-40,0 L40,0" ${S(2)}/><path d="M0,50 q-10,20 6,30 q16,10 0,26" fill="none" stroke="${MC.yellow}" stroke-width="4"/></g>`,
  mustard: () => [[-30, 10], [0, -14], [30, 8], [-12, 30], [16, 32]].map(([x, y]) => `<g transform="translate(${x},${y})">` + [0, 90, 180, 270].map((a) => `<ellipse cx="0" cy="-10" rx="6" ry="10" fill="${MC.yellow}" ${S(2)} transform="rotate(${a})"/>`).join('') + `<circle r="4" fill="${MC.saffron}"/></g>`).join('') + `<path d="M0,40 L0,70" stroke="${MC.green}" stroke-width="5"/>`,
  trident: () => `<line x1="0" y1="60" x2="0" y2="-40" ${S(8)}/><path d="M-30,-20 Q-30,-56 0,-66 Q30,-56 30,-20 M0,-66 L0,-80" fill="none" ${S(6)}/><path d="M34,-90 A22,22 0 1,0 56,-60 A16,16 0 1,1 34,-90Z" fill="#fff6d8" ${S(2)}/>`,
  sunwater: () => `<rect x="-60" y="10" width="120" height="40" fill="${MC.blue}" ${S(2)}/>` + sunFace(0, -26, 24) + `<path d="M-50,30 q12,-6 24,0 t24,0 t24,0 t24,0" fill="none" stroke="#9cc3ea" stroke-width="3"/>`,
  hill: () => `<path d="M-70,30 Q0,-70 70,30Z" fill="#8a5a2b" ${S(3)}/><path d="M-40,10 l10,-14 M10,-10 l8,-14 M30,14 l8,-12" ${S(2)}/>`,
};
const card = (inner: string, w = 200, h = 170, bg = MC.cream) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="${bg}" ${S(4)}/><rect x="${-w / 2 + 8}" y="${-h / 2 + 8}" width="${w - 16}" height="${h - 16}" rx="10" fill="none" stroke="${MC.red}" stroke-width="2" stroke-dasharray="3 7"/>${inner}`;

// I1 diyas and festival symbols
const I1 = mk((lt) => {
  let g = bgNight(lt);
  for (let i = 0; i < 14; i++) { const a = i * Math.PI * 2 / 14, x = 480 + 330 * Math.cos(a), y = 260 + 190 * Math.sin(a); if (lt > 0.1 + i * 0.12) g += `<g opacity="${prog(lt, 0.1 + i * 0.12, 0.4 + i * 0.12)}">${diya(x, y + 20, 0.6, lt + i)}</g>`; }
  const items: [string, number, number, number][] = [['diya', 2.6, 330, 230], ['colour', 3.4, 480, 210], ['rakhi', 4.4, 630, 230], ['kalash', 6.1, 480, 340]];
  items.forEach(([k, t0, x, y]) => { g += at(lt, t0, x, y, I[k](lt), 0.75); });
  return g;
});
// I2 a child asks "why?"
const I2 = mk((lt) => {
  let g = bgPlain('#3a2030', '#5a2e1e') + diya(480, FL + 20, 1.1, lt);
  g += seated(ELDER, 300, FL - 20, 0.42, false, { armF: lt > 4.2 ? -60 + sway(lt, 6, 2) : 20, armB: 10, eyeOpen: blink(lt), headTilt: lt > 4 ? 8 : 0 }, {}, MC.saffron);
  g += fig(CHILD, 640, FL + 40, 0.3, true, { armF: lt > 2.2 ? -150 : 8, armB: -6, eyeOpen: blink(lt + 1) });
  g += at(lt, 2.4, 700, 170, `<circle r="44" fill="${MC.cream}" ${S(3)}/>${T(0, 18, '?', 58, MC.red, 'Hind')}`);
  if (lt > 4.3) g += at(lt, 4.3, 200, 140, `<g><circle cx="60" cy="60" r="8" fill="${MC.cream}" ${S(2)}/><ellipse rx="70" ry="48" fill="${MC.cream}" ${S(3)}/>${book(0, 0, 0.4)}</g>`);
  return g;
});
// I3 channel name
const I3 = mk((lt) => {
  let g = bgPlain(MC.red, MC.red) + `<rect x="24" y="24" width="912" height="492" fill="url(#dotsW)" opacity=".18"/>` + glow(480, 250, 260, 0.6);
  const u = ease(prog(lt, 0.1, 1.0));
  g += `<g transform="translate(480,240)"><rect x="${-330 * u}" y="-90" width="${660 * u}" height="180" fill="${MC.cream}" ${S(4)}/><rect x="${-330 * u - 16}" y="-100" width="28" height="200" rx="14" fill="${MC.maroon}" ${S(3)}/><rect x="${330 * u - 12}" y="-100" width="28" height="200" rx="14" fill="${MC.maroon}" ${S(3)}/>`;
  if (u > 0.95) g += `<g opacity="${prog(lt, 1.0, 1.5)}">${T(0, 22, 'पौराणिक कथाएँ', 70, MC.maroon)}${fish(-230, -55, 0.35)}<g transform="scale(-1,1)">${fish(-230, -55, 0.35, 0, MC.saffron)}</g>${lotus(-250, 75, 0.3)}${lotus(250, 75, 0.3)}</g>`;
  g += `</g>`;
  g += fig(ELDER, 120, FL + 70, 0.34, false, { armF: -100, armB: -100, eyeOpen: blink(lt) }) + fig(GRANNY, 840, FL + 70, 0.33, true, { armF: -100, armB: -100, eyeOpen: blink(lt + 0.5) });
  return g;
});
// I4 three kinds of stories: leela, devotee's test, king's vow
const I4 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + sunFace(480, 70, 30);
  g += at(lt, 2.2, 200, 280, card(`<g transform="translate(0,110)">${fig(KRISH, 0, 0, 0.26, false, { armF: -170, armB: -6, eyeOpen: blink(lt) })}</g><g transform="translate(22,${-80 + 4 * Math.sin(lt * 2)})">${I.hill()}</g>`, 240, 280));
  g += at(lt, 3.9, 480, 280, card(`${glow(0, 30, 80, 0.7)}${fire(0, 120, 0.9, lt)}<g transform="translate(0,110)">${fig(CHILD, 0, 0, 0.22, false, { armF: -100, armB: -100, eyeOpen: 0.1 })}</g>`, 240, 280));
  g += at(lt, 5.9, 760, 280, card(`<g transform="translate(-20,115)">${fig(VAIKH, 0, 0, 0.24, false, { armF: -100, armB: -100, eyeOpen: 0.1 })}</g>${diya(60, 120, 0.6, lt)}`, 240, 280));
  return g;
});
// I5 storyteller under banyan
const I5 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += `<path d="M120,${FL} C130,330 110,240 150,180 L180,180 C200,240 190,330 210,${FL}Z" fill="${MC.maroon}" ${S(4)}/>`;
  for (let i = 0; i < 7; i++) g += `<ellipse cx="${40 + i * 50}" cy="${110 + (i % 3) * 26}" rx="80" ry="50" fill="${i % 2 ? MC.leaf : MC.green}" ${S(3)}/>`;
  g += `<g transform="translate(660,170)"><rect x="-180" y="-110" width="360" height="200" fill="${MC.cream}" ${S(4)}/><g transform="translate(-100,80)">${fig(RAM, 0, 0, 0.24, false, { armF: 8, armB: -6 }, { garland: true })}</g><g transform="translate(-20,80)">${fig(SITA, 0, 0, 0.23, true, { armF: 8, armB: -6 })}</g><g transform="translate(110,70)">${chariot(0, 0, 0.3, lt)}</g></g>`;
  g += seated(ELDER, 260, FL - 10, 0.4, false, { armF: -70 + sway(lt, 10, 3), armB: 10, eyeOpen: blink(lt) }, {}, MC.saffron);
  [[480, CHILD], [580, GIRL], [680, { ...CHILD, skin: '#d9915a', dhoti: MC.blue }], [780, { ...GIRL, skin: '#e2a46e' }]].forEach(([x, o], i) => { g += seated(o, x, FL + 30, 0.24, true, { armF: 8, armB: -6, eyeOpen: blink(lt + i), headTilt: -6 + 2 * Math.sin(lt * 2 + i) }, {}, MC.yellow); });
  return g;
});
// I6 for first-timers and for memories
const I6 = mk((lt) => {
  let g = bgPlain('#3a2030', '#5a2e1e') + diya(480, FL + 30, 1.1, lt);
  g += seated(CHILD, 300, FL - 10, 0.3, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.yellow);
  g += seated(GIRL, 380, FL - 10, 0.28, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }, {}, MC.yellow);
  g += seated({ ...MAN, beard: true }, 620, FL - 20, 0.36, true, { armF: 8, armB: -6, eyeOpen: lt > 2.9 ? 0.1 : blink(lt) }, {}, MC.saffron);
  if (lt > 2.9) g += at(lt, 2.9, 790, 140, `<g><circle cx="-90" cy="80" r="10" fill="${MC.cream}" ${S(2)}/><ellipse rx="130" ry="85" fill="${MC.cream}" ${S(3)}/><g transform="translate(-40,70)">${fig(CHILD, 0, 0, 0.17, false, { armF: -150, armB: -6 })}</g><g transform="translate(45,-5) scale(.8)">${I.kite(lt)}</g></g>`);
  return g;
});
// I7 calendar wheel
const I7 = mk((lt) => {
  let g = bgNight(lt);
  const rot = lt * -22;
  g += `<g transform="translate(480,250) rotate(${rot})">`;
  for (let i = 0; i < 12; i++) { const a = i * 30 - 90; g += `<path d="M0,0 L${(200 * Math.cos((a - 15) * Math.PI / 180)).toFixed(1)},${(200 * Math.sin((a - 15) * Math.PI / 180)).toFixed(1)} A200,200 0 0,1 ${(200 * Math.cos((a + 15) * Math.PI / 180)).toFixed(1)},${(200 * Math.sin((a + 15) * Math.PI / 180)).toFixed(1)}Z" fill="${i % 2 ? MC.cream : '#f2d99c'}" ${S(2)}/>`; }
  const ic = ['garland', 'book', 'bonfire', 'kite', 'mustard', 'trident', 'colour', 'rakhi', 'kalash', 'diya', 'sunwater', 'hill'];
  ic.forEach((k, i) => { const a = (i * 30 - 90) * Math.PI / 180; if (lt > 0.3 + i * 0.25) g += `<g transform="translate(${(135 * Math.cos(a)).toFixed(1)},${(135 * Math.sin(a)).toFixed(1)}) rotate(${-rot}) scale(${0.36 * pop(lt, 0.3 + i * 0.25)})">${I[k](lt)}</g>`; });
  g += `</g><circle cx="480" cy="250" r="34" fill="${MC.maroon}" ${S(3)}/>` + sunFace(480, 250, 22);
  return g;
});
// I8 the festival line-up, timed to the names
const I8 = mk((lt) => {
  let g = bgPlain(MC.maroon, MC.maroon) + `<rect x="24" y="24" width="912" height="492" fill="url(#dotsY)" opacity=".18"/>`;
  const seq: [string, number][] = [['garland', 0.1], ['book', 1.9], ['bonfire', 3.6], ['kite', 4.6], ['mustard', 5.9], ['trident', 7.0], ['colour', 8.1], ['diya', 9.5], ['sunwater', 10.6]];
  seq.forEach(([k, t0], i) => { const x = 180 + (i % 5) * 150 + (i >= 5 ? 75 : 0), y = i < 5 ? 170 : 360; g += at(lt, t0, x, y, `<circle r="66" fill="${MC.cream}" ${S(4)}/><circle r="58" fill="none" stroke="${MC.red}" stroke-width="2" stroke-dasharray="3 6"/><g transform="scale(.62)">${I[k](lt)}</g>`); });
  return g;
});
// I9 each video leads to the next
const I9 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#f7e2b0');
  const off = -lerp(0, 260, ease(prog(lt, 0.5, 8)));
  const panels = [
    `<g transform="translate(-40,80)">${fig(RAM, 0, 0, 0.22, false, { armF: 8, armB: -6 }, { garland: true })}</g><g transform="translate(40,80)">${fig(SITA, 0, 0, 0.21, true, { armF: 8, armB: -6 })}</g>`,
    `<g transform="translate(0,80)">${chariot(-10, 0, 0.36, lt)}</g><g transform="translate(15,36)">${fig(KRISH, 0, 0, 0.13, false, { armF: -40, armB: -6 })}</g><g transform="translate(-30,36)">${fig(ARJ, 0, 0, 0.13, false, { armF: 8, armB: -6 })}</g>`,
    `<g transform="translate(-40,85)">${fig({ ...GIRL, skin: '#eab88a' }, 0, 0, 0.22, false, { armF: -100, armB: -100 })}</g><g transform="translate(40,85)">${fig(ELDER, 0, 0, 0.22, true, { armF: 8, armB: -6 })}</g>`,
    `${T(0, 28, '?', 90, MC.red, 'Hind')}`,
  ];
  g += `<g transform="translate(${off},0)">`;
  panels.forEach((p, i) => { const x = 200 + i * 260; g += at(lt, 0.2 + i * 0.6, x, 250, card(p, 210, 210)); if (i < 3) { const o = prog(lt, 0.6 + i * 0.6, 1 + i * 0.6); g += `<path d="M${x + 110},250 Q${x + 130},226 ${x + 150},250" fill="none" stroke="${MC.red}" stroke-width="5" opacity="${o}"/><path d="M${x + 152},252 l-14,-6 l4,14Z" fill="${MC.red}" opacity="${o}"/>`; } });
  g += `</g>`;
  return g;
});
// I10 scripture vs folk; one story, two versions
const I10 = mk((lt) => {
  let g = bgPlain('#2a1840', '#2a1840');
  if (lt < 5.7) {
    g += at(lt, 0.2, 280, 250, card(`${book(0, -20, 0.7)}${T(0, 95, 'ग्रंथ', 32, MC.maroon)}`, 260, 280));
    g += at(lt, 3.2, 680, 250, card(`<g transform="translate(0,40)">${seated(GRANNY, 0, 0, 0.22, false, { armF: -60 + sway(lt, 8, 3), armB: -6 }, {}, MC.saffron)}</g>${T(0, 112, 'लोक कथा', 28, MC.green)}`, 260, 280));
  } else {
    const sp = ease(prog(lt, 5.8, 7.2));
    g += at(lt, 5.8, 480, 110, `<circle r="44" fill="${MC.cream}" ${S(3)}/>${book(0, 0, 0.32)}`);
    g += `<path d="M480,156 L480,200 Q480,240 ${lerp(480, 300, sp)},270 M480,200 Q480,240 ${lerp(480, 660, sp)},270" fill="none" stroke="${MC.yellow}" stroke-width="6" stroke-linecap="round"/>`;
    g += at(lt, 6.8, 300, 360, card(`<g transform="translate(0,62)">${fig(RAM, 0, 0, 0.17, false, { armF: -82, armB: -6 })}</g>`, 180, 170));
    g += at(lt, 7.3, 660, 360, card(`<g transform="translate(-22,62)">${fig(RAM, 0, 0, 0.17, false, { armF: 8, armB: -6 })}</g><g transform="translate(30,62)">${fig(SITA, 0, 0, 0.16, true, { armF: 8, armB: -6 })}</g>`, 180, 170));
  }
  return g;
});
// I11 across the country
const I11 = mk((lt) => {
  const off = -lerp(0, 760, ease(prog(lt, 0, 5.8)));
  let g = `<rect width="${W}" height="${H}" fill="url(#warg)"/><rect x="0" y="${FL}" width="${W}" height="${H}" fill="#7a3a22"/>`;
  g += `<g transform="translate(${off},0)">`;
  g += temple(250, FL, 0.55);
  g += `<rect x="520" y="300" width="380" height="${FL - 300}" fill="${MC.blue}" ${S(3)}/>` + [0, 1, 2, 3, 4].map((i) => diya(560 + i * 75, 380, 0.5, lt + i)).join('');
  g += `<path d="M1000,${FL} L1000,250 L1110,190 L1220,250 L1220,${FL}Z" fill="#a0603a" ${S(4)}/><path d="M980,260 L1110,170 L1240,260Z" fill="#6b3a1a" ${S(4)}/>` + fire(1300, FL, 0.6, lt);
  g += `<g transform="translate(1500,${180 + 10 * Math.sin(lt * 2)})">${I.kite(lt)}</g><g transform="translate(1610,${130 + 10 * Math.cos(lt * 2)}) scale(.8)">${I.kite(lt + 1)}</g>` + fig(CHILD, 1440, FL + 40, 0.3, false, { armF: -150, armB: -6 });
  g += `</g>`;
  return g;
});
// I12 subscribe + bell
const I12 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(480, 220, 280, 0.6);
  g += fig(RAM, 210, FL + 40, 0.44, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }, { garland: true }) + fig(SITA, 340, FL + 40, 0.42, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.4) });
  g += fig(KRISH, 770, FL + 40, 0.46, true, { armF: -60, armB: -6, eyeOpen: blink(lt + 0.8) });
  g += at(lt, 3.3, 540, 150, `<rect x="-110" y="-40" width="220" height="80" rx="40" fill="${MC.red}" ${S(4)}/><path d="M-60,-20 L-60,20 L-26,0Z" fill="#fff"/><rect x="-10" y="-8" width="80" height="16" rx="8" fill="#fff"/>`);
  if (lt > 5.9) { const rg = lt < 8 ? 18 * Math.sin(lt * 22) : 0; g += at(lt, 5.9, 540, 300, `<g transform="rotate(${rg})"><path d="M-40,30 Q-40,-40 0,-44 Q40,-40 40,30Z" fill="${MC.yellow}" ${S(4)}/><rect x="-48" y="26" width="96" height="14" rx="7" fill="${MC.yellow}" ${S(3)}/><circle cx="0" cy="48" r="10" fill="${MC.saffron}" ${S(3)}/></g>` + (lt < 8 ? `<path d="M-70,-30 q-14,20 0,40 M70,-30 q14,20 0,40" fill="none" ${S(4)}/>` : '')); }
  return g;
});
// I13 tell us your favourite festival
const I13 = mk((lt) => {
  let g = bgPlain('#3a2030', '#5a2e1e') + diya(480, FL + 30, 1, lt);
  g += seated({ ...MAN, beard: true }, 250, FL - 20, 0.34, false, { armF: -40, armB: -6, eyeOpen: blink(lt) }, {}, MC.saffron) + seated(WOMAN, 380, FL - 20, 0.32, false, { armF: -40, armB: -6, eyeOpen: blink(lt + 1) }, {}, MC.saffron) + seated(GIRL, 315, FL + 40, 0.22, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.4) }, {}, MC.yellow);
  const k = ['diya', 'kite', 'colour', 'rakhi', 'sunwater', 'bonfire'][Math.floor(Math.max(0, lt - 1.8) / 0.9) % 6];
  g += at(lt, 1.8, 690, 190, `<ellipse rx="140" ry="100" fill="${MC.cream}" ${S(4)}/><path d="M-110,60 L-150,110 L-70,70Z" fill="${MC.cream}" ${S(4)}/><g transform="scale(.8)">${I[k](lt)}</g>`);
  return g;
});
// I14 first story: Vivah Panchami + end screen
const I14 = mk((lt) => {
  let g = bgCourt(lt);
  if (lt < 3.2) {
    g += `<rect x="560" y="${FL - 34}" width="300" height="30" fill="url(#tri)" ${S(3)}/><g transform="translate(710,${FL - 34})">${bowShape(260, 80)}</g>`;
    g += fig(RAM, 440, FL + 40, 0.46, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }) + fig(SITA, 250, FL + 40, 0.42, false, { armF: -55, armB: -10, eyeOpen: blink(lt + 0.5) }, { handItem: `<g transform="translate(9,-150)">${garland(0, 0, 30, 42)}</g>` });
    g += at(lt, 0.3, 480, 120, `<rect x="-150" y="-40" width="300" height="76" rx="18" fill="${MC.cream}" ${S(3)}/>${T(0, 14, 'विवाह पंचमी', 42, MC.red)}`);
  } else {
    g += fade(prog(lt, 3.2, 3.8), `<rect width="${W}" height="${H}" fill="${MC.maroon}"/><rect x="24" y="24" width="912" height="492" fill="url(#dotsY)" opacity=".18"/>`);
    g += at(lt, 3.4, 480, 80, T(0, 0, 'पौराणिक कथाएँ', 44, MC.yellow));
    g += at(lt, 3.6, 270, 300, `<rect x="-200" y="-112" width="400" height="224" rx="14" fill="none" stroke="${MC.yellow}" stroke-width="4" stroke-dasharray="14 10"/>`);
    g += at(lt, 3.8, 690, 300, `<rect x="-200" y="-112" width="400" height="224" rx="14" fill="none" stroke="${MC.yellow}" stroke-width="4" stroke-dasharray="14 10"/>`);
  }
  return g;
});

const LIST: [number, number, any][] = [
  [0, 7.4, I1], [7.4, 13.9, I2], [13.9, 17.9, I3], [17.9, 25.8, I4], [25.8, 33.6, I5], [33.6, 41.2, I6], [41.2, 50.4, I7],
  [50.4, 62.0, I8], [62.0, 70.9, I9], [70.9, 80.6, I10], [80.6, 86.4, I11], [86.4, 95.1, I12], [95.1, 102.6, I13], [102.6, 109.0, I14],
];
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
