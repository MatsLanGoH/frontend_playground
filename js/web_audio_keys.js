/*
 * Simple Audio output using WebAudio API.
 * See http://techblog.stevej.name/2016/04/08/making-music-with-the-webaudio-api-part-1/
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

		// Valid tones for music output.
		// Map for simple tonal ladder
		//  87 69   84 89 85
		//  w e   t y u
		// 65 83 68 70 71 72 74
		// a s d f g h j
		var keycodes = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74];
		var notes = {};
		// TODO: Is this calculation correct?
		//       9 is the offset because we start with C. A should be the 9th position from there.
		keycodes.forEach(function(v, i) {
			notes[v] = parseInt(880 * Math.pow(2, (-9 + i) * 1/12));
		});

		// console.log(keycodes);
		// console.log(notes);



		// Connect gain node to audio context destination
		gain.connect(audioCtx.destination);
		gain.gain.setValueAtTime(1, audioCtx.currentTime); // required for linearRamp

		// Add EventListeners to buttons in DOM
		gainEl.addEventListener('input', changeGain);

		document.addEventListener('keydown', (event) => {
			if (!triggered) {
				triggered = !triggered;
				playTone(event.keyCode);
			}
		});

		document.addEventListener('keyup', stopTone, false);

		// Updates gain value and reflects change in DOM
		function changeGain() {
			gainOutputEl.value = this.value;
			gain.gain.linearRampToValueAtTime(this.value, audioCtx.currentTime + 0.1) // from gain.gain.value = this.value;
		}

		// Functions to start and stop audio
		function playTone(key) {
			// Set frequency
			var frequencyHz = notes[key] || 440;

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
			oscillator.addEventListener('ended', function(){
				triggered = !triggered; // Prevent multiple tones
		})
	};
})();
