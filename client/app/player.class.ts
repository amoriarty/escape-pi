/// <reference path="node-omxplayer.d.ts" />
import * as Omx from 'node-omxplayer'

export default class Player {
	omx = Omx();
	path: String;
	playCallback: () => void;
	pauseCallback: () => void;
	stopCallback: () => void;

	constructor(private name: String, private socket) {
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

	set source(source: String) {
		this.path = source;
		this.omx.newSource(source, "hdmi", false, 100);
		this.omx.pause();
	}

	get quit() {
		return this.omx.quit;
	}

	/**
	 * Function call on play event.
	 */
	onPlay() {
		if (process.env.NODE_ENV == "development")
			console.log(this.name, 'play');
		this.omx.play();
		if (this.playCallback)
			this.playCallback();
	}

	/**
	 * Function call on pause event.
	 */
	onPause() {
		if (process.env.NODE_ENV == "development")
			console.log(this.name, 'pause');
		this.omx.pause();
		if (this.pauseCallback)
			this.pauseCallback();
	}

	/**
	 * Function call on stop event.
	 */
	onStop() {
		if (process.env.NODE_ENV == "development")
			console.log(this.name, 'stop');
		this.omx.quit();
		this.omx = Omx();
		if (this.stopCallback)
			this.stopCallback();
	}
}
