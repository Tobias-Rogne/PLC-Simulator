/* Versioned application assets only; no PLC programs, uploads or state. */
const BASE=new URL(self.registration.scope);
const PREFIX='plc-simulator:'+BASE.pathname+':';
const CACHE=PREFIX+'6.4.0-1b0dedf232748f4fe630';
const ASSETS=['index.html','manifest.webmanifest','icon.svg'].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    try{
      const cache=await caches.open(CACHE);
      await cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload',credentials:'same-origin'})));
      await cache.put(BASE.href,await cache.match(ASSETS[0]));
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
  const navigation=request.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===new URL('index.html',BASE).pathname);
  if(!navigation&&!ASSETS.includes(url.href))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE),cached=await cache.match(navigation?ASSETS[0]:url.href);
    return cached||fetch(request);
  })());
});
