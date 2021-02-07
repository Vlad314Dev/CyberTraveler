/* eslint-disable no-undef */
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { 
    CacheFirst,
    StaleWhileRevalidate
} from 'workbox-strategies';

self.CACHE_NAME = 'offline-cache';

self.addEventListener('install', (event) => {
    // Skip the waiting step and activate now
    self.skipWaiting();

    // Get file list required for the offline mode
    const preCache = async () => {
        return fetch('/precache-files', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((urlPathToCache) => {
            urlPathToCache.push('/');
            urlPathToCache.push('/favicon.ico');
            caches.open(self.CACHE_NAME).then((cache) => {
                cache.addAll(urlPathToCache);
            });
        })
    };

    event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
    // Clean old service worker caches when SW installation is completed
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
        
        // If found in caches
        if (response) {
            return response;
        }

        if (!navigator.onLine) {
            // Root page cached response
            const offlineResponse = await caches.match('/');
            return offlineResponse;
        }
        
        // Request to a server
        return fetch(event.request);
    }
});

// Use cached GQL data while revalidating
registerRoute(
    new RegExp(/\/graphql/), 
    new StaleWhileRevalidate({
        cacheName: self.CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            })
        ]
    })
);

// Cache all assets
registerRoute(
    ({ request }) => request.destination === 'document' 
        || request.destination === 'script' 
        || request.destination === 'style'
        || new RegExp(/.*\.(gif|jpe?g|bmp|png|ico)/),
    new CacheFirst({
        cacheName: self.CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            })
        ]
    })
);
