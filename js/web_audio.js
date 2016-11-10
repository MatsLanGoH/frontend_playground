/*
 * Execute after DOM is loaded.
 * Not necessery if the script is linked at the end of the referring markup file.
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
		var gainEl			= document.getElementById('gain'),
			gainOutputEl	= document.getElementById('gain-output'),
			playToneEl 		= document.getElementById('wa-01-play'),
		    stopToneEl		= document.getElementById('wa-01-stop'),
		    AudioContext	= (window.AudioContext || window.webkitAudioContext),
		    audioCtx 		= new AudioContext(),
		    gain 			= audioCtx.createGain(),
		    oscillator;

		// Connect gain node to audio context destination
		gain.connect(audioCtx.destination);
		gain.gain.setValueAtTime(1, audioCtx.currentTime); // required for linearRamp

		// Add EventListeners to buttons in DOM
		gainEl.addEventListener('input', changeGain);
		playToneEl.addEventListener('click', playTone, false);
		stopToneEl.addEventListener('click', stopTone, false);


		// Updates gain value and reflects change in DOM
		function changeGain() {
			gainOutputEl.value = this.value;
			gain.gain.linearRampToValueAtTime(this.value, audioCtx.currentTime + 0.1) // from gain.gain.value = this.value;
		}


		// Functions to start and stop audio
		function playTone() {
			// Set frequency 
			var noteNum = document.getElementById('note-number').value, 
			    frequencyHz = 440 * Math.pow(2, noteNum * 1/12);

			// Connect oscillator to output.
			oscillator = audioCtx.createOscillator();
			oscillator.frequency.value = frequencyHz; 	
			oscillator.connect(gain); // from oscillator.connect(audioCtx.destination);

			oscillator.start();
			stopToneEl.disabled = false;
			stopToneEl.focus();
			playToneEl.disabled = true;
		}

		function stopTone() {
			var now = audioCtx.currentTime;
			gain.gain.setValueAtTime(1, now + 0.5);
			gain.gain.linearRampToValueAtTime(0, now + 0.01);
			oscillator.stop(now + 0.15);
			oscillator.addEventListener('ended', function(){
				playToneEl.disabled = false;
				playToneEl.focus();
				stopToneEl.disabled = true;
			});
		}
	})();


});




