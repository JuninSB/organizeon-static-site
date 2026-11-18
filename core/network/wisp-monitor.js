/** Poll only an open picker; each endpoint has at most one pending handshake. */
export function startWispMonitor({options,measure,onResult,isOpen,interval=1000}) {
  const controller=new AbortController(),pending=new Set();
  let timer;
  const stop=()=>{clearInterval(timer);controller.abort();};
  const tick=()=>{
    if(!isOpen()){stop();return;}
    for(const option of options){
      if(pending.has(option.id))continue;
      pending.add(option.id);
      Promise.resolve().then(()=>measure(option,controller.signal)).then(result=>{
        if(!controller.signal.aborted&&isOpen())onResult(option,result);
      }).catch(()=>{}).finally(()=>pending.delete(option.id));
    }
  };
  timer=setInterval(tick,interval);tick();return stop;
}
