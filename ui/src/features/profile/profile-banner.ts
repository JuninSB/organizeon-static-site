import type { CSSProperties } from "react";
export const LAVA_PATTERNS = ["silk", "vortex", "dunes", "diagonal", "folds", "aurora", "marble", "waves", "helix", "cascade", "storm", "mist"] as const;
export const EXTRA_PATTERNS = ["slime", "bubbles", "gradient", "lava", "stars", "rainbow"] as const;
function seedValue(seed: string, index: number) {
  const part = seed.slice(index * 4, index * 4 + 4);
  if (/^[a-f0-9]{4}$/i.test(part)) return Number.parseInt(part, 16) / 65535;
  let hash = 2166136261;
  for (const character of seed + ":" + index) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  hash ^= hash >>> 16; hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13; hash = Math.imul(hash, 0xc2b2ae35); hash ^= hash >>> 16;
  return (hash >>> 0) / 4294967295;
}
/** Account seed chooses one of 12 paths and independently varies every continuous surface. */
export function lavaPattern(seed: string) {
  const family = LAVA_PATTERNS[Math.min(11, Math.floor(seedValue(seed, 0) * 12))];
  return {
    family,
    layers: Array.from({ length: 6 }, (_, index) => {
      const value = (offset: number) => seedValue(seed, index * 7 + offset + 1);
      const duration = 7 + value(1) * 10;
      return {
        tone: value(4),
        style: {
          animationName: `oo-fluid-${family}`,
          animationDuration: `${duration.toFixed(3)}s`,
          animationDelay: `${(-((index / 6 + value(5) * .15) % 1) * duration).toFixed(3)}s`,
          transformOrigin: "220px 60px",
          "--flow-drift": `${(-35 + value(6) * 70).toFixed(3)}px`,
          "--flow-turn": `${(-14 + value(4) * 28).toFixed(3)}deg`,
        } as CSSProperties,
      };
    }),
  };
}
/** Public, deterministic geometry. Never reads credentials or random render state. */
export function profileBannerPattern(seed: string): CSSProperties {
  return {
    "--lava-phase": `${(-seedValue(seed, 6) * 12).toFixed(3)}s`,
    "--lava-pool-x": `${(80 + seedValue(seed, 3) * 100).toFixed(3)}px`,
  } as CSSProperties;
}
export function lavaPalette(hex: string, variation: number) {
  const channels = /^#[0-9a-f]{6}$/i.test(hex) ? [1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255) : [0.7, 0.7, 0.7];
  const [r, g, b] = channels, max = Math.max(...channels), min = Math.min(...channels), delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  if (delta) hue = (max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4) * 60;
  hue = (hue + (variation - 0.5) * 32 + 360) % 360;
  const saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) * 100 : 0;
  const body = Math.min(65, Math.max(35, lightness * 100 + (variation - 0.5) * 10));
  const color = (s: number, l: number) => `hsl(${hue.toFixed(2)} ${s.toFixed(2)}% ${l.toFixed(2)}%)`;
  return { light: color(saturation * .55, Math.min(92, body + 30)), body: color(saturation, body), shade: color(saturation * .85, Math.max(10, body - 28)) };
}
