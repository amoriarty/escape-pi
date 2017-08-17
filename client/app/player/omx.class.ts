import Debug from '../tools/debug.class';
import * as ChildProcess from 'child_process';

export default class Omx {
	private _process: ChildProcess.ChildProcess;
	private _loaded = false;

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
		this._loaded = false;
	}

	/**
	 * Accessor for load status.
	 */
	public get loaded() {
		return this._loaded;
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

	/**
	 * Check if process exist, and write in stdin.
	 * @param value Input to pass to stdin.
	 */
	private _write(value: String) {
		if (this._process)
			this._process.stdin.write(value);
	}
}
