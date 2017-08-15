import * as io from 'socket.io-client';
import * as Events from 'events';
import Debug from '../tools/debug.class';
import Environment from '../tools/environment.class';
import {
	ProjectorStatusInterface,
	ProjectorVideosInterface
} from '../projector.interface';

export default class Socket extends Events.EventEmitter {
	private _socket = io(Environment.socket_url as any);
	private _connected: Boolean = false;

	/**
	 * Fundamental socket events are listen here.
	 */
	constructor() {
		super();
		this._socket.on('connect', () => { this._connect(); });
		this._socket.on('disconnect', () => { this._disconnect(); });
		this._socket.on('play', () => this.emit('play'));
		this._socket.on('pause', () => this.emit('pause'));
		this._socket.on('stop', () => this.emit('stop'));
		this._socket.on('shutdown', () => this.emit('shutdown'));
		this._socket.on('reboot', () => this.emit('reboot'));
		this._socket.on('select', (video) => this.emit('select', video));
	}

	/**
	 * Send status via socket.
	 */
	public set status(status: ProjectorStatusInterface) {
		this._socket.emit('status', status);
	}

	/**
	 * Send videos list via socket.
	 */
	public set videos(videos: ProjectorVideosInterface) {
		this._socket.emit('videos', videos);
	}

	/**
	 * Function call on 'connect' events.
	 */
	private _connect() {
		this._connected = true;
		this._socket.emit('whatareyou', 'raspberry')
		this._socket.emit('whoareyou', Environment.pi_name);
		this.emit('connect');
		Debug.log('socket connected');
	}

	/**
	 * Function call on 'disconnect' events.
	 */
	private _disconnect() {
		this._connected = false;
		Debug.log('socket disconnected');
	}
}
