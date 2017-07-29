import { Socket } from 'socket.io-client';

export default class Player {
	playCallback: () => void;
	pauseCallback: () => void;
	stopCallback: () => void;

	constructor(private name: String, private socket: Socket) {
		this.socket.on('play', () => { this.onPlay(); });
		this.socket.on('pause', () => { this.onPause(); });
		this.socket.on('stop', () => { this.onStop(); });
	}

	/**
	 * Setter for the command callback;
	 */
	set play(playCallback: () => void) { this.playCallback = playCallback; }
	set pause(pauseCallback: () => void) { this.pauseCallback = pauseCallback; }
	set stop(stopCallback: () => void) { this.stopCallback = stopCallback; }

	/**
	 * Function call on play event.
	 */
	onPlay() {
		console.log(this.name, 'play');
		if (this.playCallback) this.playCallback();
	}

	/**
	 * Function call on pause event.
	 */
	onPause() {
		console.log(this.name, 'pause');
		if (this.pauseCallback) this.pauseCallback();
	}

	/**
	 * Function call on stop event.
	 */
	onStop() {
		console.log(this.name, 'stop');
		if (this.stopCallback) this.stopCallback();
	}
}
