import roblox from "./assets/roblox.ico";
import github from "./assets/github.png";
import google from "./assets/google.ico";

const logos: Record<string, string> = {
  "roblox.com": roblox,
  "github.com": github,
  "google.com": google,
};

export function senderIdentity(sender: string) {
  const match = sender.trim().match(/^(.*?)\s*<([^<>]+)>$/);
  const address = (match?.[2] || sender).trim();
  const name = (match?.[1] || address.split("@")[0] || "Remetente").replace(/^"|"$/g, "").trim();
  const domain = address.split("@")[1]?.toLowerCase() || "";
  // Exact domains only: a lookalike domain must not inherit another brand.
  const logo = logos[domain];
  const initials = name.split(/\s+/).slice(0, 2).map(word => Array.from(word)[0] || "").join("").toLocaleUpperCase("pt-BR");
  const tone = Array.from(address.toLowerCase()).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0) % 6;
  return { address, name, domain, logo, initials, tone };
}
