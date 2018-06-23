//This is the "Offline copy of pages" service worker

var cacheName = 'pwabuilder-offline';

//Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  var indexPage = new Request('/resistor/index.htm');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open(cacheName).then(function(cache) {
        console.log('[PWA Builder] Cached index page during Install ' + response.url);
        return cache.put(indexPage, response);
      });
  }));
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});