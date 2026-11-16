import { useId } from "react";
import { LAVA_PATTERNS, lavaPalette, lavaPattern } from "./profile-banner";
import { MaterialBanner } from "./material-banner";
import { fluidPath } from "./fluid-paths";
/** Full-frame layered fabric, marble and wave surfaces with directional shading. */
export function LavaBanner({ seed, color, material }: { seed: string; color: string; material?: string }) {
  const id = "oo-fluid-" + useId().replace(/[^a-z0-9_-]/gi, "");
  if (material === "slime" || material === "lava") return null;
  if (material) return <MaterialBanner seed={seed} color={color} material={material}/>;
  const pattern = lavaPattern(seed);
  const family = pattern.family, layers = pattern.layers;
  const base = lavaPalette(color, .5), familyIndex = (LAVA_PATTERNS as readonly string[]).indexOf(family);
  return <svg className="oo-lava-field" aria-hidden="true" data-pattern={family} viewBox="0 0 440 120" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`${id}-base`} x2="1" y2="1"><stop stopColor={base.body}/><stop offset=".5" stopColor={base.shade}/><stop offset="1" stopColor={base.light}/></linearGradient>
      <filter id={`${id}-flow`} filterUnits="userSpaceOnUse" x="-50" y="-35" width="540" height="190" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency={family === "storm" ? ".012 .022" : ".005 .012"} numOctaves="1" seed={familyIndex+1} result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={family === "marble" ? 26 : family === "storm" ? 22 : 7} xChannelSelector="R" yChannelSelector="G"/>
        <feGaussianBlur stdDeviation={family === "mist" ? 10 : .35}/>
        <feColorMatrix type="saturate" values="1.08"/>
      </filter>
      {layers.map((layer,index)=>{const tone=lavaPalette(color,(layer.tone-.5)*2+.5);return <linearGradient key={index} id={`${id}-fold-${index}`} x1={family === "aurora" ? "0" : ".25"} y1="0" x2={family === "cascade" ? "1" : ".7"} y2="1">
        <stop stopColor={tone.shade}/><stop offset=".13" stopColor={tone.body}/><stop offset=".3" stopColor={tone.light}/><stop offset=".51" stopColor={tone.body}/><stop offset=".85" stopColor={tone.shade}/><stop offset="1" stopColor={tone.body}/>
      </linearGradient>;})}
    </defs>
    <rect width="440" height="120" fill={`url(#${id}-base)`}/>
    <g filter={`url(#${id}-flow)`}>
      {layers.map((layer,index)=><g key={index} className="oo-fluid-layer oo-lava-depth" style={layer.style} opacity={family === "mist" ? .42 : family === "aurora" ? .65 : .88}>
        <path d={fluidPath(family,index,layer.tone)} fill={`url(#${id}-fold-${index})`}/>
      </g>)}
    </g>
  </svg>;
}
