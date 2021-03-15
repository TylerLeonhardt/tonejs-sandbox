import * as Tone from 'tone';

export function playMusic() {
	const now = Tone.now()

	const dist = new Tone.Distortion(0.7).toDestination();
	const osc = new Tone.Oscillator("C3").toDestination();
	osc.frequency.rampTo("C2", 2, 0);
	osc.frequency.rampTo("C3", 2, 2);
	osc.connect(dist);
	osc.start(now).stop(now + 4);

	const phaser = new Tone.Phaser({
		frequency: 15,
		octaves: 5,
		baseFrequency: 1000
	}).toDestination();

	const synth = new Tone.Sampler({
		urls: {
			A1: "A1.mp3",
			A2: "A2.mp3",
		},
		baseUrl: "https://tonejs.github.io/audio/casio/"
	}).toDestination();
	synth.connect(phaser);

	const loop = new Tone.Loop(
		function (time) {
			let synthPart = new Tone.Sequence(
				function (time, note) {
					synth.triggerAttackRelease(note, "10hz", time);
				},
				["E3", ["D3","B3"], "C#4", "A3"],
				"8n"
			);
			synthPart.loop = 2;
			synthPart.start(time);
		
			synthPart = new Tone.Sequence(
				function (time, note) {
					console.log(time);
					synth.triggerAttackRelease(note, "10hz", time);
				},
				["E3", ["D3","B3"], "G#3", "A3"],
				"8n"
			);
			synthPart.loop = 2;
			synthPart.start(time + 2);
		},
		"2m"
	).start(now + 3.75);

	loop.iterations = 4;
}
