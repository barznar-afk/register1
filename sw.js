/* offline cache — version 202611222322 */
var C="shakir-202611222322",F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
/* install: cache each file on its own, so one missing file never breaks the whole update */
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return fetch(new Request(u,{cache:"reload"})).then(function(res){if(res&&res.ok&&!res.redirected)return c.put(u,res)}).catch(function(){})}))}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C&&x.indexOf("shakir-")===0}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
/* a redirected response can't answer a page request: copy it into a plain one */
function clean(res){if(!res||!res.redirected)return Promise.resolve(res);return res.blob().then(function(b){return new Response(b,{status:res.status,statusText:res.statusText,headers:res.headers})})}
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  var nav=r.mode==="navigate",key=nav?"./index.html":r;
  e.respondWith(caches.open(C).then(function(c){
    return c.match(key,{ignoreSearch:true}).then(function(hit){return hit||(nav?c.match("./",{ignoreSearch:true}):null)}).then(function(hit){
      var net=fetch(r.url,{cache:"no-cache",credentials:"same-origin"}).then(function(res){if(res&&res.ok&&!res.redirected)c.put(key,res.clone()).catch(function(){});return clean(res)});
      if(hit){net.catch(function(){});return hit}
      return net.catch(function(){return c.match("./index.html").then(function(x){return x||fetch(r)})})})
  }).catch(function(){return fetch(r)}))});
