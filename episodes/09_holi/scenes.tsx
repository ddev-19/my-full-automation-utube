// @ts-nocheck
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage } from './chrome';
import { defs } from './mb';
import {
  W, H, FL, INK, MC, S, fig, seated, figure, garland, sunFace, bird, tree, prog, ease, lerp, clamp, palace, cloud, fire, lotus, moon, temple, horse, chip, pop, xdefs, rnd, blink, sway,
  KRISH, MUNI, QUEEN, MAN, WOMAN, KAUR,
  book, frame, bgCourt, bgForest, bgNight, bgPlain, diya, bubble, couch, lying, badge,
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
const st = (s: string) => `<g>${s}</g>`;

// ---------- cast ----------
const HIRAN = { skin: '#b5574a', crown: 'king', beard: true, dhoti: MC.maroon, uttariya: MC.red };
const PRAH = { skin: '#f0c28e', dhoti: MC.yellow, uttariya: MC.saffron };
const HOLI = { female: true, skin: '#c98a5a' };
const NARAD = { skin: '#d9915a', bun: true, beard: true, dhoti: MC.white, uttariya: MC.pink };
const MOM = { female: true, skin: '#eab88a' };
const SHIVA = { skin: '#cfe0f0', bun: true, beard: true, dhoti: '#c9a25e', uttariya: MC.white };
const KAMA = { skin: '#f0c28e', crown: 'king', dhoti: MC.pink, uttariya: MC.green };
const YASH = { female: true, skin: '#d9915a' };
const RADHA = { female: true, skin: '#f6d3a8' };
const BRAHMA = { skin: '#e8b070', bun: true, beard: true, dhoti: MC.white, uttariya: MC.saffron };
const VISHNU = { ...KRISH, feather: false, uttariya: MC.red };
const GWAL = [{ ...MAN, uttariya: MC.red }, { ...MAN, skin: '#e0a06a', uttariya: MC.blue }, { ...MAN, skin: '#c98a5a', uttariya: MC.yellow }];
const GOPI = [{ female: true, skin: '#eab88a' }, { female: true, skin: '#d9915a' }, { female: true, skin: '#f0c28e' }];
const COLS = [MC.pink, MC.yellow, MC.green, MC.blue, MC.red, MC.saffron];

// ---------- helpers / props ----------
const GR = (c = '#3d2216') => `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="${c}"/>`;
const nightBg = (lt: number) => bgNight(lt) + GR();
const duskBg = () => `<rect width="${W}" height="${H}" fill="url(#warg)"/>` + `<rect x="0" y="${FL - 10}" width="${W}" height="${H}" fill="#7a3a22"/>`;
const cross = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-34,-34 L34,34 M34,-34 L-34,34" stroke="${MC.red}" stroke-width="10" stroke-linecap="round"/></g>`;
const tick = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-26,0 L-8,22 L30,-26" fill="none" stroke="${MC.green}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const card = (x: number, y: number, w: number, h: number, col = MC.cream) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="18" fill="${col}" ${S(4)}/>`;
const hut = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-50" y="-60" width="100" height="60" fill="${MC.yellow}" ${S(4)}/><path d="M-66,-60 L0,-112 L66,-60Z" fill="${MC.red}" ${S(4)}/><rect x="-14" y="-38" width="28" height="38" fill="#2b170a"/></g>`;
const pillar = (x: number, y: number, s = 1, crack = 0) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-50" y="-340" width="100" height="340" fill="${MC.cream}" ${S(5)}/><rect x="-62" y="-362" width="124" height="26" fill="${MC.yellow}" ${S(4)}/><rect x="-62" y="-14" width="124" height="24" fill="${MC.yellow}" ${S(4)}/>` + [-24, 0, 24].map((dx) => `<path d="M${dx},-320 L${dx},-40" stroke="${MC.red}" stroke-width="3" stroke-dasharray="3 9"/>`).join('') + (crack > 0 ? `<path d="M0,-340 L-12,-250 L14,-190 L-10,-120 L8,-40" fill="none" stroke="${INK}" stroke-width="${3 + 8 * crack}"/>` : '') + `</g>`;
const elephant = (x: number, y: number, s = 1, t = 0, lift = 0) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-110" rx="110" ry="70" fill="#9aa0b4" ${S(5)}/>` + [-70, -30, 30, 70].map((lx, i) => `<rect x="${lx - 14}" y="-60" width="28" height="${60 - (i === 3 ? 40 * lift : 0)}" rx="8" fill="#9aa0b4" ${S(4)}/>`).join('') + `<circle cx="110" cy="-150" r="52" fill="#9aa0b4" ${S(5)}/><path d="M140,-130 C176,-110 170,-50 150,-30" fill="none" stroke="#9aa0b4" stroke-width="26" stroke-linecap="round"/><path d="M140,-130 C176,-110 170,-50 150,-30" fill="none" ${S(4)}/><ellipse cx="82" cy="-156" rx="26" ry="38" fill="#8a90a4" ${S(4)}/><path d="M126,-120 Q160,-110 168,-86" fill="none" stroke="${MC.white}" stroke-width="10" stroke-linecap="round"/><circle cx="124" cy="-166" r="5" fill="${INK}"/><rect x="-60" y="-190" width="120" height="30" rx="8" fill="${MC.red}" ${S(3)}/></g>`;
const cliff = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-70,0 L-50,-170 L-10,-190 L40,-150 L70,0Z" fill="#a5784a" ${S(5)}/><path d="M-40,-60 L-10,-120 M10,-40 L30,-100" stroke="${INK}" stroke-width="3" fill="none"/></g>`;
const cup = (x: number, y: number, s = 1, t = 0) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-44,-80 L44,-80 L30,0 L-30,0Z" fill="${MC.yellow}" ${S(5)}/><path d="M-40,-62 L40,-62 L38,-50 L-38,-50Z" fill="${MC.green}"/>` + [0, 1, 2].map((i) => `<circle cx="${-18 + i * 18}" cy="${-92 - 12 * ((t * 1.3 + i * 0.33) % 1)}" r="${5 - 2 * ((t * 1.3 + i * 0.33) % 1)}" fill="${MC.green}" ${S(1.5)}/>`).join('') + `<path d="M-20,0 L-24,18 L24,18 L20,0Z" fill="${MC.yellow}" ${S(4)}/></g>`;
const woodpile = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` + [[-70, 0], [0, 0], [70, 0], [-35, -36], [35, -36], [0, -72]].map(([lx, ly], i) => `<rect x="${lx - 40}" y="${ly - 32}" width="80" height="30" rx="14" fill="${i % 2 ? '#8a5a2b' : '#7a3310'}" ${S(4)}/>`).join('') + [-60, 10, 60].map((lx) => `<circle cx="${lx}" cy="-90" r="20" fill="#b3541e" ${S(3)}/>`).join('') + `</g>`;
const logsFront = (x: number, y: number, s: number) => `<rect x="${x - 60 * s}" y="${y - 30 * s}" width="${120 * s}" height="${40 * s}" fill="#7a3310" ${S(4)}/><rect x="${x - 50 * s}" y="${y - 22 * s}" width="${100 * s}" height="${12 * s}" fill="url(#tri)"/>`;
const tongues = (x: number, y: number, s: number, t: number) => { let g = ''; for (let i = 0; i < 6; i++) { const px = x + (-52 + i * 21) * s, h = (80 + 26 * Math.sin(t * 9 + i * 1.7)) * s; g += `<path d="M${px},${y - 20 * s} C${px + 22 * s},${y - h * 0.5} ${px + 12 * s},${y - h * 0.8} ${px},${y - h} C${px - 12 * s},${y - h * 0.8} ${px - 22 * s},${y - h * 0.5} ${px},${y - 20 * s}Z" fill="${i % 2 ? MC.saffron : MC.red}" opacity=".93" ${S(2.5)}/>`; } return g; };
const puff = (lt: number, t0: number, x: number, y: number, n = 14, seed = 4, R = 140, sz = 12) => { if (lt < t0) return ''; const r = rnd(seed), k = ease(prog(lt, t0, t0 + 1.2)), fd = 1 - 0.6 * prog(lt, t0 + 1.2, t0 + 4); let g = ''; for (let i = 0; i < n; i++) { const a = r() * Math.PI * 2, d = (0.3 + r() * 0.7) * R * k; g += `<circle cx="${(x + d * Math.cos(a)).toFixed(1)}" cy="${(y + d * Math.sin(a) * 0.8 - 14 * k).toFixed(1)}" r="${(sz * (0.7 + r()) * (0.4 + 0.6 * k)).toFixed(1)}" fill="${COLS[i % 6]}" opacity="${(0.9 * fd).toFixed(2)}"/>`; } return g; };
const heap = (x: number, y: number, col: string, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,0 Q-40,-60 0,-70 Q40,-60 60,0Z" fill="${col}" ${S(4)}/><ellipse cx="0" cy="0" rx="66" ry="10" fill="${col}" ${S(3)}/></g>`;
const lionHead = (x: number, y: number, s: number, flip = false) => `<g transform="translate(${x},${y - 414 * s}) scale(${flip ? -s : s},${s})">` + Array.from({ length: 14 }, (_, i) => `<path d="M0,0 L${(96 * Math.cos(i * Math.PI / 7)).toFixed(0)},${(96 * Math.sin(i * Math.PI / 7)).toFixed(0)}" stroke="${i % 2 ? MC.saffron : MC.red}" stroke-width="30" stroke-linecap="round"/>`).join('') + `<circle r="74" fill="${MC.saffron}" ${S(5)}/><circle r="58" fill="${MC.yellow}" ${S(4)}/><path d="M-44,-44 L-30,-72 L-14,-48Z M44,-44 L30,-72 L14,-48Z" fill="${MC.yellow}" ${S(4)}/><circle cx="-22" cy="-14" r="9" fill="#fff"/><circle cx="22" cy="-14" r="9" fill="#fff"/><circle cx="-20" cy="-14" r="4" fill="${INK}"/><circle cx="24" cy="-14" r="4" fill="${INK}"/><path d="M-10,8 L10,8 L0,20Z" fill="${MC.red}" ${S(3)}/><path d="M-30,30 Q0,50 30,30" fill="none" ${S(4)}/><path d="M-18,34 L-14,52 L-8,36 M8,36 L14,52 L18,34" fill="#fff" ${S(2)}/></g>`;
const veena = (x: number, y: number, s = 1, rot = -30) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><line x1="-20" y1="0" x2="160" y2="0" ${S(10)}/><line x1="-20" y1="0" x2="160" y2="0" stroke="#8a5a2b" stroke-width="6"/><circle cx="-30" cy="0" r="26" fill="#b3541e" ${S(4)}/><circle cx="130" cy="0" r="20" fill="#b3541e" ${S(4)}/></g>`;
const notes = (lt: number, x: number, y: number) => [0, 1, 2, 3].map((i) => { const k = ((lt * 0.5 + i * 0.25) % 1); return `<text x="${x + 30 * Math.sin(i * 2 + lt * 2)}" y="${y - 120 * k}" font-size="30" font-family="NSB" fill="${MC.maroon}" opacity="${(1 - k).toFixed(2)}">♪</text>`; }).join('');
const swing = (x: number, y: number, lt: number) => { const a = 14 * Math.sin(lt * 2.2); return `<line x1="${x - 200}" y1="${y}" x2="${x - 150}" y2="${FL + 20}" ${S(10)}/><line x1="${x + 200}" y1="${y}" x2="${x + 150}" y2="${FL + 20}" ${S(10)}/><rect x="${x - 220}" y="${y - 12}" width="440" height="24" rx="10" fill="${MC.maroon}" ${S(4)}/>` + `<g transform="rotate(${a} ${x} ${y})"><line x1="${x - 90}" y1="${y}" x2="${x - 90}" y2="${y + 210}" stroke="${MC.red}" stroke-width="5"/><line x1="${x + 90}" y1="${y}" x2="${x + 90}" y2="${y + 210}" stroke="${MC.red}" stroke-width="5"/>${seated({ ...KRISH, feather: false }, x - 40, y + 190 - 20, 0.27, false, { armF: 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.yellow)}${seated(RADHA, x + 40, y + 190 - 20, 0.27, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 1) }, {}, MC.yellow)}<rect x="${x - 120}" y="${y + 200}" width="240" height="18" rx="8" fill="${MC.yellow}" ${S(4)}/>` + Array.from({ length: 8 }, (_, i) => `<circle cx="${x - 100 + i * 28}" cy="${y + 8 + 5 * Math.sin(lt * 4 + i)}" r="9" fill="${i % 2 ? MC.pink : MC.yellow}" ${S(2)}/>`).join('') + `</g>`; };
const gujiya = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 A40,34 0 0,1 40,0Z" fill="#e0a850" ${S(4)}/><path d="M-36,-2 L36,-2" stroke="${INK}" stroke-width="3" stroke-dasharray="4 4"/></g>`;
const glass = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,-90 L30,-90 L22,0 L-22,0Z" fill="${MC.cream}" ${S(4)}/><path d="M-28,-70 L28,-70 L25,-50 L-25,-50Z" fill="${MC.pink}"/><circle cx="14" cy="-96" r="8" fill="${MC.pink}" ${S(2)}/></g>`;
const wheat = (x: number, y: number, h: number, col: string, lt = 0, k = 0) => { const sw = 6 * Math.sin(lt * 2 + k); let g = `<path d="M${x},${y} Q${x + sw},${y - h / 2} ${x + sw * 1.5},${y - h}" fill="none" stroke="${col}" stroke-width="5"/>`; for (let i = 0; i < 5; i++) g += `<ellipse cx="${x + sw * 1.5 + (i % 2 ? 7 : -7)}" cy="${y - h + 6 + i * 11}" rx="5" ry="10" fill="${col}" ${S(1.5)} transform="rotate(${i % 2 ? 20 : -20} ${x + sw * 1.5} ${y - h + i * 11})"/>`; return g; };
const calCard = (x: number, y: number, mon: string, day: string, col: string, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-110" y="-120" width="220" height="240" rx="18" fill="${MC.cream}" ${S(5)}/><path d="M-110,-102 Q-110,-120 -92,-120 L92,-120 Q110,-120 110,-102 L110,-60 L-110,-60Z" fill="${col}" ${S(5)}/><text x="0" y="-78" text-anchor="middle" font-family="Hind" font-weight="700" font-size="28" fill="#fff">${mon}</text><text x="0" y="48" text-anchor="middle" font-family="NSB" font-weight="800" font-size="100" fill="${INK}">${day}</text><circle cx="-60" cy="-122" r="9" fill="${INK}"/><circle cx="60" cy="-122" r="9" fill="${INK}"/></g>`;
const heart = (x: number, y: number, s = 1, col = MC.red) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,30 C-50,-6 -40,-44 -18,-44 C-6,-44 0,-34 0,-30 C0,-34 6,-44 18,-44 C40,-44 50,-6 0,30Z" fill="${col}" ${S(4)}/></g>`;
const throne = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-110,0 L-110,-300 Q0,-400 110,-300 L110,0Z" fill="${MC.maroon}" ${S(5)}/><path d="M-84,-10 L-84,-290 Q0,-364 84,-290 L84,-10" fill="none" stroke="${MC.yellow}" stroke-width="5" stroke-dasharray="3 10" stroke-linecap="round"/></g>`;
const gudi = (x: number, y: number, s = 1, lt = 0) => `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="-300" ${S(8)}/><line x1="0" y1="0" x2="0" y2="-300" stroke="#8a5a2b" stroke-width="5"/><path d="M0,-290 Q${40 + 8 * Math.sin(lt * 4)},-270 90,-250 Q${50 + 8 * Math.sin(lt * 4)},-230 0,-210Z" fill="${MC.saffron}" ${S(4)}/><path d="M-36,-300 Q0,-360 36,-300Z" fill="#c8793a" ${S(4)}/><path d="M-30,-292 Q-52,-250 -34,-220 M30,-292 Q52,-250 34,-220" fill="none" stroke="${MC.leaf}" stroke-width="10" stroke-linecap="round"/></g>`;
const toran = (x: number, y: number, w: number, lt: number) => { let g = `<path d="M${x - w / 2},${y} Q${x},${y + 40} ${x + w / 2},${y}" fill="none" ${S(6)}/>`; for (let i = 0; i <= 8; i++) { const t = i / 8, px = x - w / 2 + w * t, py = y + 40 * 2 * t * (1 - t) * 1; g += `<path d="M${px},${py} q8,40 0,60 q-8,-20 0,-60Z" fill="${MC.leaf}" ${S(2.5)} transform="rotate(${3 * Math.sin(lt * 3 + i)} ${px} ${py})"/>`; } return g; };
const kalash = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-44,-80 Q-60,-30 -40,0 L40,0 Q60,-30 44,-80Z" fill="#c8793a" ${S(5)}/><rect x="-30" y="-96" width="60" height="18" rx="6" fill="#c8793a" ${S(4)}/><circle cx="0" cy="-122" r="22" fill="#f2b705" ${S(4)}/><path d="M-6,-96 L-40,-140 M6,-96 L40,-140 M0,-96 L0,-150" stroke="${MC.leaf}" stroke-width="10" stroke-linecap="round"/><path d="M-44,-40 L44,-40" stroke="${MC.red}" stroke-width="6"/></g>`;
const lathi = (x: number, y: number, rot: number) => `<g transform="translate(${x},${y}) rotate(${rot})"><line x1="0" y1="0" x2="0" y2="-170" ${S(10)}/><line x1="0" y1="0" x2="0" y2="-170" stroke="#a5784a" stroke-width="6"/></g>`;
const shieldP = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="46" fill="${MC.red}" ${S(5)}/><circle r="30" fill="${MC.yellow}" ${S(3)}/><circle r="10" fill="${MC.red}" ${S(3)}/></g>`;
const snow = (x: number, y: number, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" stroke="#6fa8d8" stroke-width="7" stroke-linecap="round">` + [0, 60, 120].map((a) => `<line x1="-40" y1="0" x2="40" y2="0" transform="rotate(${a})"/>`).join('') + `</g>`;
const badCloud = (x: number, y: number, s = 1, o = 1) => `<g opacity="${o.toFixed(2)}">${cloud(x, y, s, '#6a5a70')}</g>`;
const tilak3 = (x: number, y: number, s: number, flip = false) => `<g transform="translate(${x + (flip ? -1 : 1) * 52 * s},${y - 414 * s - 98 * s})"><ellipse rx="${5 * s + 3}" ry="${11 * s + 3}" fill="${MC.red}" ${S(1.5)}/></g>`;

// ---------- Holika pyre composite ----------
type HP = { fl?: number; burn?: number; hol?: number; shawl?: [number, number, number, number] | null; safe?: number; wind?: number; kid?: number };
const pyre = (lt: number, o: HP) => {
  const { fl = 1, burn = 0, shawl = null, safe = 0, wind = 0, kid = 1 } = o;
  let g = nightBg(lt);
  g += glow(480, FL - 130, 330 * (0.4 + 0.6 * fl), 0.45 * fl);
  if (fl > 0.02) g += fire(480, FL + 20, 2.2 * fl, lt);
  const hOp = 1 - burn;
  if (hOp > 0.02) g += fade(hOp, fig(HOLI, 420, FL - 10, 0.7, false, { armF: 8, armB: -6, eyeOpen: blink(lt), headTilt: burn * -20 }));
  if (burn > 0.05) g += `<g opacity="${clamp(burn * 1.5).toFixed(2)}"><path d="M340,${FL + 6} Q390,${FL - 90} 430,${FL - 100} Q480,${FL - 80} 510,${FL + 6}Z" fill="#8e8a88" ${S(4)}/></g>`;
  if (kid > 0.02) g += fade(kid, glow(540, FL - 230, 130 * safe + 1, safe) + fig(PRAH, 540, FL - 150, 0.3, false, { armF: 5, armB: -6, elbowF: 115, eyeOpen: 0.15 }));
  if (shawl) g += `<g transform="translate(${shawl[0]},${shawl[1]}) rotate(${shawl[2]}) scale(${shawl[3]})"><path d="M-44,-14 Q0,-40 44,-14 C64,50 56,130 40,190 L-40,190 C-56,130 -64,50 -44,-14Z" fill="${MC.red}" ${S(4)}/><path d="M-40,176 L40,176" stroke="${MC.yellow}" stroke-width="12"/><path d="M-30,60 L30,60 M-34,110 L34,110" stroke="${MC.yellow}" stroke-width="5" stroke-dasharray="4 8"/></g>`;
  if (fl > 0.02) g += logsFront(480, FL + 20, 2.2 * fl) + tongues(480, FL + 18, 2.2 * fl, lt + 1);
  if (wind > 0) for (let i = 0; i < 5; i++) { const x = ((lt * 220 + i * 190) % 1100) - 80; g += `<path d="M${x},${160 + i * 38} q30,-14 60,0 t60,0 t60,0" fill="none" stroke="${MC.cream}" stroke-width="5" stroke-linecap="round" opacity="${(0.8 * wind).toFixed(2)}"/>`; }
  return g;
};

// ================= SCENES =================
// 1: fire, child inside, Holika (0–10)
const A1 = mk((lt) => {
  const fl = ease(prog(lt, 0, 1.2));
  let g = pyre(lt, { fl, kid: prog(lt, 1.7, 2.3), safe: prog(lt, 5.5, 7.5) * 0.7, shawl: null });
  g += at(lt, 6.3, 480, 70, chip(0, 0, 'नारायण… नारायण…', MC.saffron, 30));
  return g;
}, 0.045);
// 2: Holika turns to ash; oldest story (10.07–17.61)
const A2 = mk((lt) => {
  const burn = ease(prog(lt, 1.8, 5)), flare = 1 + 0.2 * Math.sin(lt * 3);
  let g = pyre(lt, { fl: 1, burn, kid: 1, safe: 0.7 + 0.2 * Math.sin(lt * 3), shawl: null });
  g += at(lt, 4.2, 480, 70, chip(0, 0, 'होली की सबसे पुरानी कहानी', MC.red, 28));
  return g;
}, 0.03);
// 3: colours vs fire (17.61–26.67)
const A3 = mk((lt) => {
  let g = duskBg() + sunFace(250, 110, 50 + 2 * Math.sin(lt * 2));
  COLS.forEach((c, i) => { g += at(lt, 0.6 + i * 0.22, 80 + i * 78, FL + 14, heap(0, 0, c, 0.9)); });
  g += puff(lt, 1.2, 250, 280, 22, 9, 200, 14) + puff(lt, 3.3, 250, 260, 16, 11, 160, 11);
  g += moon(740, 100, 44, 0.3);
  if (lt > 4.2) { const k = ease(prog(lt, 4.2, 5.2)); g += glow(740, FL - 100, 200 * k, 0.6 * k) + fire(740, FL + 14, 1.7 * k, lt) + logsFront(740, FL + 14, 1.7 * k); }
  g += at(lt, 6.4, 740, 60 + 70, chip(0, 0, 'होलिका दहन', MC.red, 28));
  return g;
});
// 4: question fire & colour (26.67–31.84)
const A4 = mk((lt) => {
  let g = duskBg() + glow(250, FL - 100, 200, 0.6) + fire(250, FL + 14, 1.6, lt) + logsFront(250, FL + 14, 1.6);
  g += heap(710, FL + 6, MC.pink, 1.4) + heap(800, FL + 10, MC.blue, 1) + heap(630, FL + 10, MC.yellow, 1) + puff(lt, 0.2, 710, 300, 20, 5, 150, 12);
  g += at(lt, 0.9, 480, 190, `<circle r="64" fill="${MC.cream}" ${S(5)}/>${T(0, 28, '?', 90, MC.red, 'NSB')}`);
  g += at(lt, 2.6, 480, 80, chip(0, 0, 'शुरू से सुनिए', MC.green, 26));
  return g;
});
// 5: Hiranyakashipu on throne (31.84–36.88)
const B1 = mk((lt) => {
  let g = bgCourt(lt) + throne(480, FL - 10, 1.1);
  g += seated(HIRAN, 480, FL - 40, 0.55, false, { armF: lt > 2 ? -60 + sway(lt, 8, 3) : 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.yellow);
  g += at(lt, 1.8, 480, 50 + 40, chip(0, 0, 'असुर राजा हिरण्यकशिपु', MC.maroon, 26));
  return g;
});
// 6: the boon (36.88–46.47)
const B2 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += glow(480, 90, 90, 0.4);
  g += fig(HIRAN, 480, FL + 60, 0.3, false, { armF: -70, armB: -6, eyeOpen: blink(lt) });
  const items: [number, number, number, string][] = [
    [1.0, 170, 110, sunFace(0, 0, 36)], [3.9, 170, 225, moon(0, 0, 34, 0.3)],
    [4.9, 480, 110, hut(0, 40, 0.8)], [5.8, 480, 225, `<g transform="translate(0,30)">${tree(0, 30, 0.35)}</g>`],
    [6.9, 790, 110, fig(MAN, 0, 56, 0.2, false, { armF: 8, armB: -6 })], [7.9, 790, 225, `<g transform="translate(0,0) scale(.6)">${horse(0, 40, 0.7, lt)}</g>`],
  ];
  items.forEach(([t0, x, y, ic]) => { g += at(lt, t0, x, y, `<circle r="52" fill="${MC.cream}" ${S(4)}/>${ic}` + (lt > t0 + 0.5 ? cross(0, 0, 1.2) : '')); });
  return g;
});
// 7: pride, ban on Vishnu (46.47–54.6)
const B3 = mk((lt) => {
  let g = bgCourt(lt);
  const up = ease(prog(lt, 0.4, 2));
  g += glow(480, 220, 160 * up, 0.5 * up) + fig(HIRAN, 480, FL + 50, 0.55, false, { armF: lerp(8, -120, up), armB: lerp(-6, -120, up), eyeOpen: blink(lt) });
  [[140, 0], [260, 1], [700, 2], [820, 3]].forEach(([x, i]) => { g += fig(GWAL[i % 3], x, FL + 70, 0.3, x > 480, { armF: 5, armB: -6, elbowF: 115, headTilt: 12 + 6 * Math.sin(lt * 2 + i) }); });
  if (lt > 3.8) g += at(lt, 3.8, 480, 80, `<circle r="52" fill="${MC.cream}" ${S(4)}/><g transform="scale(1.1)">${`<path d="M-40,0 C-40,-30 0,-40 40,-20 C60,-10 50,10 30,12 C0,16 -30,20 -40,0Z" fill="#fff8ec" ${S(3)}/>`}</g>${lt > 4.5 ? cross(0, 0, 1.4) : ''}`);
  return g;
});
// 8: Prahlad stands firm (54.6–64.41)
const B4 = mk((lt) => {
  let g = bgCourt(lt);
  const threat = lt > 4.3 && lt < 8;
  g += fig(HIRAN, 720, FL + 50, 0.55, true, { armF: threat ? -110 + 14 * Math.sin(lt * 14) : -60, armB: threat ? -100 : -6, headTilt: threat ? -8 : 0, eyeOpen: blink(lt) });
  const firm = prog(lt, 7.8, 8.8);
  g += glow(260, FL - 60, 150 * firm, 0.7 * firm) + fig(PRAH, 260, FL + 50, 0.4, false, { armF: 5, armB: -6, elbowF: 115, eyeOpen: 1, headTilt: lt > 4.3 && lt < 8 ? 6 : 0 });
  g += at(lt, 0.9, 260, 100, chip(0, 0, 'प्रह्लाद', MC.saffron, 26));
  g += at(lt, 2.0, 720, 100, chip(0, 0, 'विष्णु भक्त पुत्र', MC.blue, 22));
  return g;
});
// 9: three trials (64.41–74.44)
const B5 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += at(lt, 0.3, 480, 44, chip(0, 0, 'भागवत · विष्णु पुराण', MC.green, 22));
  g += at(lt, 3.2, 180, 190, card(0, 0, 250, 190) + elephant(-20, 70, 0.52, lt, 0.5 + 0.5 * Math.sin(lt * 3)));
  g += at(lt, 5.0, 480, 190, card(0, 0, 250, 190) + cliff(0, 80, 0.8) + `<g transform="translate(0,${-70 + 100 * ((lt * 0.6) % 1)})">${fig(PRAH, 0, 0, 0.12, false, { armF: -60, armB: -60 })}</g>`);
  g += at(lt, 6.2, 780, 190, card(0, 0, 250, 190) + cup(0, 70, 1, lt));
  const safe = prog(lt, 8.0, 8.8);
  g += glow(480, FL - 10, 120 * safe, 0.8 * safe) + fig(PRAH, 480, FL + 70, 0.36, false, { armF: 5, armB: -6, elbowF: 115, eyeOpen: 1 });
  if (lt > 8.1) [180, 480, 780].forEach((x, i) => { g += at(lt, 8.1 + i * 0.2, x, 320, tick(0, 0, 1.2)); });
  return g;
});
// 10: Narada in womb (74.44–86.39)
const C1 = mk((lt) => {
  let g = bgForest(lt) + glow(700, 250, 190, 0.5);
  g += seated(MOM, 700, FL - 40, 0.5, true, { armF: 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.red);
  g += at(lt, 3.4, 690, 255, `<circle r="40" fill="url(#glowY)"/>` + fig(PRAH, 0, 28, 0.1, false, { armF: 5, armB: -6, elbowF: 115 }));
  const nx = lerp(-60, 270, ease(prog(lt, 0.2, 2.5)));
  g += fig(NARAD, nx, FL + 40, 0.5, false, { armF: lt > 2.5 ? -50 + sway(lt, 6, 3) : 8, armB: -6, legSwing: walk(lt, lt < 2.5), eyeOpen: blink(lt) });
  if (lt > 2.4) g += veena(nx + 6, FL - 100, 0.8, -35) + notes(lt, nx + 140, FL - 200) + notes(lt + 0.5, 520, 280);
  g += at(lt, 3.4, 270, 90, chip(0, 0, 'नारद मुनि', MC.pink, 26));
  g += at(lt, 7.4, 480, 60, chip(0, 0, 'माना जाता है', MC.saffron, 24));
  return g;
});
// 11: faith from within (86.39–94.74)
const C2 = mk((lt) => {
  let g = bgPlain('#2a1840', '#3d2216');
  const k = ease(prog(lt, 0.8, 3));
  g += glow(480, 250, 300 * k, 0.6) + fig(PRAH, 480, FL + 40, 0.5, false, { armF: 5, armB: -6, elbowF: 115, eyeOpen: 0.15 });
  g += `<g transform="translate(486,${FL + 40 - 0.5 * 300})">${glow(0, 0, 70 * k + 8, 1)}<path d="M0,-26 C14,-12 14,6 0,14 C-14,6 -14,-12 0,-26Z" fill="${MC.yellow}" ${S(2)} transform="scale(${0.5 + 0.7 * k})"/></g>`;
  g += at(lt, 3.3, 480, 70, chip(0, 0, 'डर नहीं, सच्ची श्रद्धा', MC.yellow, 26));
  g += petals(lt, 21, 14);
  return g;
});
// 12: threats too small (94.74–100.47)
const C3 = mk((lt) => {
  let g = bgCourt(lt);
  g += glow(640, FL - 80, 150, 0.7) + fig(PRAH, 640, FL + 50, 0.42, true, { armF: 5, armB: -6, elbowF: 115, eyeOpen: 1 });
  const sh = 3 * Math.sin(lt * 26);
  g += fig(HIRAN, 220, FL + 50, 0.38, false, { armF: -110 + sh * 3, armB: -100, eyeOpen: blink(lt) });
  for (let i = 0; i < 3; i++) { const k = ((lt * 0.8 + i * 0.33) % 1), x = 330 + 230 * k; g += `<g opacity="${(1 - k).toFixed(2)}"><path d="M${x},${230 + i * 36} l36,-10 l0,20Z" fill="${MC.red}" ${S(2)}/></g>`; }
  g += `<g opacity=".7">${glow(640, FL - 80, 190, 0.2)}</g>`;
  return g;
});
// 13: Holika intro (100.47–107.21)
const D1 = mk((lt) => {
  let g = bgCourt(lt);
  g += fig(HOLI, 330, FL + 50, 0.55, false, { armF: -30, armB: -6, eyeOpen: blink(lt) });
  g += fig(HIRAN, 690, FL + 50, 0.52, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.7) });
  g += at(lt, 1.0, 330, 100, chip(0, 0, 'होलिका', MC.red, 28));
  g += at(lt, 3.3, 690, 100, chip(0, 0, 'भाई', MC.maroon, 24));
  g += at(lt, 4.6, 480, 130, chip(0, 0, 'लोक परंपरा', MC.saffron, 24));
  return g;
});
// 14: the shawl (107.21–115.09)
const D2 = mk((lt) => {
  let g = nightBg(lt) + glow(480, 250, 220, 0.3);
  const wr = ease(prog(lt, 3.3, 5));
  g += fig(HOLI, 380, FL + 40, 0.6, false, { armF: lerp(-50, 8, wr), armB: -6, eyeOpen: blink(lt) });
  const sx = lerp(520, 380, wr), sy = lerp(230 + 6 * Math.sin(lt * 3), FL + 40 - 0.6 * 400, wr), sc = lerp(0.9, 0.62, wr);
  g += `<g transform="translate(${sx},${sy}) scale(${sc})">${glow(0, 80, 110, 0.7 * (1 - wr))}<path d="M-44,-14 Q0,-40 44,-14 C64,50 56,130 40,190 L-40,190 C-56,130 -64,50 -44,-14Z" fill="${MC.red}" ${S(4)}/><path d="M-40,176 L40,176" stroke="${MC.yellow}" stroke-width="12"/><path d="M-30,60 L30,60 M-34,110 L34,110" stroke="${MC.yellow}" stroke-width="5" stroke-dasharray="4 8"/></g>`;
  if (lt > 5.2) { const k = ease(prog(lt, 5.2, 6)); g += fire(680, FL + 20, 1.5 * k, lt) + glow(500, 250, 200 * k, 0.25 * k) + logsFront(680, FL + 20, 1.5 * k); }
  g += at(lt, 0.2, 480, 60, chip(0, 0, 'माना जाता है', MC.saffron, 24)) + at(lt, 5.0, 480, 125, chip(0, 0, 'आग असर नहीं करती', MC.red, 24));
  return g;
});
// 15: pyre; wind (115.09–124.81)
const D3 = mk((lt) => {
  const fl = ease(prog(lt, 3.0, 4.6));
  const wind = prog(lt, 4.55, 5) * (lt < 9 ? 1 : 0);
  const fly = ease(prog(lt, 6.3, 8.7));
  const shawl = lt < 6.3 ? [420, FL - 285, 0, 0.78] : [lerp(420, 540, fly), lerp(FL - 285, FL - 262, fly) - 90 * Math.sin(Math.PI * fly), lerp(0, 360, fly) * 0.5, lerp(0.78, 0.34, fly)];
  let g = pyre(lt, { fl: Math.max(fl, 0.001), burn: 0, kid: prog(lt, 1.0, 1.6), safe: 0.2 + 0.5 * fly, wind, shawl });
  if (lt < 4.3) g += at(lt, 0.4, 480, 70, chip(0, 0, 'गोद में प्रह्लाद', MC.saffron, 26));
  return g;
}, 0.04);
// 16: Holika burns, Prahlad safe (124.81–133.58)
const D4 = mk((lt) => {
  const burn = ease(prog(lt, 0.4, 3.2)), safe = ease(prog(lt, 1.7, 2.8));
  let g = pyre(lt, { fl: 1 - 0.0 * burn, burn, kid: 1, safe, shawl: [540, FL - 262, 0, 0.34] });
  g += at(lt, 5.0, 480, 70, chip(0, 0, 'आग लगाने वाली खुद जली', MC.red, 26));
  return g;
}, 0.03);
// 17: Bhagavata has no lap episode (133.58–141.17)
const E1 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(280, 230, 200, 0.4);
  g += book(280, 220, 1.4, 0.5);
  g += at(lt, 2.6, 280, 70, chip(0, 0, 'भागवत पुराण', MC.green, 28));
  g += at(lt, 4.3, 700, 220, `<circle r="90" fill="${MC.cream}" ${S(5)}/>${fire(0, 60, 0.6, lt)}${fig(HOLI, -8, 70, 0.14, false, { armF: 8, armB: -6 })}${lt > 5.0 ? cross(0, 0, 2.6) : ''}`);
  g += at(lt, 0.4, 480, 440, chip(0, 0, 'यहाँ एक बात ध्यान देने की', MC.maroon, 24)).replace('', '');
  return g;
});
// 18: two forms (141.17–151.06)
const E2 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += at(lt, 0.4, 250, 240, card(0, 0, 360, 320) + book(0, -60, 0.9, 0) + fig(PRAH, 0, 120, 0.16, false, { armF: 5, armB: -6, elbowF: 115 }) + `<text y="-168" text-anchor="middle" font-family="Hind" font-weight="700" font-size="26" fill="${MC.green}">विस्तार से कथा</text>`);
  g += at(lt, 3.5, 710, 240, card(0, 0, 360, 320) + fire(0, 120, 1.0, lt) + fig(HOLI, -30, 110, 0.2, false, { armF: 8, armB: -6 }) + fig(PRAH, 24, 80, 0.12, false, { armF: 5, armB: -6, elbowF: 115 }) + `<text y="-168" text-anchor="middle" font-family="Hind" font-weight="700" font-size="26" fill="${MC.red}">बाद की कथा</text>`);
  g += at(lt, 7.8, 480, 450, chip(0, 0, 'कथा के दो रूप', MC.saffron, 30));
  return g;
});
// 19: both versions, same truth (151.06–164.65)
const E3 = mk((lt) => {
  let g = bgPlain('#2a1840', '#2a1840');
  const k = ease(prog(lt, 0.2, 1));
  g += `<g opacity="${k}">` + card(250, 230, 380, 300, '#3a1f24') + `</g>` + `<g opacity="${prog(lt, 4.7, 5.5)}">` + card(710, 230, 380, 300, '#3a1f24') + `</g>`;
  g += fade(k, fire(250, 330, 1.3, lt) + glow(250, 240, 90, 0.5) + fig(PRAH, 250, 330, 0.2, false, { armF: 5, armB: -6, elbowF: 115 }) + logsFront(250, 330, 1.3));
  g += at(lt, 4.7, 710, 230, `<g transform="translate(0,100)">${fire(0, 0, 1.3, lt)}${fig(HOLI, -36, 0, 0.22, false, { armF: 8, armB: -6 })}${fig(PRAH, 24, -20, 0.13, false, { armF: 5, armB: -6, elbowF: 115 })}</g>`);
  const m = ease(prog(lt, 8.4, 10));
  g += glow(480, 250, 260 * m, 0.7 * m) + at(lt, 8.5, 480, 250, `<path d="M0,-40 C26,-14 26,18 0,34 C-26,18 -26,-14 0,-40Z" fill="${MC.yellow}" ${S(3)}/>`);
  g += at(lt, 10.6, 480, 470, chip(0, 0, 'सच्ची श्रद्धा', MC.yellow, 30));
  return g;
});
// 20: pillar dialogue (164.65–176.57)
const F1 = mk((lt) => {
  let g = bgCourt(lt);
  const rage = lt > 2.3;
  g += fig(HIRAN, 200, FL + 50, 0.55, false, { armF: rage ? -80 + 10 * Math.sin(lt * 9) : 8, armB: -6, eyeOpen: blink(lt) });
  const crack = ease(prog(lt, 8.8, 11));
  g += pillar(720, FL + 20, 1.0, crack);
  g += fig(PRAH, 480, FL + 50, 0.38, true, { armF: lt > 10.4 ? -100 : 8, armB: lt > 10.4 ? -100 : -6, eyeOpen: blink(lt) });
  if (lt > 6.5) g += at(lt, 6.5, 720, 70, chip(0, 0, 'खंभा', MC.maroon, 24));
  g += at(lt, 2.4, 200, 100, bubble(0, 0, 'कहाँ है तेरा विष्णु?', 300, 26));
  if (lt > 10.5) g += glow(720, 220, 200 * ease(prog(lt, 10.5, 11.6)), 0.7);
  return g;
});
// 21: Narasimha bursts out (176.57–183.04)
const F2 = mk((lt) => {
  let g = bgCourt(lt);
  const burst = prog(lt, 0.2, 0.9);
  g += fig(PRAH, 190, FL + 50, 0.34, false, { armF: 5, armB: -6, elbowF: 115 }) + fig(HIRAN, 140, FL + 50, 0.5, false, { armF: -30, armB: -6, headTilt: -6 });
  const k = ease(prog(lt, 0.3, 1.2));
  g += `<g transform="translate(560,${FL + 20})"><rect x="-120" y="-340" width="${60 * (1 - burst)}" height="340" fill="${MC.cream}" ${S(5)}/></g>` + pillar(560, FL + 20, 1.0, 1).replace('<g transform', '<g opacity="' + (1 - burst).toFixed(2) + '" transform');
  g += glow(560, 260, 320 * burst, burst * 0.9);
  const ns = 0.7 * (0.4 + 0.6 * k);
  g += fade(k, fig({ skin: '#e0a040', dhoti: MC.red, uttariya: MC.yellow, crown: 'none' }, 560, FL + 50, ns, true, { armF: -120 + 6 * Math.sin(lt * 8), armB: -110, eyeOpen: 1 }) + lionHead(560, FL + 50, ns, true));
  g += at(lt, 3.0, 480, 60, chip(0, 0, 'भगवान नरसिंह', MC.saffron, 30));
  return g;
}, 0.05);
// 22: dusk, threshold, lap (183.04–194.48)
const F3 = mk((lt) => {
  let g = duskBg() + sunFace(150, lerp(300, 400, prog(lt, 0, 3)), 44);
  g += `<rect x="300" y="150" width="360" height="${FL - 150 + 12}" fill="#a0603a" ${S(5)}/><rect x="360" y="190" width="240" height="${FL - 190 + 12}" fill="#2b170a" ${S(4)}/><rect x="340" y="${FL - 6}" width="280" height="22" fill="${MC.yellow}" ${S(4)}/>`;
  g += at(lt, 1.4, 480, 100, chip(0, 0, 'दहलीज़', MC.maroon, 26));
  const lap = ease(prog(lt, 2.4, 3.6));
  g += glow(480, 300, 190 * lap, 0.5 * lap);
  g += seated({ skin: '#e0a040', dhoti: MC.red, uttariya: MC.yellow }, 480, FL - 52, 0.6, false, { armF: lerp(8, -60, lap), armB: lerp(-6, -60, lap), eyeOpen: 1 }, {}, MC.maroon);
  g += lionHead(480, FL - 52 + 150 * 0.6, 0.6);
  g += fade(lap, `<g transform="translate(480,${FL - 130})">${lying(HIRAN, 0, 0, 0.3)}</g>`);
  if (lt > 6.7) { const k = prog(lt, 6.7, 9.5); g += `<g transform="translate(${760},${120 + 260 * k * k}) rotate(${40 * k})" opacity="${(1 - 0.6 * k).toFixed(2)}"><path d="M-46,0 L-30,-44 L0,-14 L30,-44 L46,0Z" fill="${MC.yellow}" ${S(4)}/><rect x="-46" y="0" width="92" height="12" fill="${MC.yellow}" ${S(4)}/></g>` + petals(lt, 14, 18); g += at(lt, 7.0, 760, 60, chip(0, 0, 'अहंकार हारा', MC.red, 26)); }
  return g;
});
// 23: Braj (194.48–204.66)
const G1 = mk((lt) => {
  let g = bgForest(lt) + glow(480, 240, 220, 0.4);
  g += fig({ ...KRISH, feather: false }, 340, FL + 50, 0.44, false, { armF: lt > 4 ? -50 + sway(lt, 8, 3) : 8, armB: -6, eyeOpen: blink(lt) }) + fig(RADHA, 620, FL + 50, 0.44, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.5) });
  g += at(lt, 1.2, 480, 70, chip(0, 0, 'ब्रज', MC.green, 32)) + at(lt, 4.7, 480, 130, chip(0, 0, 'लोक कथा', MC.saffron, 28));
  return g;
});
// 24: Krishna asks Yashoda (204.66–211.28)
const G2 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += fig({ ...KRISH, feather: false }, 250, FL + 50, 0.42, false, { armF: lt > 2 ? -60 : 8, armB: -6, eyeOpen: blink(lt) }) + fig(YASH, 700, FL + 50, 0.5, true, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.4) });
  g += at(lt, 0.8, 700, 100, chip(0, 0, 'माँ यशोदा', MC.red, 24));
  g += at(lt, 2.3, 250, 130, `<circle r="42" fill="${KRISH.skin}" ${S(4)}/>`) + at(lt, 3.4, 400, 130, `<circle r="42" fill="#f6d3a8" ${S(4)}/>`) + at(lt, 4.4, 325, 220, T(0, 0, '?', 80, MC.red));
  return g;
});
// 25: Yashoda: colour her face (211.28–218.21)
const G3 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  g += fig(YASH, 700, FL + 50, 0.5, true, { armF: lt < 2 ? -70 + sway(lt, 10, 6) : -40, armB: -6, eyeOpen: blink(lt) }) + fig({ ...KRISH, feather: false }, 250, FL + 50, 0.42, false, { armF: 8, armB: -6, eyeOpen: blink(lt + 0.3) });
  g += at(lt, 2.0, 480, 270, `<g>${COLS.map((c, i) => `<path d="M${-64 + i * 24},0 q0,-34 12,0 l0,24 l-24,0Z" fill="${c}" ${S(3)}/>`).join('')}</g>`);
  g += puff(lt, 2.4, 480, 240, 12, 7, 90, 10);
  const c = prog(lt, 4.3, 5.3);
  g += at(lt, 3.6, 480, 130, `<circle r="46" fill="${c < 0.5 ? '#f6d3a8' : KRISH.skin}" ${S(4)}/>`);
  return g;
});
// 26: Krishna and friends colour Radha and gopis (218.21–228.51)
const G4 = mk((lt) => {
  let g = bgForest(lt);
  const run = ease(prog(lt, 0.3, 4.6));
  GWAL.forEach((o, i) => { g += fig(o, lerp(-80, 270, run) - i * 90 + (i ? 0 : 90), FL + 50 + i * 4, 0.34, false, { armF: lt > 4.4 ? -90 : 8, armB: -6, legSwing: walk(lt, lt < 4.6, i), eyeOpen: 1 }); });
  g += fig({ ...KRISH, feather: false }, lerp(-80, 330, run), FL + 50, 0.4, false, { armF: lt > 4.3 ? -100 : 10, armB: lt > 4.3 ? -100 : -6, legSwing: walk(lt, lt < 4.6), eyeOpen: 1 });
  g += fig(RADHA, 660, FL + 50, 0.42, true, { armF: lt > 5 ? -60 : 8, armB: -6, eyeOpen: blink(lt) });
  GOPI.forEach((o, i) => { g += fig(o, 780 + i * 70, FL + 55, 0.34, true, { armF: 8, armB: -6, eyeOpen: blink(lt + i) }); });
  g += puff(lt, 4.6, 600, 270, 30, 9, 190, 14) + puff(lt, 5.6, 760, 290, 22, 12, 150, 12);
  g += at(lt, 7.0, 480, 70, chip(0, 0, 'तभी से रंग खेलने की परंपरा', MC.red, 24));
  return g;
});
// 27: all alike (228.51–237.09)
const G5 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e');
  const ppl = [GWAL[1], GOPI[1], MAN, GOPI[0], GWAL[2], YASH];
  const sc = [0.36, 0.36, 0.28, 0.42, 0.34, 0.4];
  const u = ease(prog(lt, 2.4, 3.6));
  ppl.forEach((o, i) => { const x = 110 + i * 148; g += fig(o, x, FL + 50, sc[i], false, { armF: 8, armB: -6, eyeOpen: blink(lt + i) });
    if (u > 0.01) g += fade(u, fig({ ...o, skin: '#c06ad0', dhoti: o.dhoti || MC.yellow }, x, FL + 50, sc[i], false, { armF: 8, armB: -6, eyeOpen: blink(lt + i) })); });
  g += puff(lt, 2.2, 480, 260, 28, 3, 380, 13);
  g += at(lt, 5.8, 480, 80, chip(0, 0, 'कोई बड़ा नहीं, कोई छोटा नहीं', MC.green, 24));
  return g;
});
// 28: Shiva burns Kamadeva (237.09–248.05)
const H1 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="url(#nightg)"/>` + moon(780, 90, 36, 0.3) + `<path d="M0,${FL} L180,300 L300,${FL}Z M260,${FL} L520,190 L760,${FL}Z M620,${FL} L840,280 L960,${FL}Z" fill="#cfd8e8" ${S(4)}/>` + GR('#5a6a8a');
  const eye = ease(prog(lt, 8.3, 9.4));
  g += glow(300, 250, 150, 0.35) + seated(SHIVA, 300, FL - 50, 0.55, false, { armF: 30, armB: 20, eyeOpen: 0.1 }, {}, '#c9a25e');
  g += `<g transform="translate(300,${FL - 50 + 150 * 0.55 - 414 * 0.55 - 70 * 0.55})"><path d="M-12,-34 a22,22 0 1,0 20,-2 a16,16 0 1,1 -20,2Z" fill="#fff6d8" ${S(2)}/></g>`;
  const kx = lerp(1060, 700, ease(prog(lt, 3.9, 6.4)));
  const ash = ease(prog(lt, 9.0, 10.6));
  if (ash < 0.98) g += fade(1 - ash, fig(KAMA, kx, FL + 50, 0.45, true, { armF: -50, armB: -10, legSwing: walk(lt, lt < 6.4), eyeOpen: 1 }) + `<g transform="translate(${kx - 30},${FL - 120}) rotate(-10)"><path d="M0,-90 Q-30,0 0,90" fill="none" stroke="${MC.pink}" stroke-width="8"/><line x1="0" y1="-90" x2="0" y2="90" stroke="${INK}" stroke-width="2"/></g>`);
  if (eye > 0) { g += `<path d="M${300 + 52 * 0.55},${FL - 50 + 150 * 0.55 - 414 * 0.55 - 98 * 0.55} L${kx - 30},${FL - 170}" stroke="${MC.red}" stroke-width="${18 * eye}" opacity="${eye}" stroke-linecap="round"/>` + glow(kx - 30, FL - 170, 90 * eye, eye); }
  if (ash > 0.05) g += `<g opacity="${ash}"><path d="M${kx - 80},${FL + 8} Q${kx - 40},${FL - 50} ${kx},${FL - 54} Q${kx + 40},${FL - 50} ${kx + 80},${FL + 8}Z" fill="#8e8a88" ${S(4)}/></g>`;
  g += at(lt, 0.5, 480, 60, chip(0, 0, 'दक्षिण भारत की कथा', MC.blue, 24)) + at(lt, 5.2, kx, 130, chip(0, 0, 'कामदेव', MC.pink, 24));
  return g;
}, 0.03);
// 29: Rati's plea, Kamadeva revived (248.05–259.98)
const H2 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="url(#nightg)"/>` + GR('#5a6a8a');
  g += seated(SHIVA, 250, FL - 50, 0.5, false, { armF: lt > 3 ? -60 : 30, armB: 20, eyeOpen: lt > 3 ? 1 : 0.1 }, {}, '#c9a25e');
  g += fig(HOLI && { female: true, skin: '#eab88a' }, 560, FL + 40, 0.42, true, { armF: 5, armB: -6, elbowF: 115, headTilt: 14, eyeOpen: 0.3 });
  g += at(lt, 0.4, 560, 120, chip(0, 0, 'रति', MC.pink, 26));
  const rise = ease(prog(lt, 4.2, 7));
  if (rise > 0) g += glow(800, FL - 160, 150 * rise, 0.7 * rise) + fade(rise, fig(KAMA, 800, FL + 50 - 40 * (1 - rise), 0.45, true, { armF: -50, armB: -10, eyeOpen: 1 }));
  g += petals(lt, 5, 14).replace(/<ellipse/g, (m) => m) && (lt > 5 ? petals(lt, 5, 14) : '');
  g += puff(lt, 8.0, 480, 220, 26, 15, 360, 12);
  g += at(lt, 8.2, 480, 60, chip(0, 0, 'दक्षिण में होली की याद', MC.red, 24));
  return g;
});
// 30: different stories, same victory (259.98–268.04)
const H3 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += at(lt, 0.8, 190, 270, card(0, 0, 230, 250) + fire(0, 70, 0.9, lt)) + at(lt, 1.9, 480, 270, card(0, 0, 230, 250) + puff(lt, 1.9, 0, 10, 18, 3, 70, 10) + heap(0, 76, MC.pink, 1)) + at(lt, 2.8, 770, 270, card(0, 0, 230, 250) + `<g transform="translate(0,10)"><circle r="32" fill="#fff" ${S(4)}/><circle r="12" fill="${MC.red}" ${S(3)}/><path d="M-60,0 Q0,-60 60,0 Q0,60 -60,0Z" fill="none" ${S(4)}/></g>`);
  const k = ease(prog(lt, 4.6, 6.2));
  g += glow(480, 100, 220 * k, 0.8 * k) + lotus(480, 140, 0.8 * k, k);
  g += at(lt, 5.4, 480, 450, chip(0, 0, 'जीत अच्छाई की', MC.green, 32));
  return g;
});
// 31: Holika Dahan date (268.04–275.75)
const I1 = mk((lt) => {
  let g = duskBg() + moon(780, 90, 38, 0.35);
  g += at(lt, 0.3, 300, 230, calCard(0, 0, 'मार्च २०२७', '२१', MC.red, 1.2));
  g += glow(660, FL - 100, 160, 0.5) + fire(660, FL + 14, 1.5, lt) + logsFront(660, FL + 14, 1.5);
  g += at(lt, 2.1, 300, 420, chip(0, 0, 'होलिका दहन · रविवार शाम', MC.maroon, 24));
  return g;
});
// 32: Rangwali Holi date, panchang (275.75–286.1)
const I2 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += calCard(190, 220, 'मार्च २०२७', '२१', MC.red, 0.8) + at(lt, 1.8, 560, 220, calCard(0, 0, 'मार्च २०२७', '२२', MC.blue, 1.1)) + puff(lt, 2.3, 560, 180, 26, 8, 190, 12);
  g += at(lt, 3.3, 560, 400, chip(0, 0, 'रंगों वाली होली · सोमवार', MC.blue, 22));
  g += at(lt, 6.1, 830, 250, book(0, 0, 0.8, 0.4) + `<g transform="translate(-10,90)">${chip(0, 0, 'पंचांग', MC.green, 22)}</g>`);
  return g;
});
// 33: bonfire at the crossroads (286.1–293.36)
const I3 = mk((lt) => {
  let g = nightBg(lt) + `<path d="M0,${FL + 60} L960,${FL + 60}" stroke="#2a1a14" stroke-width="3"/>`;
  g += woodpile(480, FL + 20, 1.5);
  const k = ease(prog(lt, 3.4, 4.6));
  if (k > 0) g += glow(480, FL - 100, 240 * k, 0.5 * k) + fire(480, FL - 20, 1.6 * k, lt);
  [[260, 0], [350, 1], [610, 2], [700, 0]].forEach(([x, i], j) => { g += fig([MAN, WOMAN, GWAL[1], GOPI[1]][j], x, FL + 60, 0.34, x > 480, { armF: lt > 4 ? -80 + sway(lt, 8, 5, ) : 8, armB: -6, eyeOpen: blink(lt + j) }); });
  g += puff(lt, 5.4, 800, 300, 18, 2, 130, 10);
  g += at(lt, 0.6, 480, 70, chip(0, 0, 'लकड़ी और उपले', MC.saffron, 26));
  return g;
});
// 34: Lathmar Holi (293.36–305.7)
const I4 = mk((lt) => {
  let g = bgForest(lt);
  const sw = lt > 6.3 ? Math.sin(lt * 6) : 0;
  [0, 1, 2].forEach((i) => { const x = 170 + i * 100; g += fig(GOPI[i], x, FL + 50 + i * 6, 0.4, false, { armF: -100 + 20 * sw, armB: -90, eyeOpen: 1 }) + lathi(x + 40, FL - 150 + i * 6, 20 + 25 * sw); });
  [0, 1, 2].forEach((i) => { const x = 700 + i * 100; g += fig(GWAL[i], x, FL + 50 + i * 6, 0.4, true, { armF: -60, armB: -40, eyeOpen: 1 }) + shieldP(x - 38, FL - 150 + i * 6 + 20 * Math.abs(sw), 0.8); });
  g += at(lt, 3.0, 230, 70, chip(0, 0, 'बरसाना', MC.pink, 28)) + at(lt, 3.9, 740, 70, chip(0, 0, 'नंदगाँव', MC.blue, 28));
  g += puff(lt, 8.0, 480, 300, 24, 4, 260, 11);
  return g;
});
// 35: Radha-Krishna play; flower Holi (305.7–314.2)
const I5 = mk((lt) => {
  let g = bgForest(lt);
  const hide = lt < 4.9;
  g += fig({ ...KRISH, feather: false }, 220, FL + 50, 0.46, false, { armF: lt > 2 ? -90 + 12 * Math.sin(lt * 5) : 8, armB: -6, eyeOpen: blink(lt) }) + fig(RADHA, 400, FL + 50, 0.46, true, { armF: -50, armB: -6, eyeOpen: blink(lt + 0.6) }) + lathi(430, FL - 80, 18 + 10 * Math.sin(lt * 4));
  g += puff(lt, 3.0, 300, 250, 16, 6, 120, 10);
  g += at(lt, 4.9, 750, 330, temple(0, 90, 0.5));
  if (lt > 5.0) g += petals(lt - 4.9, 12, 40);
  g += at(lt, 5.4, 690, 150, chip(0, 0, 'वृंदावन · फूलों की होली', MC.pink, 24));
  return g;
});
// 36: Dol Yatra (314.2–322.13)
const I6 = mk((lt) => {
  let g = bgPlain('#f8e7bf', '#c9a25e') + glow(480, 220, 240, 0.4);
  g += swing(480, 60, lt);
  g += at(lt, 0.5, 480, 480, chip(0, 0, 'दोल यात्रा', MC.red, 28));
  g += at(lt, 2.4, 140, 330, chip(0, 0, 'बंगाल', MC.green, 22)) + at(lt, 3.0, 820, 330, chip(0, 0, 'ओडिशा', MC.blue, 22));
  g += petals(lt, 18, 16);
  return g;
});
// 37: home: gujiya, thandai, neighbours hug (322.13–332.47)
const I7 = mk((lt) => {
  let g = bgPlain('#f7e2b0', '#c9a25e');
  g += `<rect x="60" y="${FL - 90}" width="380" height="20" rx="8" fill="${MC.maroon}" ${S(4)}/><rect x="90" y="${FL - 70}" width="14" height="${90}" fill="${MC.maroon}"/><rect x="400" y="${FL - 70}" width="14" height="90" fill="${MC.maroon}"/>`;
  g += at(lt, 2.2, 150, FL - 100, `<ellipse cx="40" cy="0" rx="90" ry="14" fill="${MC.cream}" ${S(3)}/>` + [0, 1, 2].map((i) => gujiya(10 + i * 32, -6, 0.6)).join(''));
  g += at(lt, 4.2, 360, FL - 90, glass(0, 0, 0.9) + glass(40, 0, 0.9));
  const m = ease(prog(lt, 4.5, 7.6));
  g += fig(MAN, lerp(560, 690, m), FL + 55, 0.42, false, { armF: lerp(8, -80, m), armB: lerp(-6, -80, m), legSwing: walk(lt, lt < 7.6), eyeOpen: 1 });
  g += fig(GWAL[1], lerp(900, 770, m), FL + 55, 0.42, true, { armF: lerp(8, -80, m), armB: lerp(-6, -80, m), legSwing: walk(lt, lt < 7.6, 1), eyeOpen: 1 });
  if (lt > 7.6) g += at(lt, 7.6, 730, 230, heart(0, 0, 1.2)) + puff(lt, 7.6, 730, 300, 16, 7, 100, 9);
  g += at(lt, 0.5, 480, 70, chip(0, 0, 'गुझिया · ठंडाई', MC.saffron, 28));
  return g;
});
// 38: Phalguna purnima, winter leaves, wheat ripens (332.47–341.13)
const I8 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="url(#nightg)"/>` + `<rect x="0" y="${FL - 60}" width="${W}" height="${H}" fill="#3d3a22"/>`;
  g += glow(680, 150, 220, 0.4) + moon(680, 150, 80, 0.0);
  const ripe = ease(prog(lt, 5.3, 7.4));
  for (let i = 0; i < 24; i++) { const col = ripe > 0.5 ? '#e8b84a' : MC.leaf; g += wheat(40 + i * 40, FL + 20 + (i % 3) * 14, 90 + (i % 4) * 14, col, lt, i); }
  const sx = lerp(220, -80, ease(prog(lt, 3.6, 6)));
  g += `<g opacity="${(1 - prog(lt, 4.5, 6)).toFixed(2)}">${snow(sx, 200, 1.5)}</g>`;
  g += at(lt, 1.2, 680, 270, chip(0, 0, 'फाल्गुन पूर्णिमा', MC.yellow, 26));
  return g;
});
// 39: grain roasted in fire (341.13–347.0)
const I9 = mk((lt) => {
  let g = nightBg(lt) + glow(480, FL - 100, 240, 0.5) + fire(480, FL + 14, 1.8, lt) + logsFront(480, FL + 14, 1.8);
  g += fig(MAN, 250, FL + 50, 0.46, false, { armF: -60 + sway(lt, 4, 3), armB: -6, eyeOpen: blink(lt) }) + fig(WOMAN, 710, FL + 50, 0.46, true, { armF: -60 + sway(lt, 4, 3, ), armB: -6, eyeOpen: blink(lt + 0.4) });
  [[340, 0], [620, 1]].forEach(([x, i]) => { g += `<g transform="translate(${x},${FL - 130}) rotate(${i ? 60 : -60})">${wheat(0, 0, 110, '#e8b84a', lt, i)}</g>`; });
  g += at(lt, 0.8, 480, 70, chip(0, 0, 'नए अनाज की बालियाँ', MC.saffron, 26));
  return g;
});
// 40: burn the bitterness, hug (347.0–355.05)
const I10 = mk((lt) => {
  let g = nightBg(lt);
  g += glow(220, FL - 100, 200, 0.5) + fire(220, FL + 14, 1.6, lt) + logsFront(220, FL + 14, 1.6);
  g += fig(MAN, 450, FL + 50, 0.42, true, { armF: lt > 2 && lt < 4.4 ? -90 : 8, armB: -6, eyeOpen: blink(lt) });
  for (let i = 0; i < 3; i++) { const t0 = 2.6 + i * 0.5, k = prog(lt, t0, t0 + 1.8); if (k > 0 && k < 1) g += badCloud(lerp(430, 230, k), lerp(240, FL - 90, k) - 70 * Math.sin(Math.PI * k), 0.3 * (1 - 0.5 * k), 1 - k * 0.7); }
  if (lt > 4.7) { const m = ease(prog(lt, 4.7, 6.2)); g += `<rect x="480" y="0" width="480" height="${H}" fill="#f7e2b0" opacity="${m}"/>` + fade(m, `<g>${fig({ ...MAN, skin: '#c06ad0' }, 720, FL + 50, 0.42, false, { armF: -80, armB: -80, eyeOpen: 1 })}${fig({ ...GWAL[1], skin: '#e0a85a' }, 820, FL + 50, 0.42, true, { armF: -80, armB: -80, eyeOpen: 1 })}</g>`) + puff(lt, 5.2, 770, 250, 26, 6, 170, 12) + at(lt, 6.2, 770, 190, heart(0, 0, 1.3)); }
  return g;
});
// 41: Brahma starts creation, new years (355.05–366.76)
const J1 = mk((lt) => {
  let g = `<rect width="${W}" height="${H}" fill="url(#dawn)"/>` + sunFace(480, 110, 52);
  g += `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += glow(480, 250, 260, 0.5) + lotus(480, FL - 20, 1.1, 1);
  g += seated(BRAHMA, 480, FL - 140, 0.42, false, { armF: lt > 2 ? -60 + sway(lt, 6, 3) : 8, armB: -6, eyeOpen: blink(lt) }, {}, MC.pink);
  const r = rnd(8); for (let i = 0; i < 14; i++) { const a = r() * 6.28, d = 100 + r() * 240, k = prog(lt, 2.5 + i * 0.2, 3.5 + i * 0.2); g += fade(k, `<circle cx="${480 + d * Math.cos(a) * 1.3}" cy="${240 + d * Math.sin(a) * 0.6}" r="${5 + 6 * r()}" fill="${COLS[i % 6]}" ${S(1.5)}/>`); }
  g += at(lt, 1.5, 700, 250, chip(0, 0, 'ब्रह्मा जी', MC.saffron, 28));
  g += at(lt, 5.3, 150, 360, `<g transform="translate(0,150)">${gudi(0, 0, 0.8, lt)}</g>`) + at(lt, 5.4, 150, 90, chip(0, 0, 'गुड़ी पड़वा', MC.red, 22));
  g += at(lt, 7.8, 820, 40, toran(0, 0, 220, lt)) + at(lt, 7.9, 820, 200, chip(0, 0, 'उगादि', MC.green, 24));
  g += at(lt, 9.0, 820, 370, kalash(0, 0, 0.9)) + at(lt, 9.1, 820, 410, chip(0, 0, 'चैत्र नवरात्रि', MC.maroon, 20));
  return g;
});
// 42: how many new years? (366.76–372.59)
const J2 = mk((lt) => {
  let g = bgPlain('#f7e2b0');
  g += at(lt, 0.3, 180, 300, `<g transform="translate(0,120)">${gudi(0, 0, 0.8, lt)}</g>`) + at(lt, 1.0, 480, 300, toran(0, 0, 220, lt) + `<g transform="translate(0,140)">${kalash(0, 0, 1.2)}</g>`) + at(lt, 1.7, 780, 300, `<g transform="translate(0,100)">${sunFace(0, 0, 58)}</g>`);
  g += at(lt, 2.4, 480, 120, `<circle r="56" fill="${MC.cream}" ${S(5)}/>${T(0, 26, '?', 80, MC.red)}`);
  g += at(lt, 4.0, 480, 450, chip(0, 0, 'अगली कहानी: गुड़ी पड़वा / उगादि', MC.red, 26));
  return g;
});
// 43: comment + Jai Shri Hari (372.59–384.2)
const J3 = mk((lt) => {
  let g = bgPlain('#f7e2b0') + glow(480, 230, 280, 0.5);
  if (lt < 8.4) {
    const fam = [[250, MAN], [360, WOMAN], [480, GWAL[1]], [590, GOPI[1]], [700, { ...MAN, skin: '#e0a06a' }]];
    fam.forEach(([x, o], i) => { g += fig({ ...o, skin: [o.skin, '#c06ad0', '#e86f8f', '#3f8f4f', '#f2b705'][i % 5] === o.skin ? o.skin : o.skin }, x, FL + 50, i === 2 ? 0.3 : 0.4, i > 2, { armF: -80 + 10 * Math.sin(lt * 4 + i), armB: -70, eyeOpen: blink(lt + i) }); });
    g += puff(lt, 0.5, 480, 280, 30, 13, 300, 12);
    g += at(lt, 0.5, 480, 80, bubble(0, 0, 'आपकी होली कैसी?', 340, 28));
    g += at(lt, 4.8, 150, 330, gujiya(0, 0, 1.3)) + at(lt, 5.0, 810, 330, glass(0, 0, 1.2));
  } else {
    g += fig(VISHNU, 480, FL + 40, 0.56, false, { armF: -60, armB: -6, eyeOpen: blink(lt) }) + at(lt, 8.8, 480, 70, T(0, 0, 'जय श्री हरि', 52, MC.red)) + petals(lt, 7, 30);
  }
  return g;
});

const SC = [A1, A2, A3, A4, B1, B2, B3, B4, B5, C1, C2, C3, D1, D2, D3, D4, E1, E2, E3, F1, F2, F3, G1, G2, G3, G4, G5, H1, H2, H3, I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, J1, J2, J3];
const ST = [0, 10.07, 17.61, 26.67, 31.84, 36.88, 46.47, 54.6, 64.41, 74.44, 86.39, 94.74, 100.47, 107.21, 115.09, 124.81, 133.58, 141.17, 151.06, 164.65, 176.57, 183.04, 194.48, 204.66, 211.28, 218.21, 228.51, 237.09, 248.05, 259.98, 268.04, 275.75, 286.1, 293.36, 305.7, 314.2, 322.13, 332.47, 341.13, 347.0, 355.05, 366.76, 372.59, 384.2];
const LIST: [number, number, any][] = SC.map((C, i) => [ST[i], ST[i + 1], C]);
export const SCENES = LIST.map(([s, e, C]) => ({ s, e, C }));
