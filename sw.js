/* Versioned application assets only; no PLC programs, uploads or state. */
const BASE=new URL(self.registration.scope);
const PREFIX='plc-simulator:'+BASE.pathname+':';
const CACHE=PREFIX+'7.2.12-aab13b8596368a0e568b';
const ASSETS=['index.html','manifest.webmanifest','icon.svg'].map(path=>new URL(path,BASE).href);
const NAVIGATIONS=[BASE.pathname,...['index.html','start.html'].map(path=>new URL(path,BASE).pathname)];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    try{
      const cache=await caches.open(CACHE);
      const responses=await Promise.all(ASSETS.map(url=>fetch(new Request(url,{cache:'reload',credentials:'same-origin'}))));
      if(responses.some(r=>!r.ok)||!responses[0].headers.get('content-type')?.toLowerCase().includes('text/html'))throw Error('App resources are unavailable.');
      await Promise.all(responses.map((response,i)=>cache.put(ASSETS[i],response.clone())));
      await cache.put(BASE.href,responses[0].clone());
    }catch(error){await caches.delete(CACHE);throw error;}
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')event.waitUntil(self.skipWaiting());});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==BASE.origin)return;
  const navigation=request.mode==='navigate'&&NAVIGATIONS.includes(url.pathname);
  if(!navigation&&!ASSETS.includes(url.href))return;
  event.respondWith((async()=>{
    let cache,cached;try{cache=await caches.open(CACHE);cached=await cache.match(navigation?ASSETS[0]:url.href);}catch{}
    if(!navigation)return cached||fetch(request);
    // The complete PLC app is inline in the HTML. A new visit must prefer
    // the current document; an existing running document is never replaced.
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),3000);
    try{
      const response=await fetch(request,{cache:'no-store',signal:controller.signal});
      if(!response.ok||!response.headers.get('content-type')?.toLowerCase().includes('text/html')){
        if(cached)return cached;
        return response;
      }
      // Fetch resolves at headers. Wait for the complete document inside the
      // same timeout so a stalled HTML body cannot replace a good offline app.
      await response.clone().arrayBuffer();clearTimeout(timeout);
      try{await cache?.put(ASSETS[0],response.clone());await cache?.put(BASE.href,response.clone());}catch{}
      return response;
    }catch(error){if(cached)return cached;throw error;}
    finally{clearTimeout(timeout);}
  })());
});
