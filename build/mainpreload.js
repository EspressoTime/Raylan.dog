setTimeout(function() {
	$('.welcomefirst').addClass('animated fadeInDown');
}, 500);
setTimeout(function() {
	$('.welcomesecond').addClass('animated fadeInDown');
}, 1300);
setTimeout(function() {
	$('.welcomethird').addClass('animated fadeInUpBig');
}, 1800);

var start = new Date().getTime();

$(document).ready(function(){
console.log("Window on load called")
	var minimumWait = 7000;
	var current = new Date().getTime();
	var diff = current - start;

	if(diff < minimumWait && diff >= 0) {
		//console.log(minimumWait-diff);
		setTimeout(function() {
			$('body').addClass('loaded');
		}, minimumWait - diff);
	}
});

// $(window).on("load", function() {
// 	console.log("Window on load called")
// 	var minimumWait = 7000;
// 	var current = new Date().getTime();
// 	var diff = current - start;

// 	if(diff < minimumWait && diff >= 0) {
// 		//console.log(minimumWait-diff);
// 		setTimeout(function() {
// 			$('body').addClass('loaded');
// 		}, minimumWait - diff);
// 	}
// });
// var best = true;
// var doug = best == true ? 'bes' : 'minus now';