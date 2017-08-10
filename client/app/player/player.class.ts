/// <reference path='../node-omxplayer.d.ts' />
import * as Omx from 'node-omxplayer'
import Debug from '../tools/debug.class';

export default class Player {
	public play() { }
	public pause() { }
	public stop() { }
}

// export default class Player {
// 	private omx: NodeOmxPlayer;
// 	private path: String;
// 	private playing = false;
// 	private loaded = false;
// 	private statusChange: () => void;
// 	private lock = false;

// 	constructor() { }

// 	set onStatusChange(callback: () => void) {
// 		this.statusChange = callback;
// 	}

// 	/**
// 	 * Setter for source to read.
// 	 * Function will automaticaly load the new source by Omx.
// 	 */
// 	set source(source: String) {
// 		this.path = source;
// 		this.load();
// 	}

// 	/**
// 	 * Shortcut accessor to running state.
// 	 */
// 	get running(): Boolean {
// 		return this.playing;
// 	}

// 	/**
// 	 * Function call on play event.
// 	 */
// 	play() {
// 		if (this.running || (!this.loaded && !this.path))
// 			return ;
// 		else if (!this.loaded)
// 			this.load();
// 		this.omx.play();
// 		this.playing = true;
// 		Debug.log('play');
// 		if (this.statusChange)
// 			this.statusChange();
// 	}

// 	/**
// 	 * Function call on pause event.
// 	 */
// 	pause() {
// 		if (!this.running)
// 			return ;
// 		this.omx.pause();
// 		this.playing = false;
// 		Debug.log('pause');
// 		if (this.statusChange)
// 			this.statusChange();
// 	}

// 	/**
// 	 * Function call on stop event.
// 	 */
// 	stop() {
// 		if (this.omx)
// 			Debug.log('stop');
// 		this.load();
// 	}

// 	private load() {
// 		if (this.omx) {
// 			try { this.omx.quit(); }
// 			catch (error) { }
// 		}
// 		this.loaded = false;
// 		this.playing = false;
// 		if (!this.path)
// 			return ;
// 		this.omx = Omx(this.path, 'hdmi', false, 100);
// 		this.omx.pause();
// 		this.lock = true;
// 		this.omx.on('close', () => {
// 			if (this.lock) {
// 				this.lock = false;
// 				return ;
// 			}
// 			this.loaded = false;
// 			this.playing = false;
// 			if (this.statusChange)
// 				this.statusChange();
// 		});
// 		this.loaded = true;
// 		Debug.log('load ' + this.path);
// 		if (this.statusChange)
// 			this.statusChange();
// 	}
// }
