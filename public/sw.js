const CACHE_NAME = 'mooddiary-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/72.svg',
  '/icons/96.svg',
  '/icons/128.svg',
  '/icons/144.svg',
  '/icons/152.svg',
  '/icons/192.svg',
  '/icons/385.svg',
  '/icons/512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 