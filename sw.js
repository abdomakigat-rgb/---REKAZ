const CACHE_NAME = 'ab-maki-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://i.ibb.co/pBTrM2QM/image.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
