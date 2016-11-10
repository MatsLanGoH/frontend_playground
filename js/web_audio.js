/*
 * Execute after DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function() {

	/* 
	 * Click event listener for this specific id
	document.getElementById('wa-01-play').addEventListener('click', function() {
		alert('Clicked wa-01-play');
	});
	 */


	/*
	 * Make all buttons output their name to console when clicked.
	var buttons = document.getElementsByClassName('btn');

	var myFunction = function() {
		var attribute = this.getAttribute('id');
		console.log(attribute);
	};

	for (var i = buttons.length - 1; i >= 0; i--) {
		// buttons[i].addEventListener('click', myFunction, false);
		buttons[i].addEventListener('click', myFunction, false);
	}
	 */


	/*
	  Simple Audio output using WebAudio API.
	  See http://techblog.stevej.name/2016/04/08/making-music-with-the-webaudio-api-part-1/
	*/
	(function() {
		// Set up variables
		var playToneEl 		= document.getElementById('wa-01-play'),
		    stopToneEl		= document.getElementById('wa-01-stop'),
		    AudioContext	= (window.AudioContext || window.webkitAudioContext),
		    audioCtx 		= new AudioContext(),
		    oscillator;

		// Add EventListeners to buttons in DOM
		playToneEl.addEventListener('click', playTone, false);
		stopToneEl.addEventListener('click', stopTone, false);

		// Functions to start and stop audio
		function playTone() {
			// Set frequency and connect oscillator to output.
			oscillator = audioCtx.createOscillator();
			oscillator.frequency.value = 440; 	// 440 Hz = Middle A Natural
			oscillator.connect(audioCtx.destination);

			oscillator.start();
			stopToneEl.disabled = false;
			stopToneEl.focus();
			playToneEl.disabled = true;
		}

		function stopTone() {
			oscillator.stop();
			stopToneEl.disabled = true;
			playToneEl.disabled = false;
		}
	})();


});




