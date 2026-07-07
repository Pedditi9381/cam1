const CACHE_NAME = "camanim-cache-v2.1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=2.1",
  "./app.js?v=2.1",
  "./App-icon3.png",
  "./sample-camera.json",
  "./sample-labels.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
        );
      })
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  try {
    const freshResponse = await fetch(request, { cache: "no-store" });
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, freshResponse.clone());
    return freshResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    if (request.mode === "navigate") {
      return caches.match("./index.html");
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  const freshResponse = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, freshResponse.clone());
  return freshResponse;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  const appShellDestinations = new Set(["document", "script", "style", "worker"]);
  if (request.mode === "navigate" || appShellDestinations.has(request.destination)) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
