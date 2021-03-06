import Debug from '../tools/debug.class';
import Omx from './omx.class';

export default class Player {
	private _omx = new Omx();
	private _playing: Boolean = false;
	private _path: String;

	/**
	 * Accessor to know if omx is load and ready to interact.
	 */
	public get loaded(): Boolean {
		return this._omx.loaded;
	}

	/**
	 * Accessor to know if omx is actually playing or not.
	 */
	public get playing(): Boolean {
		return this._playing;
	}

	/**
	 * Will load a video, stoping omx if it's already running.
	 * @param path Complete path to video to read.
	 */
	public set video(path: String) {
		this._path = path;
		this.stop();
	}

	/**
	 * Function will ask player to play.
	 */
	public play() {
		if (!this._omx.loaded) return ;
		if (this.playing) return ;
		this._omx.play();
		this._playing = true;
	}

	/**
	 * Function will ask player to pause.
	 */
	public pause() {
		if (!this._omx.loaded) return ;
		if (!this.playing) return ;
		this._omx.pause();
		this._playing = false;
	}

	/**
	 * Function will ask player to stop.
	 * In this case, player will reload video.
	 */
	public stop() {
		this._playing = false;
		this._omx.quit();
		this._load();
	}

	/**
	 * Will check that instance have a path, and ask omx to load it.
	 */
	private _load() {
		if (!this._path) return ;
		this._omx.load = this._path;
	}
}
