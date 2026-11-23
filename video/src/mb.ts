// @ts-nocheck
// Madhubani-style puppet library (original artwork). Characters face right by default.
// Every figure is built around its feet at (0,0); ~520px tall at scale 1.
export const INK = '#1b1410';
export const MC = {
  red:'#c8302a', verm:'#e04a2f', yellow:'#f2b705', saffron:'#f08a24', green:'#3f8f4f',
  leaf:'#5aa64f', blue:'#2f6fb5', ramblue:'#3b7fc4', pink:'#e86f8f', cream:'#f6e7c1',
  paper:'#f3dfb3', skin:'#f0b27a', skinD:'#d9915a', white:'#fffaf0', maroon:'#7a1f1f', black:INK
};

export function defs(){ return `
<defs>
 <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="${INK}" stroke-width="2"/></pattern>
 <pattern id="hatchR" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="9" stroke="${MC.red}" stroke-width="2.4"/></pattern>
 <pattern id="dotsY" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="${MC.red}"/><circle cx="9" cy="9" r="3" fill="${MC.yellow}"/></pattern>
 <pattern id="dotsW" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="${MC.yellow}"/><circle cx="8" cy="8" r="2.6" fill="${MC.red}"/></pattern>
 <pattern id="stripesY" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${MC.yellow}"/><rect width="14" height="5" fill="${MC.saffron}"/></pattern>
 <pattern id="scales" width="20" height="14" patternUnits="userSpaceOnUse"><rect width="20" height="14" fill="${MC.green}"/><path d="M0,14 Q10,0 20,14" fill="none" stroke="${INK}" stroke-width="2"/></pattern>
 <pattern id="tri" width="34" height="24" patternUnits="userSpaceOnUse"><rect width="34" height="24" fill="${MC.yellow}"/><path d="M0 24 L17 2 L34 24 Z" fill="${MC.red}" stroke="${INK}" stroke-width="2"/></pattern>
 <pattern id="leafband" width="40" height="30" patternUnits="userSpaceOnUse"><rect width="40" height="30" fill="${MC.cream}"/><path d="M4,15 Q20,0 36,15 Q20,30 4,15Z" fill="${MC.leaf}" stroke="${INK}" stroke-width="2"/><line x1="4" y1="15" x2="36" y2="15" stroke="${INK}" stroke-width="1.5"/></pattern>
 <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .3  0 0 0 0 .15  0 0 0 .18 0"/></filter>
 <radialGradient id="flash"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".4" stop-color="#fff3b0" stop-opacity=".8"/><stop offset="1" stop-color="#ffd15c" stop-opacity="0"/></radialGradient>
</defs>`;}

export const S = (w=4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// Profile head facing right, neck base at (0,0). opts: skin, crown('ram'|'king'|'none'), hair, female, beard, bun, eyeOpen(0..1), mouth
export function head(o){
  const sk = o.skin;
  let g = '';
  // hair behind
  if (o.female){
    g += `<path d="M-38,-30 C-62,-80 -40,-128 10,-128 C40,-128 58,-110 60,-92 L-10,-60 C-30,-20 -40,40 -46,120 L-60,120 C-58,40 -50,-5 -38,-30Z" fill="${INK}"/>`;
    // braid down the back with tassel
    g += `<path d="M-52,10 C-60,60 -58,110 -54,170" fill="none" ${S(14)}/>` ;
    g += `<circle cx="-54" cy="176" r="9" fill="${MC.red}" ${S(3)}/>`;
  } else {
    g += `<path d="M-34,-20 C-58,-60 -48,-118 6,-124 C42,-126 56,-108 58,-94 L-8,-70 C-20,-50 -26,-30 -26,-10Z" fill="${INK}"/>`;
    g += `<path d="M-30,-20 C-44,10 -46,40 -40,70" fill="none" ${S(10)}/>`; // locks on shoulder
  }
  if (o.bun) g += `<ellipse cx="-14" cy="-140" rx="26" ry="24" fill="${o.bunColor||INK}" ${S(3)}/>`;
  // face
  g += `<path d="M-26,-6 C-38,-58 -20,-104 22,-104 C46,-104 58,-86 58,-68 L60,-60 L76,-44 L60,-38 C62,-32 60,-26 56,-24 C60,-20 56,-12 50,-10 C44,-2 30,6 10,6 L-26,4Z" fill="${sk}" ${S(4)}/>`;
  // eye: Madhubani big fish eye
  const op = (o.eyeOpen===undefined)?1:o.eyeOpen;
  g += `<path d="M14,-66 Q36,${-66-14*op} 56,-64 Q36,${-66+10*op} 14,-66Z" fill="${MC.white}" ${S(3)}/>`;
  if (op>0.25) g += `<circle cx="38" cy="-65" r="${6*op}" fill="${INK}"/>`;
  g += `<path d="M10,-80 Q34,-96 58,-80" fill="none" ${S(4)}/>`; // brow
  g += `<path d="M14,-66 L4,-62" fill="none" ${S(3)}/>`; // eye tail
  // lips
  g += `<path d="M58,-30 Q52,-26 48,-29" fill="none" stroke="${MC.red}" stroke-width="5" stroke-linecap="round"/>`;
  // ear + earring
  g += `<path d="M-6,-60 C-20,-62 -22,-38 -6,-36" fill="${sk}" ${S(3)}/><circle cx="-10" cy="-26" r="8" fill="${MC.yellow}" ${S(3)}/>`;
  // tilak
  g += o.female ? `<circle cx="52" cy="-92" r="5" fill="${MC.red}"/>` : `<path d="M54,-108 L52,-86" stroke="${MC.red}" stroke-width="5" stroke-linecap="round"/>`;
  if (o.beard){ g += `<path d="M-8,-20 C0,20 30,70 52,56 C60,30 56,0 50,-10 C40,0 20,4 -8,-20Z" fill="${MC.white}" ${S(3)}/>`;
                g += `<path d="M10,0 C16,20 26,40 40,50 M24,-4 C30,14 38,30 48,40" fill="none" ${S(2)}/>`; }
  // headwear
  if (o.crown==='ram' || o.crown==='king'){
    const col = o.crown==='ram'? MC.yellow : MC.saffron;
    g += `<path d="M-30,-100 L60,-100 L52,-124 L-22,-124Z" fill="${col}" ${S(4)}/>`;
    g += `<path d="M-22,-124 L52,-124 L40,-160 L-10,-160Z" fill="${MC.red}" ${S(4)}/>`;
    g += `<path d="M-10,-160 L40,-160 L15,-220Z" fill="${col}" ${S(4)}/>`;
    g += `<circle cx="15" cy="-226" r="9" fill="${MC.red}" ${S(3)}/>`;
    for (let i=0;i<5;i++) g += `<circle cx="${-12+i*16}" cy="-112" r="4" fill="${MC.red}"/>`;
    g += `<path d="M-2,-140 L32,-140" stroke="${MC.yellow}" stroke-width="4"/>`;
  }
  if (o.female){
    g += `<path d="M-40,-96 C-20,-136 40,-134 60,-96 C40,-118 -10,-120 -40,-96Z" fill="${MC.red}" ${S(3)}/>`; // head border of veil
    g += `<circle cx="56" cy="-100" r="6" fill="${MC.yellow}" ${S(2)}/>`; // maang tikka
  }
  return g;
}

// Full figure. o: {kind, skin, pose:{armF,armB,legSwing,headTilt,bend}, ...}
export function figure(o){
  const p = Object.assign({armF:20, armB:-10, elbowF:0, legSwing:0, headTilt:0, eyeOpen:1}, o.pose||{});
  const sk = o.skin;
  let g = '';
  // legs / lower garment
  if (o.female){
    // saree skirt (lehenga-like Madhubani flare)
    g += `<path d="M-46,-250 L46,-250 L96,-6 L-96,-6Z" fill="url(#dotsY)" ${S(4)}/>`;
    g += `<path d="M-96,-6 L96,-6 L92,-30 L-92,-30Z" fill="url(#tri)" ${S(3)}/>`;
    g += `<path d="M-60,-160 L62,-160" fill="none" ${S(3)}/><path d="M-70,-110 L74,-110" fill="none" ${S(3)}/>`;
    g += `<path d="M40,-4 l26,0 l-4,-10 l-22,0Z" fill="${sk}" ${S(3)}/>`; // foot
  } else {
    const s = p.legSwing;
    g += `<g transform="rotate(${-s} 0 -200)"><path d="M-30,-200 L10,-200 L4,-14 L-22,-14Z" fill="${sk}" ${S(4)}/><path d="M-22,-14 L4,-14 L34,-2 L-22,0Z" fill="${sk}" ${S(4)}/></g>`;
    g += `<g transform="rotate(${s} 0 -200)"><path d="M-6,-200 L30,-200 L28,-14 L2,-14Z" fill="${sk}" ${S(4)}/><path d="M2,-14 L28,-14 L58,-2 L2,0Z" fill="${sk}" ${S(4)}/></g>`;
    // dhoti
    g += `<path d="M-52,-300 L52,-300 L50,-150 C20,-130 -20,-130 -50,-150Z" fill="${o.dhoti||MC.yellow}" ${S(4)}/>`;
    g += `<path d="M-50,-150 C-20,-130 20,-130 50,-150 L46,-170 C20,-152 -20,-152 -46,-170Z" fill="url(#hatchR)" ${S(3)}/>`;
    g += `<path d="M10,-300 C30,-240 26,-190 14,-140" fill="none" ${S(3)}/>`;
  }
  // back arm
  const shoulder = o.female? [-4,-388] : [-6,-400];
  g += `<g transform="rotate(${p.armB} ${shoulder[0]} ${shoulder[1]})">${arm(sk, shoulder, 0, o)}</g>`;
  // torso
  if (o.female){
    g += `<path d="M-44,-400 C-40,-330 -50,-290 -46,-250 L46,-250 C50,-300 44,-340 40,-400 C10,-416 -20,-416 -44,-400Z" fill="${sk}" ${S(4)}/>`;
    g += `<path d="M-44,-336 L42,-336 L46,-280 L-46,-280Z" fill="${MC.yellow}" ${S(3)}/>`; // choli
    g += `<path d="M-44,-400 C-10,-360 30,-300 46,-250 L46,-226 C20,-280 -20,-330 -50,-370Z" fill="${MC.red}" ${S(3)}/>`; // pallu sash
    g += `<path d="M-30,-394 Q0,-366 34,-394" fill="none" stroke="${MC.yellow}" stroke-width="6"/><path d="M-26,-386 Q0,-350 30,-386" fill="none" stroke="${MC.red}" stroke-width="4"/>`;
  } else {
    g += `<path d="M-50,-410 C-56,-360 -54,-330 -50,-300 L50,-300 C56,-330 58,-370 46,-410 C20,-424 -26,-424 -50,-410Z" fill="${sk}" ${S(4)}/>`;
    g += `<path d="M-50,-410 L46,-300" fill="none" stroke="${MC.white}" stroke-width="8"/><path d="M-50,-410 L46,-300" fill="none" ${S(2)}/>`; // janeu
    g += `<path d="M-34,-404 Q2,-370 38,-404" fill="none" stroke="${MC.yellow}" stroke-width="7"/><path d="M-30,-394 Q2,-354 34,-394" fill="none" stroke="${MC.red}" stroke-width="5"/>`;
    g += `<path d="M-52,-318 L52,-318 L52,-300 L-52,-300Z" fill="${MC.red}" ${S(3)}/>`; // waist band
    if (o.uttariya) g += `<path d="M-50,-410 C-80,-360 -84,-300 -70,-240" fill="none" stroke="${o.uttariya}" stroke-width="16" stroke-linecap="round"/>`;
  }
  // head
  g += `<g transform="translate(0,-414) rotate(${p.headTilt} 0 0)">${head(Object.assign({}, o, {eyeOpen:p.eyeOpen}))}</g>`;
  // garland on neck (for varmala)
  if (o.garland){ g += garlandOnNeck(); }
  // front arm
  g += `<g transform="rotate(${p.armF} ${shoulder[0]+14} ${shoulder[1]})">${arm(sk, [shoulder[0]+14, shoulder[1]], p.elbowF, o, true)}${o.handItem||''}</g>`;
  return `<g>${g}</g>`;
}

// arm hanging down from shoulder; elbow bend rotates forearm forward
export function arm(sk, sh, elbow, o, front){
  const [x,y]=sh;
  let g = `<path d="M${x-14},${y} L${x+14},${y} L${x+12},${y+110} L${x-10},${y+110}Z" fill="${sk}" ${S(4)}/>`;
  g += `<circle cx="${x+1}" cy="${y+36}" r="0"/><path d="M${x-12},${y+40} L${x+14},${y+40}" stroke="${MC.yellow}" stroke-width="7"/>`; // armlet
  g += `<g transform="rotate(${-elbow} ${x+1} ${y+108})">`;
  g += `<path d="M${x-10},${y+108} L${x+12},${y+108} L${x+10},${y+200} L${x-8},${y+200}Z" fill="${sk}" ${S(4)}/>`;
  g += `<path d="M${x-9},${y+186} L${x+11},${y+186}" stroke="${o.female?MC.red:MC.yellow}" stroke-width="7"/>`;
  g += `<path d="M${x-10},${y+198} C${x-14},${y+226} ${x+18},${y+232} ${x+14},${y+198}Z" fill="${sk}" ${S(3)}/>`;
  g += `</g>`;
  return g;
}

export function garlandOnNeck(){
  let g='';
  for (let i=0;i<=16;i++){ const a=Math.PI*(0.05+0.9*i/16); const x=-2+46*Math.cos(a)*1.05, y=-404+70*Math.sin(a);
    g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${i%2?MC.saffron:MC.yellow}" ${S(2)}/>`; }
  return g;
}

export function garland(cx, cy, rx=46, ry=70, rot=0){
  let g=`<g transform="translate(${cx},${cy}) rotate(${rot})">`;
  for (let i=0;i<24;i++){ const a=2*Math.PI*i/24; g+=`<circle cx="${(rx*Math.cos(a)).toFixed(1)}" cy="${(ry*Math.sin(a)).toFixed(1)}" r="11" fill="${i%2?MC.saffron:MC.yellow}" ${S(2)}/>`; }
  return g+'</g>';
}

// Madhubani bow: thick, patterned, tips curled. Drawn centred at (0,0), horizontal, curving up. bend: extra curvature 0..1
export function bowShape(w, h, bend=0, broken=0){
  const hw=w/2, hh=h*(1+bend*0.5);
  const limbL=`M${-hw},0 C${-hw*0.75},${-hh} ${-hw*0.3},${-hh*1.05} 0,${-hh*0.98}`;
  const limbR=`M0,${-hh*0.98} C${hw*0.3},${-hh*1.05} ${hw*0.75},${-hh} ${hw},0`;
  const deco = (d)=>`<path d="${d}" fill="none" ${S(34)}/><path d="${d}" fill="none" stroke="${MC.yellow}" stroke-width="26" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${MC.red}" stroke-width="8" stroke-dasharray="4 18" stroke-linecap="round"/>`;
  let g='';
  if (!broken){
    g += `<path d="M${-hw},0 L0,${bend*hh*0.9} L${hw},0" fill="none" stroke="${INK}" stroke-width="4"/>`;
    g += deco(limbL)+deco(limbR);
    g += `<rect x="-26" y="${-hh*0.98-22}" width="52" height="44" rx="8" fill="${MC.red}" ${S(4)}/><circle cx="0" cy="${-hh*0.98}" r="8" fill="${MC.yellow}"/>`;
  } else {
    const d = broken; // 0..1 separation
    g += `<g transform="translate(${-40-d*160},${d*120}) rotate(${-d*35} 0 ${-hh*0.98})">${deco(limbL)}<path d="M-8,${-hh*0.98-20} l14,10 l-10,10 l14,10" fill="none" ${S(4)}/></g>`;
    g += `<g transform="translate(${40+d*160},${d*120}) rotate(${d*35} 0 ${-hh*0.98})">${deco(limbR)}<path d="M8,${-hh*0.98-20} l-14,10 l10,10 l-14,10" fill="none" ${S(4)}/></g>`;
  }
  for (const sx of [-1,1]) if(!broken) g += `<path d="M${sx*hw},0 c${sx*10},-6 ${sx*18},6 ${sx*8},16 c${-sx*10},6 ${-sx*16},-4 ${-sx*8},-10" fill="${MC.yellow}" ${S(3)}/>`;
  return g;
}

// Madhubani scenery bits
export function sunFace(cx,cy,r){
  let g=`<g transform="translate(${cx},${cy})">`;
  for(let i=0;i<16;i++){const a=i*Math.PI/8; g+=`<path d="M${(r*1.05*Math.cos(a-0.12)).toFixed(1)},${(r*1.05*Math.sin(a-0.12)).toFixed(1)} L${(r*1.6*Math.cos(a)).toFixed(1)},${(r*1.6*Math.sin(a)).toFixed(1)} L${(r*1.05*Math.cos(a+0.12)).toFixed(1)},${(r*1.05*Math.sin(a+0.12)).toFixed(1)}Z" fill="${i%2?MC.saffron:MC.red}" ${S(3)}/>`;}
  g+=`<circle r="${r}" fill="${MC.yellow}" ${S(4)}/><circle r="${r*0.78}" fill="none" ${S(2)} stroke-dasharray="3 7"/>`;
  g+=`<path d="M${-r*.45},${-r*.15} Q${-r*.25},${-r*.32} ${-r*.05},${-r*.15} Q${-r*.25},${-r*.02} ${-r*.45},${-r*.15}Z" fill="#fff" ${S(2)}/><circle cx="${-r*.25}" cy="${-r*.15}" r="${r*.06}" fill="${INK}"/>`;
  g+=`<path d="M${r*.05},${-r*.15} Q${r*.25},${-r*.32} ${r*.45},${-r*.15} Q${r*.25},${-r*.02} ${r*.05},${-r*.15}Z" fill="#fff" ${S(2)}/><circle cx="${r*.25}" cy="${r*-.15}" r="${r*.06}" fill="${INK}"/>`;
  g+=`<path d="M0,${-r*.1} L${r*.06},${r*.2} L${-r*.04},${r*.2}" fill="none" ${S(2)}/><path d="M${-r*.2},${r*.42} Q0,${r*.55} ${r*.2},${r*.42}" fill="none" stroke="${MC.red}" stroke-width="5"/>`;
  return g+'</g>';
}
export function fish(cx,cy,s,rot=0,col=MC.blue){
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${s})"><path d="M-60,0 C-30,-34 30,-34 50,0 C30,34 -30,34 -60,0Z" fill="${col}" ${S(4)}/><path d="M50,0 L84,-24 L78,0 L84,24Z" fill="${MC.red}" ${S(4)}/><path d="M-30,-18 Q-10,0 -30,18 M-10,-22 Q10,0 -10,22 M10,-20 Q30,0 10,20" fill="none" ${S(2)}/><circle cx="-42" cy="-4" r="6" fill="#fff" ${S(2)}/><circle cx="-42" cy="-4" r="2.5" fill="${INK}"/></g>`;
}
export function bird(cx,cy,s,flap=0){
  return `<g transform="translate(${cx},${cy}) scale(${s})"><path d="M-40,0 C-20,-26 30,-24 44,-4 L60,-8 L46,4 C30,20 -20,22 -40,0Z" fill="${MC.green}" ${S(4)}/><path d="M-6,-6 C-10,${-50-flap*20} 20,${-60-flap*20} 26,-14Z" fill="${MC.saffron}" ${S(3)}/><circle cx="34" cy="-6" r="4" fill="${INK}"/><path d="M-40,0 L-70,-16 L-62,4 L-74,18Z" fill="${MC.red}" ${S(3)}/></g>`;
}
export function tree(cx,base,s){
  let g=`<g transform="translate(${cx},${base}) scale(${s})"><path d="M-18,0 C-14,-80 -16,-160 -6,-220 L6,-220 C16,-160 14,-80 18,0Z" fill="${MC.maroon}" ${S(4)}/>`;
  const leaves=[[-90,-260,-30],[90,-260,30],[-60,-330,-15],[60,-330,15],[0,-370,0],[-120,-200,-50],[120,-200,50]];
  for(const [x,y,r] of leaves) g+=`<g transform="translate(${x},${y}) rotate(${r})"><path d="M-40,0 Q0,-36 40,0 Q0,36 -40,0Z" fill="${MC.leaf}" ${S(4)}/><path d="M-40,0 L40,0 M-20,-14 L-10,0 M0,-18 L10,0 M20,-14 L26,0" fill="none" ${S(2)}/></g>`;
  return g+'</g>';
}
export function border(W,H){
  return `<rect x="0" y="0" width="${W}" height="34" fill="url(#leafband)"/><rect x="0" y="${H-34}" width="${W}" height="34" fill="url(#leafband)"/>`+
    `<rect x="0" y="0" width="34" height="${H}" fill="url(#leafband)"/><rect x="${W-34}" y="0" width="34" height="${H}" fill="url(#leafband)"/>`+
    `<rect x="34" y="34" width="${W-68}" height="${H-68}" fill="none" ${S(6)}/><rect x="46" y="46" width="${W-92}" height="${H-92}" fill="none" stroke="${MC.red}" stroke-width="4"/>`;
}
// easing helpers
export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const prog=(t,a,b)=>clamp((t-a)/(b-a));
export const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
export const lerp=(a,b,x)=>a+(b-a)*x;
