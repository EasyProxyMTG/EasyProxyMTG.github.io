'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "6387312968fddd6001a748a7350dd2ac",
"assets/AssetManifest.bin.json": "38bd450c08398b9afac9fa20cffcb8bb",
"assets/AssetManifest.json": "d40521e3f900857ccd7fb3e332b43215",
"assets/assets/images/card_backs/BlankBack.png": "875a6a0759c05adf45a514cbe2923c01",
"assets/assets/images/card_backs/ProxyBack.png": "1636d7608d89993dcffc8c877b030006",
"assets/assets/images/card_backs/ProxyBack2.png": "d058834fa36785a771c27451c67f83b6",
"assets/assets/images/card_backs/ProxyBack3.png": "6dac2b0a367a5eb123513c11bf2da98e",
"assets/assets/images/design/FrontImage.png": "300bcc4b96dbbc580aeb8c9cc6d85fdf",
"assets/assets/images/design/icon-brush.png": "69d04b8025123dd3df58d72cee89f8c6",
"assets/assets/images/errorpic.png": "a167b14a7f5fd1d32a84525edf6e1154",
"assets/assets/images/MeasureHeight.png": "fc3035b788ba802bcaf8e25ab5179a27",
"assets/assets/images/print_guide/step0.png": "2313d17297db71edb032740b674f97f9",
"assets/assets/images/print_guide/step1pc.png": "548877f1e84b257938529a49504b027a",
"assets/assets/images/print_guide/step1sp.png": "0be41098db368cb4f98f3c2ba94a2cb6",
"assets/assets/images/print_guide/step2pc.png": "89b2dd84a6d741004b013763f48cf0c7",
"assets/assets/images/print_guide/step2sp.png": "0e278bae93113227a12a78d6465b187b",
"assets/assets/images/print_guide/step35.png": "dfbad4d259e303447ace03401830bb5d",
"assets/assets/images/print_guide/step3pc.png": "6b7d67acb1dd0d764bb6e4aec33a8be7",
"assets/assets/images/print_guide/step3sp.png": "f7b3a80488d7be703283ba79ecb0b6bc",
"assets/assets/images/print_guide/step4pc.png": "ca9a81d7ed3a15387d002cb8e246748a",
"assets/assets/images/print_guide/step4sp.png": "24e8f8c699817fa7a0c0c54552eb0d47",
"assets/assets/images/print_guide/step55.png": "c63f7147f3b85b24e7e02aebbb4b45f6",
"assets/assets/images/print_guide/step5pc.png": "2e77220da8f21a63875e9fa99f26511b",
"assets/assets/images/print_guide/step5sp.png": "befee7413c3f30b1e671ff1066970575",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "778ef8befd38eb814c96d3be8d3d22c5",
"assets/NOTICES": "fd4f7aadf0fd446b0c5a588c65ca26cf",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "5fda3f1af7d6433d53b24083e2219fa0",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "87325e67bf77a9b483250e1fb1b54677",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "9fa2ffe90a40d062dd2343c7b84caf01",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "aec794f6f019792046a615316a75ea92",
"flutter.js": "f31737fb005cd3a3c6bd9355efd33061",
"flutter_bootstrap.js": "bc202323c3516f563491d6f2e3ccb0ee",
"icons/Icon-192.png": "8dff46b09f30fe254a17d288c5663d53",
"icons/Icon-512.png": "507b01228be830002a508e80cee2e9de",
"icons/Icon-maskable-192.png": "8dff46b09f30fe254a17d288c5663d53",
"icons/Icon-maskable-512.png": "507b01228be830002a508e80cee2e9de",
"index.html": "cdbf01729faa700802024c96142b184f",
"/": "cdbf01729faa700802024c96142b184f",
"main.dart.js": "3dd0a9f201982176ec37503af6b57632",
"manifest.json": "68cbdef8294650e3b4617cd97e58ad64",
"version.json": "b071e77164a7ba8a0732a4a15700133e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
