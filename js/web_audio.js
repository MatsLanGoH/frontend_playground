/*
 * Execute after DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function() {

	/* 
	 * Click event listener for this specific id
	 */
	document.getElementById('wa-01-play').addEventListener('click', function() {
		alert('Clicked wa-01-play');
	});

	/*
	 * Make all buttons output their name to console when clicked.
	 */
	var buttons = document.getElementsByClassName('btn');

	var myFunction = function() {
		var attribute = this.getAttribute('id');
		console.log(attribute);
	};

	for (var i = buttons.length - 1; i >= 0; i--) {
		// buttons[i].addEventListener('click', myFunction, false);
		buttons[i].addEventListener('click', myFunction, false);
	}
});


const alertMessage = function() {
	// Displays a simple alert.
	alert('Triggered.');
};


/*
  Simple Audio output using WebAudio API.
  See: http://techblog.stevej.name/2016/04/08/making-music-with-the-webaudio-api-part-1/
*/