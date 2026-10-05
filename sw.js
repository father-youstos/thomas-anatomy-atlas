const CACHE='thomas-anatomy-v2';
const SHELL=['./','./index.html','./style.css','./app.js','./state.mjs','./manifest.webmanifest','./icons/icon.svg','./offline-assets.json','./vendor/build/three.module.js','./vendor/build/three.core.js','./vendor/examples/jsm/controls/OrbitControls.js','./vendor/examples/jsm/loaders/GLTFLoader.js','./vendor/examples/jsm/loaders/DRACOLoader.js','./vendor/examples/jsm/utils/BufferGeometryUtils.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('thomas-anatomy-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>{if(response.ok){let copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(request,copy)));}return response;}).catch(async()=>await caches.match(request)||await caches.match(new URL('./index.html',self.location.href))));return;}
 event.respondWith(caches.open(CACHE).then(async cache=>{let cached=await cache.match(request);if(cached)return cached;let response=await fetch(request);if(response.ok&&response.type!=='opaque'){let copy=response.clone();event.waitUntil(cache.put(request,copy));}return response;}));
});
