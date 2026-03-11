const cacheName = 'dictionary-cache-v1';
const filesToCache = [
    '/index.html',
    '/app.js',
    '/dictionary.json',
    '/images/',
    '/manifest.json',
    '/styles.css'
];

// Install event: cache files
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});