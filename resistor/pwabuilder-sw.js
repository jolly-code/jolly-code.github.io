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

//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', event => {
  var updateCache = function(request){
    return caches.open(cacheName).then(function (cache) {
      return fetch(request.clone()).then(function (response) {
        console.log('[PWA Builder] add page to offline ' + response.url)
        return cache.put(request, response);
      });
    });
  };

  updateCache(event.request);
})

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});