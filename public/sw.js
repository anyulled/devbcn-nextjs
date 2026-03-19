// Kill-switch service worker: replaces any previously cached SW,
// clears all caches, and unregisters itself.
// Why: the old Vite/CRA site registered a service worker that
// intercepts all requests and serves stale content. This file
// must remain at /sw.js until all returning visitors have been
// migrated (recommend keeping for at least 6 months).

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));

      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));

      await self.registration.unregister();
    })()
  );

  self.clients.claim();
});
