// @ts-nocheck
// Episode: महाशिवरात्रि — Madhubani animated scenes. Original artwork.
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp, palace, cloud, fire, lotus, moon, temple, horse, chip, pop, xdefs, rnd, blink, sway,
  MAN, WOMAN, QUEEN, MUNI, KRISH,
  book, frame, bgNight, bgPlain, bgWater, diya, bubble, badge,
} from './mb3';
import { baby, ox, JANAK } from './mb2';

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
const petals = (lt: number, seed = 3, n = 30) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const x0 = 30 + r() * 900, sp = 60 + r() * 60, ph = r() * 10; const y = ((lt * sp + r() * 500) % 460) + 20; const x = x0 + 20 * Math.sin(lt * 2 + ph); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="3.5" fill="${i % 2 ? MC.pink : MC.yellow}" stroke="${INK}" stroke-width="1" transform="rotate(${(lt * 90 + i * 40) % 360} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return g; };
const HF = { armF: -100, armB: -100 };
const night = (lt: number, ground = '#3b2a4f') => bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="${ground}"/><rect x="0" y="${FL - 4}" width="${W}" height="6" fill="${INK}"/>`;

// ---- cast ----
const BRAHMA = { skin: '#e8b070', crown: 'king', beard: true, dhoti: MC.white, uttariya: MC.red };
const VISHNU = { skin: '#2c5e9e', crown: 'ram', dhoti: MC.yellow, uttariya: MC.red };
const SHIVA = { skin: '#d6e4f2', bun: true, bunColor: INK, dhoti: MC.saffron, uttariya: MC.white };
const PARVATI = { female: true, skin: '#eab88a' };
const KAMA = { skin: MC.pink, crown: 'king', dhoti: MC.green, uttariya: MC.yellow };
const HUNTER = { skin: '#b9784a', beard: true, dhoti: '#6b4a2a', uttariya: '#3f6b3a' };
const GANA = [{ skin: '#7aa0a0', dhoti: MC.maroon, uttariya: MC.blue }, { skin: '#a66fa6', dhoti: MC.green, uttariya: MC.red }, { skin: '#8aa65a', dhoti: MC.blue, uttariya: MC.yellow }];
const PRAHLAD = { skin: '#e6a974', dhoti: MC.yellow, uttariya: MC.red };
const RADHA = { female: true, skin: '#f0c28e' };

// ---- props ----
const damru = `<g transform="translate(9,-185)"><path d="M-16,-24 L16,-24 L0,0 L16,24 L-16,24 L0,0Z" fill="${MC.yellow}" ${S(3)}/><line x1="0" y1="-24" x2="0" y2="24" ${S(2)}/></g>`;
const trishul = `<g transform="translate(9,-185)"><line x1="0" y1="-190" x2="0" y2="110" ${S(8)}/><line x1="0" y1="-190" x2="0" y2="110" stroke="#8a5a2b" stroke-width="4"/><path d="M-30,-170 C-34,-210 -22,-220 -22,-240 M30,-170 C34,-210 22,-220 22,-240 M0,-170 L0,-250 M-30,-170 L30,-170" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></g>`;
// Shiva: figure + crescent, Ganga, snake, ash lines, third eye
const shiva = (x: number, y: number, s: number, lt = 0, o: any = {}) => {
  const { flip = false, pose = {}, damruOn = false, trishulOn = false, blue = false, ash = true, ganga = true, snake = true, seat = false } = o;
  const acc =
    (ganga ? `<path d="M-14,-575 C-46,-540 -58,-470 -46,-408" fill="none" stroke="#8cc4f0" stroke-width="12" stroke-linecap="round"/><path d="M-14,-575 C-46,-540 -58,-470 -46,-408" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="6 12" stroke-dashoffset="${-lt * 40}"/>` : '') +
    `<g transform="translate(-4,-588) rotate(-20)"><path d="M0,-22 A24,24 0 1,0 0,22 A16,18 0 1,1 0,-22Z" fill="#fff6d8" ${S(3)}/></g>` +
    `<path d="M22,-514 L32,-496 L24,-476" fill="none" stroke="${MC.red}" stroke-width="6" stroke-linecap="round" transform="translate(0,-4)"/>` +
    (ash ? [-384, -366, -348].map((yy, i) => `<path d="M-36,${yy} Q0,${yy + 12} 36,${yy - 6}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`).join('') : '') +
    (snake ? `<path d="M-40,-410 C-20,-378 30,-378 50,-410" fill="none" stroke="#2d4f3a" stroke-width="14" stroke-linecap="round"/><path d="M-40,-410 C-20,-378 30,-378 50,-410" fill="none" stroke="${MC.yellow}" stroke-width="3" stroke-dasharray="4 10"/><circle cx="54" cy="-418" r="10" fill="#2d4f3a" ${S(2)}/>` : '') +
    (blue ? `<ellipse cx="4" cy="-408" rx="30" ry="12" fill="${MC.blue}" opacity=".85"/>` : '');
  const body = fig(SHIVA, 0, 0, 1, false, { eyeOpen: 1, ...pose }, { handItem: damruOn ? damru : trishulOn ? trishul : '' });
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">${body.replace(/^<g transform="translate\(0,0\) scale\(1,1\)">/, '<g>')}${acc}</g>`;
};
const pillar = (x: number, lt: number, k = 1, w = 48, deep = false) => {
  if (k <= 0.01) return '';
  const top = lerp(FL + 20, -20, ease(clamp(k)));
  let g = `<ellipse cx="${x}" cy="${(top + FL) / 2}" rx="${w * 3.4}" ry="${(FL - top) / 2 + 40}" fill="url(#fireg)" opacity=".5"/>`;
  const bot = deep ? H : FL + 20;
  g += `<path d="M${x - w},${bot} L${x - w},${top + 20} Q${x},${top - 24} ${x + w},${top + 20} L${x + w},${bot}Z" fill="${MC.saffron}" ${S(4)}/><rect x="${x - w * 0.5}" y="${top + 20}" width="${w}" height="${bot - top - 20}" fill="${MC.yellow}" opacity=".9"/>`;
  for (let i = 0; i < 12; i++) { const yy = top + 30 + i * ((FL - top) / 12), wob = 8 * Math.sin(lt * 6 + i); g += `<path d="M${x - w},${yy} q${-16 + wob},-14 ${-6},-30 q${14},14 ${6},30Z" fill="${MC.red}" ${S(2)}/><path d="M${x + w},${yy + 14} q${16 + wob},-14 6,-30 q${-14},14 ${-6},30Z" fill="${MC.red}" ${S(2)}/>`; }
  return g;
};
const lingam = (x: number, y: number, s = 1, gl = 0, lt = 0) =>
  `<g transform="translate(${x},${y}) scale(${s})">${gl ? glow(0, -70, 130, gl) : ''}<path d="M-100,0 L100,0 L84,-26 L-84,-26Z" fill="#6f6f78" ${S(4)}/><path d="M-50,-26 L50,-26 L46,-48 L-46,-48Z" fill="#8a8a94" ${S(3)}/><path d="M-40,-48 L-40,-108 Q0,-160 40,-108 L40,-48Z" fill="#2c2a33" ${S(4)}/><path d="M-30,-96 L30,-96 M-30,-84 L30,-84 M-30,-72 L30,-72" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="0" cy="-118" r="${5 + Math.sin(lt * 4)}" fill="${MC.red}"/></g>`;
const belLeaf = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` + [-38, 0, 38].map((a, i) => `<path d="M0,0 C-14,-14 -12,-40 0,-52 C12,-40 14,-14 0,0Z" fill="${i === 1 ? MC.leaf : MC.green}" ${S(3)} transform="rotate(${a})"/>`).join('') + `</g>`;
const swan = (x: number, y: number, s: number, lt: number, flip = false) => {
  const fl = 22 * Math.sin(lt * 9);
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><path d="M-20,-20 C-70,-70 -40,-110 0,-60Z" fill="#fff" ${S(4)} transform="rotate(${-fl} -10 -30)"/><ellipse cx="0" cy="0" rx="72" ry="34" fill="#fff" ${S(4)}/><path d="M50,-14 C80,-40 70,-90 86,-102" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M50,-14 C80,-40 70,-90 86,-102" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/><circle cx="92" cy="-106" r="14" fill="#fff" ${S(3)}/><path d="M102,-108 L124,-100 L102,-96Z" fill="${MC.saffron}" ${S(3)}/><circle cx="94" cy="-110" r="3" fill="${INK}"/><path d="M-30,-8 C-10,-60 10,-80 30,-8" fill="#fff" ${S(3)} transform="rotate(${fl} 0 -8)"/><path d="M82,-118 L90,-134 L98,-118Z" fill="${MC.yellow}" ${S(2)}/></g>`;
};
const boar = (x: number, y: number, s: number, lt: number, flip = false) =>
  `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="-50" rx="80" ry="44" fill="#3d4f6e" ${S(4)}/>` + [-50, -20, 28, 54].map((lx, i) => `<rect x="${lx - 9}" y="-26" width="18" height="${34 + 5 * Math.sin(lt * 10 + i)}" fill="#3d4f6e" ${S(3)}/>`).join('') + `<path d="M-60,-86 l10,-18 l10,16 l10,-18 l10,16 l10,-18 l10,16" fill="none" ${S(4)}/><path d="M62,-84 C100,-96 124,-70 122,-50 C120,-30 90,-30 64,-40Z" fill="#3d4f6e" ${S(4)}/><path d="M104,-48 C112,-76 124,-76 128,-60" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="88" cy="-66" r="4" fill="#fff"/><path d="M60,-92 L66,-112 L82,-94Z" fill="#3d4f6e" ${S(3)}/><path d="M-80,-60 q-24,-4 -20,-26" fill="none" ${S(5)}/></g>`;
const ketaki = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` + [0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="0" cy="-22" rx="11" ry="24" fill="#fffbe8" ${S(3)} transform="rotate(${a})"/>`).join('') + `<circle r="9" fill="${MC.yellow}" ${S(2)}/></g>`;
const calPage = (x: number, y: number, s: number, head: string, big: string, small = '') =>
  `<g transform="translate(${x},${y}) scale(${s})"><rect x="-110" y="-120" width="220" height="240" rx="12" fill="${MC.cream}" ${S(5)}/><rect x="-110" y="-120" width="220" height="56" rx="12" fill="${MC.red}" ${S(5)}/><circle cx="-60" cy="-124" r="7" fill="${INK}"/><circle cx="60" cy="-124" r="7" fill="${INK}"/><text y="-82" text-anchor="middle" font-family="NSB" font-weight="800" font-size="30" fill="${MC.cream}">${head}</text><text y="${small ? 30 : 46}" text-anchor="middle" font-family="NSB" font-weight="800" font-size="${big.length > 3 ? 54 : 84}" fill="${MC.maroon}">${big}</text>${small ? `<text y="86" text-anchor="middle" font-family="Hind" font-weight="700" font-size="30" fill="${INK}">${small}</text>` : ''}</g>`;
const himalaya = () => `<rect width="${W}" height="${H}" fill="#cfe6f6"/><path d="M-20,${FL} L180,150 L300,260 L440,100 L620,270 L760,170 L980,${FL}Z" fill="#fff" ${S(5)}/><path d="M180,150 L140,210 L180,200 L210,230Z M440,100 L400,170 L440,160 L470,190Z M760,170 L720,230 L760,220 L790,245Z" fill="#a9c8e6" ${S(3)}/><rect x="0" y="${FL}" width="${W}" height="${H}" fill="#9ab88a"/><rect x="0" y="${FL - 4}" width="${W}" height="6" fill="${INK}"/>`;
const lota = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M-40,-60 Q-60,0 -34,40 L34,40 Q60,0 40,-60Z" fill="#c9843a" ${S(4)}/><rect x="-26" y="-76" width="52" height="20" rx="6" fill="#c9843a" ${S(4)}/><path d="M34,-30 Q80,-40 70,-70 L56,-60" fill="none" stroke="#c9843a" stroke-width="12" stroke-linecap="round"/><path d="M-30,-20 Q0,-6 30,-20" fill="none" stroke="${MC.yellow}" stroke-width="5"/></g>`;

const st = FL + 40; // standing baseline
// A dark night, argument begins
const A = mk((lt) => {
  let g = night(lt);
  g += fig(BRAHMA, 230, st, 0.42, false, { armF: -50 + sway(lt, 14, 4), armB: -6, eyeOpen: blink(lt) }) + fig(VISHNU, 730, st, 0.42, true, { armF: -50 + sway(lt, 14, 4.5), armB: -6, eyeOpen: blink(lt + 1) });
  if (lt > 4.2) g += glow(480, 300, 30 + 40 * prog(lt, 4.2, 6.2), 0.9 * prog(lt, 4.2, 5));
  g += fade(1 - prog(lt, 0, 0.8), `<rect width="${W}" height="${H}" fill="#000"/>`);
  return g;
});
// B pillar of fire rises
const B = mk((lt) => {
  const k = prog(lt, 0.2, 3.6);
  let g = night(lt) + pillar(480, lt, k);
  const rec = ease(prog(lt, 1.5, 3));
  g += fig(BRAHMA, lerp(230, 150, rec), st, 0.42, false, { armF: lt > 2 ? -100 : -50, armB: lt > 2 ? -100 : -6, eyeOpen: blink(lt) }) + fig(VISHNU, lerp(730, 810, rec), st, 0.42, true, { armF: lt > 2 ? -100 : -50, armB: lt > 2 ? -100 : -6, eyeOpen: blink(lt + 1) });
  g += at(lt, 5.4, 480, 80, chip(0, 0, 'अनंत अग्नि-स्तंभ', MC.red, 26));
  return g;
});
// C both go silent; pillar becomes lingam
const C = mk((lt) => {
  let g = night(lt) + pillar(480, lt, 1 - 0.7 * ease(prog(lt, 5.4, 7.2)));
  g += fig(BRAHMA, 150, st, 0.42, false, { ...HF, headTilt: 10 * prog(lt, 0.5, 2), eyeOpen: blink(lt) }) + fig(VISHNU, 810, st, 0.42, true, { ...HF, headTilt: 10 * prog(lt, 0.5, 2), eyeOpen: blink(lt + 1) });
  if (lt > 5.4) g += fade(prog(lt, 5.8, 6.8), lingam(480, FL + 20, 1.5, 0.9, lt));
  return g;
});
// D title
const D = mk((lt) => {
  let g = night(lt) + glow(480, 250, 280 + 14 * Math.sin(lt * 3), 0.7) + lingam(480, FL + 10, 1.9, 0.5, lt);
  g += moon(160, 120, 44, 0.3) + belLeaf(300, 330, 1.1, -20) + belLeaf(660, 330, 1.1, 20);
  if (lt > 3.6) g += at(lt, 3.8, 480, 118, T(0, 0, 'महाशिवरात्रि', 70, MC.yellow));
  return g;
});
// E1 every month
const E1 = mk((lt) => {
  let g = night(lt);
  for (let i = 0; i < 12; i++) { const k = pop(lt, 3.0 + i * 0.35, 0.4); if (k > 0.01) g += `<g transform="translate(${70 + i * 76},300) scale(${k})">${moon(0, 0, 26, 0.15 + (i % 4) * 0.15)}</g>`; }
  g += at(lt, 0.5, 480, 160, moon(0, 0, 60, 0.35)) + at(lt, 0.4, 480, 60, chip(0, 0, 'शिव की रात', MC.maroon, 28));
  g += at(lt, 3.1, 480, 400, chip(0, 0, 'हर महीने · मासिक शिवरात्रि', MC.blue, 24));
  return g;
});
// E2 the biggest night
const E2 = mk((lt) => {
  let g = night(lt);
  for (let i = 0; i < 12; i++) { const hi = i === 8; const x = hi ? lerp(70 + i * 76, 480, ease(prog(lt, 2.4, 4.0))) : 70 + i * 76; const y = hi ? lerp(300, 240, ease(prog(lt, 2.4, 4.0))) : 300; const sc = hi ? 1 + 2.6 * ease(prog(lt, 2.4, 4.0)) : 1; g += `<g opacity="${hi ? 1 : 1 - 0.7 * prog(lt, 2.4, 3.4)}" transform="translate(${x},${y}) scale(${sc})">${moon(0, 0, 26, 0.15 + (i % 4) * 0.15)}</g>`; }
  g += glow(480, 240, 60 + 140 * prog(lt, 3, 5), 0.7 * prog(lt, 2.8, 4.5));
  g += at(lt, 5.0, 480, 420, chip(0, 0, 'महा + शिवरात्रि', MC.red, 30));
  return g;
});
// F two calendars
const F = mk((lt) => {
  let g = bgPlain('#f7e2b0') + moon(480, 120, 50, 0.3);
  g += at(lt, 0.4, 480, 50, chip(0, 0, 'वही रात', MC.maroon, 24));
  g += at(lt, 3.0, 250, 300, calPage(0, 0, 1, 'उत्तर भारत', 'फाल्गुन'));
  g += at(lt, 3.6, 710, 300, calPage(0, 0, 1, 'दक्षिण / पश्चिम', 'माघ'));
  if (lt > 7) g += at(lt, 7.1, 480, 300, `<text text-anchor="middle" font-family="NSB" font-weight="800" font-size="90" fill="${MC.red}">=</text>`);
  return g;
});
// G Shiva portrait
const G = mk((lt) => {
  let g = bgPlain('#14102e', '#2a2346').replace(/#14102e/, '#1d1a3e') + glow(480, 250, 260, 0.45);
  g += `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#2a2346"/>`;
  g += shiva(480, st + 10, 0.62, lt, { damruOn: lt > 7.2, ash: lt > 4.2, snake: lt > 6.2, ganga: lt > 5.0, pose: { armF: lt > 7.2 ? -70 + 14 * Math.sin(lt * 12) : 8, armB: -6, eyeOpen: blink(lt) } });
  g += at(lt, 0.3, 480, 50, chip(0, 0, 'महादेव', MC.yellow, 30));
  g += at(lt, 10.0, 480, 480, chip(0, 0, 'सबसे साधारण, सबसे गहरे', MC.yellow, 26));
  return g;
});
// H the date this year
const H1 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + at(lt, 0.3, 300, 250, calPage(0, 0, 1.3, 'मार्च', '६', 'शनिवार'));
  g += at(lt, 1.6, 300, 450, chip(0, 0, '२०२७', MC.red, 30));
  if (lt > 5.0) { g += fade(prog(lt, 5.0, 5.8), `<rect x="560" y="60" width="340" height="360" rx="20" fill="#1d1a3e" ${S(5)}/>` + moon(730, 150, 44, 0.3) + `<circle cx="640" cy="100" r="3" fill="#fff"/><circle cx="820" cy="190" r="3" fill="#fff"/><circle cx="660" cy="220" r="2" fill="#fff"/>` + lingam(730, 400, 0.9, 0.6, lt) + diya(640, 405, 0.7, lt) + diya(820, 405, 0.7, lt + 1)); g += at(lt, 5.4, 730, 450, chip(0, 0, 'आधी रात के बाद पूजा', MC.maroon, 22)); }
  return g;
});
// I Shiva not bound to one form; books
const I = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + glow(480, 260, 250, 0.5);
  if (lt < 7.4) {
    const ph = Math.floor(lt / 2.1) % 2, ft = (lt % 2.1) / 2.1; const o = ft < 0.15 ? ft / 0.15 : ft > 0.85 ? (1 - ft) / 0.15 : 1;
    g += fade(o, ph ? lingam(480, st, 1.8, 0.4, lt) : shiva(480, st + 10, 0.58, lt, { pose: { armF: 8, armB: -6 } }));
  } else {
    g += lingam(480, FL + 10, 1.0, 0.6, lt);
    g += at(lt, 7.5, 200, 270, book(0, 0, 1.0, 0.4)) + at(lt, 7.9, 760, 270, book(0, 0, 1.0, 0.4));
    g += at(lt, 7.9, 200, 400, chip(0, 0, 'शिव पुराण', MC.red, 26)) + at(lt, 8.3, 760, 400, chip(0, 0, 'लिंग पुराण', MC.red, 26));
  }
  return g;
});
// J1 Brahma claims
const J1 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + `<rect x="0" y="0" width="${W}" height="${H}" fill="#14102e" opacity="${0.55 * prog(lt, 0, 3)}"/>`;
  g += fig(BRAHMA, 230, st, 0.46, false, { armF: lt > 3.8 ? -80 + sway(lt, 10, 5) : -20, armB: -6, eyeOpen: blink(lt) }) + fig(VISHNU, 730, st, 0.46, true, { armF: -30 + sway(lt, 6, 3), armB: -6, eyeOpen: blink(lt + 1) });
  g += at(lt, 0.4, 480, 90, chip(0, 0, 'कौन बड़ा?', MC.red, 34));
  g += at(lt, 3.9, 110, 300, lotus(0, 0, 0.8, 1)) + at(lt, 4.2, 110, 340, chip(0, 0, 'सृष्टि', MC.green, 22));
  return g;
});
// J2 Vishnu claims; pillar appears
const J2 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + `<rect x="0" y="0" width="${W}" height="${H}" fill="#14102e" opacity="${0.55 + 0.4 * prog(lt, 5.5, 6.5)}"/>`;
  g += fig(BRAHMA, 230, st, 0.46, false, { armF: -80 + sway(lt, 10, 5), armB: -6, eyeOpen: blink(lt) }) + fig(VISHNU, 730, st, 0.46, true, { armF: lt > 1.2 ? -80 + sway(lt, 10, 5) : -30, armB: -6, eyeOpen: blink(lt + 1) });
  g += at(lt, 0.1, 110, 300, lotus(0, 0, 0.8, 1));
  g += at(lt, 1.4, 850, 300, `<g>${glow(0, 0, 60, 0.6)}<path d="M-36,0 C-40,-30 0,-40 36,-20 C54,-10 46,10 28,12 C0,16 -28,20 -36,0Z" fill="#fff8ec" ${S(3)}/></g>`) + at(lt, 1.6, 850, 350, chip(0, 0, 'पालन', MC.blue, 22));
  if (lt > 5.4) g += pillar(480, lt, prog(lt, 5.4, 7.4));
  return g;
});
// K swan up, boar down
const K = mk((lt) => {
  let g = night(lt, '#14102e') + pillar(480, lt, 1, 48, true);
  g += `<rect x="0" y="${FL + 22}" width="432" height="${H}" fill="#3b2a4f"/><rect x="528" y="${FL + 22}" width="${W}" height="${H}" fill="#3b2a4f"/>`;
  g += at(lt, 0.4, 480, 80, chip(0, 0, 'छोर ढूँढो!', MC.red, 28));
  const sy = lerp(FL - 40, 90, ease(prog(lt, 5.8, 11.8))), by = lerp(FL + 20, 520, ease(prog(lt, 8.0, 11.8)));
  g += swan(lerp(300, 330, prog(lt, 5.8, 11.8)), sy, 1.0, lt) + `<g transform="translate(${300 + 8},${sy - 54}) scale(.7)"><path d="M-26,0 L26,0 L18,-26 L-18,-26Z" fill="${MC.yellow}" ${S(3)}/></g>`;
  g += boar(lerp(680, 640, prog(lt, 8, 11.8)), by, 1.0, lt, true);
  if (lt > 8) for (let i = 0; i < 8; i++) { const k = ((lt * 2 + i * 0.37) % 1); g += `<circle cx="${650 + 30 * Math.sin(i * 2) + 30 * k * (i % 2 ? 1 : -1)}" cy="${by - 20 - 40 * k}" r="${4 + 3 * (1 - k)}" fill="#a07a52" opacity="${1 - k}"/>`; }
  return g;
});
// L time passes, Vishnu tired
const L = mk((lt) => {
  let g = night(lt, '#14102e') + pillar(480, lt, 1, 48, true);
  g += `<rect x="0" y="${FL + 22}" width="432" height="${H}" fill="#3b2a4f"/><rect x="528" y="${FL + 22}" width="${W}" height="${H}" fill="#3b2a4f"/>`;
  g += swan(300 + 20 * Math.sin(lt * 0.8), 150 + 14 * Math.sin(lt * 1.3), 0.8, lt);
  const tired = lt > 5.0;
  if (!tired) g += boar(660, 480 + 10 * Math.sin(lt * 2), 0.9, lt, true);
  else g += fig(VISHNU, 680, 538, 0.3, true, { armF: 30, armB: 20, headTilt: 20, eyeOpen: 0.25 }) + at(lt, 5.4, 760, 470, `<g>${[0, 1, 2].map((i) => `<path d="M${i * 14},0 q-6,10 0,16 q6,-6 0,-16Z" fill="#8cc4f0" ${S(2)}/>`).join('')}</g>`);
  const sa = lt * 0.6; g += `<g transform="translate(70,70)">${sunFace(0, 0, 28 * (Math.cos(sa) > 0 ? 1 : 0.01))}</g><g transform="translate(70,70)" opacity="${Math.cos(sa) > 0 ? 0 : 1}">${moon(0, 0, 28, 0.3)}</g>`;
  g += at(lt, 0.4, 480, 40, chip(0, 0, 'बहुत समय बीता', MC.maroon, 24));
  return g;
});
// M1 Ketaki falls
const M1 = mk((lt) => {
  let g = night(lt) + pillar(480, lt, 1);
  const fy = lerp(20, 250, ease(prog(lt, 0.4, 3.6)));
  const down = ease(prog(lt, 4.2, 7.4));
  g += swan(220, lerp(250, FL - 40, down) + 6 * Math.sin(lt * 2), 1.0, lt * (1 - down * 0.8));
  if (lt < 3.7) g += ketaki(lerp(300, 240, ease(prog(lt, 0.4, 3.6))) + 10 * Math.sin(lt * 4), fy, 1, lt * 80);
  else g += ketaki(250, 215 + (FL - 40 - 250) * down, 1, 10);
  g += at(lt, 4.2, 200, 90, chip(0, 0, 'गवाह?', MC.red, 24));
  return g;
});
// M2 Brahma lies; pillar cracks
const M2 = mk((lt) => {
  let g = night(lt) + pillar(480, lt, 1);
  g += fig(BRAHMA, 200, st, 0.46, false, { armF: -85 + sway(lt, 6, 5), armB: -6, eyeOpen: blink(lt) }, { handItem: `<g transform="translate(9,-185) scale(0.9)">${ketaki(0, -10, 1, 0)}</g>` });
  g += fig(VISHNU, 780, st, 0.46, true, { armF: 8, armB: -6, headTilt: 12, eyeOpen: blink(lt + 1) });
  g += at(lt, 0.8, 200, 110, bubble(0, 0, 'देख लिया!', 200, 26, INK));
  if (lt > 4.6) { const k = prog(lt, 4.6, 6.2); g += `<path d="M480,60 L462,140 L496,200 L468,270 L494,340 L480,${FL}" fill="none" stroke="#fff" stroke-width="${6 + 6 * k}" stroke-linecap="round" opacity="${k}"/>` + glow(480, 240, 80 + 160 * k, 0.9 * k); }
  return g;
});
// N Shiva appears
const N = mk((lt) => {
  let g = night(lt);
  const k = ease(prog(lt, 0.2, 1.6));
  g += glow(480, 250, 120 + 220 * k, 0.9);
  g += `<g transform="translate(${-70 * k},0)"><path d="M${430},${FL + 20} L430,60 Q460,20 480,40 L480,${FL + 20}Z" fill="${MC.saffron}" ${S(4)}/></g><g transform="translate(${70 * k},0)"><path d="M480,${FL + 20} L480,40 Q500,20 530,60 L530,${FL + 20}Z" fill="${MC.saffron}" ${S(4)}/></g>`;
  if (lt > 1.2) g += `<g transform="translate(480,${st}) scale(${pop(lt, 1.2, 0.6)}) translate(-480,${-st})">${shiva(480, st + 10, 0.56, lt, { pose: { armF: lt > 5.6 ? -70 : 8, armB: -6, eyeOpen: blink(lt) } })}</g>`;
  g += fig(VISHNU, 190, st, 0.42, false, { armF: lt > 2.2 ? -100 : 8, armB: lt > 2.2 ? -100 : -6, headTilt: lt > 2.2 ? 8 : 0, eyeOpen: blink(lt) });
  g += fig(BRAHMA, 780, st, 0.42, true, { armF: 8, armB: -6, headTilt: lt > 6.2 ? 24 : 0, eyeOpen: lt > 6.2 ? 0.3 : 1 });
  g += at(lt, 2.4, 190, 190, chip(0, 0, 'विष्णु: हार मानी', MC.blue, 20)) + at(lt, 6.4, 780, 190, chip(0, 0, 'झूठ पर नाराज़ी', MC.red, 20));
  return g;
});
// O Lingodbhava
const O = mk((lt) => {
  let g = night(lt) + glow(480, 250, 280, 0.6);
  g += `<path d="M390,${FL + 20} L390,120 Q480,10 570,120 L570,${FL + 20}Z" fill="${MC.saffron}" ${S(5)}/><path d="M410,${FL + 20} L410,130 Q480,40 550,130 L550,${FL + 20}Z" fill="${MC.yellow}" opacity=".85"/>`;
  g += shiva(480, st + 10, 0.55, lt, { trishulOn: true, pose: { armF: 8, armB: -6, eyeOpen: blink(lt) } });
  g += swan(220, 110 + 6 * Math.sin(lt * 2), 0.6, lt) + boar(240, 470, 0.6, lt, true) + moon(800, 110, 40, 0.3);
  g += at(lt, 1.5, 770, 260, chip(0, 0, 'माघ कृष्ण चतुर्दशी', MC.maroon, 22)) + at(lt, 4.6, 480, 66, chip(0, 0, 'लिंगोद्भव', MC.red, 34));
  return g;
});
// P Shiva-Parvati wedding night; Shiva meditating after Sati
const P = mk((lt) => {
  let g;
  if (lt < 6.9) {
    g = bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#3b2a4f"/>` + glow(480, 250, 240, 0.5) + moon(480, 90, 40, 0.3);
    g += shiva(360, st + 10, 0.5, lt, { pose: { armF: 8, armB: -6, eyeOpen: blink(lt) } }) + fig(PARVATI, 600, st, 0.44, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) });
    g += at(lt, 2.0, 480, 190, `<g transform="translate(0,0)">${garland(0, 0, 60, 40)}</g>`);
    g += at(lt, 0.3, 480, 40, chip(0, 0, 'माना जाता है: विवाह की रात', MC.maroon, 22)) + petals(lt, 2, 14);
  } else {
    g = himalaya() + `<g transform="translate(0,0)">${seated(SHIVA, 480, FL - 50, 0.5, false, { armF: 24, armB: 20, eyeOpen: 0.1 }, {}, '#c9a25e')}</g>`;
    g = g.replace('</g></g>', '</g></g>');
    g += `<path d="M430,150 C440,170 520,170 530,150" fill="none" stroke="${MC.red}" stroke-width="0"/>` + at(lt, 7.1, 480, 60, chip(0, 0, 'गहरा ध्यान', MC.blue, 28));
  }
  return g;
});
// Q Parvati born in Himalaya; tapasya
const Q = mk((lt) => {
  let g = himalaya();
  if (lt < 4.2) {
    g += `<g transform="translate(0,0)">${palace(780, FL - 6, 0.5)}</g>`;
    g += fig(JANAK, 330, st, 0.44, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }) + fig(QUEEN, 460, st, 0.44, true, { armF: -60, armB: -6, eyeOpen: blink(lt + 1) });
    g += at(lt, 1.0, 380, 300, baby(0, 0, 0.7));
    g += at(lt, 0.3, 480, 60, chip(0, 0, 'हिमालय के घर जन्म', MC.maroon, 26));
  } else {
    g = g.replace(/^/, '') + glow(480, 330, 150, 0.5);
    g += seated(PARVATI, 480, FL - 40, 0.5, false, { armF: -80, armB: -80, eyeOpen: 0.15 }, {}, '#c9a25e');
    [200, 760].forEach((x, i) => { g += fire(x, FL + 20, 0.5, lt + i); });
    g += at(lt, 4.5, 480, 60, chip(0, 0, 'कठोर तपस्या', MC.red, 30)) + at(lt, 6, 480, 100, `<g>${[0, 1, 2].map((i) => `<circle cx="${(i - 1) * 30}" cy="${-i * 6}" r="5" fill="${MC.yellow}"/>`).join('')}</g>`);
  }
  return g;
});
// R Kamadeva
const R = mk((lt) => {
  let g = himalaya() + seated(SHIVA, 700, FL - 50, 0.5, false, { armF: 24, armB: 20, eyeOpen: lt > 5.3 ? 1 : 0.1 }, {}, '#c9a25e').replace(/(<g>)/, '$1');
  const kx = lerp(-80, 240, ease(prog(lt, 0.4, 3.0)));
  const burnt = lt > 6.3;
  if (!burnt) {
    g += fig(KAMA, kx, st, 0.42, false, { armF: lt > 3.4 ? -70 : 8, armB: -6, legSwing: walk(lt, lt < 3.0), eyeOpen: blink(lt) }, { handItem: `<g transform="translate(9,-185) rotate(90)">${bowShape(150, 50)}</g>` });
    if (lt > 3.6 && lt < 5.3) { const k = prog(lt, 3.6, 5.2); g += `<g transform="translate(${lerp(300, 620, k)},${300 - 20 * Math.sin(k * 3)})"><path d="M-20,0 L20,0" stroke="${INK}" stroke-width="4"/><path d="M20,0 l-8,-6 v12Z" fill="${MC.red}"/></g>` + petals(lt, 5, 10); }
  } else {
    g += `<g transform="translate(${kx},${FL + 40})"><path d="M-60,0 Q-40,-50 0,-60 Q40,-50 60,0Z" fill="#8a8a90" ${S(4)}/></g>`;
  }
  if (lt > 5.3) { const k = prog(lt, 5.3, 6.1); g += `<path d="M700,${FL - 170} L${lerp(700, kx, k)},${lerp(FL - 170, FL - 30, k)}" stroke="${MC.red}" stroke-width="${8 * (1 - k * 0.5)}" stroke-linecap="round"/>` + glow(700, FL - 170, 50 * k, 1); }
  g += at(lt, 0.6, 240, 60, chip(0, 0, 'कामदेव', MC.pink, 26)) + (burnt ? at(lt, 6.4, kx, FL - 40, chip(0, 0, 'राख', MC.maroon, 22)) : '');
  return g;
});
// S harder tapasya, then baraat
const S1 = mk((lt) => {
  let g;
  if (lt < 3.5) {
    g = himalaya() + glow(480, 330, 170, 0.6) + seated(PARVATI, 480, FL - 40, 0.5, false, { armF: -90, armB: -90, eyeOpen: 0.15 }, {}, '#c9a25e');
    g += `<g transform="translate(760,150)">${sunFace(0, 0, 44)}</g>` + at(lt, 0.5, 480, 60, chip(0, 0, 'बिना अन्न-जल', MC.red, 28));
    g += `<g transform="translate(250,${FL + 10})"><path d="M-30,-20 Q0,10 30,-20Z" fill="#c9a25e" ${S(3)}/></g>`;
  } else {
    g = bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#3b2a4f"/>`;
    const x = lerp(-80, 440, prog(lt, 3.5, 7.8));
    g += ox(x, FL + 40, 0.6, lt) + fig(SHIVA, x, FL - 56, 0.34, false, { armF: 8, armB: -6 });
    GANA.forEach((o, i) => { g += fig(o, x + 190 + i * 80, st, 0.36, false, { armF: lt % 1 < 0.5 ? -80 : 8, armB: -6, legSwing: walk(lt, true, i) }); });
    g += at(lt, 3.8, 480, 60, chip(0, 0, 'बारात', MC.yellow, 34)) + `<path d="M${x - 40},${FL - 120} C${x - 80},${FL - 140} ${x - 120},${FL - 90} ${x - 150},${FL - 110}" fill="none" stroke="#2d4f3a" stroke-width="8" stroke-linecap="round"/>`;
    g += at(lt, 4.4, 230, 130, chip(0, 0, 'नंदी · गण', MC.blue, 24));
  }
  return g;
});
// U Maina startled, then Shiva's beautiful form and wedding
const U = mk((lt) => {
  let g = bgNight(lt) + `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#3b2a4f"/>`;
  if (lt < 1.4) {
    g += fig(QUEEN, 200, st, 0.5, false, { armF: -130, armB: -130, headTilt: -8, eyeOpen: 1 });
    GANA.forEach((o, i) => { g += fig(o, 560 + i * 90, st, 0.38, true, { armF: -70, armB: 8, eyeOpen: 1 }); });
    g += at(lt, 0.1, 200, 130, chip(0, 0, 'माँ मैना', MC.pink, 24)) + at(lt, 0.2, 300, 200, `<text font-family="NSB" font-size="60" fill="${MC.red}" font-weight="800">!</text>`);
  } else {
    const k = prog(lt, 1.2, 2.2);
    g = bgPlain('#f7e2b0', '#c9a25e') + glow(480, 250, 80 + 200 * k, 0.8) + petals(lt, 4, 30);
    g += shiva(380, st + 10, 0.52, lt, { ash: false, snake: false, pose: { armF: 8, armB: -6, eyeOpen: blink(lt) } }) + fig({ ...PARVATI, garland: true }, 590, st, 0.46, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) });
    g += at(lt, 2.9, 480, 60, chip(0, 0, 'रुद्र संहिता', MC.red, 26));
  }
  return g;
});
// V hunter on bel tree
const V = mk((lt) => {
  let g = night(lt) + moon(780, 100, 40, 0.4);
  g += tree(480, FL + 20, 0.9).replace(new RegExp(MC.leaf, 'g'), MC.green);
  const hy = lerp(FL - 10, 250, ease(prog(lt, 0.3, 2.8)));
  g += fig(HUNTER, 480 + 50, hy, 0.3, false, { armF: lt > 3 ? -30 : 8, armB: -6, eyeOpen: blink(lt) }, { handItem: `<g transform="translate(9,-185) rotate(90)">${bowShape(120, 40)}</g>` });
  g += at(lt, 2.4, 700, 220, chip(0, 0, 'भूखा शिकारी', MC.maroon, 26));
  return g;
});
// W leaves on the lingam
const Wd = mk((lt) => {
  let g = night(lt) + moon(lerp(780, 600, lt / 8), 100, 40, 0.4) + tree(480, FL + 20, 0.9);
  g += fig(HUNTER, 530, 250, 0.3, false, { armF: lt % 1.2 < 0.4 ? -60 : 8, armB: -6, eyeOpen: blink(lt) });
  g += lingam(300, FL + 30, 1.0, 0.3, lt);
  for (let i = 0; i < 6; i++) { const t0 = 1.2 + i * 0.9; if (lt > t0) { const k = prog(lt, t0, t0 + 1.0); g += belLeaf(lerp(520, 300 + (i % 3 - 1) * 14, k) + 20 * Math.sin(k * 6), lerp(250, FL - 100 + (i % 2) * 8, ease(k)), 0.6, 40 * Math.sin(k * 7)); } }
  g += at(lt, 0.4, 250, 90, chip(0, 0, 'नींद भगाने को पत्ते तोड़े', MC.green, 22));
  return g;
});
// X Shiva accepts him
const X = mk((lt) => {
  let g = night(lt) + glow(480, 250, 220 * prog(lt, 1, 3), 0.7) + lingam(300, FL + 30, 1.1, 0.5, lt);
  for (let i = 0; i < 6; i++) g += belLeaf(250 + i * 20, FL - 112 + (i % 2) * 6, 0.55, -50 + i * 20);
  g += fig(HUNTER, 150, st, 0.42, false, { ...HF, headTilt: 8, eyeOpen: blink(lt) });
  if (lt > 2.0) g += fade(prog(lt, 2.0, 3.2), shiva(690, st + 10, 0.55, lt, { pose: { armF: -75, armB: -6, eyeOpen: 1 } }));
  g += at(lt, 4.9, 480, 60, chip(0, 0, 'बेल पत्र', MC.green, 32));
  return g;
});
// Y two versions
const Y = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  g += at(lt, 0.2, 480, 50, chip(0, 0, 'कथा के दो रूप', MC.red, 28));
  const panel = (x: number, inner: string) => `<rect x="${x}" y="90" width="410" height="330" rx="22" fill="#1d1a3e" ${S(5)}/>${inner}`;
  if (lt > 1.4) g += fade(prog(lt, 1.4, 2.2), panel(40, glow(245, 250, 120, 0.7) + `<rect x="215" y="110" width="60" height="290" rx="20" fill="${MC.saffron}" ${S(4)}/><rect x="231" y="130" width="28" height="270" fill="${MC.yellow}"/>`));
  if (lt > 4.6) g += fade(prog(lt, 4.6, 5.4), panel(510, '') + shiva(660, 400, 0.4, lt, { pose: { armF: 8, armB: -6 } }) + fig({ ...PARVATI, garland: true }, 800, 400, 0.36, true, { armF: 8, armB: -6 }));
  g += at(lt, 2.2, 245, 450, chip(0, 0, 'अग्नि-स्तंभ', MC.red, 24)) + at(lt, 5.6, 715, 450, chip(0, 0, 'विवाह', MC.pink, 24));
  return g;
});
// Z samudra manthan, Shiva drinks halahala
const Z = mk((lt) => {
  let g = bgWater(lt);
  if (lt < 5.2) {
    g += `<path d="M400,330 L480,110 L560,330Z" fill="#8a5a2b" ${S(5)}/>`;
    g += `<path d="M420,300 C320,280 360,240 480,260 C600,240 640,280 540,300 C440,320 400,350 480,340" fill="none" stroke="#e9e1c9" stroke-width="12" stroke-linecap="round"/><path d="M420,300 C320,280 360,240 480,260 C600,240 640,280 540,300" fill="none" stroke="${INK}" stroke-width="3"/>`;
    for (let i = 0; i < 3; i++) { const o = 8 * Math.sin(lt * 3); g += fig({ ...MAN, uttariya: MC.yellow }, 120 + i * 80 + o * (i % 2 ? 1 : -1), 400, 0.28, false, { armF: -60 + o, armB: -60 }) + fig({ ...MAN, skin: '#7a4a6a', uttariya: MC.maroon }, 840 - i * 80 - o * (i % 2 ? 1 : -1), 400, 0.28, true, { armF: -60 - o, armB: -60 }); }
    g += at(lt, 0.4, 480, 60, chip(0, 0, 'समुद्र मंथन', MC.blue, 30));
  } else {
    g = bgPlain('#1d1a3e', '#2a2346') + glow(480, 240, 220, 0.4);
    const k = prog(lt, 6.0, 7.6);
    g += `<g transform="translate(480,200)"><circle r="${90 + 20 * k}" fill="#1a3a22" opacity=".85"/><path d="M-60,40 C-20,-60 30,-60 60,40" fill="none" stroke="#3a7a4a" stroke-width="10"/></g>`.replace('', '');
    g += shiva(480, st + 10, 0.58, lt, { blue: lt > 7.2, pose: { armF: lt > 5.6 ? -110 : 8, armB: -6, eyeOpen: blink(lt) } });
    g += at(lt, 5.6, 480, 60, chip(0, 0, 'हलाहल विष · नीलकंठ', MC.blue, 28));
  }
  return g;
});
// AA Ketaki excluded
const AA = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + glow(660, 250, 200, 0.4);
  g += shiva(250, st + 10, 0.55, lt, { pose: { armF: lt > 3.4 ? -70 : 8, armB: -6, eyeOpen: blink(lt) } });
  const s = lt > 6.0 ? 1 - 0.5 * prog(lt, 6.0, 7.5) : 1;
  g += at(lt, 0.8, 660, 250, ketaki(0, 0, 2.2 * s, sway(lt, 6, 2)));
  g += at(lt, 1.1, 480, 60, chip(0, 0, 'केतकी का फूल', MC.green, 30));
  if (lt > 6.0) g += at(lt, 6.0, 660, 250, `<path d="M-90,-90 L90,90 M90,-90 L-90,90" stroke="${MC.red}" stroke-width="16" stroke-linecap="round"/>`);
  return g;
});
// AB Brahma version; every home's own story
const AB = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  if (lt < 6.0) {
    g += fig(BRAHMA, 380, st, 0.5, false, { armF: 8, armB: -6, headTilt: lt > 2 ? 14 : 0, eyeOpen: blink(lt) });
    g += at(lt, 0.4, 700, 300, `<g>${lotus(0, 0, 1.2, 1)}<rect x="-70" y="0" width="140" height="30" fill="${MC.maroon}" ${S(4)}/></g>`);
    if (lt > 3.3) g += at(lt, 3.3, 700, 250, `<path d="M-100,-100 L100,100 M100,-100 L-100,100" stroke="${MC.red}" stroke-width="14" stroke-linecap="round"/>`);
    g += at(lt, 0.3, 480, 60, chip(0, 0, 'ब्रह्मा की अलग पूजा नहीं', MC.maroon, 26));
  } else {
    g += `<g transform="translate(0,0)">${`<path d="M60,${FL} L60,250 L180,190 L300,250 L300,${FL}Z" fill="#e8c27a" ${S(4)}/><path d="M40,260 L180,170 L320,260Z" fill="#a85a3a" ${S(4)}/><rect x="140" y="320" width="80" height="${FL - 320}" fill="#4a2a1a" ${S(3)}/>`}</g>`;
    g += seated(WOMAN, 560, FL - 20, 0.42, false, { armF: -50, armB: 8, eyeOpen: blink(lt) }, {}, MC.saffron) + seated({ ...MAN, skin: '#e6a974' }, 760, FL - 5, 0.3, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }, {}, MC.saffron);
    g += diya(420, FL - 8, 0.8, lt) + glow(560, 300, 160, 0.3);
    g += at(lt, 6.6, 480, 60, chip(0, 0, 'हर घर की अपनी कथा', MC.green, 28));
  }
  return g;
});
// AC fasting + abhishek
const AC = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + glow(480, 300, 200, 0.4) + lingam(480, FL + 30, 1.5, 0.3, lt);
  g += fig(WOMAN, 150, st, 0.42, false, { ...HF, eyeOpen: blink(lt) }) + fig(MAN, 810, st, 0.42, true, { ...HF, eyeOpen: blink(lt + 1) });
  g += at(lt, 0.4, 150, 100, chip(0, 0, 'व्रत', MC.green, 34));
  if (lt > 4.0) { g += at(lt, 4.0, 480, 140, lota(0, 0, 1.1, 40 * Math.sin(Math.min(1, prog(lt, 4.0, 5.0)) * 2))); for (let i = 0; i < 8; i++) { const k = ((lt * 1.6 + i * 0.13) % 1); g += `<ellipse cx="${540 - 6 * k + 0}" cy="${160 + 190 * k}" rx="5" ry="8" fill="${i % 2 ? '#fff' : '#9cc3ea'}" ${S(1.5)}/>`; } }
  if (lt > 6.6) { g += at(lt, 6.8, 330, 360, belLeaf(0, 0, 1)) + at(lt, 7.0, 640, 360, `<g><rect x="-26" y="-30" width="52" height="60" rx="8" fill="#fff" ${S(3)}/><path d="M-16,-10 L16,-10" stroke="${MC.blue}" stroke-width="4"/></g>`) + at(lt, 7.4, 480, 480, chip(0, 0, 'जल · दूध · बेल पत्र', MC.red, 26)); }
  return g;
});
// AD jagran, four pahars
const AD = mk((lt) => {
  let g = night(lt) + moon(480, 90, 40, 0.3);
  for (let i = 0; i < 4; i++) { const on = lt > 2.0 + i * 1.2; g += at(lt, 2.0 + i * 1.2, 220 + i * 175, 250, diya(0, 0, 1.4, lt + i)) + (on ? '' : ''); }
  g += at(lt, 2.2, 480, 490, chip(0, 0, 'चार पहर · चार पूजा', MC.yellow, 28));
  [0, 1, 2].forEach((i) => { g += seated(i % 2 ? WOMAN : MAN, 220 + i * 260, FL - 10, 0.34, false, { armF: -100 + sway(lt, 4, 2), armB: -100, eyeOpen: 1 }, {}, MC.maroon); });
  g += at(lt, 0.3, 480, 150, chip(0, 0, 'रात भर जागरण', MC.blue, 26));
  return g;
});
// AE Ujjain & Kashi
const AE = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  if (lt < 3.7) {
    g += temple(480, FL + 10, 0.9);
    for (let i = 0; i < 9; i++) { const x = 90 + i * 100 + ((lt * 20) % 100) * 0; g += fig(i % 2 ? WOMAN : MAN, x, FL + 70 + (i % 2) * 6, 0.22, i > 4, { armF: 8, armB: -6, legSwing: walk(lt, true, i) }); }
    g += `<path d="M120,150 q30,-20 60,0 t60,0 M720,150 q30,-20 60,0 t60,0" fill="none" stroke="${MC.red}" stroke-width="5"/>`;
    g += at(lt, 0.3, 480, 60, chip(0, 0, 'उज्जैन · महाकाल मेला', MC.red, 28));
  } else {
    g = bgPlain('#fbeccd', '#2f6fb5') + `<rect x="0" y="${FL - 20}" width="${W}" height="${H}" fill="#2f6fb5"/><rect x="0" y="${FL - 40}" width="${W}" height="30" fill="#c9a25e" ${S(3)}/>`;
    g += temple(600, FL - 40, 0.75);
    for (let i = 0; i < 6; i++) g += fig(i % 2 ? WOMAN : MAN, 90 + i * 60 + ((lt * 18) % 60), FL - 10, 0.22, false, { armF: 8, armB: -6, legSwing: walk(lt, true, i) });
    for (let i = 0; i < 6; i++) g += `<path d="M${-40 + ((i * 160 + lt * 20) % 1000)},${FL + 30 + (i % 3) * 22} q30,-10 60,0 t60,0" fill="none" stroke="#9cc3ea" stroke-width="3"/>`;
    g += at(lt, 3.9, 480, 60, chip(0, 0, 'वाराणसी · काशी विश्वनाथ', MC.blue, 28));
  }
  return g;
});
// AF Tamil Nadu lingodbhava niche
const AF = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  const tier = (w: number, y: number, h: number, c: string) => `<rect x="${480 - w / 2}" y="${y}" width="${w}" height="${h}" fill="${c}" ${S(4)}/>`;
  g += tier(360, 380, 40, MC.cream) + tier(300, 320, 60, MC.saffron) + tier(240, 270, 50, MC.red) + tier(180, 230, 40, MC.yellow) + tier(120, 200, 30, MC.saffron) + `<path d="M450,200 Q480,150 510,200Z" fill="${MC.red}" ${S(4)}/>`;
  g += `<rect x="440" y="400" width="80" height="${FL - 400}" fill="#2b170a"/>`;
  g += at(lt, 0.3, 480, 70, chip(0, 0, 'तमिलनाडु के शिव मंदिर', MC.red, 26));
  if (lt > 3.4) { const k = ease(prog(lt, 3.4, 4.8)); g += `<g transform="translate(${lerp(480, 480, k)},${lerp(430, 320, k)}) scale(${lerp(0.2, 0.78, k)})"><rect x="-130" y="-190" width="260" height="380" rx="130" fill="#1d1a3e" ${S(6)}/>${glow(0, 0, 150, 0.4)}<path d="M-34,160 L-34,-100 Q0,-170 34,-100 L34,160Z" fill="${MC.saffron}" ${S(4)}/><g transform="translate(0,60) scale(.36)">${figure({ ...SHIVA, pose: { armF: 8, armB: -6 } })}</g>${swan(-70, -110, 0.4, lt)}<g transform="translate(80,130)">${boar(0, 0, 0.4, 0, true)}</g></g>`; }
  if (lt > 7.4) g += at(lt, 7.6, 480, 500, chip(0, 0, 'लिंगोद्भव मूर्ति', MC.maroon, 24));
  return g;
});
// AG queues & Om Namah Shivaya
const AG = mk((lt) => {
  let g = bgPlain('#fbeccd', '#c9a25e') + temple(760, FL + 10, 0.8);
  for (let i = 0; i < 7; i++) { const x = 90 + i * 80 + ((lt * 14) % 80); g += fig(i % 2 ? WOMAN : MAN, x, FL + 66, 0.26, false, { armF: 8, armB: -6, legSwing: walk(lt, true, i) }); }
  g += at(lt, 0.3, 300, 100, chip(0, 0, 'सुबह से कतार', MC.maroon, 26));
  if (lt > 3.3) { for (let i = 0; i < 3; i++) { const r = ((lt - 3.3) * 60 + i * 40) % 120; g += `<circle cx="760" cy="230" r="${40 + r}" fill="none" stroke="${MC.yellow}" stroke-width="4" opacity="${1 - r / 120}"/>`; } g += at(lt, 3.4, 300, 200, T(0, 0, 'ॐ नमः शिवाय', 52, MC.red)); }
  return g;
});
// AH family at home
const AH = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + glow(480, 300, 220, 0.3);
  g += seated(WOMAN, 480, FL - 20, 0.44, false, { armF: -50 + sway(lt, 6, 3), armB: 8, eyeOpen: blink(lt) }, {}, MC.saffron);
  g += seated(MAN, 250, FL - 5, 0.38, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }, {}, MC.saffron) + seated({ ...WOMAN, skin: '#eab88a' }, 720, FL - 5, 0.38, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 2) }, {}, MC.saffron) + seated({ ...MAN, skin: '#e6a974' }, 850, FL + 10, 0.26, true, { armF: 8, armB: -6 }, {}, MC.saffron);
  g += `<g transform="translate(480,${FL + 50})"><ellipse rx="130" ry="26" fill="${MC.cream}" ${S(4)}/>` + [[-60, 'red'], [-20, 'yellow'], [20, 'green'], [60, 'saffron']].map(([x, c], i) => `<circle cx="${x}" cy="-12" r="16" fill="${MC[c]}" ${S(3)}/>`).join('') + `</g>`;
  g += at(lt, 0.4, 480, 60, chip(0, 0, 'फल खाकर व्रत', MC.green, 28));
  if (lt > 2.8) g += at(lt, 2.8, 480, 130, `<g>${book(0, 0, 0.5, 0.4)}</g>`);
  return g;
});
// AI1 Kashmir Herath
const AI1 = mk((lt) => {
  let g = himalaya();
  g += tree(160, FL + 20, 0.6).replace(new RegExp(MC.leaf, 'g'), '#d9602a').replace(new RegExp(MC.green, 'g'), MC.saffron) + tree(820, FL + 20, 0.6).replace(new RegExp(MC.leaf, 'g'), '#d9602a').replace(new RegExp(MC.green, 'g'), MC.saffron);
  g += seated({ ...MAN, beard: true }, 400, FL - 10, 0.4, false, { ...HF, eyeOpen: blink(lt) }, {}, MC.red) + seated({ ...WOMAN }, 560, FL - 10, 0.4, true, { ...HF, eyeOpen: blink(lt + 1) }, {}, MC.red);
  g += lingam(480, FL + 40, 0.7, 0.3, lt);
  g += at(lt, 0.3, 480, 60, chip(0, 0, 'कश्मीर', MC.blue, 30)) + at(lt, 2.2, 790, 110, T(0, 0, 'हेरथ', 56, MC.red));
  return g;
});
// AI2 days of celebration, walnuts
const AI2 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e') + glow(480, 280, 220, 0.4);
  for (let i = 0; i < 5; i++) g += at(lt, 0.2 + i * 0.3, 280 + i * 100, 110, diya(0, 0, 0.8, lt + i));
  g += at(lt, 1.0, 480, 50, chip(0, 0, 'कई दिन का उत्सव', MC.maroon, 24));
  g += `<g transform="translate(480,${FL + 20})"><path d="M-130,-60 Q-120,30 0,40 Q120,30 130,-60Z" fill="#c9843a" ${S(4)}/></g>`;
  for (let i = 0; i < 7; i++) g += at(lt, 3.0 + i * 0.25, 400 + (i % 4) * 56 - (i > 3 ? 28 : 0), FL - 70 - (i > 3 ? 36 : 0), `<g><circle r="26" fill="#a66a3a" ${S(3)}/><path d="M0,-26 C-8,-8 8,8 0,26" fill="none" ${S(3)}/></g>`);
  g += at(lt, 3.4, 480, 150, chip(0, 0, 'अखरोट', MC.maroon, 34));
  return g;
});
// AJ lota of water and bel leaf
const AJ = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + glow(480, 300, 230 + 10 * Math.sin(lt * 2), 0.5) + lingam(480, FL + 30, 1.4, 0.4, lt);
  g += at(lt, 0.6, 300, 330, lota(0, 0, 1.6)) + at(lt, 1.6, 660, 340, belLeaf(0, 0, 1.8));
  if (lt > 5.2) { const k = prog(lt, 5.2, 7); g += `<path d="M480,60 C440,20 400,50 480,110 C560,50 520,20 480,60Z" fill="${MC.red}" ${S(4)} opacity="${k}" transform="translate(0,${-10 * k})"/>`; }
  g += at(lt, 4.3, 480, 480, chip(0, 0, 'मन से चढ़ाया', MC.red, 30));
  return g;
});
// AK ego dissolves
const AK = mk((lt) => {
  let g = bgPlain('#14102e', '#2a2346') + glow(480, 250, 240, 0.6) + shiva(480, st + 10, 0.5, lt, { pose: { armF: -70, armB: -6, eyeOpen: blink(lt) } });
  g += fig(BRAHMA, 180, st, 0.42, false, { ...HF, headTilt: 10 }) + fig(VISHNU, 780, st, 0.42, true, { ...HF, headTilt: 10 });
  const sz = lerp(70, 6, ease(prog(lt, 2.4, 4.4)));
  g += `<g opacity="${1 - 0.5 * prog(lt, 3.5, 4.5)}"><circle cx="180" cy="${200 - 20 * prog(lt, 2.4, 4.4)}" r="${sz}" fill="${MC.red}" ${S(4)}/><circle cx="780" cy="${200 - 20 * prog(lt, 2.4, 4.4)}" r="${sz}" fill="${MC.red}" ${S(4)}/></g>`;
  g += at(lt, 0.3, 480, 60, chip(0, 0, 'अहंकार छोड़ना', MC.yellow, 30));
  return g;
});
// AL next story teaser: Prahlad in fire
const AL = mk((lt) => {
  let g = bgPlain('#fde3c8', '#c9a25e');
  g += at(lt, 0.3, 480, 60, chip(0, 0, 'अगली कहानी: होली', MC.pink, 32));
  [-150, -60, 60, 150].forEach((dx, i) => { g += fire(480 + dx, FL + 40, 1.0 + (i % 2) * 0.15, lt + i); });
  g += fig(PRAHLAD, 480, st + 20, 0.36, false, { ...HF, eyeOpen: blink(lt) });
  if (lt > 2.7) g += glow(480, 360, 80, 0.6);
  g += at(lt, 4.0, 140, 400, fig(WOMAN, 0, 0, 0.3, false, { armF: 8, armB: -6 })) + at(lt, 4.4, 140, 190, chip(0, 0, 'होलिका', MC.maroon, 20));
  return g;
});
// AM Krishna and Radha colours
const AM = mk((lt) => {
  let g = bgPlain('#fde3c8', '#e8a0b0') + petals(lt, 9, 20);
  const cols = [MC.pink, MC.yellow, MC.green, MC.blue, MC.red, MC.saffron];
  for (let i = 0; i < 14; i++) { const t0 = 1 + i * 0.4; if (lt > t0) g += `<circle cx="${100 + (i * 137) % 760}" cy="${100 + (i * 83) % 280}" r="${22 * pop(lt, t0, 0.5)}" fill="${cols[i % 6]}" opacity=".7"/>`; }
  g += fig(KRISH, 250, st, 0.5, false, { armF: lt > 2 ? -60 + sway(lt, 10, 4) : 8, armB: -6, eyeOpen: blink(lt) }) + fig(RADHA, 700, st, 0.48, true, { armF: 8, armB: -6, headTilt: 6 * Math.sin(lt * 2), eyeOpen: blink(lt + 1) });
  g += at(lt, 0.3, 480, 60, chip(0, 0, 'ब्रज · रंग', MC.red, 28)) + (lt > 8.4 ? at(lt, 8.5, 480, 140, T(0, 0, 'होली', 64, MC.red)) : '');
  return g;
});
// AN question, AO greeting
const AN = mk((lt) => {
  let g;
  if (lt < 5.1) {
    g = bgPlain('#f7e2b0', '#c9a25e') + glow(480, 230, 200, 0.5) + lingam(480, FL + 20, 1.1, 0.3, lt);
    g += seated(WOMAN, 180, FL - 10, 0.36, false, { armF: -60, armB: 8, eyeOpen: blink(lt) }, {}, MC.saffron) + seated(MAN, 790, FL - 10, 0.36, true, { armF: -60, armB: 8, eyeOpen: blink(lt + 1) }, {}, MC.saffron);
    g += at(lt, 0.3, 220, 140, bubble(0, 0, '?', 120, 40, INK)) + at(lt, 0.8, 760, 140, bubble(0, 0, '?', 120, 40, INK));
    g += at(lt, 3.3, 480, 70, chip(0, 0, 'कमेंट में लिखिए', MC.red, 32));
  } else {
    const k = lt - 5.1;
    g = bgPlain('#14102e', '#2a2346') + glow(480, 250, 280 + 10 * Math.sin(k * 3), 0.7) + petals(k, 7, 26);
    g += shiva(480, st + 10, 0.64, k, { trishulOn: false, pose: { armF: -75, armB: -6, eyeOpen: blink(k) } });
    g += at(k, 0.4, 480, 80, T(0, 0, 'हर हर महादेव', 62, MC.yellow));
  }
  return g;
});

const B_ = [0, 6.44, 17.31, 26.26, 32.44, 40.48, 46.73, 56.83, 70.52, 80.38, 92.32, 101.24, 109.36, 121.21, 131.73, 139.66, 145.9, 156.43, 166.74, 178.08, 186.96, 196.05, 203.84, 209.0, 214.78, 222.2, 228.09, 236.08, 247.42, 256.78, 267.03, 278.44, 285.47, 294.17, 304.16, 312.31, 318.32, 326.43, 332.04, 342.82, 348.17, 356.89, 367.49, 375.8];
const SC = [A, B, C, D, E1, E2, F, G, H1, I, J1, J2, K, L, M1, M2, N, O, P, Q, R, S1, U, V, Wd, X, Y, Z, AA, AB, AC, AD, AE, AF, AG, AH, AI1, AI2, AJ, AK, AL, AM, AN];
const LIST: [number, number, any][] = SC.map((C, i) => [B_[i], B_[i + 1], C]);
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
