// @ts-nocheck
// Extra Madhubani props/backgrounds for the 540x960 vertical design space (original artwork).
import { INK, MC, S, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp } from './mb';
export { INK, MC, S, figure, garland, bowShape, sunFace, fish, bird, tree, prog, ease, lerp, clamp };

export const W = 540, H = 960, FL = 700;
export const blink = (t) => ((t * 30) % 110 < 4 ? 0.1 : 1);
export const sway = (t, a = 3, p = 1.6) => a * Math.sin(t * p);
export const rnd = (seed) => { let a = seed; return () => { a |= 0; a = a + 0x6d2b79f5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

// characters
export const RAM = { skin: MC.ramblue, crown: 'ram', dhoti: MC.yellow, uttariya: MC.red };
export const LAX = { skin: '#f3c38d', crown: 'ram', dhoti: MC.green, uttariya: MC.yellow };
export const JANAK = { skin: MC.skin, crown: 'king', beard: true, dhoti: MC.saffron, uttariya: MC.red };
export const VISH = { skin: MC.skinD, bun: true, beard: true, dhoti: MC.white, uttariya: MC.saffron };
export const SITA = { female: true, skin: MC.skin };
export const DASH = { skin: '#e9a56d', crown: 'king', beard: true, dhoti: MC.white, uttariya: MC.blue };
export const PARSH = { skin: '#c97b4a', bun: true, beard: true, dhoti: MC.red, uttariya: MC.saffron };
export const KING2 = { skin: '#e2a46e', crown: 'king', dhoti: MC.green, uttariya: MC.saffron };
export const KING3 = { skin: '#c98a5a', crown: 'king', beard: true, dhoti: MC.blue, uttariya: MC.yellow };
export const KRISH = { skin: '#2c5e9e', crown: 'ram', dhoti: MC.yellow, uttariya: MC.green };
export const ARJ = { skin: '#e0a06a', crown: 'king', dhoti: MC.white, uttariya: MC.red };
export const MAN = { skin: '#d9915a', dhoti: MC.white, uttariya: MC.green };

export const fig = (o, x, y, s, flip = false, pose = {}, extra = {}) =>
  `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">${figure({ ...o, ...extra, pose })}</g>`;

export const axe = `<g transform="translate(9,-185)"><line x1="0" y1="-150" x2="0" y2="120" ${S(10)}/><line x1="0" y1="-150" x2="0" y2="120" stroke="${MC.maroon}" stroke-width="6"/><path d="M0,-150 C60,-170 70,-90 6,-80 C26,-104 24,-128 0,-130Z" fill="#cfd6dc" ${S(4)}/></g>`;
export const lotusInHand = `<g transform="translate(9,-185)">` + [-30, 0, 30].map((a) => `<path d="M0,0 C-10,-16 -8,-40 0,-50 C8,-40 10,-16 0,0Z" fill="${MC.pink}" ${S(2)} transform="rotate(${a})"/>`).join('') + `</g>`;
export const garlandInHand = `<g transform="translate(9,-150)">${garland(0, 0, 40, 56)}</g>`;

export function xdefs() {
  return `<defs>
  <linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd59a"/><stop offset="1" stop-color="#f3a15e"/></linearGradient>
  <linearGradient id="nightg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14102e"/><stop offset="1" stop-color="#3a1840"/></linearGradient>
  <linearGradient id="stormg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2346"/><stop offset="1" stop-color="#5a2a3a"/></linearGradient>
  <linearGradient id="warg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7b56b"/><stop offset="1" stop-color="#c0583a"/></linearGradient>
  <radialGradient id="glowY"><stop offset="0" stop-color="#fffbe0" stop-opacity="1"/><stop offset=".45" stop-color="#ffd86b" stop-opacity=".7"/><stop offset="1" stop-color="#ffd86b" stop-opacity="0"/></radialGradient>
  <radialGradient id="fireg"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#ffb347" stop-opacity=".8"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>
 </defs>`;
}

// ---------- frame + backgrounds ----------
export const frame = () =>
  `<rect x="0" y="0" width="${W}" height="16" fill="url(#leafband)"/><rect x="0" y="${H - 16}" width="${W}" height="16" fill="url(#leafband)"/>` +
  `<rect x="0" y="0" width="16" height="${H}" fill="url(#leafband)"/><rect x="${W - 16}" y="0" width="16" height="${H}" fill="url(#leafband)"/>` +
  `<rect x="16" y="16" width="${W - 32}" height="${H - 32}" fill="none" ${S(4)}/>`;

export function bgCourt() {
  let g = `<rect width="${W}" height="${H}" fill="#f7e2b0"/>`;
  for (let i = 0; i < 3; i++) {
    const x = 40 + i * 165;
    g += `<path d="M${x},${FL - 60} L${x},330 Q${x + 65},230 ${x + 130},330 L${x + 130},${FL - 60}Z" fill="${i % 2 ? '#f2c96d' : '#f4d58c'}" ${S(4)}/>`;
    g += `<path d="M${x + 14},${FL - 60} L${x + 14},336 Q${x + 65},252 ${x + 116},336 L${x + 116},${FL - 60}" fill="none" stroke="${MC.red}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>`;
  }
  g += `<rect x="0" y="130" width="${W}" height="80" fill="${MC.red}" ${S(4)}/>`;
  for (let i = 0; i < 5; i++) g += i % 2 ? fish(70 + i * 100, 170, 0.45, 0, MC.blue) : `<g transform="translate(${70 + i * 100},192)">` + [-45, -22, 0, 22, 45].map((a) => `<path d="M0,0 C-10,-16 -8,-42 0,-52 C8,-42 10,-16 0,0Z" fill="${MC.pink}" ${S(2)} transform="rotate(${a})"/>`).join('') + `</g>`;
  g += `<rect x="0" y="${FL - 60}" width="${W}" height="${H - FL + 60}" fill="${MC.saffron}"/><rect x="0" y="${FL - 66}" width="${W}" height="8" fill="${INK}"/>`;
  for (let i = 0; i < 9; i++) g += `<path d="M${i * 70 - 60},${H} L${i * 70},${FL - 58}" stroke="${MC.red}" stroke-width="3" opacity=".45"/>`;
  return g;
}
export function bgField(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="url(#dawn)"/>` + sunFace(400, 300, 62 + Math.sin(t) * 2);
  g += `<path d="M0,470 Q140,430 270,460 T540,450 L540,520 L0,520Z" fill="${MC.leaf}" ${S(3)}/>`;
  g += `<rect x="0" y="500" width="${W}" height="${H - 500}" fill="#9a6a3a"/>`;
  for (let i = 0; i < 9; i++) g += `<path d="M0,${530 + i * 50} Q270,${500 + i * 58} 540,${530 + i * 50}" fill="none" stroke="#6b4423" stroke-width="7"/>`;
  g += bird(110, 240, 0.5, Math.sin(t * 6)) + bird(190, 200, 0.4, Math.cos(t * 6));
  return g;
}
export function bgForest(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="#f8e7bf"/>` + sunFace(430, 230, 45);
  g += `<rect x="0" y="${FL - 80}" width="${W}" height="${H}" fill="#c9a25e"/>`;
  g += `<path d="M180,${H} Q260,${FL} 300,${FL - 80} L340,${FL - 80} Q330,${FL} 380,${H}Z" fill="#e7c98a"/>`;
  g += tree(60, FL - 40, 0.75) + tree(490, FL - 30, 0.7) + tree(150, FL - 120, 0.45) + bird(300, 200, 0.45, Math.sin(t * 5));
  return g;
}
export function bgNight(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="url(#nightg)"/>`;
  const r = rnd(5);
  for (let i = 0; i < 60; i++) { const x = r() * W, y = 120 + r() * 520; g += `<circle cx="${x}" cy="${y}" r="${1 + r() * 1.8}" fill="#fff" opacity="${0.4 + 0.5 * Math.abs(Math.sin(t * 2 + i))}"/>`; }
  return g;
}
export function bgGarden(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="#e9f0c8"/>`;
  g += `<rect x="0" y="${FL - 80}" width="${W}" height="${H}" fill="${MC.leaf}"/>`;
  g += tree(70, FL - 60, 0.8) + tree(470, FL - 60, 0.8);
  g += `<ellipse cx="270" cy="${FL + 120}" rx="200" ry="60" fill="${MC.blue}" ${S(4)}/>` + fish(220, FL + 120, 0.4, Math.sin(t) * 10) + fish(330, FL + 130, 0.35, 180 + Math.cos(t) * 10, MC.saffron);
  for (let i = 0; i < 12; i++) { const x = 30 + i * 45, y = FL - 40 + (i % 2) * 30; g += `<circle cx="${x}" cy="${y}" r="10" fill="${i % 3 ? MC.pink : MC.yellow}" ${S(2)}/>`; }
  g += bird(260, 220, 0.5, Math.sin(t * 6)) + bird(320, 260, 0.45, Math.cos(t * 6));
  return g;
}
export function bgStorm(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="url(#stormg)"/>`;
  for (const [x, y, rx] of [[100, 170, 140], [380, 150, 160], [250, 260, 120], [470, 300, 90]]) g += `<ellipse cx="${x + Math.sin(t + x) * 10}" cy="${y}" rx="${rx}" ry="${rx * 0.38}" fill="#463a66" ${S(3)}/>`;
  g += `<rect x="0" y="${FL - 40}" width="${W}" height="${H}" fill="#3a1f24"/>`;
  return g;
}
export function bgVillage() {
  let g = `<rect width="${W}" height="${H}" fill="#2a1a2e"/>`;
  g += `<rect x="70" y="330" width="400" height="${FL - 330}" fill="#a0603a" ${S(4)}/><path d="M40,340 L270,190 L500,340Z" fill="#6b3a1a" ${S(4)}/>`;
  for (let i = 0; i < 14; i++) g += `<path d="M${85 + i * 27},350 l13,20 l13,-20" fill="none" stroke="${MC.cream}" stroke-width="3"/>`;
  g += `<rect x="215" y="470" width="110" height="${FL - 470}" fill="#2b170a" ${S(3)}/><rect x="370" y="420" width="70" height="70" fill="#2b170a" stroke="${MC.yellow}" stroke-width="3"/>`;
  g += `<rect x="0" y="${FL}" width="${W}" height="${H}" fill="#3d2216"/>`;
  return g;
}
export function bgBattle(t = 0) {
  let g = `<rect width="${W}" height="${H}" fill="url(#warg)"/>` + `<circle cx="270" cy="360" r="80" fill="#fff0c4" opacity=".9"/>`;
  g += `<rect x="0" y="${FL - 120}" width="${W}" height="${H}" fill="#5a2a1a"/>`;
  for (let i = 0; i < 18; i++) { const x = 20 + i * 30 + (i > 8 ? 0 : 0); if (i > 6 && i < 11) continue; const h = 70 + (i * 37) % 40; g += `<line x1="${x}" y1="${FL - 120}" x2="${x}" y2="${FL - 120 - h}" stroke="#2b120a" stroke-width="4"/><path d="M${x - 6},${FL - 120 - h} l6,-18 l6,18Z" fill="#2b120a"/><circle cx="${x}" cy="${FL - 140}" r="12" fill="#2b120a"/><rect x="${x - 10}" y="${FL - 130}" width="20" height="30" fill="#2b120a"/>`; }
  return g;
}

// ---------- props ----------
export function palace(cx, base, s = 1) {
  let g = `<g transform="translate(${cx},${base}) scale(${s})">`;
  g += `<rect x="-170" y="-260" width="340" height="260" fill="${MC.yellow}" ${S(5)}/><rect x="-170" y="-260" width="340" height="30" fill="url(#tri)" ${S(3)}/>`;
  for (const x of [-110, 0, 110]) g += `<path d="M${x - 34},0 L${x - 34},-150 Q${x},-200 ${x + 34},-150 L${x + 34},0Z" fill="${MC.red}" ${S(4)}/>`;
  g += `<path d="M-200,-260 L0,-400 L200,-260Z" fill="${MC.red}" ${S(5)}/><path d="M-60,-400 L0,-470 L60,-400Z" fill="${MC.yellow}" ${S(4)}/>`;
  g += `<line x1="0" y1="-470" x2="0" y2="-520" ${S(4)}/><path d="M0,-520 L40,-506 L0,-492Z" fill="${MC.saffron}" ${S(3)}/>`;
  return g + `</g>`;
}
export function chest(cx, y, s = 1, rot = 0) {
  let g = `<g transform="translate(${cx},${y}) scale(${s})"><rect x="-200" y="-90" width="400" height="90" rx="8" fill="${MC.maroon}" ${S(4)}/><rect x="-186" y="-80" width="372" height="22" fill="url(#tri)"/>`;
  for (const x of [-130, 130]) { g += `<g transform="translate(${x},10) rotate(${rot})"><circle r="44" fill="#4a2218" stroke="${MC.yellow}" stroke-width="6"/>`; for (let a = 0; a < 8; a++) g += `<line x1="0" y1="0" x2="${(40 * Math.cos(a * Math.PI / 4)).toFixed(1)}" y2="${(40 * Math.sin(a * Math.PI / 4)).toFixed(1)}" stroke="${MC.yellow}" stroke-width="4"/>`; g += `<circle r="9" fill="${MC.yellow}"/></g>`; }
  return g + `</g>`;
}
export const cloud = (x, y, s = 1, col = '#ffffff') => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-90,20 C-110,-10 -70,-40 -40,-24 C-30,-60 30,-64 40,-26 C70,-44 110,-14 90,20Z" fill="${col}" ${S(4)}/><path d="M-60,4 Q-40,-10 -20,4 M10,-6 Q30,-20 50,-6" fill="none" ${S(2)}/></g>`;
export function fire(x, y, s = 1, t = 0) {
  const k = 1 + 0.08 * Math.sin(t * 14);
  return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="-60" r="${90 * k}" fill="url(#fireg)"/><rect x="-60" y="-30" width="120" height="40" fill="#7a3310" ${S(4)}/><rect x="-50" y="-22" width="100" height="12" fill="url(#tri)"/>` +
    `<path d="M0,${-130 * k} C30,-90 34,-56 0,-34 C-34,-56 -30,-90 0,${-130 * k}Z" fill="${MC.saffron}" ${S(3)}/><path d="M0,${-100 * k} C14,-76 14,-56 0,-44 C-14,-56 -14,-76 0,${-100 * k}Z" fill="${MC.yellow}"/></g>`;
}
export const baby = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="30" fill="${MC.yellow}" ${S(4)}/><path d="M-40,-4 Q0,24 40,-4" fill="none" stroke="${MC.red}" stroke-width="5"/><circle cx="34" cy="-18" r="22" fill="${MC.skin}" ${S(3)}/><path d="M36,-24 Q44,-28 50,-22" fill="none" ${S(2)}/><path d="M44,-10 Q48,-8 50,-12" fill="none" stroke="${MC.red}" stroke-width="3"/><circle cx="46" cy="-30" r="3" fill="${MC.red}"/></g>`;
export function lotus(x, y, s = 1, open = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})">` + [-60, -30, 0, 30, 60].map((a) => `<path d="M0,0 C-26,-36 -16,-86 0,-108 C16,-86 26,-36 0,0Z" fill="${MC.pink}" ${S(3)} transform="rotate(${a * open})"/>`).join('') + `<circle cx="0" cy="-8" r="14" fill="${MC.yellow}" ${S(2)}/></g>`;
}
export function plough(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-180,-60 L40,-20" ${S(14)}/><path d="M-180,-60 L40,-20" stroke="#8a5a2b" stroke-width="8" stroke-linecap="round"/><path d="M40,-20 L100,50 L50,50Z" fill="#cfd6dc" ${S(4)}/><path d="M-40,-36 L-50,-110" ${S(8)}/></g>`;
}
export function ox(x, y, s = 1, t = 0) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-80" rx="90" ry="50" fill="${MC.cream}" ${S(4)}/><path d="M-60,-80 Q-30,-60 0,-80 Q30,-60 60,-80" fill="none" ${S(2)}/>` +
    [-60, -30, 30, 60].map((lx, i) => `<rect x="${lx - 9}" y="-40" width="18" height="${60 + 6 * Math.sin(t * 8 + i * 1.6)}" fill="${MC.cream}" ${S(3)}/>`).join('') +
    `<ellipse cx="96" cy="-110" rx="36" ry="28" fill="${MC.cream}" ${S(4)}/><path d="M82,-134 C70,-160 90,-170 96,-150 M110,-134 C122,-160 102,-170 98,-150" fill="none" ${S(5)}/><circle cx="108" cy="-114" r="5" fill="${INK}"/><path d="M60,-120 L72,-130" ${S(3)}/><rect x="-20" y="-140" width="40" height="20" fill="${MC.red}" ${S(3)}/></g>`;
}
export function scroll(x, y, w, h, title, lines, col = MC.red) {
  let g = `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="0" width="${w}" height="${h}" fill="${MC.cream}" ${S(4)}/><rect x="${-w / 2 - 14}" y="-14" width="${w + 28}" height="28" rx="14" fill="${MC.maroon}" ${S(3)}/><rect x="${-w / 2 - 14}" y="${h - 14}" width="${w + 28}" height="28" rx="14" fill="${MC.maroon}" ${S(3)}/>`;
  g += `<text x="0" y="56" text-anchor="middle" font-family="NSB" font-weight="800" font-size="30" fill="${col}">${title}</text>`;
  lines.forEach((l, i) => { g += `<text x="0" y="${104 + i * 42}" text-anchor="middle" font-family="Hind" font-weight="700" font-size="23" fill="${INK}">${l}</text>`; });
  return g + `</g>`;
}
export function mandap(cx, base, s = 1, t = 0, label = '', hi = 1) {
  let g = `<g transform="translate(${cx},${base}) scale(${s})" opacity="${hi}">`;
  g += `<rect x="-130" y="-14" width="260" height="22" fill="${MC.maroon}" ${S(3)}/>`;
  for (const px of [-110, 110]) g += `<rect x="${px - 9}" y="-300" width="18" height="290" fill="#7a3310" ${S(3)}/>`;
  g += `<path d="M-140,-300 L0,-400 L140,-300Z" fill="${MC.red}" ${S(4)}/><circle cx="0" cy="-408" r="10" fill="${MC.yellow}" ${S(2)}/>`;
  for (let i = 0; i <= 10; i++) { const tt = i / 10, x = -110 + 220 * tt, y = -292 + 40 * 4 * tt * (1 - tt); g += `<circle cx="${x}" cy="${y}" r="9" fill="${i % 2 ? MC.saffron : MC.yellow}" ${S(2)}/>`; }
  g += fire(0, -16, 0.5, t);
  g += `<g transform="translate(-62,-14) scale(.36)">${figure({ ...RAMLIKE, pose: { armF: 10, armB: -6 } })}</g>`;
  g += `<g transform="translate(62,-14) scale(-.36,.36)">${figure({ ...SITA, pose: { armF: 10, armB: -6 } })}</g>`;
  if (label) g += `<text x="0" y="56" text-anchor="middle" font-family="Hind" font-weight="700" font-size="30" fill="${INK}">${label}</text>`;
  return g + `</g>`;
}
let RAMLIKE = RAM;
export const setGroom = (o) => { RAMLIKE = o; };
export function moon(x, y, r, phase = 0.5) {
  return `<g transform="translate(${x},${y})"><circle r="${r}" fill="#fff6d8" ${S(4)}/><path d="M0,${-r} A${r},${r} 0 0,0 0,${r} A${r * (1 - 2 * phase)},${r} 0 0,${phase < 0.5 ? 1 : 0} 0,${-r}Z" fill="#2a2346" opacity=".85"/></g>`;
}
export function temple(cx, base, s = 1) {
  let g = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-150" y="-200" width="300" height="200" fill="${MC.cream}" ${S(5)}/>`;
  for (const x of [-100, 0, 100]) g += `<path d="M${x - 30},0 L${x - 30},-120 Q${x},-160 ${x + 30},-120 L${x + 30},0Z" fill="${MC.saffron}" ${S(4)}/>`;
  g += `<path d="M-150,-200 Q-150,-300 -90,-320 Q-60,-260 -60,-200Z M150,-200 Q150,-300 90,-320 Q60,-260 60,-200Z" fill="${MC.yellow}" ${S(4)}/>`;
  g += `<path d="M-70,-200 Q-70,-360 0,-420 Q70,-360 70,-200Z" fill="${MC.yellow}" ${S(5)}/><path d="M-40,-260 Q0,-300 40,-260" fill="none" ${S(3)}/>`;
  g += `<line x1="0" y1="-420" x2="0" y2="-470" ${S(4)}/><path d="M0,-470 L44,-456 L0,-442Z" fill="${MC.saffron}" ${S(3)}/>`;
  return g + `</g>`;
}
export function chariot(cx, base, s = 1, flagT = 0) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-130" y="-150" width="260" height="90" rx="10" fill="${MC.yellow}" ${S(5)}/><rect x="-120" y="-140" width="240" height="24" fill="url(#tri)"/>` +
    [-80, 80].map((x) => `<circle cx="${x}" cy="-40" r="52" fill="${MC.maroon}" ${S(5)}/><circle cx="${x}" cy="-40" r="12" fill="${MC.yellow}" ${S(3)}/>`).join('') +
    `<line x1="-110" y1="-150" x2="-110" y2="-420" ${S(6)}/><path d="M-110,-420 Q${-40 + Math.sin(flagT * 4) * 8},-400 -40,-390 Q${-70 + Math.sin(flagT * 4) * 8},-372 -110,-370Z" fill="${MC.saffron}" ${S(3)}/></g>`;
}
export function horse(x, y, s = 1, t = 0, flip = false) {
  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})"><ellipse cx="0" cy="-110" rx="80" ry="40" fill="${MC.white}" ${S(4)}/>` +
    [-50, -25, 30, 55].map((lx, i) => `<rect x="${lx - 8}" y="-80" width="16" height="${80 + 6 * Math.sin(t * 9 + i)}" fill="${MC.white}" ${S(3)}/>`).join('') +
    `<path d="M60,-130 L110,-200 L140,-180 L100,-110Z" fill="${MC.white}" ${S(4)}/><circle cx="122" cy="-184" r="4" fill="${INK}"/><path d="M70,-140 L100,-196" stroke="${MC.red}" stroke-width="8"/><path d="M-80,-120 C-110,-110 -120,-70 -100,-50" fill="none" ${S(8)}/></g>`;
}
export const parrots = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${bird(-60, 0, 0.9)}<g transform="scale(-1,1)">${bird(-60, 0, 0.9)}</g><path d="M0,30 C-30,0 -30,-30 0,-14 C30,-30 30,0 0,30Z" fill="${MC.red}" ${S(3)}/></g>`;
export const chip = (x, y, txt, col = MC.red, size = 26) => `<g transform="translate(${x},${y})"><rect x="${-txt.length * size * 0.32 - 22}" y="-30" width="${txt.length * size * 0.64 + 44}" height="48" rx="24" fill="${MC.cream}" stroke="${col}" stroke-width="4"/><text x="0" y="4" text-anchor="middle" font-family="Hind" font-weight="700" font-size="${size}" fill="${INK}">${txt}</text></g>`;
export const pop = (lt, at, d = 0.4) => { const p = clamp((lt - at) / d); return p <= 0 ? 0.001 : ease(p) + 0.18 * Math.sin(p * Math.PI); };
