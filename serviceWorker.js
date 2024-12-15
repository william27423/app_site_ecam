const CACHE_NAME = 'v13';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts/app.js',
    '/image/ecam_student.png'
];
// Affichage pour vérifier le service worker est bien initialisé
console.log('Service Worker: Initialisé');

// Installation : mise en cache des ressources
self.addEventListener('install', event => {
    console.log('Service Worker: Installation');
    self.skipWaiting(); // Force l'activation immédiate
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache ouvert');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ouverture du cache:', error);
            })
    );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activation');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Suppression du cache ancien:', cache);
                        return caches.delete(cache)
                            .then(() => console.log('Cache supprimé:', cache))
                            .catch(error => console.error('Erreur lors de la suppression du cache:', error));
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
    if (requestUrl.startsWith('http') && !requestUrl.includes('/ws')) { // Exclure les requêtes WebSocket (ws)
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Ressource trouvée dans le cache
                    if (response) {
                        console.log('Service Worker: Ressource trouvée dans le cache:', event.request.url);
                        return response;
                    }

                    // Sinon, récupération réseau et mise en cache
                    return fetch(event.request)
                        .then(networkResponse => {
                            return caches.open(CACHE_NAME).then(cache => {
                                console.log('Service Worker: Mise en cache de la nouvelle ressource:', event.request.url);
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                        })
                        .catch(error => {
                            console.error('Service Worker: Échec du fetch; retourner une page hors ligne:', error);
                            // Retourner une page hors ligne si nécessaire
                        });
                })
                .catch(error => {
                    console.error('Erreur lors de la tentative de recherche dans le cache:', error);
                })
        );
    }
});
