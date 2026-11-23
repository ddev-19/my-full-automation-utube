// @ts-nocheck
// Landscape (960x540) Madhubani backgrounds, props and cast for the Gita Jayanti video. Original artwork.
import { INK, MC, S, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp } from './mb';
import { palace, chest, cloud, fire, lotus, scroll, moon, temple, chariot, horse, parrots, chip, pop, xdefs, rnd, blink, sway, axe, lotusInHand } from './mb2';
export { INK, MC, S, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp, palace, chest, cloud, fire, lotus, scroll, moon, temple, chariot, horse, parrots, chip, pop, xdefs, rnd, blink, sway, axe, lotusInHand };

export const W = 960, H = 540, FL = 420;

// ---- cast ----
export const KRISH = { skin: '#2c5e9e', crown: 'ram', dhoti: MC.yellow, uttariya: MC.green, feather: true };
export const ARJ = { skin: '#e0a06a', crown: 'king', dhoti: MC.white, uttariya: MC.red };
export const YUDH = { skin: '#e6b07c', crown: 'king', beard: true, dhoti: MC.white, uttariya: MC.yellow };
export const BHIMA = { skin: '#c98a5a', crown: 'king', dhoti: MC.red, uttariya: MC.saffron };
export const NAK = { skin: '#f0c28e', crown: 'king', dhoti: MC.green, uttariya: MC.yellow };
export const SAH = { skin: '#eab88a', crown: 'king', dhoti: MC.blue, uttariya: MC.red };
export const DURY = { skin: '#c98a5a', crown: 'king', beard: true, dhoti: '#5a2a6a', uttariya: INK };
export const KAUR = { skin: '#b97a4a', crown: 'king', dhoti: '#5a2a6a', uttariya: MC.maroon };
export const BHISHMA = { skin: '#e9b48a', bun: true, bunColor: '#f4f1ea', beard: true, dhoti: MC.white, uttariya: MC.saffron };
export const DRONA = { skin: '#c97b4a', bun: true, beard: true, dhoti: MC.saffron, uttariya: MC.red };
export const DHRIT = { skin: '#e2a46e', crown: 'king', beard: true, dhoti: MC.maroon, uttariya: MC.yellow };
export const SANJAY = { skin: '#d9915a', dhoti: MC.white, uttariya: MC.yellow };
export const VAIKH = { skin: '#e6a974', crown: 'king', dhoti: MC.green, uttariya: MC.red };
export const MUNI = { skin: MC.skinD, bun: true, beard: true, dhoti: MC.white, uttariya: MC.saffron };
export const QUEEN = { female: true, skin: '#eab88a' };
export const MAN = { skin: '#d9915a', dhoti: MC.white, uttariya: MC.green };
export const WOMAN = { female: true, skin: '#d9915a' };

const FEATHER = `<g transform="translate(22,-602) rotate(28)"><path d="M0,0 C18,-30 18,-74 0,-96 C-18,-74 -18,-30 0,0Z" fill="${MC.green}" ${S(3)}/><ellipse cx="0" cy="-66" rx="11" ry="15" fill="${MC.blue}" ${S(2)}/><circle cx="0" cy="-66" r="5" fill="${MC.yellow}"/></g>`;
export const fig = (o, x, y, s, flip = false, pose = {}, extra = {}) => {
  const oo = { ...o, ...extra };
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">${figure({ ...oo, pose })}${oo.feather ? `<g transform="rotate(${pose.headTilt || 0} 0 -414)">${FEATHER}</g>` : ''}</g>`;
};
// seated figure: hide legs by drawing a cushion/seat over them
export const seated = (o, x, y, s, flip = false, pose = {}, extra = {}, seat = MC.red) =>
  `<g>${fig(o, x, y + 150 * s, s, flip, pose, extra)}<rect x="${x - 90 * s}" y="${y - 20 * s}" width="${180 * s}" height="${150 * s}" rx="${14 * s}" fill="${seat}" ${S(4)}/><rect x="${x - 90 * s}" y="${y - 20 * s}" width="${180 * s}" height="${26 * s}" fill="url(#tri)"/></g>`;
export const gandiva = `<g transform="translate(9,-185) rotate(-90)"><g transform="translate(0,${-110 * 0.98})">${bowShape(330, 110)}</g></g>`;
export const conch = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 C-40,-30 0,-40 40,-20 C60,-10 50,10 30,12 C0,16 -30,20 -40,0Z" fill="#fff8ec" ${S(3)}/><path d="M-20,-6 Q0,-20 24,-10 M-10,4 Q8,-6 30,0" fill="none" ${S(2)}/></g>`;
export const book = (x, y, s = 1, glow = 0) => `<g transform="translate(${x},${y}) scale(${s})">${glow ? `<circle r="120" fill="url(#glowY)" opacity="${glow}"/>` : ''}<path d="M-90,-50 Q-45,-64 0,-48 Q45,-64 90,-50 L90,50 Q45,36 0,52 Q-45,36 -90,50Z" fill="${MC.cream}" ${S(4)}/><line x1="0" y1="-48" x2="0" y2="52" ${S(3)}/>` +
  [0, 1, 2, 3].map((i) => `<line x1="-74" y1="${-26 + i * 18}" x2="-16" y2="${-28 + i * 18}" stroke="${MC.red}" stroke-width="3"/><line x1="16" y1="${-28 + i * 18}" x2="74" y2="${-26 + i * 18}" stroke="${MC.red}" stroke-width="3"/>`).join('') + `</g>`;
export const verse = (x, y, txt, sub = '', w = 560) => `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="-58" width="${w}" height="${sub ? 124 : 96}" rx="16" fill="${MC.cream}" ${S(4)}/><rect x="${-w / 2 + 10}" y="-48" width="${w - 20}" height="${sub ? 104 : 76}" rx="10" fill="none" stroke="${MC.red}" stroke-width="2" stroke-dasharray="3 7"/>` +
  `<text x="0" y="${sub ? -4 : 6}" text-anchor="middle" font-family="NSB" font-weight="800" font-size="34" fill="${MC.maroon}">${txt}</text>` + (sub ? `<text x="0" y="40" text-anchor="middle" font-family="Hind" font-weight="700" font-size="22" fill="${INK}">${sub}</text>` : '') + `</g>`;

// ---- frame + backgrounds (landscape) ----
export const frame = () =>
  `<rect x="0" y="0" width="${W}" height="12" fill="url(#leafband)"/><rect x="0" y="${H - 12}" width="${W}" height="12" fill="url(#leafband)"/>` +
  `<rect x="0" y="0" width="12" height="${H}" fill="url(#leafband)"/><rect x="${W - 12}" y="0" width="12" height="${H}" fill="url(#leafband)"/><rect x="12" y="12" width="${W - 24}" height="${H - 24}" fill="none" ${S(3)}/>`;

export function bgCourt(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="#f7e2b0"/>`;
  for (let i = 0; i < 5; i++) { const x = 40 + i * 180; g += `<path d="M${x},${FL - 30} L${x},170 Q${x + 75},80 ${x + 150},170 L${x + 150},${FL - 30}Z" fill="${i % 2 ? '#f2c96d' : '#f4d58c'}" ${S(4)}/><path d="M${x + 14},${FL - 30} L${x + 14},176 Q${x + 75},102 ${x + 136},176 L${x + 136},${FL - 30}" fill="none" stroke="${MC.red}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>`; }
  g += `<rect x="0" y="12" width="${W}" height="62" fill="${MC.red}" ${S(3)}/>`;
  for (let i = 0; i < 9; i++) g += i % 2 ? fish(70 + i * 105, 44, 0.38, 0, MC.blue) : `<g transform="translate(${70 + i * 105},66)">` + [-45, -22, 0, 22, 45].map((a) => `<path d="M0,0 C-9,-14 -7,-36 0,-44 C7,-36 9,-14 0,0Z" fill="${MC.pink}" ${S(2)} transform="rotate(${a})"/>`).join('') + `</g>`;
  g += `<rect x="0" y="${FL - 30}" width="${W}" height="${H}" fill="${MC.saffron}"/><rect x="0" y="${FL - 34}" width="${W}" height="6" fill="${INK}"/>`;
  for (let i = 0; i < 16; i++) g += `<path d="M${i * 70 - 80},${H} L${i * 70},${FL - 28}" stroke="${MC.red}" stroke-width="3" opacity=".4"/>`;
  return g;
}
export function bgBattle(t = 0, sky = 'dawn') {
  let g = `<rect width="${W}" height="${H}" fill="url(#${sky === 'dawn' ? 'warg' : 'stormg'})"/>` + `<circle cx="480" cy="${200 + 10 * Math.sin(t * 0.3)}" r="70" fill="#fff0c4" opacity=".9"/>`;
  g += `<path d="M0,300 Q240,270 480,290 T960,285 L960,${H} L0,${H}Z" fill="#7a3a22"/><rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#5a2a1a"/>`;
  return g;
}
export function army(side, t = 0, base = FL - 40, n = 9, col = '#2b120a') {
  let g = '';
  for (let r = 0; r < 2; r++) for (let i = 0; i < n; i++) {
    const x = side < 0 ? 40 + i * 32 + r * 14 : W - 40 - i * 32 - r * 14; const y = base + r * 26; const h = 60 + ((i * 37 + r * 11) % 30);
    g += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - h}" stroke="${col}" stroke-width="4"/><path d="M${x - 6},${y - h} l6,-16 l6,16Z" fill="${col}"/><circle cx="${x}" cy="${y - 26}" r="10" fill="${col}"/><rect x="${x - 9}" y="${y - 18}" width="18" height="26" fill="${col}"/>`;
  }
  const fx = side < 0 ? 90 : W - 90;
  g += `<line x1="${fx}" y1="${base}" x2="${fx}" y2="${base - 150}" stroke="${col}" stroke-width="5"/><path d="M${fx},${base - 150} Q${fx + side * -1 * 50 + Math.sin(t * 4) * 6},${base - 136} ${fx + side * -1 * 60},${base - 128} Q${fx + side * -1 * 30},${base - 116} ${fx},${base - 110}Z" fill="${side < 0 ? MC.saffron : '#5a2a6a'}" ${S(2)}/>`;
  return g;
}
export function bgForest(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="#f8e7bf"/>` + sunFace(820, 110, 40);
  g += `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#c9a25e"/><path d="M380,${H} Q460,${FL} 500,${FL - 40} L540,${FL - 40} Q560,${FL} 640,${H}Z" fill="#e7c98a"/>`;
  g += tree(70, FL - 10, 0.6) + tree(240, FL - 40, 0.42) + tree(900, FL - 10, 0.6) + tree(730, FL - 40, 0.42) + bird(450, 120, 0.4, Math.sin(t * 5));
  return g;
}
export function bgNight(t = 0, grad = 'nightg') {
  let g = `<rect width="${W}" height="${H}" fill="url(#${grad})"/>`;
  const r = rnd(5);
  for (let i = 0; i < 90; i++) { const x = r() * W, y = 20 + r() * 380; g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + r() * 1.6).toFixed(1)}" fill="#fff" opacity="${(0.35 + 0.5 * Math.abs(Math.sin(t * 2 + i))).toFixed(2)}"/>`; }
  return g;
}
export function bgPlain(col = '#f7e2b0', floor = MC.saffron) { return `<rect width="${W}" height="${H}" fill="${col}"/><rect x="0" y="${FL}" width="${W}" height="${H}" fill="${floor}"/>`; }
export function bgWater(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="url(#warg)"/>` + `<rect x="0" y="250" width="${W}" height="${H}" fill="#2f6fb5"/>`;
  for (let i = 0; i < 8; i++) g += `<path d="M${-40 + ((i * 140 + t * 20) % 1040)},${280 + i * 30} q30,-10 60,0 t60,0" fill="none" stroke="#9cc3ea" stroke-width="3"/>`;
  return g;
}
export const diya = (x, y, s = 1, t = 0) => `<g transform="translate(${x},${y}) scale(${s})"><circle cy="-30" r="${34 + 3 * Math.sin(t * 9)}" fill="url(#fireg)"/><path d="M0,-50 C9,-36 8,-22 0,-16 C-8,-22 -9,-36 0,-50Z" fill="${MC.yellow}" ${S(2)}/><path d="M-26,-12 Q0,18 26,-12Z" fill="#b3541e" ${S(3)}/></g>`;
export const bubble = (x, y, txt, w = 260, size = 28, col = MC.red) => `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="-34" width="${w}" height="62" rx="22" fill="${MC.cream}" ${S(3)}/><path d="M-20,28 L-34,52 L6,28Z" fill="${MC.cream}" ${S(3)}/><rect x="-26" y="22" width="36" height="8" fill="${MC.cream}"/><text x="0" y="8" text-anchor="middle" font-family="Hind" font-weight="700" font-size="${size}" fill="${col}">${txt}</text></g>`;
export const couch = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-40" width="400" height="60" rx="16" fill="${MC.red}" ${S(4)}/><rect x="-200" y="-40" width="400" height="16" fill="url(#tri)"/><rect x="-190" y="20" width="22" height="40" fill="${MC.maroon}" ${S(3)}/><rect x="168" y="20" width="22" height="40" fill="${MC.maroon}" ${S(3)}/><ellipse cx="-160" cy="-50" rx="46" ry="24" fill="${MC.yellow}" ${S(3)}/></g>`;
export function lying(o, x, y, s, extra = {}) {
  // figure rotated to lie on a couch, head to the left
  return `<g transform="translate(${x},${y}) rotate(-90) scale(${s})">${figure({ ...o, ...extra, pose: { armF: 8, armB: -6, eyeOpen: 0.1 } })}${o.feather ? FEATHER : ''}</g>`;
}
export function dice(x, y, s = 1, t = 0) {
  let g = `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-26" width="300" height="52" fill="${MC.cream}" ${S(4)}/>`;
  for (let i = 0; i < 6; i++) g += `<rect x="${-140 + i * 48}" y="-18" width="40" height="36" fill="${i % 2 ? MC.red : MC.yellow}" ${S(2)}/>`;
  for (let k = 0; k < 2; k++) { const dx = -30 + k * 60, dy = -60 - 30 * Math.abs(Math.sin(t * 5 + k)); g += `<g transform="translate(${dx},${dy}) rotate(${t * 200 + k * 40})"><rect x="-12" y="-12" width="24" height="24" rx="4" fill="#fff" ${S(2)}/><circle r="3" fill="${INK}"/><circle cx="6" cy="6" r="3" fill="${INK}"/></g>`; }
  return g + `</g>`;
}
export const badge = (x, y, big, small, col = MC.red, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="74" fill="${MC.cream}" stroke="${col}" stroke-width="6"/><circle r="64" fill="none" ${S(2)} stroke-dasharray="4 8"/><text y="12" text-anchor="middle" font-family="NSB" font-weight="800" font-size="56" fill="${col}">${big}</text><text y="104" text-anchor="middle" font-family="Hind" font-weight="700" font-size="28" fill="${INK}">${small}</text></g>`;
