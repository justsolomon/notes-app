//declare name of cache and assets
const staticNotesApp = 'notes-app'
const assets = [
	'/',
	'/index.html',
	'/css/homestyle.css',
	'/css/notestyle.css',
	'/css/savednotestyle.css',
	'/scripts/saved.js',
	'/scripts/script.js',
	'/assets/android-chrome-192x192.png',
	'/assets/android-chrome-512x512.png',
	'/assets/apple-touch-icon.png',
	'/assets/favicon-16x16.png',
	'/assets/favicon-32x32.png',
	'/assets/favicon.ico',
]

//store assets in cache
self.addEventListener('install', installEvent => {
	installEvent.waitUntil(
		caches.open(staticNotesApp).then(cache => {
			cache.addAll(assets)
		})
	)
})

//fetch assets from cache
self.addEventListener('fetch', fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})