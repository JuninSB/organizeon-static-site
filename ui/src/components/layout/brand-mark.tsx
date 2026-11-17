export function BrandMark({theme,className="size-10"}:{theme:"dark"|"light";className?:string}) {
  return <img alt="" className={`${className} shrink-0 object-contain`} src={theme === "dark" ? "https://organizeon.com.br/d3/assets/organizeon-icon.png" : "https://organizeon.com.br/d3/assets/organizeon_preto_separado_1024.png"} />;
}
