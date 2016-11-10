document.addEventListener('DOMContentLoaded', function() {
	/*
	  Simple Audio output using WebAudio API.
	  See http://techblog.stevej.name/2016/04/08/making-music-with-the-webaudio-api-part-1/
	*/
	(function() {
		// Set up variables
		var gainEl				= document.getElementById('gain'),
		  	gainOutputEl	= document.getElementById('gain-output'),
				triggered			= false,
		    AudioContext	= (window.AudioContext || window.webkitAudioContext),
		    audioCtx 			= new AudioContext(),
		    gain 					= audioCtx.createGain(),
		    oscillator;

		// Connect gain node to audio context destination
		gain.connect(audioCtx.destination);
		gain.gain.setValueAtTime(1, audioCtx.currentTime); // required for linearRamp

		// Add EventListeners to buttons in DOM
		gainEl.addEventListener('input', changeGain);
		document.addEventListener('keypress', (event) => {
			if (!triggered) {
				triggered = !triggered;
				playTone();
			}
		});

		document.addEventListener('keyup', (event) => {
			triggered = !triggered; // Prevent multiple tones
			stopTone();
		});

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
		}

		function stopTone() {
			var now = audioCtx.currentTime;
			gain.gain.setValueAtTime(1, now + 0.5);
			gain.gain.linearRampToValueAtTime(0, now + 0.01);
			oscillator.stop(now + 0.15);
		}
	})();


});
