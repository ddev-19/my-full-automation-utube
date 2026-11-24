// @ts-nocheck
// Dattatreya Jayanti episode. All time values inside scene functions are ABSOLUTE seconds (a), so a scene
// function can be reused for two adjacent ranges without any visual jump.
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import { TOTAL } from './data';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, sunFace, bird, tree, prog, ease, lerp, clamp, cloud, fire, lotus, moon, temple, chip, pop, xdefs, rnd, blink, sway, lotusInHand,
  MUNI, MAN, WOMAN, KRISH,
  conch, book, frame, bgNight, bgForest, bgPlain, bubble,
} from './mb3';
import { baby } from './mb2';

type Fn = (a: number, d: number) => string;
const mk = (fn: Fn, push = 0.035) => ({ t0, dur }: { t0: number; dur: number }) => {
  const f = useCurrentFrame();
  const a = t0 + f / 30, d = dur / 30;
  return (
    <Stage dur={dur} push={push}>
      <g dangerouslySetInnerHTML={{ __html: defs() + xdefs() + fn(a, d) + frame() }} />
    </Stage>
  );
};
const glow = (x: number, y: number, r: number, o = 1) => `<circle cx="${x}" cy="${y}" r="${Math.max(1, r)}" fill="url(#glowY)" opacity="${o}"/>`;
const T = (x: number, y: number, txt: string, size = 34, col = INK, fam = 'NSB') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${fam}" font-weight="800" font-size="${size}" fill="${col}">${txt}</text>`;
const at = (a: number, t: number, x: number, y: number, inner: string) => (a > t ? `<g transform="translate(${x},${y}) scale(${pop(a, t)})">${inner}</g>` : '');
const fade = (o: number, inner: string) => `<g opacity="${clamp(o).toFixed(3)}">${inner}</g>`;
const win = (a: number, t0: number, t1: number, f = 0.4) => clamp(Math.min((a - t0) / f, (t1 - a) / f)); // fade in then out
const walk = (a: number, on: boolean, k = 0) => (on ? 12 * Math.sin(a * 7 + k) : 0);
const P = (a: number, i = 0, o = {}) => ({ armF: 8, armB: -6, eyeOpen: blink(a + i), ...o });
const petals = (a: number, seed = 3, n = 36) => { const r = rnd(seed); let g = ''; for (let i = 0; i < n; i++) { const x0 = 30 + r() * 900, sp = 70 + r() * 70, ph = r() * 10; const y = ((a * sp + r() * 500) % 460) + 20; const x = x0 + 20 * Math.sin(a * 2 + ph); g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="4" fill="${i % 3 ? MC.saffron : MC.pink}" ${S(1.2)} transform="rotate(${((a * 120 + ph * 40) % 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; } return g; };

// ---------- cast ----------
const ATRI = { skin: '#d9915a', bun: true, beard: true, dhoti: MC.white, uttariya: MC.green };
const ANAS = { female: true, skin: '#eab88a' };
const SAGES = [
  { ...MUNI, skin: '#e0866a', uttariya: MC.saffron },
  { ...MUNI, skin: '#2c5e9e', dhoti: MC.yellow, uttariya: MC.saffron },
  { ...MUNI, skin: '#cfe0f0', uttariya: MC.blue },
];
const trident = `<g transform="translate(9,-185)"><line x1="0" y1="-170" x2="0" y2="110" stroke="${INK}" stroke-width="8"/><path d="M-24,-150 L-24,-196 M0,-150 L0,-214 M24,-150 L24,-196 M-24,-150 L24,-150" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
const conchHand = `<g transform="translate(9,-190) scale(.55)">${conch(0, 0, 1)}</g>`;
const veenaHand = `<g transform="translate(9,-190) rotate(30)"><line x1="0" y1="-110" x2="0" y2="90" stroke="${INK}" stroke-width="6"/><ellipse cx="0" cy="90" rx="22" ry="28" fill="${MC.yellow}" ${S(3)}/></g>`;
const BRAHMA = { skin: '#e0866a', crown: 'king', beard: true, dhoti: MC.yellow, uttariya: MC.red, handItem: lotusInHand };
const VISHNU = { skin: '#2c5e9e', crown: 'ram', dhoti: MC.yellow, uttariya: MC.green, handItem: conchHand };
const SHIVA = { skin: '#cfe0f0', bun: true, bunColor: INK, dhoti: '#d6a45a', uttariya: MC.blue, handItem: trident };
const GODS = [BRAHMA, VISHNU, SHIVA];
const LAKSH = { female: true, skin: '#f0b27a', handItem: lotusInHand };
const PARV = { female: true, skin: '#e8a07a' };
const SARA = { female: true, skin: '#f6dcc0', handItem: veenaHand };
const DEVIS = [LAKSH, PARV, SARA];
const NARAD = { skin: '#d9915a', bun: true, dhoti: MC.white, uttariya: MC.pink, handItem: veenaHand };
const DATTA = { skin: '#4f86be', bun: true, bunColor: INK, dhoti: MC.saffron, uttariya: MC.white };
const YADU = { skin: '#c98a5a', crown: 'king', beard: true, dhoti: MC.blue, uttariya: MC.yellow };
const spear = `<g transform="translate(9,-185)"><line x1="0" y1="-190" x2="0" y2="110" stroke="${INK}" stroke-width="7"/><path d="M-9,-190 l9,-30 l9,30Z" fill="#c9c9c9" ${S(3)}/></g>`;
const HERO = { skin: '#b9774a', beard: true, dhoti: '#3a2a22', uttariya: MC.maroon, handItem: spear };

// ---------- props ----------
const hut = (x: number, base: number, s = 1) => `<g transform="translate(${x},${base}) scale(${s})"><path d="M-120,0 L-120,-170 L0,-230 L120,-170 L120,0Z" fill="#a0603a" ${S(4)}/><path d="M-145,-160 L0,-260 L145,-160Z" fill="#6b3a1a" ${S(4)}/><path d="M-110,-150 L110,-150 M-100,-120 L100,-120" stroke="#6b3a1a" stroke-width="3"/><path d="M-40,0 L-40,-100 Q0,-130 40,-100 L40,0Z" fill="#2b170a" ${S(3)}/></g>`;
const bowl = (x: number, y: number, s = 1, a = 0) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 Q0,46 40,0Z" fill="${MC.saffron}" ${S(4)}/><path d="M-30,-2 Q0,-34 30,-2Z" fill="${MC.cream}" ${S(3)}/><path d="M-12,-30 q-8,-16 0,-30 M10,-30 q8,-16 0,-30" fill="none" stroke="#999" stroke-width="3" opacity="${(0.6 + 0.3 * Math.sin(a * 5)).toFixed(2)}"/></g>`;
const cloth = (x: number, y: number, s = 1, cross = true) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,-30 L40,-30 L34,34 L-34,34Z" fill="${MC.yellow}" ${S(4)}/><path d="M-26,-14 L26,-14 M-26,4 L26,4 M-26,20 L26,20" stroke="${MC.red}" stroke-width="3"/>${cross ? `<path d="M-52,-46 L52,50 M52,-46 L-52,50" stroke="${MC.red}" stroke-width="10" stroke-linecap="round"/>` : ''}</g>`;
const cross = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,-40 L40,40 M40,-40 L-40,40" stroke="${MC.red}" stroke-width="12" stroke-linecap="round"/></g>`;
const thought = (x: number, y: number, inner: string, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle cx="-60" cy="96" r="7" fill="${MC.cream}" ${S(3)}/><circle cx="-48" cy="76" r="11" fill="${MC.cream}" ${S(3)}/>${cloud(0, 0, 1.25, MC.cream)}${inner}</g>`;
const mat = (x: number, y: number, w = 90) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="14" fill="${MC.red}" ${S(3)}/>`;
const cradle = (x: number, y: number, s = 1, a = 0, babies = 3, cols = [MC.red, MC.blue, MC.white]) => {
  const sw = 6 * Math.sin(a * 2);
  let g = `<g transform="translate(${x},${y}) scale(${s})"><path d="M-170,0 L-120,-250 M170,0 L120,-250 M-120,-250 L120,-250" fill="none" ${S(10)}/><path d="M-170,0 L-120,-250 M170,0 L120,-250 M-120,-250 L120,-250" fill="none" stroke="#a0603a" stroke-width="6"/>`;
  g += `<g transform="rotate(${sw} 0 -250)"><path d="M-70,-250 L-90,-130 M70,-250 L90,-130" ${S(3)}/><path d="M-110,-130 L110,-130 Q100,-60 0,-50 Q-100,-60 -110,-130Z" fill="${MC.cream}" ${S(4)}/><path d="M-100,-110 Q0,-90 100,-110" fill="none" stroke="${MC.red}" stroke-width="5"/>`;
  for (let i = 0; i < babies; i++) g += `<g transform="translate(${babies === 1 ? 0 : -62 + i * 62},-124) scale(.62)">${baby(0, 0, 1)}${glow(0, -20, 70, 0.5).replace('url(#glowY)', 'url(#glowY)')}</g>`;
  return g + `</g></g>`;
};
const drops = (a: number, t0: number, t1: number, x0: number, y0: number, x1: number, y1: number, n = 8) => {
  let g = '';
  for (let i = 0; i < n; i++) { const p = prog(a, t0 + i * 0.12, t1 + i * 0.12); if (p <= 0 || p >= 1) continue; g += `<circle cx="${lerp(x0, x1, p).toFixed(1)}" cy="${(lerp(y0, y1, p) - 60 * Math.sin(p * Math.PI)).toFixed(1)}" r="6" fill="#7ec3f0" ${S(1.5)}/>`; }
  return g;
};
const kamandal = (x: number, y: number, s = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M-26,-10 C-40,30 -30,56 0,56 C30,56 40,30 26,-10Z" fill="#c98a3a" ${S(4)}/><path d="M-14,-10 L-12,-34 L12,-34 L14,-10Z" fill="#c98a3a" ${S(3)}/><path d="M26,10 Q60,0 56,-24" fill="none" ${S(5)}/></g>`;
const star = (x: number, y: number, r: number, col = MC.yellow) => { let p = ''; for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r; const an = -Math.PI / 2 + (i * Math.PI) / 5; p += `${i ? 'L' : 'M'}${(x + rr * Math.cos(an)).toFixed(1)},${(y + rr * Math.sin(an)).toFixed(1)} `; } return `<path d="${p}Z" fill="${col}" ${S(2)}/>`; };
const heart = (x: number, y: number, s = 1, col = MC.red) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,30 C-50,-6 -36,-44 -14,-40 C-6,-38 0,-30 0,-24 C0,-30 6,-38 14,-40 C36,-44 50,-6 0,30Z" fill="${col}" ${S(3)}/></g>`;
// simple animals: kind = deer | tiger | cow | dog
const animal = (kind: string, x: number, y: number, s = 1, flip = false, a = 0, col?: string) => {
  const c = col || ({ deer: '#c98a4a', tiger: '#f0a030', cow: '#fff4e0', dog: '#8a5a3a' } as any)[kind];
  let g = `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">`;
  const lg = [-40, -18, 22, 44].map((lx, i) => `<rect x="${lx - 6}" y="-50" width="12" height="${52 + 4 * Math.sin(a * 6 + i)}" fill="${c}" ${S(3)}/>`).join('');
  g += lg + `<path d="M-60,-62 Q-80,-80 -74,-98" fill="none" ${S(6)}/>` + `<ellipse cx="0" cy="-66" rx="64" ry="32" fill="${c}" ${S(4)}/>`;
  g += `<path d="M44,-80 L66,-108 L88,-100" fill="none" ${S(1)}/><ellipse cx="74" cy="-100" rx="24" ry="20" fill="${c}" ${S(4)}/><circle cx="80" cy="-104" r="4" fill="${INK}"/><circle cx="94" cy="-96" r="3" fill="${INK}"/>`;
  if (kind === 'deer') g += `<path d="M66,-118 L60,-156 L48,-150 M60,-156 L74,-166 M80,-118 L88,-158 L100,-152 M88,-158 L78,-170" fill="none" ${S(4)}/>` + [-30, -6, 20, 40].map((sx, i) => `<circle cx="${sx}" cy="${-72 + (i % 2) * 14}" r="4" fill="#fff"/>`).join('');
  if (kind === 'tiger') g += `<circle cx="64" cy="-120" r="8" fill="${c}" ${S(3)}/>` + [-34, -12, 12, 34].map((sx) => `<path d="M${sx},-96 L${sx + 6},-60" stroke="${INK}" stroke-width="5"/>`).join('');
  if (kind === 'cow') g += `<path d="M64,-120 C58,-134 68,-138 70,-126 M82,-120 C88,-134 78,-138 76,-126" fill="none" ${S(5)}/><path d="M-30,-80 Q-10,-96 0,-70 Q-14,-50 -34,-60Z" fill="#c98a4a" ${S(2)}/>`;
  if (kind === 'dog') g += `<path d="M62,-116 Q50,-96 58,-80 Q74,-90 74,-112Z" fill="#5a3a22" ${S(3)}/>`;
  return g + `</g>`;
};
const dogs = (x: number, y: number, s: number, a: number, t0: number, flip = false) => [0, 1, 2, 3].map((i) => (a > t0 + i * 0.35 ? `<g transform="translate(${x + i * 120 * s * (flip ? -1 : 1)},${y + (i % 2) * 8}) scale(${pop(a, t0 + i * 0.35)})">${animal('dog', 0, 0, s, flip, a + i, ['#8a5a3a', '#e8d6b0', '#333', '#b9774a'][i])}</g>` : '')).join('');
const earth = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="50" fill="#3f8f4f" ${S(4)}/><path d="M-30,-20 Q-10,-40 10,-20 Q0,0 -20,-4Z M10,10 Q30,0 36,20 Q20,36 6,28Z" fill="#e7c98a" ${S(2)}/></g>`;
const wind = (x: number, y: number, s = 1, a = 0) => `<g transform="translate(${x},${y}) scale(${s})" fill="none" ${S(5)}><path d="M-50,-18 Q-10,-40 20,-20 Q40,-8 28,6" transform="translate(${6 * Math.sin(a * 4)},0)"/><path d="M-50,8 Q0,-6 36,12 Q56,24 40,40" transform="translate(${-6 * Math.sin(a * 4)},0)"/></g>`;
const skyIcon = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="52" fill="#8fc3ee" ${S(4)}/><path d="M-30,10 q10,-20 30,-6 q16,-14 30,4 q6,14 -8,16 l-44,0Z" fill="#fff" ${S(3)}/></g>`;
const water = (x: number, y: number, s = 1, a = 0) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="52" fill="#3a7fc4" ${S(4)}/>${[-18, 2, 22].map((o, i) => `<path d="M-34,${o} q${17},-12 ${34 + 4 * Math.sin(a * 3 + i)},0 t34,0" fill="none" stroke="#e8f4ff" stroke-width="4"/>`).join('')}</g>`;
const bee = (x: number, y: number, s = 1, a = 0) => `<g transform="translate(${x},${y + 4 * Math.sin(a * 6)}) scale(${s})"><ellipse cx="-14" cy="-26" rx="20" ry="12" fill="#e8f4ff" ${S(3)} transform="rotate(-20)"/><ellipse cx="14" cy="-26" rx="20" ry="12" fill="#e8f4ff" ${S(3)} transform="rotate(20)"/><ellipse rx="34" ry="24" fill="${MC.yellow}" ${S(4)}/><path d="M-10,-22 L-10,22 M8,-23 L8,23" stroke="${INK}" stroke-width="7"/><circle cx="32" cy="-6" r="4" fill="${INK}"/></g>`;
const pigeon = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="34" ry="22" fill="#9aa3b0" ${S(4)}/><circle cx="30" cy="-14" r="14" fill="#9aa3b0" ${S(4)}/><path d="M42,-16 L56,-12 L42,-8Z" fill="${MC.yellow}" ${S(2)}/><circle cx="34" cy="-17" r="3" fill="${INK}"/><path d="M-10,0 Q-30,-26 -42,-6 Q-26,16 -10,10Z" fill="#6b7480" ${S(3)}/><path d="M-34,10 L-52,24" ${S(5)}/></g>`;
const python = (x: number, y: number, s = 1, a = 0) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,20 C-40,-30 -10,40 10,-6 C26,-36 50,-6 40,-24" fill="none" stroke="#3f8f4f" stroke-width="18" stroke-linecap="round"/><path d="M-60,20 C-40,-30 -10,40 10,-6 C26,-36 50,-6 40,-24" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="3 9"/><circle cx="44" cy="-28" r="4" fill="${INK}"/></g>`;
const face = (x: number, y: number, r: number, skin: string) => `<g transform="translate(${x},${y})"><circle r="${r}" fill="${skin}" ${S(3)}/><path d="M${-r * 0.55},${-r * 0.1} Q${-r * 0.3},${-r * 0.4} ${-r * 0.05},${-r * 0.1} M${r * 0.1},${-r * 0.1} Q${r * 0.35},${-r * 0.4} ${r * 0.6},${-r * 0.1}" fill="none" ${S(2.5)}/><path d="M0,${-r * 0.8} L0,${-r * 0.5}" stroke="${MC.red}" stroke-width="4"/><path d="M${-r * 0.2},${r * 0.45} Q0,${r * 0.6} ${r * 0.2},${r * 0.45}" fill="none" stroke="${MC.red}" stroke-width="3"/></g>`;
const heaven = (a: number) => {
  let g = `<rect width="${W}" height="${H}" fill="#cfe6f7"/>` + glow(780, 120, 160, 0.7) + sunFace(780, 110, 36);
  g += cloud(160, 130 + 6 * Math.sin(a), 1.1) + cloud(480, 90, 0.9) + cloud(640, 190, 0.8);
  for (let i = 0; i < 8; i++) g += cloud(i * 140 + 10, FL + 52, 1.7, '#ffffff');
  return g;
};
const crown = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,10 L-34,-24 L-16,-8 L0,-34 L16,-8 L34,-24 L30,10Z" fill="${MC.yellow}" ${S(3)}/></g>`;

// ================= scenes =================
// 0 → 24.25  three hungry sages at the hut door, woman's trick
const HUT = mk((a) => {
  let g = bgForest(a) + hut(760, FL + 6, 1.0);
  const shrink = ease(prog(a, 19.0, 20.4));
  const sx = [lerp(-120, 330, ease(prog(a, 0.3, 4.2))), lerp(-220, 440, ease(prog(a, 0.5, 4.4))), lerp(-320, 550, ease(prog(a, 0.7, 4.6)))];
  g += fig(WOMAN, 640, FL + 40, 0.44, true, a < 14.3 ? P(a, 0, { armF: a > 9.9 ? -40 : 8 }) : P(a, 0, { armF: a < 16.5 ? -125 : -70, elbowF: a < 16.5 ? 40 : 0, headTilt: a < 16.5 ? 8 : 0, eyeOpen: a > 16.5 && a < 18.4 ? 0.1 : blink(a) }), { skin: '#eab88a' });
  SAGES.forEach((o, i) => {
    const s = lerp(0.42, 0.13, shrink);
    if (shrink < 1) g += fig(o, sx[i], FL + 40, s, false, P(a, i, { legSwing: walk(a, a < 4.3, i), armF: a > 4.6 && a < 14 ? -45 + sway(a, 8, 4) : 8 }));
    else g += fade(prog(a, 20.4, 20.9), baby(sx[i], FL + 20, 0.8));
    if (a > 21.41) g += glow(sx[i], FL - 30 - (shrink >= 1 ? 0 : 0), 70 * clamp(prog(a, 21.4, 22.4)), 0.7 * clamp(prog(a, 21.4, 22.4)));
  });
  if (a > 4.6 && a < 9.9) g += at(a, 4.7, 430, 120, bowl(0, 0, 1.4, a));
  if (a > 7.31 && a < 14.3) g += at(a, 7.4, 520, 90, chip(0, 0, 'अजीब शर्त', MC.red, 26));
  if (a > 9.97 && a < 14.3) g += at(a, 10.0, 640, 150, thought(0, 0, cloth(0, 0, 1.1) + bowl(-70, 60, 0.5, a), 0.9)).replace('translate(640,150)', 'translate(560,150)');
  if (a > 16.5 && a < 19) g += at(a, 16.6, 640, 130, thought(0, 0, `<path d="M-14,-20 C0,-40 20,-30 14,-10 C10,2 0,6 0,22" fill="none" ${S(6)}/><circle cx="0" cy="38" r="5" fill="${INK}"/>`, 0.8));
  if (a > 18.0 && a < 21) g += drops(a, 18.0, 19.0, 610, FL - 90, 450, FL - 80, 10);
  if (a > 18.6 && a < 20.6) g += `<circle cx="440" cy="${FL - 60}" r="${40 + 260 * prog(a, 18.7, 19.8)}" fill="url(#flash)" opacity="${(1 - prog(a, 19.3, 20.6)).toFixed(2)}"/>`;
  if (a > 21.41) g += at(a, 21.6, 440, 120, chip(0, 0, 'त्रिदेव', MC.blue, 28));
  return g;
});

// 24.25 → 29.16 title
const TITLE = mk((a) => {
  let g = bgForest(a) + glow(480, 230, 260, 0.6);
  g += fig(DATTA, 480, FL + 40, 0.5, false, P(a, 0, { armF: -45 + sway(a, 6, 2) }));
  g += glow(480, 210, 80, 0.6);
  g += at(a, 24.6, 480, 110, T(0, 0, 'दत्तात्रेय जयंती', 62, MC.red));
  g += at(a, 25.2, 190, 340, lotus(0, 0, 0.8, 1)) + at(a, 25.4, 770, 340, lotus(0, 0, 0.8, 1));
  g += at(a, 27.05, 780, FL + 6, hut(0, 0, 0.7));
  return g;
});

// 29.16 → 42.09 Atri & Anasuya at the ashram
const ASHRAM = mk((a) => {
  let g = bgForest(a) + hut(250, FL + 6, 1.0);
  g += fig(ATRI, 520, FL + 40, 0.44, true, P(a, 0, { armF: a > 33.5 ? -100 : 8, armB: a > 33.5 ? -100 : -6 }));
  g += fig(ANAS, 690, FL + 40, 0.44, true, P(a, 1, { armF: -40 + sway(a, 6) }), { skin: '#eab88a' });
  g += at(a, 29.4, 520, 110, chip(0, 0, 'ऋषि अत्रि', MC.saffron, 24)) + at(a, 31.0, 690, 140, chip(0, 0, 'अनसूया', MC.red, 24));
  if (a > 33.52) for (let i = 0; i < 7; i++) g += at(a, 33.6 + i * 0.25, 60 + i * 55, 60 + 14 * Math.abs(i - 3), star(0, 0, 16));
  if (a > 36.36) g += glow(690, 270, 130 * clamp(prog(a, 36.4, 37.4)), 0.6) + at(a, 36.7, 830, 330, lotus(0, 0, 0.8, 1));
  if (a > 39.33) g += at(a, 39.4, 690, 220, `<g transform="translate(0,-30)">${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${(60 * Math.cos((i * Math.PI) / 3 + a)).toFixed(1)}" cy="${(30 * Math.sin((i * Math.PI) / 3 + a)).toFixed(1)}" r="5" fill="${MC.yellow}"/>`).join('')}</g>`);
  g += bird(450, 120 + 6 * Math.sin(a * 3), 0.4, Math.sin(a * 5));
  return g;
});

// 42.09 → 55.97 animals at peace, meaning of the name
const PEACE = mk((a) => {
  let g = bgForest(a) + glow(560, 250, 250, 0.5);
  g += fig(ANAS, 560, FL + 40, 0.46, true, P(a, 0, { armF: -40 + sway(a, 6) }), { skin: '#eab88a' });
  const k = ease(prog(a, 44.9, 47.5));
  g += animal('tiger', lerp(90, 270, ease(prog(a, 42.2, 44.9))), FL + 40, 0.9, false, a);
  g += animal('deer', lerp(560, 400, ease(prog(a, 42.4, 45.5))), FL + 46, 0.8, true, a + 1);
  g += animal('cow', 790, FL + 40, 0.8, true, a + 2) + animal('dog', 880, FL + 50, 0.55, true, a + 3);
  if (a > 44.96) g += at(a, 45.2, 330, 170, heart(0, 0, 1.2, MC.pink)) + at(a, 45.8, 700, 200, heart(0, 0, 0.9, MC.red));
  if (a > 48.97) g += at(a, 49.0, 560, 90, chip(0, 0, 'अनसूया', MC.red, 28));
  if (a > 51.12) g += at(a, 51.2, 760, 190, `<g>${fire(0, 20, 0.35, a)}</g>`) + at(a, 51.9, 760, 166, cross(0, 0, 1.2)) + at(a, 52.4, 760, 100, chip(0, 0, 'ईर्ष्या-रहित', MC.green, 24));
  return g;
});

// 55.97 → 67.79 heaven: Narad praises Anasuya
const NARAD_SC = mk((a) => {
  let g = heaven(a);
  const nx = lerp(-100, 200, ease(prog(a, 56.0, 59.4)));
  g += fig(NARAD, nx, FL + 20, 0.44, false, P(a, 0, { legSwing: walk(a, a < 59.4), armF: a > 61 ? -45 + sway(a, 10, 3) : 8 }));
  DEVIS.forEach((o, i) => { const t = [60.26, 63.7, 64.8][i]; if (a > t - 0.3) g += fade(prog(a, t - 0.3, t + 0.3), fig(o, 470 + i * 150, FL + 20, 0.44, true, P(a, i))); });
  g += at(a, 61.2, 470, 120, chip(0, 0, 'लक्ष्मी', MC.pink, 22)) + at(a, 63.9, 620, 120, chip(0, 0, 'पार्वती', MC.red, 22)) + at(a, 65.0, 770, 120, chip(0, 0, 'सरस्वती', MC.blue, 22));
  if (a > 65.76) g += at(a, 65.8, 260, 110, thought(0, 0, `${hut(0, 36, 0.28)}${fig(ANAS, 10, 60, 0.12, true, {}, { skin: '#eab88a' })}`, 0.8));
  return g;
});

// 67.79 → 79.41 the goddesses are stung; they send their husbands
const ENVY = mk((a) => {
  let g = heaven(a);
  const ang = a > 67.79 && a < 70.5;
  DEVIS.forEach((o, i) => {
    g += fig(o, 150 + i * 140, FL + 20, 0.44, false, P(a, i, { armF: a > 70.03 ? -75 + sway(a, 5, 4) : 8, headTilt: ang ? 8 : 0 }));
    if (ang) g += at(a, 67.9 + i * 0.1, 150 + i * 140 + 20, 140, `<path d="M-16,-6 L-4,-20 L0,-6 L12,-18 M-14,10 L2,0 L6,14" fill="none" stroke="${MC.red}" stroke-width="6" stroke-linecap="round"/>`);
  });
  GODS.forEach((o, i) => { if (a > 72.8 - i * 0.2) g += fade(prog(a, 72.6, 73.4), fig(o, 640 + i * 120, FL + 20, 0.44, true, P(a, i, { headTilt: a > 74.94 ? 10 * Math.sin(a * 5) : 0, armF: a > 74.94 ? -50 : 8 }))); });
  if (a > 72.8) g += at(a, 73.0, 480, 50, chip(0, 0, 'ब्रह्मा · विष्णु · महेश', MC.blue, 22));
  if (a > 76.5) g += at(a, 76.6, 560, 250, heart(0, 0, 0.8, MC.pink));
  return g;
});

// 79.41 → 86.07 gods in disguise walk to the ashram; Atri is away
const ARRIVE = mk((a) => {
  let g = bgForest(a) + hut(690, FL + 6, 1.0);
  const x = (i: number) => lerp(-100 - i * 100, 270 + i * 100, ease(prog(a, 79.6 + i * 0.1, 82.6)));
  SAGES.forEach((o, i) => { g += fig(o, x(i), FL + 40, 0.42, false, P(a, i, { legSwing: walk(a, a < 82.6, i) })); });
  if (a < 80.8) g += `<circle cx="200" cy="${FL - 100}" r="${60 + 200 * prog(a, 79.4, 80.4)}" fill="url(#flash)" opacity="${(1 - prog(a, 79.8, 80.8)).toFixed(2)}"/>`;
  const ax = lerp(780, 1150, ease(prog(a, 82.74, 85.5)));
  g += fig(ATRI, ax, FL + 40, 0.42, false, P(a, 0, { legSwing: walk(a, a > 82.74) }));
  if (a > 82.74) g += at(a, 82.9, 560, 90, chip(0, 0, 'अत्रि बाहर', MC.saffron, 22));
  return g;
});

// 86.07 → 94.14 welcome and serving
const SERVE = mk((a) => {
  let g = bgForest(a) + hut(170, FL + 6, 0.9);
  const seat = a > 89.52;
  const ax = a < 91.13 ? 360 : a < 92.0 ? lerp(360, 250, ease(prog(a, 91.13, 92.0))) : lerp(250, 380, ease(prog(a, 92.0, 93.4)));
  g += fig(ANAS, ax, FL + 40, 0.44, false, P(a, 0, { armF: a < 88.6 || (a > 89.5 && a < 91) ? -100 : -40, legSwing: walk(a, a > 91.13 && a < 93.4) }), { skin: '#eab88a' });
  SAGES.forEach((o, i) => {
    const x = 620 + i * 110;
    g += seat ? mat(x, FL + 60, 70) + seated(o, x, FL + 6, 0.4, true, P(a, i), {}, MC.red) : fig(o, x, FL + 40, 0.42, true, P(a, i));
  });
  if (a > 92.45) g += at(a, 92.5, 470, FL - 60, bowl(0, 0, 1.2, a));
  if (a > 86.07 && a < 89) g += at(a, 86.5, 360, 130, chip(0, 0, 'स्वागत', MC.green, 24));
  return g;
});

// 94.14 → 106.62 the condition; Anasuya stays silent
const CONDITION = mk((a) => {
  let g = bgForest(a) + hut(170, FL + 6, 0.9);
  g += fig(ANAS, 380, FL + 40, 0.44, false, P(a, 0, { headTilt: a > 99 ? 14 : 0, armF: a > 99 ? 8 : -40 }), { skin: '#eab88a' });
  SAGES.forEach((o, i) => { const x = 620 + i * 110; g += mat(x, FL + 60, 70) + seated(o, x, FL + 6, 0.4, true, P(a, i, { armF: a > 94.14 && a < 104 ? -50 + sway(a, 10, 3 + i) : 8 }), {}, MC.red); });
  if (a > 94.14) g += at(a, 94.3, 700, 110, chip(0, 0, 'शर्त', MC.red, 28));
  if (a > 98.87) g += at(a, 99.0, 520, 150, thought(0, 0, cloth(0, 0, 1.1) + bowl(-70, 60, 0.5, a), 0.8)).replace('translate(520,150)', 'translate(560,160)');
  if (a > 102.5) g += at(a, 102.6, 330, 150, bubble(0, 0, '…', 120, 40));
  return g;
});

// 106.62 → 114.28 the dilemma
const DILEMMA = mk((a) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += fig(ANAS, 480, FL + 40, 0.5, false, P(a, 0, { armF: -120, elbowF: 50, headTilt: 12 }), { skin: '#eab88a' });
  g += at(a, 106.7, 250, 130, thought(0, 0, `${bowl(0, 20, 1.2, a)}`, 1.0));
  g += at(a, 106.9, 250, 330, chip(0, 0, 'अतिथि धर्म', MC.green, 24));
  g += at(a, 110.78, 720, 130, thought(0, 0, cloth(0, 0, 1.3), 1.0));
  g += glow(250, 130, 120, 0.4 * win(a, 106.6, 110.7, 0.3));
  return g;
});

// 114.28 → 126.01 meditation; sprinkling
const PRAY = mk((a) => {
  let g = bgForest(a) + glow(300, 250, 200 * clamp(prog(a, 114.3, 116)), 0.6);
  g += fig(ANAS, 330, FL + 40, 0.5, false, P(a, 0, { eyeOpen: a < 118.5 ? 0.1 : blink(a), armF: a < 119.7 ? -100 : -45, armB: a < 119.7 ? -100 : -6, headTilt: 6 }), { skin: '#eab88a' });
  SAGES.forEach((o, i) => { const x = 640 + i * 110; g += mat(x, FL + 60, 70) + seated(o, x, FL + 6, 0.4, true, P(a, i), {}, MC.red); });
  if (a > 114.8 && a < 119.7) g += at(a, 115.0, 330, 110, thought(0, 0, fig(ATRI, 0, 50, 0.12, true), 0.8)).replace('translate(330,110)', 'translate(190,130)');
  if (a > 119.7) g += at(a, 119.8, 470, FL - 140, kamandal(0, 0, 1.3, a > 122.4 ? 40 : 0));
  if (a > 122.41) g += drops(a, 122.4, 123.6, 500, FL - 170, 700, FL - 150, 10);
  if (a > 124.0 && a < 126) g += `<circle cx="700" cy="${FL - 120}" r="${60 + 200 * prog(a, 124.0, 125.5)}" fill="url(#flash)" opacity="${(1 - prog(a, 124.8, 126)).toFixed(2)}"/>`;
  return g;
});

// 126.01 → 143.46 sages become babies; Anasuya cradles them
const BABIES = mk((a) => {
  let g = bgForest(a) + hut(150, FL + 6, 0.85);
  const sh = ease(prog(a, 126.4, 128.6));
  if (a < 136.0) {
    SAGES.forEach((o, i) => {
      const x = 560 + i * 120;
      g += mat(x, FL + 60, 70);
      if (sh < 1) g += seated(o, x, FL + 6, lerp(0.4, 0.12, sh), true, P(a, i), {}, MC.red);
      else g += fade(prog(a, 128.6, 129.2), baby(x, FL + 40, 0.9)) + glow(x, FL - 10, 56, 0.5);
    });
    g += fig(ANAS, 340, FL + 40, 0.46, false, P(a, 0, { armF: a > 130 ? -40 : -60, headTilt: 6 }), { skin: '#eab88a' });
    if (a > 126.2 && a < 128.6) g += `<circle cx="680" cy="${FL - 100}" r="${60 + 260 * prog(a, 126.2, 127.6)}" fill="url(#flash)" opacity="${(1 - prog(a, 127, 128.6)).toFixed(2)}"/>`;
    if (a > 133.17) g += at(a, 133.3, 560, 150, cloth(0, 0, 1.3, true)) ;
    if (a > 133.17) g = g.replace(cloth(0, 0, 1.3, true), cloth(0, 0, 1.3, true));
    if (a > 129.5 && a < 133) g += at(a, 129.6, 680, 170, chip(0, 0, 'नन्हे शिशु', MC.red, 26));
  } else {
    g += cradle(650, FL + 30, 1.1, a, 3);
    g += fig(ANAS, 360, FL + 40, 0.5, false, P(a, 0, { armF: -50 + sway(a, 6, 2) }), { skin: '#eab88a' });
    if (a > 136.0) g += at(a, 136.2, 480, 190, heart(0, 0, 1.4, MC.pink));
    if (a > 139.04) for (let i = 0; i < 6; i++) { const p = prog(a, 139.1 + i * 0.25, 140.2 + i * 0.25); if (p > 0 && p < 1) g += `<circle cx="${lerp(420, 600, p).toFixed(1)}" cy="${(FL - 150 - 30 * Math.sin(p * Math.PI) + 60 * p).toFixed(1)}" r="6" fill="#fff" ${S(1.5)}/>`; }
    if (a > 141.54) g += at(a, 141.7, 820, 120, moon(0, 0, 34, 0.7)) + at(a, 142.0, 760, 190, star(0, 0, 12)) + at(a, 142.2, 880, 200, star(0, 0, 10));
  }
  return g;
});

// 143.46 → 154.12 the goddesses wait and worry
const WAIT = mk((a) => {
  let g = heaven(a) + `<g opacity="${(0.5 + 0.5 * Math.sin(a)).toFixed(2)}"/>`;
  const sunx = lerp(120, 820, prog(a, 143.5, 150));
  g += `<g>${moon(sunx, 70, 26, 0.6)}</g>`;
  const wk = prog(a, 150.2, 153.8);
  DEVIS.forEach((o, i) => {
    const x = lerp(250 + i * 130, 440 + i * 130, ease(wk));
    g += fig(o, x, FL + 20, 0.44, false, P(a, i, { armF: a > 148.84 ? -125 : 8, elbowF: a > 148.84 ? 40 : 0, legSwing: walk(a, a > 150.2 && a < 153.8, i), headTilt: a > 148.84 ? 6 * Math.sin(a * 4) : 0 }));
    if (a > 148.84) g += at(a, 149.0 + i * 0.15, x + 30, FL - 250, `<path d="M0,-6 C-8,8 8,8 0,-6Z" fill="#7ec3f0" ${S(2)} transform="translate(0,${(10 * Math.sin(a * 3 + i)).toFixed(1)})"/>`);
  });
  if (a > 143.46) g += at(a, 143.6, 480, 110, `<g>${[0, 1, 2].map((i) => `<g transform="translate(${(i - 1) * 90},0)">${crown(0, 0, 1.0)}</g>`).join('')}</g>`);
  if (a > 143.6) g += at(a, 144.2, 480, 150, `<text x="0" y="0" text-anchor="middle" font-family="NSB" font-weight="800" font-size="40" fill="${MC.red}">?</text>`);
  if (a > 151.5) g += fade(prog(a, 151.5, 152.1), fig(NARAD, 800, FL + 20, 0.44, true, P(a, 3)));
  return g;
});

// 154.12 → 165.40 Narad tells them; they set off
const TELL = mk((a) => {
  let g = heaven(a);
  g += fig(NARAD, 720, FL + 20, 0.46, true, P(a, 0, { headTilt: a > 154.1 ? 8 * Math.sin(a * 6) : 0, armF: -50 + sway(a, 8, 3) }));
  if (a > 157.04) g += at(a, 157.1, 520, 110, thought(0, 0, cradle(0, 40, 0.4, a, 3), 1.0));
  const wk = ease(prog(a, 160.9, 165.2));
  DEVIS.forEach((o, i) => { g += fig(o, lerp(150 + i * 110, 290 + i * 110 + 0, wk) + 0, FL + 20, 0.44, false, P(a, i, { armF: a < 160.9 ? -60 : 8, legSwing: walk(a, a > 160.9, i) })); });
  if (a > 161.3) g += at(a, 161.4, 140, 120, hut(0, 80, 0.3));
  return g;
});

// 165.40 → 177.50 apology and the return of the gods
const RETURN = mk((a) => {
  let g = bgForest(a) + hut(870, FL + 6, 0.7);
  DEVIS.forEach((o, i) => { g += fig(o, 120 + i * 100, FL + 40, 0.42, false, P(a, i, { armF: -100, armB: -100, headTilt: 12 })); });
  g += fig(ANAS, 500, FL + 40, 0.46, true, P(a, 0, { armF: a > 170.42 && a < 173 ? -110 : -40 }), { skin: '#eab88a' });
  g += at(a, 166.0, 220, 110, chip(0, 0, 'क्षमा', MC.red, 28));
  const cr = 1 - prog(a, 172.6, 173.4);
  if (cr > 0) g += fade(cr, cradle(740, FL + 30, 0.9, a, 3));
  if (a > 170.42 && a < 173.2) g += drops(a, 170.4, 171.4, 540, FL - 170, 720, FL - 120, 10);
  if (a > 172.8 && a < 175) g += `<circle cx="740" cy="${FL - 120}" r="${60 + 260 * prog(a, 172.8, 174)}" fill="url(#flash)" opacity="${(1 - prog(a, 173.5, 175)).toFixed(2)}"/>`;
  if (a > 173.1) GODS.forEach((o, i) => { g += fade(prog(a, 173.1 + i * 0.1, 173.8 + i * 0.1), fig(o, 690 + i * 100, FL + 40, 0.42, true, P(a, i))); });
  return g;
});

// 177.50 → 192.64 the boon
const BOON = mk((a) => {
  let g = bgPlain('#fbe9bf', '#c9a25e') + glow(700, 230, 300, 0.7);
  g += fig(ANAS, 280, FL + 40, 0.5, false, P(a, 0, { armF: -100, armB: -100, headTilt: 6 }), { skin: '#eab88a' });
  GODS.forEach((o, i) => { g += fig(o, 560 + i * 130, FL + 40, 0.46, true, P(a, i, { armF: -60 + sway(a, 5, 2 + i) })); });
  g += at(a, 177.6, 700, 90, chip(0, 0, 'वरदान', MC.yellow, 28));
  if (a > 183.6) g += at(a, 183.7, 280, 130, thought(0, 0, [-50, 0, 50].map((x, i) => baby(x, 10 + 8 * Math.sin(a * 2 + i), 0.5)).join(''), 0.9));
  if (a > 188.86) { for (let i = 0; i < 12; i++) g += `<line x1="700" y1="230" x2="${(700 + 520 * Math.cos((i * Math.PI) / 6 + a * 0.2)).toFixed(1)}" y2="${(230 + 520 * Math.sin((i * Math.PI) / 6 + a * 0.2)).toFixed(1)}" stroke="${MC.yellow}" stroke-width="5" opacity="${(0.25 * prog(a, 188.9, 189.6)).toFixed(2)}"/>`; g += at(a, 189.0, 480, 80, chip(0, 0, 'तथास्तु', MC.red, 32)); }
  return g;
});

// 192.64 → 201.95 Atri returns and bows
const ATRIBACK = mk((a) => {
  let g = bgForest(a) + hut(150, FL + 6, 0.85);
  const ax = lerp(-60, 330, ease(prog(a, 192.6, 195.2)));
  g += fig(ATRI, ax, FL + 40, 0.46, false, P(a, 0, { legSwing: walk(a, a < 195.2), armF: a > 195.5 ? -100 : 8, armB: a > 195.5 ? -100 : -6, eyeOpen: a > 195.5 ? 0.1 : blink(a), headTilt: a > 195.5 ? 18 : 0 }));
  GODS.forEach((o, i) => { g += fig(o, 500 + i * 100, FL + 40, 0.44, true, P(a, i, { armF: -45 })); });
  g += fig(ANAS, 840, FL + 40, 0.44, true, P(a, 4), { skin: '#eab88a' });
  g += glow(660, 250, 220, 0.4);
  if (a > 199.2) g += petals(a, 5, 30) + at(a, 199.4, 480, 90, heart(0, 0, 1.4, MC.pink));
  return g;
});

// 201.95 → 218.0 birth of Dattatreya and the meaning of the name
const BIRTH = mk((a) => {
  let g = bgForest(a);
  const t = prog(a, 201.95, 207.0);
  g += hut(150, FL + 6, 0.75);
  g += fig(ATRI, 660, FL + 40, 0.44, true, P(a, 0, { armF: a > 208 ? -100 : 8, armB: a > 208 ? -100 : -6 }));
  g += fig(ANAS, 300, FL + 40, 0.44, false, P(a, 1, { armF: a > 208 ? -100 : -40, armB: a > 208 ? -100 : -6 }), { skin: '#eab88a' });
  if (a > 204.31) {
    const k = prog(a, 204.31, 205.6);
    g += glow(480, FL - 40, 150 * k, 0.8) + `<g transform="translate(480,${FL + 5}) scale(${pop(a, 204.4)})">${baby(0, 0, 1.3)}</g>` + at(a, 205.0, 480, FL - 170, lotus(0, 0, 0.6, clamp(prog(a, 205, 206.5))));
  }
  if (a > 208.34) g += at(a, 208.4, 330, 110, chip(0, 0, 'दत्त', MC.blue, 30)) + at(a, 209.0, 330, 160, chip(0, 0, 'दिया हुआ', MC.saffron, 22));
  if (a > 210.55) g += at(a, 210.6, 630, 110, chip(0, 0, 'आत्रेय', MC.green, 30)) + at(a, 211.2, 630, 160, chip(0, 0, 'अत्रि का पुत्र', MC.saffron, 22));
  if (a > 214.16) g += at(a, 214.6, 480, 50, chip(0, 0, 'वरदान का बालक', MC.red, 26));
  return g;
});

// 218 → 235.97 two versions
const TWO = mk((a) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += `<line x1="480" y1="60" x2="480" y2="${FL + 20}" stroke="${INK}" stroke-width="4" stroke-dasharray="4 10"/>`;
  g += at(a, 218.1, 480, 60, chip(0, 0, 'कथा के दो रूप', MC.red, 26));
  g += at(a, 221.02, 240, 160, book(0, 0, 1.0, 0.5)) + at(a, 221.4, 240, 250, chip(0, 0, 'मार्कण्डेय पुराण', MC.maroon, 24));
  if (a > 227.21) {
    const sp = [[130, '#f6e9c8', 'moon'], [240, '#4f86be', 'datta'], [350, '#e0866a', 'fire']];
    sp.forEach(([x, col, kind], i) => {
      const t = [227.3, 230.55, 232.9][i];
      g += at(a, t, x as number, FL - 20, baby(0, 0, 0.8));
      g += glow(x as number, FL - 40, 60 * clamp(prog(a, t, t + 0.5)), 0.6);
      if (a > t) g += at(a, t + 0.2, x as number, FL - 120, kind === 'moon' ? moon(0, 0, 26, 0.5) : kind === 'fire' ? fire(0, 20, 0.4, a) : star(0, 0, 24));
    });
    g += at(a, 229.9, 130, 300, chip(0, 0, 'सोम', MC.blue, 22)) + at(a, 233.6, 350, 300, chip(0, 0, 'दुर्वासा', MC.red, 22));
  }
  if (a > 235.5) g += fade(prog(a, 235.5, 236), '');
  g += at(a, 221.5, 720, 160, temple(0, 130, 0.5)) + at(a, 221.9, 720, 250, chip(0, 0, 'दत्त संप्रदाय', MC.saffron, 24));
  if (a > 227.21) g += at(a, 227.4, 720, 330, fig(DATTA, 0, 100, 0.27, false, P(a, 0, { armF: -45 })));
  return g;
});

// 235.97 → 254.32 three in one: three faces, six hands, Vishnu avatar
const TRIMUKH = mk((a) => {
  let g = bgForest(a) + glow(480, 230, 280, 0.6);
  g += fig(DATTA, 480, FL + 40, 0.5, false, P(a, 0, { armF: -100, armB: -100 }));
  const fc = ['#e0866a', '#2c5e9e', '#cfe0f0'];
  const m = ease(prog(a, 236.0, 240.0));
  fc.forEach((c, i) => {
    const ox = lerp([-300, 0, 300][i], (i - 1) * 62, m), oy = lerp(150 + 30 * i, 112, m);
    g += `<g transform="translate(${480 + ox},${oy + 0})">${face(0, 0, lerp(34, 28, m), c)}</g>`;
  });
  if (a > 244.02) {
    const pos = [[270, 200], [190, 290], [270, 380], [640, 200], [720, 290], [640, 380]];
    const gl = [`<g transform="translate(0,14)">${conch(0, 0, 0.8)}</g>`, `<g transform="translate(0,6) scale(.28)">${trident}</g>`, lotus(0, 22, 0.42, 1), `<circle r="26" fill="${MC.yellow}" ${S(4)}/><circle r="7" fill="${INK}"/><path d="M0,-26 L0,26 M-26,0 L26,0 M-18,-18 L18,18 M18,-18 L-18,18" stroke="${INK}" stroke-width="2"/>`, kamandal(0, -6, 0.6), `<path d="M-26,-22 L0,0 L-26,22Z M26,-22 L0,0 L26,22Z" fill="${MC.red}" ${S(3)}/>`];
    pos.forEach((p, i) => { g += at(a, 244.2 + i * 0.4, p[0], p[1], `<circle r="44" fill="${MC.cream}" ${S(4)}/>${gl[i]}`); });
  }
  if (a > 239.96) g += at(a, 240.1, 480, 48, chip(0, 0, 'तीन मुख · छह हाथ', MC.red, 26));
  if (a > 249.64) g += at(a, 249.8, 850, 130, `<circle r="64" fill="${MC.cream}" ${S(4)}/>${fig(KRISH, 0, 66, 0.2, false, {})}`) + at(a, 250.3, 850, 225, chip(0, 0, 'विष्णु अवतार', MC.blue, 22));
  return g;
});

// 254.32 → 264.62 cow and four dogs
const COWDOG = mk((a) => {
  let g = bgForest(a);
  g += fig(DATTA, 480, FL + 40, 0.5, false, P(a, 0, { armF: -40 }));
  g += glow(480, 240, 200, 0.4);
  if (a > 254.4) g += at(a, 254.6, 760, FL + 40, animal('cow', 0, 0, 1.0, true, a));
  g += dogs(70, FL + 50, 0.62, a, 255.4, false);
  if (a > 258.91) g += at(a, 259.0, 660, 170, earth(0, 0, 1.2)) + at(a, 259.6, 660, 90, chip(0, 0, 'पृथ्वी', MC.green, 22));
  if (a > 261.52) for (let i = 0; i < 4; i++) g += at(a, 261.6 + i * 0.3, 140 + i * 90, 190 - 6 * i, book(0, 0, 0.28, 0));
  if (a > 261.52) g += at(a, 262.8, 260, 110, chip(0, 0, 'चार वेद', MC.red, 22));
  return g;
});

// 264.62 → 274.97 avadhut: free of every bond
const AVADHUT = mk((a) => {
  let g = bgForest(a) + glow(480, 260, 240, 0.4);
  const x = lerp(220, 600, ease(prog(a, 264.7, 274.5)));
  g += fig(DATTA, x, FL + 40, 0.5, false, P(a, 0, { legSwing: walk(a, true), armF: -40 + sway(a, 8, 3) }));
  g += at(a, 264.8, 480, 90, chip(0, 0, 'अवधूत', MC.saffron, 30));
  if (a > 267.59) {
    for (let i = 0; i < 5; i++) { const p = prog(a, 267.7 + i * 0.1, 270.4); const lx = 300 + i * 60, ly = lerp(300, FL + 60, p * p); g += `<g transform="translate(${lx},${ly}) rotate(${p * (i % 2 ? 160 : -160)})"><ellipse rx="22" ry="12" fill="none" stroke="#7a7a7a" stroke-width="7"/></g>`; }
    g += bird(700, 140 + 20 * Math.sin(a * 2), 0.5, Math.sin(a * 6)) + bird(800, 100, 0.4, Math.sin(a * 6 + 1));
  }
  return g;
});

// 274.97 → 286.76 King Yadu asks the avadhut
const YADU_SC = mk((a) => {
  let g = bgForest(a);
  g += fig(YADU, lerp(100, 270, ease(prog(a, 275, 277))), FL + 40, 0.46, false, P(a, 0, { legSwing: walk(a, a < 277), armF: a > 278.6 ? -50 + sway(a, 6, 3) : 8 }));
  g += mat(700, FL + 60, 80) + seated(DATTA, 700, FL + 6, 0.44, true, P(a, 1, { armF: a > 284.55 ? -60 : 0 }), {}, MC.saffron);
  g += at(a, 275.2, 270, 90, chip(0, 0, 'राजा यदु', MC.blue, 24));
  if (a > 278.66) g += at(a, 278.8, 400, 130, thought(0, 0, `<text x="0" y="22" text-anchor="middle" font-family="NSB" font-weight="800" font-size="70" fill="${MC.red}">?</text>`, 0.9));
  if (a > 284.55) g += at(a, 284.7, 700, 120, chip(0, 0, '२४ गुरु', MC.red, 34)) + glow(700, 300, 150, 0.4);
  return g;
});

// 286.76 → 306.88 the twenty-four gurus: icons
const GURUS = mk((a) => {
  let g = bgForest(a) + glow(480, 330, 260, 0.35);
  g += fig(DATTA, 480, FL + 50, 0.46, false, P(a, 0, { armF: -45 + sway(a, 5, 2) }));
  const ic: [number, string][] = [
    [286.9, earth(0, 0, 1)], [289.6, wind(0, 0, 1, a)], [294.3, skyIcon(0, 0, 1)], [297.1, water(0, 0, 1, a)], [301.6, bee(0, 0, 1.2, a)], [303.5, pigeon(0, 0, 1)], [305.0, python(0, 0, 1, a)],
  ];
  const pos = [[100, 150], [220, 250], [100, 340], [235, 410], [650, 170], [780, 270], [660, 360]];
  ic.forEach(([t, svg], i) => {
    if (a > t) g += at(a, t, pos[i][0], pos[i][1] + 4 * Math.sin(a * 2 + i), `<circle r="54" fill="${MC.cream}" opacity=".9" ${S(3)}/><g transform="scale(.85)">${svg}</g>`);
  });
  g += at(a, 286.9, 480, 60, chip(0, 0, 'चौबीस गुरु', MC.red, 28));
  return g;
});

// 306.88 → 321.96 the whole world can be a teacher
const WORLD = mk((a) => {
  let g = bgForest(a) + glow(480, 250, 290, 0.6);
  g += fig(DATTA, 480, FL + 50, 0.5, false, P(a, 0, { armF: a > 317.3 ? -100 : -45, armB: a > 317.3 ? -100 : -6 }));
  const ic = [earth(0, 0, 0.7), wind(0, 0, 0.7, a), skyIcon(0, 0, 0.7), water(0, 0, 0.7, a), bee(0, 0, 0.9, a), python(0, 0, 0.7, a), moon(0, 0, 36, 0.5), sunFace(0, 0, 32)];
  if (a > 306.9 && a < 317.3) ic.forEach((svg, i) => { const an = a * 0.4 + (i * Math.PI * 2) / ic.length; g += `<g transform="translate(${(480 + 330 * Math.cos(an)).toFixed(1)},${(260 + 130 * Math.sin(an)).toFixed(1)}) scale(${(0.5 + 0.5 * prog(a, 306.9 + i * 0.2, 307.8 + i * 0.2)).toFixed(2)})">${svg}</g>`; });
  if (a > 306.88 && a < 317.3) g += at(a, 307.0, 480, 70, chip(0, 0, 'दत्तात्रेय', MC.blue, 28));
  if (a > 311.76 && a < 317.3) g += at(a, 311.9, 480, 120, chip(0, 0, 'सारी दुनिया गुरु', MC.red, 26));
  if (a > 317.33) g += at(a, 317.5, 480, 60, chip(0, 0, 'गुरु का रूप', MC.saffron, 30)) + at(a, 318.0, 480, 160, lotus(0, 0, 0.6, 1)) + petals(a, 8, 20);
  return g;
});

// 321.96 → 338.27 the date
const DATE = mk((a) => {
  let g = bgNight(a);
  g += glow(230, 190, 220, 0.4) + `<circle cx="230" cy="190" r="${80 + 3 * Math.sin(a * 2)}" fill="#fff6d8" ${S(4)}/>`;
  g += at(a, 322.1, 230, 330, chip(0, 0, 'मार्गशीर्ष पूर्णिमा', MC.yellow, 28));
  if (a > 326.48 && a < 330.68) g += at(a, 326.6, 480, 270, `<g><rect x="-140" y="-110" width="280" height="220" rx="16" fill="${MC.cream}" ${S(5)}/><rect x="-140" y="-110" width="280" height="64" rx="16" fill="${MC.red}" ${S(5)}/>${T(0, -62, 'दिसंबर', 36, MC.cream)}${T(0, 52, '२३', 100, MC.maroon)}</g>`).replace('translate(480,270)', 'translate(640,250)') + at(a, 327.4, 640, 410, chip(0, 0, 'बुधवार', MC.yellow, 28));
  if (a > 330.68) {
    const tile = (x: number, n: string, col: string) => `<g transform="translate(${x},0)"><rect x="-100" y="-90" width="200" height="180" rx="14" fill="${MC.cream}" ${S(5)}/><rect x="-100" y="-90" width="200" height="46" rx="14" fill="${col}" ${S(5)}/>${T(0, -56, 'दिसंबर', 26, MC.cream)}${T(0, 52, n, 80, MC.maroon)}</g>`;
    g += at(a, 330.8, 640, 250, tile(-120, '२३', MC.red) + tile(120, '२४', MC.saffron)) + at(a, 331.6, 640, 380, `<rect x="-230" y="-14" width="460" height="28" rx="14" fill="#fff6d8" ${S(3)}/>${T(0, 7, 'पूर्णिमा तिथि', 20, MC.maroon, 'Hind')}`);
  }
  if (a > 334.28) g += at(a, 334.4, 640, 450, chip(0, 0, 'अपना पंचांग देखें', MC.green, 24)) + at(a, 334.6, 880, 110, book(0, 0, 0.5, 0.4));
  return g;
});

const crowd = (a: number, n: number, x0: number, x1: number, y: number, s: number, t0: number) => { let g = ''; for (let i = 0; i < n; i++) { const o = i % 2 ? WOMAN : MAN; if (a > t0 + i * 0.15) g += fade(prog(a, t0 + i * 0.15, t0 + 0.5 + i * 0.15), fig(o, lerp(x0, x1, (i + 0.5) / n), y + (i % 3) * 14, s, i % 2 === 0, P(a, i, { armF: -70 + sway(a, 15, 4 + i) }), o === WOMAN ? { skin: '#d9915a' } : {})); } return g; };
const note = (x: number, y: number, a: number, t0: number) => { const p = prog(a, t0, t0 + 2); return p > 0 && p < 1 ? `<text x="${x + 10 * Math.sin(a * 3)}" y="${y - 70 * p}" font-family="NSB" font-weight="800" font-size="34" fill="${MC.maroon}" opacity="${(1 - p).toFixed(2)}">♪</text>` : ''; };

// 338.27 → 346.96 Maharashtra: bhajans, Gurucharitra
const MAHA = mk((a) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + temple(480, FL - 10, 0.8);
  g += crowd(a, 6, 80, 880, FL + 60, 0.34, 338.4);
  for (let i = 0; i < 5; i++) g += note(160 + i * 160, FL - 120, a, 339 + i * 0.7 + (a > 342 ? 0 : 0)) + note(200 + i * 150, FL - 100, a, 340.5 + i * 0.8);
  g += at(a, 338.5, 480, 70, chip(0, 0, 'महाराष्ट्र', MC.saffron, 28));
  if (a > 343.0) g += at(a, 343.2, 800, 210, book(0, 0, 0.7, 0.5)) + at(a, 343.6, 800, 120, chip(0, 0, 'गुरुचरित्र', MC.maroon, 22));
  return g;
});

// 346.96 → 352.6 pilgrim sites crowd
const TIRTH = mk((a) => {
  let g = bgForest(a) + temple(300, FL - 14, 0.6) + temple(700, FL - 14, 0.5);
  g += crowd(a, 10, 60, 900, FL + 50, 0.3, 347.0);
  g += at(a, 347.1, 300, 70, chip(0, 0, 'नरसोबावाडी', MC.red, 22)) + at(a, 349.0, 700, 70, chip(0, 0, 'औदुंबर', MC.green, 22));
  return g;
});

// 352.6 → 359.09 Karnataka, Gujarat
const KARGUJ = mk((a) => {
  let g = bgForest(a) + temple(250, FL - 14, 0.7);
  g += at(a, 352.7, 250, 70, chip(0, 0, 'कर्नाटक · गाणगापुर', MC.blue, 22));
  g += crowd(a, 4, 330, 520, FL + 50, 0.3, 353);
  if (a > 354.35) g += `<path d="M560,${FL - 10} L720,200 L800,300 L900,${FL - 10}Z" fill="#8a6a4a" ${S(5)}/><path d="M640,${FL - 10} L720,260 L780,${FL - 10}Z" fill="#a8845a" ${S(3)}/>` + at(a, 354.6, 720, 190, temple(0, 0, 0.22)) + at(a, 354.5, 720, 70, chip(0, 0, 'गुजरात · गिरनार', MC.red, 22));
  return g;
});

// 359.09 → 368.03 climbing Girnar
const GIRNAR = mk((a) => {
  let g = bgForest(a).replace(/<rect[^>]*fill="#c9a25e"[^>]*\/>/, '');
  g += `<path d="M-20,${FL + 40} L420,150 L560,150 L980,${FL + 40}Z" fill="#8a6a4a" ${S(5)}/><path d="M300,${FL + 40} L470,150 L560,150 L760,${FL + 40}Z" fill="#a8845a" ${S(3)}/>`;
  const pts = [[200, FL + 20], [320, 380], [260, 330], [400, 290], [340, 240], [450, 200], [490, 160]];
  g += `<path d="M${pts.map((p) => p.join(',')).join(' L')}" fill="none" stroke="${MC.cream}" stroke-width="14" stroke-linecap="round"/><path d="M${pts.map((p) => p.join(',')).join(' L')}" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="6 6"/>`;
  g += temple(520, 156, 0.2);
  for (let i = 0; i < 4; i++) { const p = clamp(prog(a, 359.3 + i * 0.5, 367.5) ); const k = p * (pts.length - 1); const j = Math.min(pts.length - 2, Math.floor(k)); const x = lerp(pts[j][0], pts[j + 1][0], k - j), y = lerp(pts[j][1], pts[j + 1][1], k - j); g += fig(i % 2 ? WOMAN : MAN, x + i * 8, y + 10, 0.2, false, P(a, i, { legSwing: 10 * Math.sin(a * 8 + i) }), i % 2 ? { skin: '#d9915a' } : {}); }
  g += at(a, 359.2, 200, 70, chip(0, 0, 'हज़ारों सीढ़ियाँ', MC.red, 26));
  if (a > 363.39) g += at(a, 363.5, 200, 130, chip(0, 0, 'पैदल, श्रद्धा से', MC.green, 22)) + glow(520, 156, 60 * clamp(prog(a, 365, 366)), 0.7);
  return g;
});

// 368.03 → 378.31 decorating the cradle
const PALNA = mk((a) => {
  let g = bgPlain('#fbe9bf', '#c9a25e') + glow(480, 250, 260, 0.5);
  g += cradle(480, FL + 40, 1.25, a, 1);
  g += fig(WOMAN, 230, FL + 40, 0.46, false, P(a, 0, { armF: a > 372.76 ? -55 + sway(a, 8, 2.5) : -40 }), { skin: '#d9915a' });
  g += fig(MAN, 740, FL + 40, 0.46, true, P(a, 1, { armF: a > 372.76 ? -55 + sway(a, 8, 2.5) : -40 }));
  g += at(a, 368.3, 480, 70, chip(0, 0, 'एक ख़ास रिवाज', MC.red, 26));
  if (a > 369.98) for (let i = 0; i < 5; i++) g += at(a, 370.0 + i * 0.3, 360 + i * 60, 190 + 8 * (i % 2), lotus(0, 0, 0.3, 1));
  if (a > 377.0) g += at(a, 377.1, 480, 140, star(0, 0, 26));
  return g + petals(a, 9, 12);
});

// 378.31 → 393.16 Anasuya's calm melts the gods' pride
const CALM = mk((a) => {
  let g = bgPlain('#fbe9bf', '#c9a25e') + glow(300, 250, 260, 0.6);
  g += fig(ANAS, 300, FL + 40, 0.52, false, P(a, 0, { armF: a > 386.88 ? -45 : -100, armB: a > 386.88 ? -45 : -100 }), { skin: '#eab88a' });
  if (a > 378.4 && a < 386.8) g += at(a, 378.6, 640, 190, `<text x="0" y="40" text-anchor="middle" font-family="NSB" font-weight="800" font-size="100" fill="${MC.red}">?</text>`);
  if (a > 381.95 && a < 386.8) g += at(a, 382.1, 560, 200, `${fire(0, 20, 0.4, a)}${cross(0, -20, 1.1)}`) + at(a, 383.4, 780, 200, `<path d="M0,-50 L-22,0 L2,0 L-14,50 L24,-8 L0,-8Z" fill="${MC.yellow}" ${S(4)}/>${cross(0, 0, 1.1)}`) + at(a, 382.4, 670, 110, chip(0, 0, 'न क्रोध, न श्राप', MC.green, 26));
  if (a > 386.88) {
    if (a < 391) g += heart(300, 160, 1.5 + 0.1 * Math.sin(a * 4), MC.pink);
    GODS.forEach((o, i) => { g += fig(o, 600 + i * 120, FL + 40, 0.44, true, P(a, i, { headTilt: 12 * ease(prog(a, 390.81, 392)), armF: -80 + 20 * ease(prog(a, 390.81, 392)) })); });
    g += glow(720, 300, 200 * clamp(prog(a, 390.8, 392)), 0.5);
    if (a > 390.81) g += at(a, 391.0, 720, 110, chip(0, 0, 'अहंकार पिघला', MC.red, 26));
  }
  return g;
});

// 393.16 → 405.4 Lohri: a bonfire in the January night
const LOHRI = mk((a) => {
  let g = bgNight(a, 'nightg');
  g += `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="#3a2a22"/>` + fire(480, FL + 30, 1.5, a);
  const n = 8;
  for (let i = 0; i < n; i++) { const an = (i * Math.PI * 2) / n + a * 0.5; const x = 480 + 300 * Math.cos(an), y = FL + 50 + 28 * Math.sin(an); const o = i % 2 ? WOMAN : MAN; if (a > 398.4 || i < 3) g += fade(i < 3 ? 1 : prog(a, 398.5 + i * 0.2, 399 + i * 0.2), fig(o, x, y, 0.3 + 0.05 * Math.sin(an), Math.cos(an) > 0, P(a, i, { armF: -110 + sway(a, 20, 6 + i), armB: -100 + sway(a, 20, 5 + i) }), o === WOMAN ? { skin: '#d9915a' } : {})); }
  g += at(a, 393.3, 480, 70, chip(0, 0, 'अगली कहानी', MC.yellow, 28)) + at(a, 395.0, 480, 130, T(0, 20, 'लोहड़ी', 56, MC.yellow));
  return g;
});

// 405.4 → 423.5 folk tale: the brave one who protected the daughters of the village
const HEROSC = mk((a) => {
  let g = bgNight(a, 'nightg') + `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="#3a2a22"/>` + fire(130, FL + 20, 0.8, a);
  g += at(a, 405.5, 480, 70, chip(0, 0, 'लोक कथा', MC.yellow, 28));
  g += fig(HERO, lerp(300, 460, ease(prog(a, 405.4, 409))), FL + 40, 0.5, false, P(a, 0, { legSwing: walk(a, a < 409), armF: -30 }));
  if (a > 410.74) {
    for (let i = 0; i < 4; i++) g += fade(prog(a, 410.9 + i * 0.4, 411.5 + i * 0.4), fig(WOMAN, 620 + i * 80, FL + 50 - (i % 2) * 14, 0.34, true, P(a, i, { armF: a > 415 ? -100 : 8, armB: a > 415 ? -100 : -6 }), { skin: '#d9915a' }));
    g += glow(560, 280, 220 * clamp(prog(a, 413.85, 415)), 0.5);
    g += at(a, 414.0, 640, 120, heart(0, 0, 1.2, MC.pink));
    if (a > 417.4) g += at(a, 417.6, 480, 170, star(0, 0, 22));
  }
  return g;
});

// 423.5 → 427.41 next video card
const NEXT = mk((a) => {
  let g = `<rect width="${W}" height="${H}" fill="${MC.maroon}"/>` + glow(480, 300, 300, 0.4);
  g += fire(480, FL, 1.0, a);
  g += at(a, 423.6, 480, 110, chip(0, 0, 'अगला वीडियो', MC.yellow, 28)) + at(a, 424.2, 480, 200, T(0, 0, 'लोहड़ी', 72, MC.yellow));
  return g;
});

// 427.41 → end comment + greeting
const END = mk((a) => {
  let g = bgPlain('#f7e2b0') + glow(480, 230, 260, 0.6);
  g += fig(DATTA, 480, FL + 40, 0.52, false, P(a, 0, { armF: a > 429.3 ? -100 : -45, armB: a > 429.3 ? -100 : -6 }));
  g += at(a, 427.5, 220, 150, bubble(0, 0, '…', 140, 44));
  g += fig(MAN, 220, FL + 40, 0.44, false, P(a, 1, { armF: -60 }));
  if (a > 429.3) g += at(a, 429.4, 480, 80, T(0, 0, 'जय गुरुदेव दत्त', 50, MC.red)) + petals(a, 7, 30);
  return g;
});

const LIST: [number, number, any][] = [
  [0, 14.32, HUT], [14.32, 24.25, HUT], [24.25, 29.16, TITLE], [29.16, 42.09, ASHRAM], [42.09, 55.97, PEACE], [55.97, 67.79, NARAD_SC], [67.79, 79.41, ENVY],
  [79.41, 86.07, ARRIVE], [86.07, 94.14, SERVE], [94.14, 106.62, CONDITION], [106.62, 114.28, DILEMMA], [114.28, 126.01, PRAY], [126.01, 136.01, BABIES], [136.01, 143.46, BABIES],
  [143.46, 154.12, WAIT], [154.12, 165.4, TELL], [165.4, 177.5, RETURN], [177.5, 192.64, BOON], [192.64, 201.95, ATRIBACK], [201.95, 208.34, BIRTH], [208.34, 218.0, BIRTH],
  [218.0, 227.21, TWO], [227.21, 235.97, TWO], [235.97, 244.02, TRIMUKH], [244.02, 254.32, TRIMUKH], [254.32, 264.62, COWDOG], [264.62, 274.97, AVADHUT], [274.97, 286.76, YADU_SC],
  [286.76, 297.05, GURUS], [297.05, 306.88, GURUS], [306.88, 311.76, WORLD], [311.76, 321.96, WORLD], [321.96, 330.68, DATE], [330.68, 338.27, DATE],
  [338.27, 346.96, MAHA], [346.96, 352.6, TIRTH], [352.6, 359.09, KARGUJ], [359.09, 368.03, GIRNAR], [368.03, 378.31, PALNA], [378.31, 386.88, CALM], [386.88, 393.16, CALM],
  [393.16, 405.4, LOHRI], [405.4, 410.74, HEROSC], [410.74, 423.5, HEROSC], [423.5, 427.41, NEXT], [427.41, TOTAL, END],
];
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
