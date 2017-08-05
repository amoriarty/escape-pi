/// <reference path="../node-omxplayer.d.ts" />
import * as Omx from 'node-omxplayer'

export default class Player {
	private omx: NodeOmxPlayer;
	private path: String;
	private playing = false;
	private loaded = false;
	private statusChange: () => void;
	private lock = false;

	constructor() { }

	set onStatusChange(callback: () => void) {
		this.statusChange = callback;
	}

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
		if (this.running || (!this.loaded && !this.path))
			return ;
		else if (!this.loaded)
			this.load();
		this.omx.play();
		this.playing = true;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, 'play');
		if (this.statusChange)
			this.statusChange();
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
		if (this.statusChange)
			this.statusChange();
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
		if (this.omx) {
			try { this.omx.quit(); }
			catch (error) { }
		}
		this.loaded = false;
		this.playing = false;
		if (!this.path)
			return ;
		this.omx = Omx(this.path, "hdmi", false, 100);
		this.omx.pause();
		this.lock = true;
		this.omx.on('close', () => {
			if (this.lock) {
				this.lock = false;
				return ;
			}
			this.loaded = false;
			this.playing = false;
			if (this.statusChange)
				this.statusChange();
		});
		this.loaded = true;
		if (process.env.NODE_ENV == "development")
			console.log(process.env.PI_NAME, "load", this.path);
		if (this.statusChange)
			this.statusChange();
	}
}
