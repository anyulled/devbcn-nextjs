const sw = globalThis as unknown as ServiceWorkerGlobalScope;

const CURRENT_CACHE_PREFIX = "workbox-";

sw.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.filter((name) => !name.startsWith(CURRENT_CACHE_PREFIX)).map((name) => caches.delete(name))))
      .then(() => sw.clients.claim())
  );
});

export {};
