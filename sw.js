const CACHE_NAME = 'wise-wallet-diary-v2';
const CORE_ASSETS = [
  '/', // Caches index.html at the root
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  '/index.tsx', // Our main application code
  'https://cdn.tailwindcss.com', // Primary styling
  
  // Key dependencies from the import map.
  // This helps ensure the app loads offline on the first try after installation.
  // Note: These might need updates if dependencies change, but the fetch handler will cache others on-the-fly.
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client', // As used in index.tsx
  'https://esm.sh/recharts@^2.15.3'
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .catch(err => {
        console.error("Core asset caching failed: ", err);
      })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Serve from cache, fallback to network, then update cache
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For HTML pages (navigation requests), use a Network first, then cache strategy.
  // This ensures users get the latest HTML, with a fallback to the cached version if offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // For other requests (JS, CSS, images, etc.), use a Cache first, then network strategy.
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return from cache if found
        if (response) {
          return response;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request).then((networkResponse) => {
          // Check for valid response to cache
          if(!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
            
          // Don't cache chrome extension requests
          if (event.request.url.startsWith('chrome-extension://')) {
              return networkResponse;
          }
            
          // Clone and cache the response
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return networkResponse;
        });
      })
  );
});