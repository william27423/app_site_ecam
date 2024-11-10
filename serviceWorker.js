const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts/app.js',
    '/image/ecam_student.png'
];

console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

// Installation : mise en cache des ressources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interception des requêtes : fournir les ressources depuis le cache ou effectuer une récupération réseau
self.addEventListener('fetch', event => {
    const requestUrl = event.request.url;

    // Vérifier si la requête est en HTTP/HTTPS pour éviter les schémas non supportés comme 'chrome-extension://'
    if (requestUrl.startsWith('http') && !requestUrl.includes('/ws')) { // Exclure WebSocket (ws) requêtes
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Ressource trouvée dans le cache
                    if (response) {
                        return response;
                    }
                    // Sinon, récupération réseau et mise en cache
                    return fetch(event.request)
                        .then(networkResponse => {
                            return caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                        })
                        .catch(error => {
                            console.error('Fetch failed; returning offline page instead.', error);
                            // Ici, vous pouvez retourner une page alternative si nécessaire
                        });
                })
        );
    }
});
