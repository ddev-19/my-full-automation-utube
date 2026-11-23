// @ts-nocheck
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp, palace, cloud, fire, lotus, moon, temple, chariot, horse, parrots, chip, pop, xdefs, rnd, blink, sway, lotusInHand,
  KRISH, ARJ, YUDH, BHIMA, NAK, SAH, DURY, KAUR, BHISHMA, DRONA, DHRIT, SANJAY, VAIKH, MUNI, QUEEN, MAN, WOMAN,
  gandiva, conch, book, verse, frame, bgCourt, bgBattle, army, bgForest, bgNight, bgPlain, bgWater, diya, bubble, couch, lying, dice, badge,
} from './mb3';

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
const petals = (lt: number, seed = 3, n = 36) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const x0 = 30 + r() * 900, sp = 70 + r() * 70, ph = r() * 10; const y = ((lt * sp + r() * 500) % 460) + 20; const x = x0 + 20 * Math.sin(lt * 2 + ph); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="4" fill="${i % 3 ? MC.saffron : MC.pink}" ${S(1.2)} transform="rotate(${((lt * 120 + ph * 40) % 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return g; };
const PAND = [YUDH, BHIMA, ARJ, NAK, SAH];
const ratha = (x: number, y: number, s: number, lt: number) =>
  horse(x + 210 * s, y, 0.75 * s, lt) + chariot(x, y, s, lt) +
  fig(KRISH, x + 70 * s, y - 120 * s, 0.42 * s, false, { armF: -50, armB: -40, eyeOpen: blink(lt) }) +
  fig(ARJ, x - 40 * s, y - 120 * s, 0.44 * s, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.5) }, { handItem: gandiva });

// G1 two armies at dawn, conches
const G1 = mk((lt) => {
  let g = bgBattle(lt) + army(-1, lt) + army(1, lt);
  if (lt > 3.3) { const k = prog(lt, 3.3, 4.2); g += `<g transform="translate(300,230) scale(${0.6 + 0.4 * k})">${conch(0, 0, 1.6)}</g><g transform="translate(660,230) scale(${-(0.6 + 0.4 * k)},${0.6 + 0.4 * k})">${conch(0, 0, 1.6)}</g>`; for (let i = 0; i < 3; i++) { const r = ((lt - 3.3) * 120 + i * 40) % 140; g += `<circle cx="300" cy="230" r="${40 + r}" fill="none" stroke="${MC.cream}" stroke-width="3" opacity="${1 - r / 140}"/><circle cx="660" cy="230" r="${40 + r}" fill="none" stroke="${MC.cream}" stroke-width="3" opacity="${1 - r / 140}"/>`; } }
  return g;
});
// G2 chariot in the middle; Arjun lowers bow
const G2 = mk((lt) => {
  let g = bgBattle(lt) + army(-1, lt) + army(1, lt);
  const x = lerp(1200, 420, ease(prog(lt, 0, 3.6)));
  const low = ease(prog(lt, 4.4, 6.2));
  g += horse(x + 210 * 0.9, FL + 10, 0.68, lt) + chariot(x, FL + 10, 0.9, lt) + fig(KRISH, x + 63, FL - 98, 0.38, false, { armF: -50, armB: -40, eyeOpen: blink(lt) });
  g += fig(ARJ, x - 36, FL - 98, 0.4, false, { armF: lerp(-60, 30, low), armB: -6, headTilt: 12 * low, eyeOpen: blink(lt + 0.4) }, { handItem: gandiva });
  return g;
});
// G3 Arjun sits: "I will not fight"
const G3 = mk((lt) => {
  let g = bgBattle(lt) + army(-1, lt, FL - 40, 5) + army(1, lt, FL - 40, 5);
  g += horse(700, FL + 10, 0.75, 0) + chariot(480, FL + 10, 1.0, lt);
  g += fig(KRISH, 550, FL - 110, 0.44, false, { armF: -40, armB: -30, eyeOpen: blink(lt), headTilt: lt > 4 ? -10 : 0 });
  g += fig(ARJ, 420, FL - 70, 0.42, false, { armF: 30, armB: -6, headTilt: 22, eyeOpen: 0.3 });
  g += `<g transform="translate(250,${FL + 5}) rotate(10)">${bowShape(200, 56)}</g>`;
  g += at(lt, 1.3, 330, 120, bubble(0, 0, 'मैं नहीं लड़ूँगा', 280, 30));
  return g;
});
// G4 title
const G4 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + sunFace(480, 110, 48);
  g += book(480, 230, 1.1, 0.6 + 0.2 * Math.sin(lt * 2));
  g += fig(KRISH, 230, FL + 20, 0.46, false, { armF: -40 + sway(lt, 6), armB: -6, eyeOpen: blink(lt) });
  g += fig(ARJ, 730, FL + 20, 0.44, true, { armF: -100, armB: -100, eyeOpen: blink(lt + 0.6) });
  g += at(lt, 6.7, 480, 360, T(0, 0, 'गीता जयंती', 58, MC.red));
  return g;
});
// G5 Hastinapur: Pandavas vs Kauravas
const G5 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + palace(480, FL - 10, 0.7);
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'हस्तिनापुर', MC.red, 26));
  if (lt > 2.6) PAND.forEach((p, i) => { g += fade(prog(lt, 2.6 + i * 0.25, 3.0 + i * 0.25), fig(p, 70 + i * 62, FL + 60, 0.33, false, { armF: 8, armB: -6, eyeOpen: blink(lt + i) })); });
  if (lt > 4) for (let i = 0; i < 12; i++) { const x = 900 - (i % 6) * 42, y = FL + 50 + Math.floor(i / 6) * 30; g += fade(prog(lt, 4 + i * 0.08, 4.4 + i * 0.08), fig(i === 0 ? DURY : KAUR, x, y, 0.27, true, { armF: 8, armB: -6 })); }
  if (lt > 6.4) g += at(lt, 6.4, 225, 120, chip(0, 0, '५ पांडव', MC.green, 24)) + at(lt, 6.8, 790, 120, chip(0, 0, '१०० कौरव', '#5a2a6a', 24));
  if (lt > 8.9) g += at(lt, 8.9, 480, 150, chip(0, 0, 'चचेरे भाई', MC.red, 24));
  return g;
});
// G6 dice game
const G6 = mk((lt) => {
  let g = bgCourt(lt);
  g += fig(YUDH, 200, FL + 40, 0.42, false, { armF: -50, armB: -6, eyeOpen: blink(lt) }) + fig(ARJ, 110, FL + 50, 0.38, false, { armF: 8, armB: -6, headTilt: lt > 6 ? 14 : 0 });
  g += fig(DURY, 760, FL + 40, 0.42, true, { armF: lt > 2.5 ? -90 + sway(lt, 12, 5) : 8, armB: -6, eyeOpen: blink(lt) }) + fig(KAUR, 860, FL + 50, 0.38, true, { armF: -60, armB: -6 });
  g += dice(480, FL - 30, 1, lt);
  const items: [string, number][] = [['राज्य', 6.75], ['धन', 7.8], ['सम्मान', 9.0]];
  items.forEach(([w, t0], i) => { if (lt > t0 - 0.2) { const k = ease(prog(lt, t0 - 0.2, t0 + 0.8)); g += `<g transform="translate(${lerp(260, 700, k)},${200 - 120 * Math.sin(Math.PI * k) + i * 50})">${chip(0, 0, w, MC.saffron, 22)}</g>`; } });
  if (lt > 2.5) g += at(lt, 2.5, 480, 120, chip(0, 0, 'छल', MC.red, 26));
  return g;
});
// G7 exile
const G7 = mk((lt) => {
  let g = bgForest(lt);
  PAND.forEach((p, i) => { const x = lerp(-80 - i * 70, 620 - i * 70, ease(prog(lt, 0, 5.6))); g += fig(p, x, FL + 50, 0.34, false, { armF: 8, armB: -6, legSwing: walk(lt, lt < 5.6, i) }); });
  g += at(lt, 0.6, 480, 80, chip(0, 0, '१३ साल वनवास', MC.green, 26));
  g += at(lt, 3.0, 300, 150, chip(0, 0, '१२ साल जंगल', MC.saffron, 20)) + at(lt, 4.3, 660, 150, chip(0, 0, '१ साल छिपकर', MC.blue, 20));
  return g;
});
// G8 asking: kingdom, 5 villages, refusal
const G8 = mk((lt) => {
  let g = bgCourt(lt);
  g += fig(YUDH, 200, FL + 40, 0.44, false, { armF: lt > 3.7 ? -70 : -40, armB: -6, eyeOpen: blink(lt) }) + fig(BHIMA, 100, FL + 50, 0.4, false, { armF: 8, armB: -6 });
  g += fig(DURY, 760, FL + 40, 0.44, true, { armF: lt > 6.3 ? -90 + sway(lt, 20, 8) : 8, armB: -6, headTilt: lt > 6.3 ? -10 : 0, eyeOpen: blink(lt) });
  if (lt < 3.6) g += at(lt, 0.4, 330, 140, bubble(0, 0, 'हमारा राज्य?', 240, 26, INK));
  if (lt > 3.7) { for (let i = 0; i < 5; i++) g += at(lt, 3.8 + i * 0.15, 260 + i * 60, 160, `<path d="M-22,10 L0,-16 L22,10Z" fill="${MC.red}" ${S(2)}/><rect x="-18" y="10" width="36" height="22" fill="${MC.yellow}" ${S(2)}/>`); g += at(lt, 3.8, 380, 230, chip(0, 0, 'सिर्फ़ ५ गाँव', MC.green, 22)); }
  if (lt > 7.4) g += at(lt, 7.4, 690, 130, `<rect x="-150" y="-36" width="300" height="70" rx="20" fill="${MC.cream}" ${S(3)}/><line x1="-110" y1="0" x2="60" y2="0" stroke="${INK}" stroke-width="4"/><circle cx="-110" cy="0" r="6" fill="none" ${S(3)}/><circle cx="96" cy="0" r="22" fill="none" stroke="${MC.red}" stroke-width="6"/><line x1="80" y1="16" x2="112" y2="-16" stroke="${MC.red}" stroke-width="6"/>`);
  return g;
});
// G9 Krishna's peace mission
const G9 = mk((lt) => {
  let g = bgCourt(lt);
  const kx = lerp(-60, 340, ease(prog(lt, 0, 2.2)));
  g += fig(KRISH, kx, FL + 40, 0.46, false, { armF: lt > 2.4 ? -70 + sway(lt, 8, 3) : 8, armB: -6, legSwing: walk(lt, lt < 2.2), eyeOpen: blink(lt) });
  if (lt < 4.6) g += at(lt, 0.6, 330, 110, chip(0, 0, 'शांति का संदेश', MC.green, 24));
  const turn = lt > 3.3;
  g += fig(DURY, 640, FL + 40, 0.46, !turn, { armF: 8, armB: -6, eyeOpen: blink(lt) });
  if (lt > 4.6) g += fade(prog(lt, 4.6, 5.2), `<rect width="${W}" height="${H}" fill="${MC.maroon}" opacity=".35"/>`) + at(lt, 4.7, 490, 100, chip(0, 0, 'युद्ध तय', MC.red, 34));
  return g;
});
// G10 Dwarka: Krishna asleep, Duryodhan at head, Arjun at feet
const G10 = mk((lt) => {
  let g = bgPlain('#e9f0f8', '#c9a25e') + palace(830, FL - 20, 0.42) + at(lt, 0.2, 830, 70, chip(0, 0, 'द्वारका', MC.blue, 24));
  g += couch(430, FL - 10, 0.9) + lying(KRISH, 280, FL - 70, 0.36);
  const dx = lerp(-60, 150, ease(prog(lt, 1.0, 3.2))), ax = lerp(1020, 700, ease(prog(lt, 1.6, 4.0)));
  g += fig(DURY, dx, FL + 40, 0.42, false, { armF: 8, armB: -6, legSwing: walk(lt, lt < 3.2), eyeOpen: blink(lt) });
  g += fig(ARJ, ax, FL + 40, 0.42, true, { armF: lt > 4.2 ? -100 : 8, armB: lt > 4.2 ? -100 : -6, legSwing: walk(lt, lt < 4, 1), eyeOpen: blink(lt + 0.4) });
  g += at(lt, 1.6, 150, 110, chip(0, 0, 'सिरहाने', MC.red, 20)) + at(lt, 3.3, 700, 110, chip(0, 0, 'चरणों में', MC.green, 20));
  return g;
});
// G11 the choice
const G11 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += fig(KRISH, 480, FL + 40, 0.5, false, { armF: lt > 4.8 ? -90 : 8, armB: lt > 1.9 ? -90 : -6, eyeOpen: blink(lt) });
  if (lt > 1.9) g += fade(prog(lt, 1.9, 2.5), `<g transform="translate(-20,40)">${army(-1, lt, FL - 40, 6, MC.maroon)}</g>`) + at(lt, 2.0, 170, 110, chip(0, 0, 'नारायणी सेना', MC.maroon, 24));
  if (lt > 4.8) g += at(lt, 4.8, 780, 110, chip(0, 0, 'अकेले कृष्ण', MC.blue, 24)) + at(lt, 7.5, 780, 190, `<path d="M-30,-30 L30,30 M30,-30 L-30,30" stroke="${MC.red}" stroke-width="8" stroke-linecap="round"/>`) + at(lt, 7.5, 780, 250, chip(0, 0, 'हथियार नहीं', MC.red, 20));
  return g;
});
// G12 Duryodhan takes the army; Arjun chooses Krishna; charioteer
const G12 = mk((lt) => {
  let g = '';
  if (lt < 6.4) {
    g += bgPlain('#f7e2b0') + `<g transform="translate(-60,40)">${army(-1, lt, FL - 40, 4, MC.maroon)}</g>`;
    g += fig(DURY, 260, FL + 40, 0.46, false, { armF: -120 + sway(lt, 10, 6), armB: -120 + sway(lt, 10, 6), eyeOpen: blink(lt) });
    g += fig(KRISH, 520, FL + 40, 0.46, false, { armF: 8, armB: -6, eyeOpen: blink(lt) });
    g += fig(ARJ, 740, FL + 40, 0.46, true, { armF: lt > 5.3 ? -100 : 8, armB: lt > 5.3 ? -100 : -6, eyeOpen: blink(lt + 0.5) });
    g += at(lt, 0.4, 260, 110, chip(0, 0, 'सेना मेरी!', MC.maroon, 22));
    if (lt > 6.0) g += at(lt, 6.0, 740, 120, bubble(0, 0, 'मुझे सिर्फ़ आप', 250, 26));
  } else {
    g += bgBattle(lt) + ratha(380, FL + 30, 1, lt);
    g += at(lt, 7, 480, 80, chip(0, 0, 'कृष्ण — अर्जुन के सारथी', MC.blue, 26));
  }
  return g;
});
// G13 chariot rolls between the armies
const G13 = mk((lt) => {
  let g = bgBattle(lt) + army(-1, lt) + army(1, lt);
  const x = lerp(-300, 400, ease(prog(lt, 3.8, 10)));
  g += ratha(x, FL + 30, 0.9, lt);
  if (lt > 0.4 && lt < 6.5) g += at(lt, 0.4, 480, 110, bubble(0, 0, 'केशव, रथ बीच में ले चलिए', 380, 24, INK));
  return g;
});
// G14 Arjun sees Bhishma, Drona, family
const G14 = mk((lt) => {
  let g = bgBattle(lt) + army(1, lt, FL - 40, 6);
  g += fig(ARJ, 130, FL + 60, 0.5, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }, { handItem: gandiva });
  g += fade(prog(lt, 1.6, 2.2), fig(BHISHMA, 450, FL + 40, 0.48, true, { armF: 8, armB: -6, eyeOpen: blink(lt) })) + at(lt, 1.8, 450, 90, chip(0, 0, 'भीष्म पितामह', MC.saffron, 22));
  g += fade(prog(lt, 4.9, 5.5), fig(DRONA, 620, FL + 40, 0.46, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) })) + at(lt, 5.0, 640, 150, chip(0, 0, 'गुरु द्रोणाचार्य', MC.red, 22));
  if (lt > 6.6) [KAUR, DURY, KAUR].forEach((k, i) => { g += fade(prog(lt, 6.6 + i * 0.3, 7.0 + i * 0.3), fig(k, 760 + i * 60, FL + 50, 0.34, true, { armF: 8, armB: -6 })); });
  return g;
});
// G15 hands tremble, Gandiva slips, Arjun sits
const G15 = mk((lt) => {
  let g = bgBattle(lt, 'storm');
  const tr = lt > 0.2 && lt < 2 ? 3 * Math.sin(lt * 60) : 0;
  const slip = ease(prog(lt, 1.9, 3.2));
  const sit = ease(prog(lt, 9.2, 10.6));
  g += horse(700, FL + 10, 0.75, 0) + chariot(480, FL + 10, 1.0, lt);
  g += fig(KRISH, 550, FL - 110, 0.44, false, { armF: -30, armB: -20, eyeOpen: blink(lt), headTilt: -10 });
  g += `<g transform="translate(${tr},0)">${fig(ARJ, 420, FL - 110 + sit * 40, 0.44, false, { armF: lerp(-40, 40, slip), armB: -6, headTilt: 20 * Math.max(slip * 0.5, sit), eyeOpen: sit > 0.5 ? 0.3 : 1 })}</g>`;
  g += `<g transform="translate(${lerp(520, 250, slip)},${lerp(FL - 190, FL + 5, slip)}) rotate(${lerp(-90, 10, slip)})">${bowShape(200, 56)}</g>`;
  if (lt > 5.4 && lt < 11) g += at(lt, 5.4, 300, 110, bubble(0, 0, 'अपनों को मारकर राज्य नहीं चाहिए', 420, 22));
  return g;
});
// G16 Dhritarashtra & Sanjay
const G16 = mk((lt) => {
  let g = bgCourt(lt);
  g += seated(DHRIT, 270, FL - 40, 0.44, false, { armF: -40, armB: -6, eyeOpen: 0.08 }, {}, MC.maroon);
  g += at(lt, 0.6, 270, 110, chip(0, 0, 'धृतराष्ट्र', MC.maroon, 22));
  if (lt > 5.6) {
    g += fig(SANJAY, 520, FL + 40, 0.44, true, { armF: -60 + sway(lt, 8, 4), armB: -6, eyeOpen: 1 }) + at(lt, 5.8, 520, 110, chip(0, 0, 'संजय', MC.green, 22));
    const v = ease(prog(lt, 7.4, 8.4));
    g += glow(505, FL + 40 - 0.44 * 480, 50 * v, v);
    g += `<g transform="translate(780,240) scale(${v})"><rect x="-140" y="-100" width="280" height="200" rx="90" fill="#f7b56b" ${S(4)}/><circle cx="0" cy="-40" r="28" fill="#fff0c4"/><rect x="-138" y="40" width="276" height="50" fill="#5a2a1a" opacity=".6"/>${chariot(0, 80, 0.4, lt)}</g>`;
    g += at(lt, 7.6, 780, 380, chip(0, 0, 'दिव्य दृष्टि', MC.saffron, 22));
  }
  return g;
});
// G17 the first verse
const G17 = mk((lt) => {
  let g = bgPlain(MC.maroon, MC.maroon) + `<rect x="40" y="40" width="880" height="440" rx="20" fill="url(#dotsY)" opacity=".2"/>`;
  g += book(480, 150, 1, 0.8);
  g += at(lt, 3.8, 480, 320, verse(0, 0, 'धर्मक्षेत्रे कुरुक्षेत्रे…', 'गीता का पहला श्लोक', 560));
  return g;
});
// G18 Krishna teaches; 700 verses, 18 chapters
const G18 = mk((lt) => {
  let g = bgBattle(lt) + glow(330, 250, 220, 0.6);
  g += fig(KRISH, 330, FL + 50, 0.56, false, { armF: lt > 1 ? -90 + sway(lt, 6, 2) : 8, armB: -6, eyeOpen: blink(lt) });
  g += fig(ARJ, 600, FL + 60, 0.46, true, { armF: -100, armB: -100, headTilt: -8, eyeOpen: blink(lt + 0.7) });
  g += at(lt, 4.0, 800, 120, badge(0, 0, '७००', 'श्लोक', MC.red, 0.7)) + at(lt, 6.0, 800, 290, badge(0, 0, '१८', 'अध्याय', MC.blue, 0.7));
  return g;
});
// G19 lesson 1: the soul is eternal
const G19 = mk((lt) => {
  let g = bgPlain('#2a1840', '#2a1840') + at(lt, 0.2, 480, 70, chip(0, 0, '१. आत्मा अमर है', MC.saffron, 26));
  const looks = [{ ...MAN, skin: '#f0c28e', dhoti: MC.yellow }, { ...MAN, uttariya: MC.red }, { ...MAN, beard: true, bun: true, bunColor: '#f4f1ea', dhoti: MC.white }];
  const sc = [0.3, 0.46, 0.44], t0 = [0, 4.4, 6.4];
  const stage = lt < 4.4 ? 0 : lt < 6.4 ? 1 : 2;
  looks.forEach((o, i) => {
    const o2 = i === stage ? (i === 0 ? 1 : prog(lt, t0[i], t0[i] + 0.5)) : (i === stage - 1 ? 1 - prog(lt, t0[stage], t0[stage] + 0.5) : 0);
    if (o2 > 0) g += fade(o2, fig(o, 480, FL + 40, sc[i], false, { armF: 8, armB: -6, eyeOpen: blink(lt) }));
  });
  const fy = FL + 40 - 330 * lerp(sc[Math.max(0, stage - 1)], sc[stage], stage ? prog(lt, t0[stage], t0[stage] + 0.5) : 1);
  g += `<g transform="translate(480,${fy})">${glow(0, 0, 70, 0.9)}<path d="M0,-34 C14,-16 14,4 0,12 C-14,4 -14,-16 0,-34Z" fill="${MC.yellow}" ${S(2)}/></g>`;
  if (lt > 4.4) g += at(lt, 4.4, 230, 260, chip(0, 0, 'शरीर बदलता है', MC.green, 22)) + at(lt, 5.4, 730, 260, chip(0, 0, 'आत्मा वही', MC.yellow, 22));
  return g;
});
// G20 lesson 2: karma, not the fruit
const G20 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#9a6a3a') + sunFace(860, 90, 34) + at(lt, 0.2, 480, 60, chip(0, 0, '२. कर्म करो, फल की चिंता नहीं', MC.green, 24));
  if (lt < 7.3) g += at(lt, 4.0, 480, 220, verse(0, 0, 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', 'गीता २.४७', 680));
  else {
    for (let i = 0; i < 6; i++) g += `<path d="M0,${FL + 10 + i * 22} Q480,${FL - 10 + i * 26} 960,${FL + 10 + i * 22}" fill="none" stroke="#6b4423" stroke-width="5"/>`;
    g += fig(MAN, 430, FL + 40, 0.44, false, { armF: -50 + 20 * Math.sin(lt * 4), armB: -40 + 20 * Math.sin(lt * 4), eyeOpen: blink(lt), headTilt: 12 });
    g += `<g transform="translate(560,${FL})"><path d="M-80,-30 L40,-10" stroke="#8a5a2b" stroke-width="10" stroke-linecap="round"/><path d="M40,-10 L80,40 L48,40Z" fill="#cfd6dc" ${S(3)}/></g>`;
    g += tree(820, FL + 20, 0.5) + `<g transform="translate(760,${190 + 4 * Math.sin(lt * 2)})"><path d="M0,-30 C26,-30 34,10 0,30 C-34,10 -26,-30 0,-30Z" fill="${MC.saffron}" ${S(3)}/></g>`;
    g += at(lt, 10.9, 760, 120, chip(0, 0, 'फल', MC.saffron, 22)) + at(lt, 12.8, 300, 140, chip(0, 0, 'कर्म', MC.green, 24));
  }
  return g;
});
// G21 lesson 3: many paths
const G21 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#f7e2b0') + at(lt, 0.2, 480, 60, chip(0, 0, '३. कई रास्ते, एक मंज़िल', MC.blue, 24));
  g += glow(480, 150, 110 + 6 * Math.sin(lt * 3), 1) + `<circle cx="480" cy="150" r="26" fill="#fff6c8" ${S(3)}/>`;
  const paths: [number, string, string, number][] = [[180, 'कर्म', MC.green, 4.9], [480, 'ज्ञान', MC.blue, 6.4], [780, 'भक्ति', MC.red, 7.3]];
  paths.forEach(([x, w, c, t0], i) => {
    const o = prog(lt, t0, t0 + 0.5);
    g += fade(o, `<path d="M${x},${H} Q${(x + 480) / 2},330 480,180" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round" opacity=".5"/>`);
    if (o > 0) { const tt = clamp((lt - t0) / 6); const px = (1 - tt) * (1 - tt) * x + 2 * (1 - tt) * tt * ((x + 480) / 2) + tt * tt * 480, py = (1 - tt) * (1 - tt) * 520 + 2 * (1 - tt) * tt * 330 + tt * tt * 190; g += fig(MAN, px, py, 0.18, x > 480, { armF: 8, armB: -6, legSwing: walk(lt, tt < 1, i) }, { uttariya: c }); }
    g += at(lt, t0, x + (i === 0 ? 60 : i === 2 ? -60 : 0), 300 + (i === 1 ? 70 : 0), chip(0, 0, w, c, 24));
  });
  if (lt > 8.9) g += at(lt, 8.9, 480, 250, chip(0, 0, 'सच्चा मन', MC.saffron, 22));
  return g;
});
// G22 Arjun asks; Krishna gives divine eyes
const G22 = mk((lt) => {
  let g = bgBattle(lt) + glow(330, 250, 200, 0.5);
  g += fig(KRISH, 360, FL + 50, 0.54, false, { armF: lt > 5.6 ? -95 : 8, armB: -6, eyeOpen: blink(lt) });
  g += fig(ARJ, 600, FL + 60, 0.46, true, { armF: -100, armB: -100, eyeOpen: lt > 6.2 ? 0.1 : blink(lt) });
  if (lt > 1.6 && lt < 5.5) g += at(lt, 1.6, 640, 110, bubble(0, 0, 'आपका असली रूप', 260, 26));
  if (lt > 5.8) g += glow(590, FL + 60 - 0.46 * 480, 80 * prog(lt, 5.8, 6.6), 1);
  return g;
});
// G23 Vishwaroop
const G23 = mk((lt) => {
  let g = bgNight(lt, 'nightg');
  const grow = ease(prog(lt, 0, 2.5));
  const s = lerp(0.4, 0.82, grow), cx = 480, base = FL + 90;
  const sh: [number, number] = [cx, base - 400 * s];
  g += glow(cx, base - 330 * s, 330 * grow + 60, 0.7);
  for (let i = 0; i < 10; i++) { const a = lt * 0.4 + i * Math.PI / 5, r = 170 + (i % 3) * 50; const x = cx + r * Math.cos(a) * 1.4, y = base - 330 * s + r * Math.sin(a) * 0.7; if (lt > 4.6 + i * 0.25) g += fade(prog(lt, 4.6 + i * 0.25, 5 + i * 0.25), i % 3 === 0 ? sunFace(x, y, 18) : i % 3 === 1 ? moon(x, y, 14, 0.3) : `<circle cx="${x}" cy="${y}" r="12" fill="${[MC.blue, MC.green, MC.red][i % 3]}" ${S(2)}/>`); }
  for (let i = 0; i < 8; i++) { const ang = -150 + i * 300 / 7; const sym = [`<circle r="16" fill="${MC.yellow}" ${S(2)}/><circle r="7" fill="none" ${S(2)}/>`, conch(0, 0, 0.5), lotus(0, 10, 0.25), `<path d="M0,-22 L6,0 L0,22 L-6,0Z" fill="${MC.red}" ${S(2)}/>`][i % 4]; g += fade(grow, `<g transform="translate(${sh[0]},${sh[1]}) rotate(${ang})"><rect x="-10" y="0" width="20" height="${200 * s}" rx="8" fill="${KRISH.skin}" ${S(3)}/><g transform="translate(0,${210 * s}) rotate(${-ang})">${sym}</g></g>`); }
  g += fig(KRISH, cx, base, s, false, { armF: 8, armB: -6, eyeOpen: 1 });
  g += fade(prog(lt, 4.6, 5.4), `<g transform="translate(${cx},${base - 220 * s}) scale(${s})"><path d="M-46,0 L-20,-40 L0,-10 L20,-50 L46,0Z" fill="${MC.green}" ${S(3)}/><path d="M-46,12 Q0,30 46,12" fill="none" stroke="${MC.blue}" stroke-width="6"/></g>`);
  g += fig(ARJ, 830, FL + 70, 0.24, true, { armF: -100, armB: -100, headTilt: -16, eyeOpen: 1 });
  g += at(lt, 12.8, 160, 80, chip(0, 0, 'विश्वरूप दर्शन', MC.saffron, 24));
  return g;
}, 0.05);
// G24 delusion gone; Arjun picks up Gandiva
const G24 = mk((lt) => {
  let g = bgBattle(lt) + glow(480, 220, 260, 0.4 + 0.3 * prog(lt, 0, 3));
  const up = ease(prog(lt, 5.9, 7.2));
  g += horse(700, FL + 10, 0.75, 0) + chariot(480, FL + 10, 1.0, lt);
  g += fig(KRISH, 550, FL - 110, 0.44, false, { armF: -30, armB: -20, eyeOpen: blink(lt) });
  g += fig(ARJ, 420, FL - 70 - up * 40, 0.42, false, { armF: lerp(30, 8, up), armB: -6, headTilt: lerp(18, 0, ease(prog(lt, 0.5, 2))), eyeOpen: blink(lt) }, up > 0.5 ? { handItem: gandiva } : {});
  if (up <= 0.5) g += `<g transform="translate(${lerp(250, 400, up * 2)},${lerp(FL + 5, FL - 120, up * 2)}) rotate(10)">${bowShape(200, 56)}</g>`;
  g += at(lt, 2.9, 250, 110, bubble(0, 0, 'नष्टो मोहः', 220, 28, MC.maroon));
  return g;
});
// G25 calendar: Margashirsha, Ekadashi
const G25 = mk((lt) => {
  let g = bgNight(lt);
  const rot = lerp(0, -240, ease(prog(lt, 0.6, 4)));
  g += `<g transform="translate(300,230) rotate(${rot})">`;
  for (let i = 0; i < 12; i++) { const a = i * 30 - 90; g += `<path d="M0,0 L${(150 * Math.cos((a - 15) * Math.PI / 180)).toFixed(1)},${(150 * Math.sin((a - 15) * Math.PI / 180)).toFixed(1)} A150,150 0 0,1 ${(150 * Math.cos((a + 15) * Math.PI / 180)).toFixed(1)},${(150 * Math.sin((a + 15) * Math.PI / 180)).toFixed(1)}Z" fill="${i === 8 ? MC.saffron : i % 2 ? MC.cream : '#f2d99c'}" ${S(2)}/>`; }
  g += `</g><path d="M300,66 l-14,-26 l28,0Z" fill="${MC.red}" ${S(2)}/><circle cx="300" cy="230" r="20" fill="${MC.maroon}" ${S(3)}/>`;
  g += at(lt, 1.4, 300, 415, chip(0, 0, 'मार्गशीर्ष', MC.saffron, 26));
  g += moon(700, 220, 90, lerp(0.05, 0.38, ease(prog(lt, 2, 5)))) + at(lt, 4.2, 700, 370, chip(0, 0, 'शुक्ल एकादशी', MC.yellow, 24));
  return g;
});
// G26 "Among months I am Margashirsha"
const G26 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(200, 250, 180, 0.6);
  g += fig(KRISH, 200, FL + 40, 0.5, false, { armF: lt > 4.6 ? -110 : 8, armB: -6, eyeOpen: blink(lt) });
  g += at(lt, 1.4, 600, 110, chip(0, 0, 'गीता · अध्याय १०', MC.blue, 24));
  g += at(lt, 4.8, 600, 240, verse(0, 0, 'मासानां मार्गशीर्षोऽहम्', 'महीनों में मैं मार्गशीर्ष हूँ', 520));
  return g;
});
// G27 eighteen x3
const G27 = mk((lt) => {
  let g = bgPlain(MC.red, MC.red) + `<rect x="30" y="30" width="900" height="460" fill="url(#dotsW)" opacity=".18"/>`;
  g += at(lt, 0.1, 230, 200, badge(0, 0, '१८', 'पर्व', MC.maroon)) + at(lt, 2.0, 480, 200, badge(0, 0, '१८', 'दिन का युद्ध', MC.maroon)) + at(lt, 4.2, 730, 200, badge(0, 0, '१८', 'अध्याय', MC.maroon));
  return g;
});
// G28 Krishna tells Yudhishthira; King Vaikhanas
const G28 = mk((lt) => {
  let g = bgCourt(lt);
  if (lt < 7.4) {
    g += at(lt, 0.2, 480, 110, chip(0, 0, 'मोक्षदा एकादशी', MC.saffron, 28));
    g += fig(KRISH, 330, FL + 40, 0.46, false, { armF: lt > 3.8 ? -70 + sway(lt, 8, 3) : 8, armB: -6, eyeOpen: blink(lt) }) + fig(YUDH, 620, FL + 40, 0.46, true, { armF: -100, armB: -100, eyeOpen: blink(lt + 0.4) });
    g += at(lt, 4.0, 620, 180, chip(0, 0, 'युधिष्ठिर', MC.green, 20));
  } else {
    g += seated(VAIKH, 480, FL - 40, 0.46, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.red) + at(lt, 7.6, 480, 100, chip(0, 0, 'राजा वैखानस', MC.red, 26));
  }
  return g;
});
// G29 the dream
const G29 = mk((lt) => {
  let g = bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#3d2216"/>`;
  g += couch(330, FL - 10, 0.9) + lying(VAIKH, 210, FL - 70, 0.36);
  const b = ease(prog(lt, 0.4, 1.4));
  g += `<circle cx="380" cy="260" r="10" fill="${MC.cream}" opacity="${b}"/><circle cx="430" cy="220" r="16" fill="${MC.cream}" opacity="${b}"/>`;
  g += `<g transform="translate(650,200) scale(${b})"><ellipse rx="230" ry="150" fill="${MC.cream}" ${S(4)}/><ellipse rx="210" ry="130" fill="#3a1f24"/>` + [-120, -40, 40, 120].map((x, i) => `<path d="M${x},90 C${x + 20},${50 - 10 * Math.sin(lt * 8 + i)} ${x + 10},20 ${x},0 C${x - 10},20 ${x - 20},50 ${x},90Z" fill="${MC.saffron}" opacity=".8"/>`).join('') + `<g opacity=".85">${fig({ ...VAIKH, crown: 'none', beard: true, dhoti: MC.white }, 0, 100, 0.26, false, { armF: -110, armB: -110, headTilt: 15, eyeOpen: 0.2 })}</g></g>`;
  if (lt > 4.7) g += at(lt, 4.7, 150, 150, `<circle r="30" fill="${MC.cream}" ${S(3)}/>${T(0, 12, '!', 36, MC.red, 'Hind')}`);
  return g;
});
// G30 Parvata Muni's ashram
const G30 = mk((lt) => {
  let g = bgForest(lt);
  g += `<path d="M640,${FL - 20} L640,230 L760,170 L880,230 L880,${FL - 20}Z" fill="#a0603a" ${S(4)}/><path d="M620,240 L760,150 L900,240Z" fill="#6b3a1a" ${S(4)}/>`;
  g += seated(MUNI, 720, FL - 40, 0.42, true, { armF: lt > 5.4 ? -60 + sway(lt, 8, 3) : 30, armB: 20, eyeOpen: lt > 3.5 && lt < 5.2 ? 0.1 : 1 }, {}, MC.saffron);
  if (lt > 3.5 && lt < 5.4) g += glow(720, 200, 90, 0.8);
  const kx = lerp(-60, 380, ease(prog(lt, 0, 2.8)));
  const bowp = lt > 2.8 && lt < 4.2 ? Math.sin(Math.PI * prog(lt, 2.8, 4.2)) : 0;
  g += fig(VAIKH, kx, FL + 40, 0.42, false, { armF: lt > 2.8 ? -100 : 8, armB: lt > 2.8 ? -100 : -6, headTilt: 25 * bowp, legSwing: walk(lt, lt < 2.8), eyeOpen: blink(lt) });
  g += at(lt, 0.6, 720, 90, chip(0, 0, 'पर्वत मुनि', MC.green, 22));
  if (lt > 5.5) g += at(lt, 5.5, 440, 120, bubble(0, 0, 'मोक्षदा एकादशी का व्रत करो', 380, 24));
  return g;
});
// G31 the fast; father freed
const G31 = mk((lt) => {
  let g = bgPlain('#2a1840', '#3d2216');
  for (let i = 0; i < 5; i++) g += diya(150 + i * 115, FL + 30, 0.9, lt + i);
  g += fig(VAIKH, 230, FL - 10, 0.36, false, { armF: -100, armB: -100, eyeOpen: 0.1 }) + fig(QUEEN, 360, FL - 10, 0.34, false, { armF: -100, armB: -100, eyeOpen: 0.1 }) + fig({ ...VAIKH, crown: 'ram', skin: '#f0c28e' }, 480, FL - 10, 0.28, false, { armF: -100, armB: -100, eyeOpen: 0.1 });
  if (lt > 3) { const up = ease(prog(lt, 3.2, 8)); g += glow(760, lerp(380, 140, up), 90, prog(lt, 3, 4)) + fade(prog(lt, 3, 4) * (1 - prog(lt, 9.5, 11)), fig({ ...VAIKH, crown: 'none', beard: true, dhoti: MC.white }, 760, lerp(470, 240, up), 0.26, true, { armF: -110, armB: -110, eyeOpen: 1 })); g += `<g opacity="${prog(lt, 3, 4)}">${petals(lt, 31, 30)}</g>`; }
  g += at(lt, 6.4, 480, 70, chip(0, 0, 'मोक्षदा = मोक्ष देने वाली', MC.saffron, 26));
  return g;
});
// G32 Kurukshetra Brahma Sarovar festival
const G32 = mk((lt) => {
  let g = bgWater(lt) + temple(480, 250, 0.45);
  for (let i = 0; i < 14; i++) g += diya(60 + i * 64 + 10 * Math.sin(lt + i), 330 + (i % 3) * 40, 0.6, lt + i);
  g += at(lt, 0.2, 480, 50, chip(0, 0, 'कुरुक्षेत्र', MC.red, 26)) + at(lt, 3.9, 220, 130, chip(0, 0, 'ब्रह्म सरोवर', MC.blue, 22));
  g += at(lt, 4.3, 720, 120, chip(0, 0, 'अंतर्राष्ट्रीय गीता महोत्सव', MC.saffron, 19)) + at(lt, 8.6, 720, 180, chip(0, 0, '५–२५ दिसंबर २०२६', MC.green, 20));
  return g;
});
// G33 Jyotisar banyan
const G33 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += `<path d="M440,${FL} C450,330 430,240 470,180 L500,180 C520,240 510,330 530,${FL}Z" fill="${MC.maroon}" ${S(4)}/>`;
  for (let i = 0; i < 9; i++) { const x = 200 + i * 70, y = 120 + (i % 3) * 30; g += `<ellipse cx="${x}" cy="${y}" rx="90" ry="55" fill="${i % 2 ? MC.leaf : MC.green}" ${S(3)}/>`; }
  for (let i = 0; i < 8; i++) { const x = 230 + i * 70; g += `<path d="M${x},170 Q${x + 6 * Math.sin(lt + i)},250 ${x},${300 + (i % 3) * 30}" fill="none" stroke="${MC.maroon}" stroke-width="4"/>`; }
  g += horse(720, FL + 40, 0.5, 0) + chariot(580, FL + 40, 0.7, lt) + fig(KRISH, 630, FL - 44, 0.28, false, { armF: -60, armB: -6 }) + fig(ARJ, 550, FL - 44, 0.28, false, { armF: -100, armB: -100 });
  g += at(lt, 0.3, 170, 330, chip(0, 0, 'ज्योतिसर', MC.green, 26)) + at(lt, 4.6, 170, 390, chip(0, 0, 'गीता की जन्मस्थली (मान्यता)', MC.saffron, 18));
  return g;
});
// G34 people read the Gita together
const G34 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  const ppl = [MAN, WOMAN, { ...MAN, skin: '#f0c28e', uttariya: MC.red }, { ...WOMAN, skin: '#eab88a' }, { ...MAN, beard: true }];
  ppl.forEach((p, i) => { g += seated(p, 130 + i * 175, FL - 20, 0.3, false, { armF: -70, armB: -60, headTilt: 10 + 3 * Math.sin(lt * 2 + i), eyeOpen: blink(lt + i) }, {}, MC.saffron) + book(130 + i * 175 + 60, FL - 120, 0.32, 0.4); });
  if (lt > 2.9) g += at(lt, 2.9, 300, 90, chip(0, 0, 'एकादशी व्रत', MC.green, 22));
  if (lt > 4.8) g += at(lt, 5.0, 680, 90, chip(0, 0, 'गीता भेंट', MC.saffron, 22));
  return g;
});
// G35 message
const G35 = mk((lt) => {
  let g = bgPlain('#ffd59a', MC.saffron) + sunFace(480, 150, 56 + 3 * Math.sin(lt));
  g += fig(KRISH, 260, FL + 40, 0.5, false, { armF: -60, armB: -6, eyeOpen: blink(lt) }) + fig(ARJ, 700, FL + 40, 0.48, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.6) }, { handItem: gandiva });
  g += at(lt, 3.4, 480, 300, chip(0, 0, 'समझकर कर्म करो', MC.red, 28));
  return g;
});
// G36 next: Anasuya and three sages
const G36 = mk((lt) => {
  let g = bgForest(lt);
  g += `<path d="M90,${FL - 10} L90,230 L210,170 L330,230 L330,${FL - 10}Z" fill="#a0603a" ${S(4)}/><path d="M70,240 L210,150 L350,240Z" fill="#6b3a1a" ${S(4)}/><rect x="170" y="290" width="80" height="${FL - 300}" fill="#2b170a"/>`;
  g += fig(WOMAN, 300, FL + 40, 0.42, false, { armF: lt > 3 ? -100 : 8, armB: lt > 3 ? -100 : -6, eyeOpen: blink(lt) }, { skin: '#eab88a' });
  const sages = [MUNI, { ...MUNI, skin: '#2c5e9e', dhoti: MC.yellow }, { ...MUNI, skin: '#cfe0f0', dhoti: MC.white, uttariya: MC.blue }];
  sages.forEach((o, i) => { const x = lerp(1050 + i * 110, 560 + i * 110, ease(prog(lt, 2.4 + i * 0.3, 6 + i * 0.3))); g += fig(o, x, FL + 40, 0.4, true, { armF: 8, armB: -6, legSwing: walk(lt, lt < 6 + i * 0.3, i), eyeOpen: blink(lt + i) }); });
  g += at(lt, 4.6, 670, 100, chip(0, 0, 'ब्रह्मा · विष्णु · महेश', MC.blue, 22));
  g += at(lt, 7.2, 300, 110, chip(0, 0, 'माता अनसूया', MC.red, 22));
  if (lt > 11) g += fade(prog(lt, 11, 11.6), `<rect width="${W}" height="${H}" fill="${MC.maroon}" opacity=".9"/>`) + at(lt, 11.2, 480, 190, chip(0, 0, 'अगला वीडियो', MC.yellow, 26)) + at(lt, 11.6, 480, 290, T(0, 0, 'दत्तात्रेय जयंती', 60, MC.yellow));
  return g;
});
// G37 comment + Jai Shri Krishna
const G37 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(480, 230, 260, 0.6);
  if (lt < 5.2) {
    g += seated(MAN, 300, FL - 20, 0.36, false, { armF: -70, armB: -60, eyeOpen: blink(lt) }, {}, MC.saffron) + book(370, FL - 140, 0.36, 0.5);
    g += at(lt, 0.3, 640, 170, bubble(0, 0, 'आपका पसंदीदा विचार?', 340, 28));
  } else {
    g += fig(KRISH, 480, FL + 40, 0.56, false, { armF: -60, armB: -6, eyeOpen: blink(lt) }) + at(lt, 5.4, 480, 70, T(0, 0, 'जय श्री कृष्ण', 52, MC.red)) + petals(lt, 7, 30);
  }
  return g;
});

const LIST: [number, number, any][] = [
  [0, 8.0, G1], [8.0, 15.2, G2], [15.2, 21.5, G3], [21.5, 30.0, G4], [30.0, 41.0, G5], [41.0, 50.8, G6], [50.8, 56.8, G7], [56.8, 67.3, G8],
  [67.3, 74.2, G9], [74.2, 80.4, G10], [80.4, 90.1, G11], [90.1, 103.8, G12], [103.8, 115.8, G13], [115.8, 125.9, G14], [125.9, 137.9, G15],
  [137.9, 152.0, G16], [152.0, 158.2, G17], [158.2, 170.2, G18], [170.2, 180.8, G19], [180.8, 198.6, G20], [198.6, 210.0, G21],
  [210.0, 217.9, G22], [217.9, 233.0, G23], [233.0, 241.7, G24], [241.7, 252.0, G25], [252.0, 264.5, G26], [264.5, 270.9, G27],
  [270.9, 280.8, G28], [280.8, 286.8, G29], [286.8, 298.5, G30], [298.5, 310.2, G31], [310.2, 321.9, G32], [321.9, 329.6, G33],
  [329.6, 337.0, G34], [337.0, 342.6, G35], [342.6, 356.7, G36], [356.7, 365.0, G37],
];
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
