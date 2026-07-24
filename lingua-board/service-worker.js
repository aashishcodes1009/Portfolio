/* LinguaBoard service worker
   Caches the app shell on first visit so it opens instantly and keeps
   working with no internet connection afterward. Cloud voice (ElevenLabs)
   still requires a live connection when used, since that's a real-time
   API call — everything else works fully offline once cached. */

const CACHE_NAME = "linguaboard-cache-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for the app shell, network-first for everything else
// (e.g. Google Fonts, the ElevenLabs API) so those stay live when online
// but don't break the app when offline.
self.addEventListener("fetch", (event) => {
  const isAppShellRequest = APP_SHELL.some((path) =>
    event.request.url.endsWith(path.replace("./", "/"))
  ) || event.request.mode === "navigate";

  if (isAppShellRequest) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
