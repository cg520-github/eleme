window.onresize = function() {
	resize();
}
resize();

function resize() {
	let html = document.querySelector('html');
	html.style.fontSize = window.innerWidth / 15 + 'px';
}
