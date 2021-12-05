const cacheName = 'modulecalc'
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './manifest.webmanifest',
    './index.js',
    './bootstrap.min.css',
    './bootstrap.min.css.map',
    './bootstrap.bundle.min.js',
    './bootstrap.bundle.min.js.map'
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName)
    const x = await cache.addAll(staticAssets)
    return x
})

self.addEventListener('activate', e => {
    self.clients.claim()
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});


// self.addEventListener('fetch', async e => {
//     const req = e.request
//     const url = new URL(req.url)

//     if (url.origin === location.origin) {
//         e.respondWith(cacheFirst(req))
//     } else {
//         e.respondWith(networkAndCache(req))
//     }
// })

// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName)
//     const cached = await cache.match(req)
//     return cached || fetch(req)
// }

// async function networkAndCache(req) {
//     const cache = await caches.open(cacheName)
//     try {
//         const fresh = await fetch(req)
//         await cache.put(req. fresh.clone())
//         return fresh
//     } catch(e) {
//         const cached = await cache.match(req)
//         return cached
//     }
// }