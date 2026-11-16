import { useId } from "react";
import { lavaPalette, lavaPattern } from "./profile-banner";
/** Bounded SVG metaballs: alpha threshold makes touching masses join into viscous necks. */
export function LavaBanner({ seed, color }: { seed: string; color: string }) {
  const id = "oo-lava-" + useId().replace(/[^a-z0-9_-]/gi, "");
  const { family, blobs } = lavaPattern(seed);
  const base = lavaPalette(color, .5);
  return <svg className="oo-lava-field" aria-hidden="true" data-pattern={family} viewBox="0 0 440 120" preserveAspectRatio="none">
    <defs>
      <filter id={`${id}-goo`} x="-15%" y="-60%" width="130%" height="220%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
      </filter>
      <linearGradient id={`${id}-body`} x2="0" y2="1">
        <stop stopColor={base.shade} /><stop offset=".5" stopColor={base.body} /><stop offset="1" stopColor={base.shade} />
      </linearGradient>
      {blobs.map((blob, index) => { const tone = lavaPalette(color, blob.tone); return <radialGradient key={index} id={`${id}-depth-${index}`} cx=".28" cy=".2" r=".82">
        <stop stopColor={tone.light} /><stop offset=".35" stopColor={tone.body} /><stop offset=".8" stopColor={tone.shade} /><stop offset="1" stopColor={tone.shade} stopOpacity="0" />
      </radialGradient>; })}
      <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="440" height="120" style={{maskType:"alpha"}}>
        <g filter={`url(#${id}-goo)`} fill="white">
          <ellipse cx="100" cy="-21" rx="145" ry="34" /><ellipse cx="320" cy="142" rx="170" ry="39" />
          {blobs.map((blob,index)=><g key={index} className="oo-lava-blob" style={blob.style}><ellipse cx={blob.cx} cy="0" rx={blob.rx} ry={blob.ry} /></g>)}
        </g>
      </mask>
    </defs>
    <g mask={`url(#${id}-mask)`}>
      <rect width="440" height="120" fill={`url(#${id}-body)`} />
      {blobs.map((blob,index)=><g key={index} className="oo-lava-blob oo-lava-depth" style={blob.style}><ellipse cx={blob.cx} cy="0" rx={blob.rx} ry={blob.ry} fill={`url(#${id}-depth-${index})`} /></g>)}
    </g>
  </svg>;
}
