const staticCacheName = 'restaurant-reviews-1.0.0';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                './restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
            ]).catch(error => {
                console.log("Error, ", error);
            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-reviews-') &&
                        cacheName != staticCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // TODO: respond to requests for the root page with
    // the page skeleton from the cache
    // const requestUrl = new URL(event.request.url);
    //
    // if (requestUrl.origin === location.origin) {
    //   if (requestUrl.pathname === '/') {
    //     event.respondWith(caches.match('/skeleton'));
    //     return;
    //   }
    // }

    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
            .catch(error => console.log('Error, ', error))
    );
});

self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
