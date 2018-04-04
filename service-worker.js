var staticCacheName = 'raylandog-static-v1';
const offlineURL = 'offline-index.html';
const urlsToCache = [ //list of resources to cache
	'/',
	'/offline-index.html',
	'/build/styles.min.css',
	'/build/animate.css',
	'/build/mainpreload.css',
	'/build/mainpreload.js',
	'/build/modernizr-2.6.2.min.js',
	'/build/raylan-site.min.js',
	'/build/service-worker-controller.js',
	'/images/RaylanPattern_Final.png',
	'/images/RaylanWoof.png',
	'/images/RaylanVector.png',
	'/images/RaylanLogo_1.png',
	'/images/Raylanfavicon.ico',
	'/images/1397315447171_r2.jpg',
	'/images/1404991149802_SM2.jpg',
	'/images/SQ/t056.jpg',
	'/images/SQ/t013.jpg',
	'/images/SQ/t052.jpg',
	'/images/SQ/t014.jpg',
	'/images/SQ/t021.jpg',
	'/images/SQ/t026.jpg',
	'/images/SQ/webm/v001.webm',
	'/images/SQ/webm/v002.webm',
	'/images/SQ/webm/v003.webm',
	'/images/SQ/webm/v004.webm',
	'/images/SQ/webm/v005.webm',
	'/images/SQ/webm/v006.webm',
	'/images/SQ/webm/v007.webm',
	'/images/SQ/webm/v008.webm',
	'/images/SQ/webm/v009.webm',
	'/images/SQ/webm/v010.webm',
	'/images/SQ/webm/v011.webm'
];

//Add resources to cache during service worker install
self.addEventListener('install', function(event) {
	self.skipWaiting();
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			console.log('Adding resources to cache.')
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event){
	//If request is for HTML, fetch from network and return offline page if there is an error
	if (event.request.headers.get('accept').includes('text/html')) {
		console.log('Handling fetch event for HTML');
		event.respondWith(
			fetch(event.request).catch(function(error) {
				console.log('Fetch failed, returning offline page.');
				return caches.match(offlineURL);
			})
		);
	}
	//Respond to all other requests. First check cache, otherwise respond from network
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request).then(function(response) {
				let responseClone = response.clone(); //clone response to cache and return
				if (response.status === 404) {  //if network responds with 404, return placeholder image file
					return fetch('images/RaylanLogo_1.png');
				}
				if (!event.request.url.includes('images/SQ')) {  //add any new resources to cache excluding image files
					caches.open('raylandog-static-v1').then(function(cache) {
						cache.put(event.request, responseClone);
					});
				}
				return response;
			});  //}).cache(function () { return caches.match('images/RaylanLogo_1.png');});
		})
	);
});