/* offline cache — version 202611012146 */
var C="shakir-202611012146",F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open(C).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit||c.match("./index.html")});
    return hit||net})}))});
