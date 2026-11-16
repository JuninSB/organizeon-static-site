import { useId, type CSSProperties } from "react";
import { lavaPalette } from "./profile-banner";

/** Independent material renderers. Seed controls geometry; no frame timers or global state. */
export function MaterialBanner({ seed, color, material }: { seed: string; color: string; material: string }) {
  const id = 'oo-material-' + useId().replace(/[^a-z0-9_-]/gi, '');
  const tone = lavaPalette(color, .5);
  const random = (index: number) => {
    let h = 2166136261;
    for (const c of seed + ':' + index) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
  };
  const motion = (name: string, i: number, duration = 12): CSSProperties => ({
    animationName: name, animationDuration: `${duration + random(i + 90) * 8}s`,
    animationDelay: `${-random(i + 40) * 20}s`, transformBox: 'fill-box', transformOrigin: 'center',
    '--material-drift': `${(random(i + 80) - .5) * 90}px`,
  } as CSSProperties);
  const url = (name: string) => `url(#${id}-${name})`;
  return <svg className="oo-lava-field oo-material-field" data-pattern={material} aria-hidden="true" viewBox="0 0 440 120" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id={`${id}-gel`} cx=".28" cy=".18" r=".85"><stop stopColor={tone.light}/><stop offset=".22" stopColor={tone.body}/><stop offset=".7" stopColor={tone.body}/><stop offset="1" stopColor={tone.shade}/></radialGradient>
      <linearGradient id={`${id}-drip`} x2=".8" y2="0"><stop stopColor={tone.shade}/><stop offset=".36" stopColor={tone.body}/><stop offset=".55" stopColor={tone.light}/><stop offset=".72" stopColor={tone.body}/><stop offset="1" stopColor={tone.shade}/></linearGradient>
      <filter id={`${id}-merge`} x="-30%" y="-70%" width="160%" height="240%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="7"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter>
      <filter id={`${id}-soft`} x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="26"/></filter>
      <linearGradient id={`${id}-heat`} x2="0" y2="1"><stop stopColor="#ffed9d"/><stop offset=".35" stopColor="#ff9b31"/><stop offset=".7" stopColor="#e74716"/><stop offset="1" stopColor="#7b180a"/></linearGradient>
      <linearGradient id={`${id}-spectrum`}><stop stopColor="#fb7185"/><stop offset=".2" stopColor="#fbbf24"/><stop offset=".4" stopColor="#a3e635"/><stop offset=".6" stopColor="#22d3ee"/><stop offset=".8" stopColor="#818cf8"/><stop offset="1" stopColor="#e879f9"/></linearGradient>
    </defs>
    <rect width="440" height="120" fill={material === 'lava' ? '#150e0c' : material === 'stars' ? '#080d20' : tone.shade}/>
    {material === 'slime' && <g data-renderer="elastic-gel">
      <path d="M-20 -20 H460 V19 Q420 40 382 22 Q348 8 322 26 Q280 44 243 22 Q205 10 163 25 Q112 42 71 20 Q20 6 -20 30Z" fill={url('gel')}/>
      {[0,1,2,3,4].map(i => { const x = 28+i*94+random(i)*22, length=45+random(i+5)*45; return <g key={i} className="oo-material-motion" style={{...motion('oo-gel-stretch',i,6),transformOrigin:'50% 0%'}}>
        <path d={`M${x-22} 8 C${x-21} 27 ${x-6} 28 ${x-7} ${length-16} C${x-8} ${length-5} ${x-20} ${length-1} ${x-17} ${length+13} C${x-13} ${length+34} ${x+23} ${length+31} ${x+21} ${length+12} C${x+20} ${length-1} ${x+8} ${length-4} ${x+8} ${length-17} C${x+7} 30 ${x+22} 25 ${x+23} 8Z`} fill={url('drip')}/>
        <path d={`M${x-5} 30 Q${x-1} 46 ${x-3} ${length-13}`} fill="none" stroke={tone.light} strokeWidth="2.5" strokeLinecap="round" opacity=".7"/>
        <ellipse cx={x-5} cy={length+11} rx="5" ry="3" fill="white" opacity=".28"/>
      </g>;})}
      <path d="M-10 114 Q40 93 93 111 T195 110 T305 112 T450 109 V140 H-10Z" fill={url('gel')}/>
    </g>}
    {material === 'bubbles' && <g data-renderer="merging-metaballs">
      <g filter={url('merge')} fill={tone.body}>{Array.from({length:10},(_,i)=><circle key={i} cx={random(i)*500-30} cy={random(i+11)*130} r={20+random(i+22)*25} className="oo-material-motion" style={motion(i%2 ? 'oo-blob-orbit' : 'oo-blob-cross',i,9)}/>)}</g>
      <g opacity=".22" fill={tone.light}>{[0,1,2].map(i=><ellipse key={i} cx={80+i*150} cy={30+i*16} rx="17" ry="5" className="oo-material-motion" style={motion('oo-blob-orbit',i,9)}/>)}</g>
    </g>}
    {material === 'gradient' && <g data-renderer="diffused-color-mesh" filter={url('soft')}>{[0,1,2,3].map(i=><ellipse key={i} cx={i*145} cy={i%2?120:0} rx="135" ry="90" fill={lavaPalette(color,i/3).light} opacity={.45+i*.1} className="oo-material-motion" style={motion('oo-mesh-drift',i,14)}/>)}</g>}
    {material === 'lava' && <g data-renderer="volcanic-crust">
      <rect width="440" height="120" fill={url('heat')} className="oo-material-motion" style={motion('oo-magma-heat',0,5)}/>
      {Array.from({length:15},(_,i)=>{const x=i%5*100-28+(random(i+101)-.5)*22,y=Math.floor(i/5)*55-26+(random(i+102)-.5)*18;return <g key={i} className="oo-material-motion" style={motion('oo-crust-drift',i,22)}><path d={`M${x} ${y+4} l55 -10 31 19 -4 24 -48 13 -37 -17Z`} fill={i%3?'#211816':'#35231c'} stroke="#6b3020" strokeWidth="1.3"/><path d={`M${x+10} ${y+14} l24 -7 27 8 -13 14 -29 2Z`} fill="#100d0c" opacity=".6"/></g>;})}
    </g>}
    {material === 'stars' && <g data-renderer="parallax-starfield">
      {Array.from({length:48},(_,i)=><g key={i} className="oo-material-motion" style={motion('oo-star-travel',i,i%3===0?18:35)}><circle cx={random(i)*540-50} cy={random(i+70)*120} r={i%7===0?1.5:.45+random(i+30)*.65} fill={i%3===0?tone.light:'#e5efff'} className="oo-material-motion" style={motion('oo-star-twinkle',i,2)}/></g>)}
      <path d="M0 0h-32" stroke="white" strokeWidth="1.2" className="oo-material-motion oo-shooting-star" style={motion('oo-star-shoot',2,9)}/>
    </g>}
    {material === 'rainbow' && <g data-renderer="spectral-rings" fill="none" stroke={url('spectrum')}>
      {[0,1,2,3,4,5,6].map(i=><ellipse key={i} cx={220+(random(i)-.5)*50} cy="170" rx={85+i*33} ry={60+i*23} strokeWidth={4+i%3*2} opacity={.45+i*.07} className="oo-material-motion" style={motion('oo-ring-precess',i,12)}/>)}
    </g>}
  </svg>;
}
