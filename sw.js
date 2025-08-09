const CACHE_NAME = "Lumina-V1";
const BASE = "/Lumina/";

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        
        BASE + 'index.html'
        
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.open(CACHE_NAME).then(cache =>
    cache.match(event.request).then(resp => {
      return resp || fetch(event.request).then(fresp => {
        cache.put(event.request, fresp.clone());
        return fresp;
      });
    })
  ));
});
