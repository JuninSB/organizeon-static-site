import { renderToStaticMarkup } from "react-dom/server";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { expect, it } from "vitest";
import { fluidPath } from "@/features/profile/fluid-paths";
import { LavaBanner } from "@/features/profile/lava-banner";
import { LAVA_PATTERNS, lavaPattern } from "@/features/profile/profile-banner";
const seedFor=(index)=>Math.floor((index+.5)/12*65535).toString(16).padStart(4,'0')+'112233445566778899aabbccddeeff';
it('defines twelve distinct motion families, stable per-account surfaces and isolated SVG filters',()=>{
 const css=readFileSync(resolve(process.cwd(), "src/features/profile/profile-banner.css"), "utf8");
 expect(new Set(LAVA_PATTERNS).size).toBe(12);
 expect(new Set(LAVA_PATTERNS.map(family=>fluidPath(family,2,.5))).size).toBe(12);
 const seeds=LAVA_PATTERNS.map((_,index)=>seedFor(index));
 expect(seeds.map(seed=>lavaPattern(seed).family)).toEqual([...LAVA_PATTERNS]);
 for(const family of LAVA_PATTERNS)expect(css).toContain('@keyframes oo-fluid-'+family);
 expect(lavaPattern(seeds[0])).toEqual(lavaPattern(seeds[0]));expect(lavaPattern('account-one').layers).not.toEqual(lavaPattern('account-two').layers);
 const cards=<div className="grid">{seeds.map((seed,index)=><section key={seed}><h2>{LAVA_PATTERNS[index]}</h2><div className="oo-profile-banner" style={{height:150,background:'#0c1714'}}><LavaBanner seed={seed} color="#34D399" /></div></section>)}</div>;
 const html=renderToStaticMarkup(cards);const ids=[...html.matchAll(/<filter id="([^"]+)"/g)].map(match=>match[1]);expect(new Set(ids).size).toBe(12);expect(html).toContain('feGaussianBlur');expect(html).toContain('feColorMatrix');expect(html).not.toContain('<ellipse');expect(html).toContain('<path');
 writeFileSync('/tmp/organizeon-lava-patterns.html','<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:24px;background:#09090b;color:#fafafa;font:14px system-ui}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}section{border:1px solid #27272a;border-radius:10px;overflow:hidden}h2{margin:0;padding:10px 14px;font-size:14px;font-weight:500}'+css+'</style>'+html+'</html>');
});
it('renders six distinct selectable materials without changing the seeded fluid family',()=>{
 const materials=['bubbles','gradient','stars','rainbow'];
 const html=renderToStaticMarkup(<main className="grid">{materials.map(material=><section key={material}><h2>{material}</h2><div className="oo-profile-banner" style={{height:160}}><LavaBanner seed="c521c7bb040e4dfd8438e43914bfcf29" color="#8b22e9" material={material}/></div></section>)}</main>);
 for(const material of materials)expect(html).toContain(`data-pattern="${material}"`);
 const css=readFileSync(resolve(process.cwd(),'src/features/profile/profile-banner.css'),'utf8');
 writeFileSync('/tmp/organizeon-materials.html','<!doctype html><style>body{background:#09090b;color:#fafafa;font:14px system-ui;padding:24px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}section{border:1px solid #27272a;border-radius:12px;overflow:hidden}h2{margin:0;padding:12px}'+css+'</style>'+html);
});
it('uses independent material structures instead of routing every theme through fluidPath',()=>{
 const signatures={bubbles:'merging-metaballs',gradient:'diffused-color-mesh',stars:'parallax-starfield',rainbow:'spectral-rings'};
 for(const [material,renderer] of Object.entries(signatures)){
  const html=renderToStaticMarkup(<LavaBanner seed="account-one" color="#34d399" material={material}/>);
  expect(html).toContain(`data-renderer="${renderer}"`);
  expect(html).not.toContain('oo-lava-depth');
  if(material==='bubbles'){expect(html).toContain('22 -10');expect(html).toContain('oo-blob-cross');}
  if(material==='slime')expect(html).toContain('oo-gel-stretch');
 }
});

it("hides removed slime and lava materials while retaining seeded fluids",()=>{for(const material of ["slime","lava"])expect(renderToStaticMarkup(<LavaBanner seed="test" color="#34d399" material={material}/>)).toBe("");expect(renderToStaticMarkup(<LavaBanner seed="test" color="#34d399"/>)).toContain("oo-lava-depth");});
