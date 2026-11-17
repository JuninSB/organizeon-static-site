export function BrandMark({theme,className="size-10"}:{theme:"dark"|"light";className?:string}) {
  return <span className={`${className} inline-grid shrink-0`} aria-hidden="true">
    {([['dark','organizeon-icon.png'],['light','organizeon_preto_separado_1024.png']] as const).map(([variant,file])=><img key={variant} alt="" loading="eager" fetchPriority="high" decoding="async" onLoad={event=>{void event.currentTarget.decode().catch(()=>{});}} className="h-full w-full object-contain transition-opacity duration-200 motion-reduce:transition-none" style={{gridArea:'1 / 1',opacity:theme===variant?1:0}} src={'https://organizeon.com.br/d3/assets/'+file}/>)}
  </span>;
}
