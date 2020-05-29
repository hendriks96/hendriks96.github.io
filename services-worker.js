importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil di muat');
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/match.html', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/team-detail.html', revision: '1' },
        { url: '/services-worker.js', revision: '1' },
        { url: '/css/materialize.css', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/style.css', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/init.js', revision: '1' },
        { url: '/js/materialize.js', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
        { url: '/js/jquery-2.1.1.min.js', revision: '1' },
        { url: '/js/register-service-worker-permission.js', revision: '1' },
        { url: '/js/register-service-worker.js', revision: '1' },
        { url: '/js/subscribe-push.js', revision: '1' },
        { url: '/js/team-detail.js', revision: '1' },
        { url: '/js/match-detail.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' }
    ]);
    //PAGES
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    //IMAGES
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        }),
    );

    //API FOOTBALL
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'base-url-api',
            cacheExpiration: {
                maxAgeSeconds: 60 * 30
            }
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'base-app'
        })
    );

    //FONT GOOGLE API
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts'
        })
    );
}
else {
    console.log('Workbox gagal di muat');
}


self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: 'images/icon-96x96.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});