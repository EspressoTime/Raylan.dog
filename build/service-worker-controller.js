if (navigator.serviceWorker){ //only run if service workers are supported by that browser

	navigator.serviceWorker.register('service-worker.js', {scope: './'}).then(function() { 
		console.log('Service worker registration worked.');
	}).catch(function() {
		console.log('Service worker registration failed.');
	});
};