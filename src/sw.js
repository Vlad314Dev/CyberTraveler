const cacheName = 'cybertraveler';
const filesToCache = [
  '/',
  '/app.js',
  '/polyfills-core-js.js',
  '/polyfills-css-shim.js',
  '/polyfills-dom.js',
  '/vendors-node_modules_ion-phaser_core_dist_esm-es5_ion-phaser_entry_js.js',
  '/7b60135c1f47374c2b0f6c8a9e78067c.png'
];
 
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
    console.log('sw fetch');
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function (error) {
        console.log(error);
      })
    );
  });