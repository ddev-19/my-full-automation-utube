// @ts-nocheck
// 1280x720 YouTube thumbnail, drawn in the same Madhubani style. Content comes from episode.ts.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { useFonts } from './chrome';
import { defs } from './mb';
import { MC, INK, S, fig, sunFace, fish, lotus, xdefs, frame, bgNight, bgForest, KRISH, ARJ, YUDH, BHIMA, DURY, BHISHMA, DRONA, DHRIT, SANJAY, VAIKH, MUNI, QUEEN, MAN, WOMAN } from './mb3';
import { RAM, SITA, JANAK, VISH, DASH, PARSH, LAX } from './mb2';
import { EPISODE } from './episode';

const CAST = { RAM, SITA, KRISH, ARJ, YUDH, BHIMA, DURY, BHISHMA, DRONA, DHRIT, SANJAY, VAIKH, MUNI, QUEEN, MAN, WOMAN, JANAK, VISH, DASH, PARSH, LAX };

export const Thumb: React.FC = () => {
  useFonts();
  const e = EPISODE;
  const bg = e.bg === 'night' ? bgNight(0) : e.bg === 'forest' ? bgForest(0)
    : e.bg === 'dawn' ? `<rect width="960" height="540" fill="url(#warg)"/>` + sunFace(480, 120, 60)
    : `<rect width="960" height="540" fill="${MC.red}"/><rect x="0" y="0" width="960" height="540" fill="url(#dotsW)" opacity=".22"/>`;
  const cast = (e.cast || []).slice(0, 3).map((k) => CAST[k]).filter(Boolean);
  const xs = cast.length === 1 ? [760] : cast.length === 2 ? [690, 850] : [620, 760, 890];
  let figs = '';
  cast.forEach((o, i) => { figs += `<circle cx="${xs[i]}" cy="260" r="150" fill="url(#glowY)" opacity=".5"/>` + fig(o, xs[i], 500, cast.length > 2 ? 0.62 : 0.72, i > 0 && cast.length === 2, { armF: cast.length === 1 ? -60 : 8, armB: -6, eyeOpen: 1 }); });
  const svg = defs() + xdefs() + bg + figs +
    `<g transform="translate(40,150)"><rect x="0" y="0" width="${Math.min(560, 60 + e.title.length * 40)}" height="150" rx="22" fill="${MC.cream}" ${S(6)}/>` +
    `<text x="30" y="105" font-family="NSB" font-weight="800" font-size="78" fill="${MC.maroon}">${e.title}</text></g>` +
    (e.hook ? `<g transform="translate(40,330)"><rect x="0" y="0" width="${Math.min(560, 60 + e.hook.length * 30)}" height="86" rx="43" fill="${MC.yellow}" ${S(5)}/><text x="30" y="60" font-family="Hind" font-weight="700" font-size="46" fill="${INK}">${e.hook}</text></g>` : '') +
    `<g transform="translate(40,58)"><rect x="0" y="-34" width="250" height="50" rx="25" fill="${MC.maroon}" stroke="${MC.yellow}" stroke-width="3"/><text x="125" y="0" text-anchor="middle" font-family="NSB" font-weight="800" font-size="26" fill="${MC.yellow}">पौराणिक कथाएँ</text></g>` +
    frame();
  return (
    <AbsoluteFill style={{ background: MC.red }}>
      <svg width={1280} height={720} viewBox="0 0 960 540" dangerouslySetInnerHTML={{ __html: svg }} />
    </AbsoluteFill>
  );
};
