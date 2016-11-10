/*
Add Event listener for keypresses
Note: event.keyCode is deprecated, 
and event.key should be used if available.

Webkit doesn't support event.key at the time of writing
*/

document.addEventListener('keydown', (event) => {
	var elem = document.getElementById('keyevent-keydown');
	elem.innerHTML = parseKey(event) + ' ' + event.keyCode ;
});	

document.addEventListener('keypress', (event) => {
	var elem = document.getElementById('keyevent-keypress');
	elem.innerHTML = parseKey(event) + ' ' + event.keyCode ;
});	

document.addEventListener('keyup', (event) => {
	var elem = document.getElementById('keyevent-keyup');
	elem.innerHTML = parseKey(event) + ' ' + event.keyCode ;
});		


function parseKey(event) {
	var key = event.keyCode;
	return String.fromCharCode(key);
}