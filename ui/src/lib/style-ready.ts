/** Do not mount portaled UI until its stylesheet can position it on the first frame. */
export function afterStyles(link: HTMLLinkElement, paint: () => void) {
 let active=true;
 const ready=()=>{if(active)paint();};
 if(link.sheet)ready();else link.addEventListener('load',ready,{once:true});
 return ()=>{active=false;link.removeEventListener('load',ready);};
}
