/// <reference path="../node-omxplayer.d.ts" />
import * as Omx from 'node-omxplayer'

export default class Player {
	private omx: NodeOmxPlayer;
	private path: String;
	private playing = false;
	private loaded = false;

	constructor() { }

	/**
	 * Setter for source to read.
	 * Function will automaticaly load the new source by Omx.
	 */
	set source(source: String) {
		this.path = source;
		this.load();
	}

	/**
	 * Shortcut accessor to running state.
	 */
	get running(): Boolean {
		return this.playing;
	}

	/**
	 * Function call on play event.
	 */
	play() {
		if (!this.loaded || this.running)
			return ;
		this.omx.play();
		this.playing = true;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'play');
	}

	/**
	 * Function call on pause event.
	 */
	pause() {
		if (!this.running)
			return ;
		this.omx.pause();
		this.playing = false;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'pause');
	}

	/**
	 * Function call on stop event.
	 */
	stop() {
		if (this.omx && process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'stop');
		this.load();
	}

	private load() {
		if (this.omx)
			this.omx.quit();
		this.loaded = false;
		this.playing = false;
		if (!this.path)
			return ;
		this.omx = Omx(this.path, "hdmi", false, 100);
		this.omx.pause();
		this.loaded = true;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, "load", this.path);
	}
}
