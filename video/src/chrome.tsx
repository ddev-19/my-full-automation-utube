import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Sequence, delayRender, continueRender, interpolate, spring, staticFile, useCurrentFrame } from 'remotion';
import { C, FPS, SPRING, T, clamp } from './theme';
import { CAPS, SCENE_TAGS, Cap } from './data';
import { PAGE_NAME } from './brand';

const FONTS: [string, string, string][] = [
  ['Hind', '600', 'hind-devanagari-600-normal.woff2'],
  ['Hind', '700', 'hind-devanagari-700-normal.woff2'],
  ['NSB', '800', 'noto-serif-devanagari-devanagari-800-normal.woff2'],
];
export const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONTS.map(([f, w, u]) => new FontFace(f, `url(${staticFile('fonts/' + u)})`, { weight: w }).load().then((ff) => document.fonts.add(ff))))
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

// 960x540 design space scaled to 1920x1080, with slow push-in, fade-in, grain + vignette
export const Stage: React.FC<{ dur: number; push?: number; children: React.ReactNode; bg?: string }> = ({ dur, push = 0.05, children, bg }) => {
  const f = useCurrentFrame();
  const sc = 1 + push * (f / dur);
  const op = interpolate(f, [0, 4], [0.55, 1], clamp);
  return (
    <AbsoluteFill style={{ background: bg ?? C.beige, opacity: op }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${sc})`, transformOrigin: '50% 58%' }}>
        <div style={{ width: 960, height: 540, transform: 'scale(2)', transformOrigin: '0 0', position: 'relative', overflow: 'hidden' }}>
          <svg width={960} height={540} viewBox="0 0 960 540" style={{ position: 'absolute', left: 0, top: 0 }}>{children}</svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const parse = (t: string) =>
  t.split('\n').map((line, i) => (
    <div key={i}>
      {line.split(/(\{[^}]+\})/).map((p, j) =>
        p.startsWith('{') ? <b key={j} style={{ color: C.red }}>{p.slice(1, -1)}</b> : <span key={j}>{p}</span>
      )}
    </div>
  ));

const Caption: React.FC<{ cap: Cap; len: number }> = ({ cap, len }) => {
  const f = useCurrentFrame();
  const sp = spring({ frame: f, fps: FPS, config: SPRING });
  const out = interpolate(f, [len - 5, len], [1, 0], clamp);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 26, display: 'flex', justifyContent: 'center', opacity: Math.min(1, sp) * out, transform: `translateY(${(1 - sp) * 14}px) scale(${0.92 + 0.08 * sp})` }}>
      <div style={{ padding: '8px 22px', borderRadius: 16, background: C.card, boxShadow: '0 4px 14px #0003', fontFamily: 'Hind', fontWeight: 700, fontSize: 24, lineHeight: 1.32, color: C.ink, textAlign: 'center', whiteSpace: 'nowrap' }}>
        {cap.who && <div style={{ fontSize: 14, fontWeight: 600, color: '#8a7a68', marginBottom: 2 }}>● {cap.who}</div>}
        {parse(cap.t)}
      </div>
    </div>
  );
};

export const Overlay: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const tag = SCENE_TAGS.find((x) => t >= x.s + 0.15 && t < x.e);
  const ts = tag ? tag.s : 0;
  const tsp = spring({ frame: f - T(ts + 0.2), fps: FPS, config: SPRING });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ width: 960, height: 540, transform: 'scale(2)', transformOrigin: '0 0', position: 'relative' }}>
          {PAGE_NAME !== '' && (
            <div style={{ position: 'absolute', left: '50%', top: 26, transform: 'translateX(-50%)', padding: '6px 26px', borderRadius: 24, background: '#f1e8d8d9', fontFamily: 'NSB', fontWeight: 800, fontSize: 17, color: C.ink, whiteSpace: 'nowrap' }}>— {PAGE_NAME} —</div>
          )}
          {tag && (
            <div style={{ position: 'absolute', left: 30, top: 24, transform: `scale(${0.85 + 0.15 * Math.min(1, tsp)})`, transformOrigin: '0 50%', opacity: Math.min(1, tsp), padding: '5px 18px 6px', borderRadius: 26, background: '#F6EFE8', border: `3px solid ${C.red}`, boxShadow: '0 4px 12px #0003', fontFamily: 'Hind', fontWeight: 700, fontSize: 19, lineHeight: 1.25, color: C.ink, whiteSpace: 'nowrap' }}>
              <i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: C.red, marginRight: 9, verticalAlign: 'middle' }} />{tag.tag}
            </div>
          )}
          {CAPS.map((c, i) => {
            const len = T(c.e + 0.18) - T(c.s);
            return (
              <Sequence key={i} from={T(c.s)} durationInFrames={len}>
                <Caption cap={c} len={len} />
              </Sequence>
            );
          })}
        </div>
      </div>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(30,15,5,0.22) 100%)', pointerEvents: 'none' }} />
      <AbsoluteFill style={{ opacity: 0.1, mixBlendMode: 'multiply', pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='${(f % 3) + 1}'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")` }} />
    </AbsoluteFill>
  );
};
