import * as io from 'socket.io-client';
import * as Events from 'events';
import Debug from '../tools/debug.class';
import Environment from '../tools/environment.class';
import { ProjectorStatusInterface } from '../projector.interface';

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
	}

	public set status(status: ProjectorStatusInterface) {
		this._socket.emit('status', status);
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
