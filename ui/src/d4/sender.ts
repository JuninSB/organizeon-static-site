export function senderIdentity(sender: string) {
  const match = sender.trim().match(/^(.*?)\s*<([^<>]+)>$/);
  const address = (match?.[2] || sender).trim();
  const name = (match?.[1] || address.split("@")[0] || "Remetente").replace(/^"|"$/g, "").trim();
  const domain = address.split("@")[1]?.toLowerCase() || "";
  // Discover directly from the sender domain; never send the email to an avatar directory.
  const publicDomain = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain) && !/\.(?:local|localhost|internal|test|invalid|onion)$/.test(domain);
  const logo = publicDomain ? `https://${domain}/favicon.ico` : undefined;
  const fallbackLogo = publicDomain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128` : undefined;
  const initials = name.split(/\s+/).slice(0, 2).map(word => Array.from(word)[0] || "").join("").toLocaleUpperCase("pt-BR");
  const tone = Array.from(address.toLowerCase()).reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0) % 6;
  return { address, name, domain, logo, fallbackLogo, initials, tone };
}
