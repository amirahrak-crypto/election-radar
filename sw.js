// Service worker: makes the site installable and always serves the newest page.
// The page itself is fetched from the network every time (no stale copies); data always comes fresh from the API.
const V = "2026-11-07-3";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;
  if (r.mode === "navigate" || u.pathname.endsWith(".html") || u.pathname.endsWith("/") || u.pathname.endsWith("version.json")) {
    e.respondWith(fetch(r, { cache: "no-store" }).catch(() => fetch(r)));
  }
});
