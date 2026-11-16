import { expect, it } from "vitest";
import { bannerCooldown, formatBannerCooldown } from "./banner-cooldown";
it('uses a full rolling 24 hours and never returns negative or invalid countdowns',()=>{const now=Date.parse('2026-11-16T12:00:00Z');expect(bannerCooldown(new Date(now+86400000).toISOString(),now)).toBe(86400);expect(bannerCooldown(new Date(now+1).toISOString(),now)).toBe(1);expect(bannerCooldown(new Date(now).toISOString(),now)).toBe(0);expect(bannerCooldown('invalid',now)).toBe(0);expect(formatBannerCooldown(86399)).toBe('23h 59min 59s');});
