/**
 * Ab Maki Empire - Service Worker (v2.1)
 * تم تحسين المسارات لضمان التوافق مع GitHub Pages
 */

const CACHE_NAME = 'AbMaki-Empire-v2';

// القائمة الأساسية للملفات المطلوب تخزينها ليعمل الموقع بدون إنترنت
const ASSETS = [
  './',                  // الصفحة الرئيسية
  './index.html',        // ملف HTML
  './manifest.json',     // ملف المانيفست
  'https://i.ibb.co/pBTrM2QM/image.png', // أيقونة التطبيق
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' // الأيقونات الخارجية
];

// 1. مرحلة التثبيت (Install): سحب وتخزين الملفات في الكاش
self.addEventListener('install', event => {
  self.skipWaiting(); // تفعيل السيرفس وركر الجديد فوراً دون انتظار إغلاق الصفحات المفتوحة
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Ab Maki Cache: جاري تأمين ملفات الإمبراطورية...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. مرحلة التفعيل (Activate): تنظيف الملفات القديمة من الإصدارات السابقة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  console.log('Ab Maki: السيرفس وركر جاهز للسيطرة على النظام!');
});

// 3. استراتيجية جلب البيانات (Fetch): الكاش أولاً، ثم الشبكة
// هذه الاستراتيجية تجعل الموقع يفتح بسرعة البرق في المرات القادمة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // إذا كان الملف موجوداً في الكاش، قم بإرجاعه
      if (cachedResponse) {
        return cachedResponse;
      }
      // إذا لم يكن موجوداً، قم بجلبه من الإنترنت
      return fetch(event.request).then(networkResponse => {
        return networkResponse;
      });
    }).catch(() => {
      // يمكنك هنا إرجاع صفحة "أنت غير متصل بالإنترنت" إذا أردت مستقبلاً
    })
  );
});
