import Debug from '../tools/debug.class';
import * as ChildProcess from 'child_process';
import * as Events from 'events';

export default class Omx extends Events.EventEmitter {
	private _process: ChildProcess.ChildProcess;
	private _loadState: Boolean = false;

	/**
	 * Play / Pause omx.
	 */
	public play() {
		this._write('p');
	}

	/**
	 * Play / Pause omx.
	 */
	public pause() {
		this._write('p');
	}

	/**
	 * Quit omx process.
	 */
	public quit() {
		this._write('q');
		this._loadState = false;
	}

	/**
	 * Accessor for load status.
	 */
	public get loaded() {
		return this._loadState;
	}

	/**
	 * Setter for loading a path.
	 */
	public set load(path: String) {
		if (this._process)
			this.quit();
		this._process = ChildProcess.spawn('omxplayer', [ path as string ], {});
		this.pause();
		this._loaded = true;
	}

	private set _loaded(value: Boolean) {
		this._loadState = value;
		this.emit('loaded');
	}

	/**
	 * Check if process exist, and write in stdin.
	 * @param value Input to pass to stdin.
	 */
	private _write(value: String) {
		if (this._process)
			this._process.stdin.write(value);
	}
}
