import { ExpirationPlugin } from 'workbox-expiration';
// import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { 
    CacheFirst,
    StaleWhileRevalidate
} from 'workbox-strategies';

self.CACHE_NAME = 'offline-cache';

// @todo either add all files from the build that are served to browser
// @todo either look for a solution via install/fetch
// precacheAndRoute([
//     { url: '/app.js', revision: null }
// ]);

self.addEventListener('install', () => {
    // Skip the waiting step and activate now
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Clean caches when SW installation is completed
    event.waitUntil(() => {
        caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
                caches.delete(cacheName);
            });
        });
    });
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Respond with async function response
    return async (event) => {
        const response = await caches.match(event.request);
        
        if (response) {
            return response;
        }

        // If no cached response then return 
        if (!navigator.onLine) {
            const cache = await caches.open(self.CACHE_NAME);
            const responseCache = await cache.match('/');

            return responseCache;
        }
        
        // Request to a server
        return fetch(event.request);
    }
});

// Use cached GQL data while revalidating
registerRoute(
    new RegExp(/\/graphql/), 
    new StaleWhileRevalidate({
        cacheName: 'graphql-requests',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            })
        ]
    })
);

// Cache all scripts/styles
registerRoute(
    ({ request }) => request.destination === 'document' 
        || request.destination === 'script' 
        || request.destination === 'style',
    new CacheFirst({
        cacheName: 'static-resources',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            })
        ]
    })
);

// Cache assets
registerRoute(
    new RegExp(/.*\.(gif|jpe?g|bmp|png|ico)/),
    new CacheFirst({
        cacheName: 'static-resources',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            })
        ]
    })
);
