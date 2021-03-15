import { playMusic } from './music';
import * as Tone from 'tone';

/**
 * Play Controls
 */
document.querySelector("#stop")!.addEventListener("click", function () {
	Tone.Transport.stop();
});

document.querySelector("#play")!.addEventListener("click", function () {
	Tone.Transport.start();
});

document.querySelector("#refresh")!.addEventListener("click", function () {
	window.location.reload();
});

playMusic();
Tone.Transport.start();
