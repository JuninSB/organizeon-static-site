const CACHE_NAME = "organizeon-games-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const scope = new URL(self.registration.scope);
  if (
    event.request.method !== "GET" ||
    url.origin !== scope.origin ||
    (!url.pathname.includes("/games/library/") &&
      !url.pathname.includes("/games/runtime/ruffle/"))
  ) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request,{ignoreSearch:true});
      if (cached) return cached;
      const relative=url.pathname.slice(url.pathname.indexOf("/games/")+1);
      const source=new URL(relative,"https://juninsb.github.io/organizeon-static-site/");source.search=url.search;
      const downloaded=await fetch(source,{credentials:"omit"});
      const headers=new Headers(downloaded.headers);
      for(const name of ["x-frame-options","content-security-policy","content-security-policy-report-only"])headers.delete(name);
      const response=new Response(downloaded.body,{status:downloaded.status,statusText:downloaded.statusText,headers});
      if (response.ok) {
        await cache.put(event.request, response.clone());
      }
      return response;
    }),
  );
});
