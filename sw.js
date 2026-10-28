const V="md-v12";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./md-192.png","./md-512.png"])).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x.startsWith("md-")).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(u.pathname.includes("/products/")){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(y=>y.put(r,c))}return x})));return}
e.respondWith(fetch(u.href,{cache:"no-cache"}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(y=>y.put(r,c))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match("./index.html"))))});
