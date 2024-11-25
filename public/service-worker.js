// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    event.waitUntil(
      caches.open('cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/static/js/main.js',
          '/static/css/main.css',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  