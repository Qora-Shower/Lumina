const CACHE_NAME = 'lumina-v1';
const urlsToCache = [
  // HTML
  '/',
  'index.html',
  'home.html',
  'ai.html',
  'forum.html',
  'account.html',
  'tos.html',
  'privacy.html',
  'footer.html',

  // CSS
  'css/style.css',
  'css/animations.css',
  'css/ai.css',
  'css/forum.css',

  // JS
  'js/app.js',
  'js/auth.js',
  'js/haptics.js',
  'js/ai.js',
  'js/forum.js',

  // Other
  'manifest.json',
  'https://unpkg.com/lucide@latest' // Cache the lucide script
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              // For external resources like the CDN, we might get an opaque response
              // We won't cache opaque responses to avoid filling cache with errors
              if (response.type === 'opaque') {
                return response;
              }
              return response;
            }

            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
