import Debug from '../tools/debug.class';
import * as ChildProcess from 'child_process';

const args = [
	"-o",
	"hdmi",
	"--blank",
	"--no-osd"
];

export default class Omx {
	private _process: ChildProcess.ChildProcess = null;
	private _loaded: Boolean = false;

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
		let interval = setInterval(() => {
			Debug.log('wait for omxplayer to close.');
			if (this._process === null) {
				this._load(path);
				clearInterval(interval);
			}
		}, 10);
	}

	/**
	 * Private function that actually start process if and only if this._process is null.
	 * @param path Path to load.
	 */
	private _load(path: String): Boolean {
		if (this._process === null) {
			this._process = ChildProcess.spawn('omxplayer', [ path as string, ...args ], { detached: false });
			this.pause();
			this._process.on('close', () => this._onClose());
			this._loaded = true;
			return true;
		}
		return false;
	}

	/**
	 * Function call when process close.
	 */
	private _onClose() {
		this._loaded = false;
		this._process = null;
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
