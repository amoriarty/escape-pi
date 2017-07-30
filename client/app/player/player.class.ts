/// <reference path="../node-omxplayer.d.ts" />
import * as Omx from 'node-omxplayer'

export default class Player {
	omx: NodeOmxPlayer;
	path: String;
	playing = false;

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
		if (!this.omx)
			return ;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'play');
		this.omx.play();
		this.playing = true;
	}

	/**
	 * Function call on pause event.
	 */
	pause() {
		if (!this.omx)
			return ;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'pause');
		this.omx.pause();
		this.playing = false;
	}

	/**
	 * Function call on stop event.
	 */
	stop() {
		this.reload();
		if (this.omx && process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'stop');
	}

	private load() {
		if (!this.path)
			return ;
		if (!this.omx)
			this.omx = Omx(this.path, "hdmi", true, 100);
		else {
			this.reload();
			return ;
		}
		this.omx.pause();
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, "load", this.path);
	}

	private reload() {
		if (this.omx) {
			this.omx.quit();
			delete this.omx;
			this.playing = false;
		}
		this.load();
	}
}
