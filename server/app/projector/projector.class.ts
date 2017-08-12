import * as Events from 'events'
import Debug from '../tools/debug.class';
import Socket from '../socket/socket.class';
import {
	ProjectorStatusInterface,
	ProjectorVideosInterface
} from './projector.interface';

/**
 * Manage communication with a projector.
 */
export default class Projector extends Events.EventEmitter {
	private _name: String;
	private _videos: ProjectorVideosInterface;
	private _status: ProjectorStatusInterface = {
		name: this.name,
		connected: false,
		playing: false
	};

	/**
	 * Will listen all raspberry emittion.
	 * @param _socket Socket instance of projector.
	 */
	constructor(private _socket: Socket) {
		super();
		this._socket.projector = this;
		this._socket.on('whoareyou', (name) => this._onWhoAreYou(name));
		this._socket.on('status', (status) => this._onStatus(status));
		this._socket.on('videos', (videos) => this._videos = videos);
		this._status.connected = true;
		Debug.log('new projector connected');
	}

	/**
	 * Function will trigger play event.
	 */
	public play() {
		this.emit('play');
	}

	/**
	 * Function will trigger pause event.
	 */
	public pause() {
		this._socket.emit('stop');
	}

	/**
	 * Function will trigger stop event.
	 */
	public stop() {
		this._socket.emit('stop');
	}

	/**
	 * Trigger shutdown by raspberry.
	 */
	public shutdown() {
		this._socket.emit('shutdown');
	}
	/**
	 * Trigger reboot by raspberry.
	 */
	public reboot() {
		this._socket.emit('reboot');
	}

	/**
	 * Static validator to find a projector in a list by name.
	 * @param name Name of projector wanted
	 * @return Callback to used by Array.find
	 */
	public static validator(name: String) {
		return (item: Projector) => (name == item.name) ? true : false;
	}

	/**
	 * Getter for projector name.
	 */
	public get name(): String {
		return this._name;
	}

	/**
	 * Getter for pi status.
	 */
	public get status(): ProjectorStatusInterface {
		return this._status;
	}

	/**
	 * Getter for videos pi send.
	 */
	public get videos(): ProjectorVideosInterface {
		return this._videos;
	}

	/**
	 * Function call when raspberry update is status.
	 * @param status Status received from projector.
	 */
	private _onStatus(status: ProjectorStatusInterface) {
		this._status = status;
		this.emit('status', status);
	}

	/**
	 * Function call when raspberry send his videos list.
	 * @param videos List of raspberry's videos.
	 */
	private _onVideos(videos: ProjectorVideosInterface) {
		this._videos = videos;
		this.emit('videos', videos);
	}

	/**
	 * Function when projector send is name.
	 * @param name Name of projector
	 */
	private _onWhoAreYou(name: String) {
		this._name = name;
		this._status.name = name;
	}
}
