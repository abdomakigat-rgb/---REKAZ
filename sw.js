const CACHE_NAME = 'AbMaki-Empire-v2'; // تغيير الإصدار عند كل تحديث كبير
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://i.ibb.co/pBTrM2QM/image.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// مرحلة التثبيت - تخزين الملفات الأساسية
self.addEventListener('install', event => {
  self.skipWaiting(); // تفعيل السيرفس وركر الجديد فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Ab Maki Cache: سحب ملفات الإمبراطورية...');
      return cache.addAll(ASSETS);
    })
  );
});

// مرحلة التفعيل - تنظيف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  console.log('Ab Maki: السيرفس وركر جاهز للسيطرة!');
});

// استراتيجية التشغيل: الكاش أولاً ثم الشبكة (لسرعة خرافية)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        // إذا كان الطلب ناجحاً، يمكننا تخزينه في الكاش مستقبلاً هنا
        return networkResponse;
      });
    }).catch(() => {
      // هنا يمكنك وضع صفحة Offline إذا أردت مستقبلاً
    })
  );
});
