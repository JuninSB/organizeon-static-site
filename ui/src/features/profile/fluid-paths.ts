/** Distinct continuous surface compositions, rather than variants of isolated particles. */
export function fluidPath(family: string, index: number, variation: number) {
  const y = -70 + index * 38 + variation * 20;
  const x = -130 + index * 105 + variation * 25;
  const bottom = `L 640 300 L -180 300 Z`;
  switch (family) {
    case "slime": return `M -180 ${y-50} Q 0 ${y-60},40 ${y+35} Q 65 ${y+150},90 ${y+30} Q 140 ${y-80},220 ${y+20} Q 260 ${y+140},300 ${y+15} Q 360 ${y-70},640 ${y} ${bottom}`;
    case "lava": return `M -180 ${y} C 40 ${y-120},60 ${y+140},170 ${y+15} S 290 ${y-90},340 ${y+50} S 490 ${y+100},640 ${y-70} ${bottom}`;
    case "gradient": return `M -180 ${y-80} C 80 ${y-140},290 ${y+100},640 ${y-20} ${bottom}`;
    case "rainbow": return `M -180 ${y} Q 220 ${y-220},640 ${y} L 640 ${y+35} Q 220 ${y-180},-180 ${y+35} Z`;

    case "silk": return `M -180 ${y} C 30 ${y+120},110 ${y-115},265 ${y+15} S 510 ${y+115},640 ${y-40} ${bottom}`;
    case "vortex": return `M -180 ${y-100} C 430 ${y-140},610 ${y+170},200 ${y+150} C -30 ${y+125},-15 ${y-20},170 ${y+10} C 410 ${y+40},330 ${y+125},190 ${y+65} C 90 ${y+15},50 ${y+100},350 ${y+140} L 640 300 L -180 300 Z`;
    case "dunes": return `M -180 ${y} C 80 ${y-35},150 ${y+70},305 ${y+5} S 510 ${y-60},640 ${y+25} ${bottom}`;
    case "diagonal": return `M -180 ${y-140} C 70 ${y-120},190 ${y+100},640 ${y+150} L 640 ${y+215} C 210 ${y+130},10 ${y-35},-180 ${y-60} Z`;
    case "folds": return `M -180 ${y} C 80 ${y+110},120 ${y-120},250 ${y+15} C 320 ${y+90},405 ${y-85},640 ${y-20} ${bottom}`;
    case "aurora": return `M ${x} -170 C ${x+170} 0,${x-100} 100,${x+85} 300 L ${x+190} 300 C ${x+15} 90,${x+230} 0,${x+75} -170 Z`;
    case "marble": return `M -180 ${y} C -10 ${y-180},40 ${y+160},220 ${y-10} C 350 ${y-140},320 ${y+150},640 ${y-30} ${bottom}`;
    case "waves": return `M -180 ${y} Q -20 ${y-90},140 ${y} T 460 ${y} T 780 ${y} L 780 300 L -180 300 Z`;
    case "helix": return `M -180 ${y-20} C 20 ${y-170},190 ${y+170},330 ${y-20} S 540 ${y-110},640 ${y+30} L 640 ${y+100} C 440 ${y-50},390 ${y+140},250 ${y+60} S -10 ${y-90},-180 ${y+55} Z`;
    case "cascade": return `M ${x} -170 C ${x-75} 0,${x+120} 140,${x-20} 300 L ${x+125} 300 C ${x+260} 120,${x+25} 10,${x+95} -170 Z`;
    case "storm": return `M -180 ${y} C 40 ${y+200},-15 ${y-200},230 ${y+20} C 430 ${y+170},300 ${y-180},640 ${y+40} ${bottom}`;
    default: return `M -180 ${y-60} C 0 ${y+40},160 ${y-100},300 ${y+10} S 490 ${y+130},640 ${y-30} ${bottom}`;
  }
}
