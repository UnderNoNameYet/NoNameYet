const CACHE = 'rebuttalkit-v2';
const CORE = ['./', './index.html', './styles.css', './growth.css', './app.js', './growth.js', './manifest.webmanifest', './icon.svg', './sample-packet.html', './privacy.html', './terms.html', './stripe-service-not-received.html', './freelancer-chargeback-response.html', './shopify-chargeback-evidence.html'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html'))));
});
