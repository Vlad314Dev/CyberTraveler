/* eslint-disable no-undef */
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { 
    CacheFirst,
    StaleWhileRevalidate
} from 'workbox-strategies';

self.CACHE_NAME = 'offline-cache-v4';

self.addEventListener('install', (event) => {
    // Skip the waiting step and activate now
    self.skipWaiting();

    // Get file list required for the offline mode
    const preCache = async () => {
        return fetch('/precache-paths', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((urlPathToCache) => {
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

// Retrieve cache via CacheFirst strategy for precache/cached files
registerRoute(
    new RegExp(/.*\.(gif|jpe?g|bmp|png|ico|css|js|map|eot|svg|ttf|woff|woff2|ogg|mp3)/),
    new CacheFirst({
        cacheName: self.CACHE_NAME,
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            })
        ]
    })
);

// Precache and add route for root
precacheAndRoute([
    { revision: null, url: '/' }
]);
