/// <reference lib="webworker" />

const sw = globalThis as unknown as ServiceWorkerGlobalScope;

const CURRENT_CACHE_PREFIX = "workbox-";

sw.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.filter((name) => !name.startsWith(CURRENT_CACHE_PREFIX)).map((name) => caches.delete(name))))
      .then(() => sw.clients.claim())
      .catch((error) => {
        console.error("Service worker activation failed:", error);
        throw error;
      })
  );
});

export default sw;
