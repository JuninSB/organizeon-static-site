import type { CSSProperties } from "react";
/** Stable per-account geometry; a public server-derived seed, never credentials or random render state. */
export function profileBannerPattern(seed: string): CSSProperties {
  const values = Array.from({length:8},(_,index) => {
    const part=seed.slice(index*4,index*4+4);
    if(/^[a-f0-9]{4}$/i.test(part))return Number.parseInt(part,16)/65535;
    let hash=2166136261;
    for(const character of seed+":"+index)hash=Math.imul(hash^character.charCodeAt(0),16777619);
    return (hash>>>0)/4294967295;
  });
  const percent=(index:number,min:number,max:number)=>(min+values[index]*(max-min)).toFixed(3)+"%";
  return {
    "--lava-x-one":percent(0,15,50),"--lava-y-one":percent(1,15,65),
    "--lava-x-two":percent(2,55,90),"--lava-y-two":percent(3,30,85),
    "--lava-duration-a":(13+values[4]*10).toFixed(3)+"s",
    "--lava-duration-b":(16+values[5]*12).toFixed(3)+"s",
    "--lava-delay":(-values[6]*20).toFixed(3)+"s",
    "--lava-rotation":(12+values[7]*32).toFixed(3)+"deg",
  } as CSSProperties;
}
