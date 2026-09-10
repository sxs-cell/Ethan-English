/* ============================================================
 *  Ethan英语 · Service Worker（PWA 离线缓存）
 *  作用：预缓存核心资源，让网站可"添加到主屏幕"、断网也能打开
 * ============================================================ */

const CACHE_NAME = "ethan-english-v3";

// 核心资源：预缓存，保证离线可访问
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./fanwen.html",
  "./cihui.html",
  "./juxing.html",
  "./jiqiao.html",
  "./pigai.html",
  "./flash.html",
  "./ziyuan.html",
  "./css/style.css",
  "./js/data.js",
  "./js/juxing-data.js",
  "./js/extra-ying1.js",
  "./js/extra-ying2.js",
  "./js/extra-xiaozuowen.js",
  "./js/extra-2026.js",
  "./js/vocab-extra.js",
  "./js/main.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// 安装：预缓存核心资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 激活：清理旧版本缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// 请求：核心资源 cache-first；其他同源资源运行时缓存；AI 接口不缓存
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // 跳过 AI 批改接口（需实时请求）
  if (url.pathname.includes("/chat/completions")) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // 仅缓存同源、成功的响应
          if (response && response.status === 200 && url.origin === self.location.origin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // 离线且无缓存时，页面导航回退到首页
          if (request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
