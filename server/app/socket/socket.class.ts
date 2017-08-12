import 'socket.io';
import { EventEmitter } from "events";
import Debug from '../tools/debug.class';
import { SocketType } from './socket.interface';

/**
 * This class manage a unique socket connection.
 */
export default class Socket extends EventEmitter {
	private _type: SocketType;

	constructor(private _socket: SocketIO.Socket) {
		super();
		this._socket.on('whatareyou', (type) => this._whatareyou(type));
		Debug.log('socket now waiting for type authentification');
	}

	/**
	 * Accessor for the socket type
	 * @return A value of SocketType or null.
	 */
	public get type() {
		return this._type || null;
	}

	/**
	 * Function called for type authentification.
	 * @param type Given by client socket.
	 */
	private _whatareyou(type: String) {
		switch (type) {
			case 'angular':
				this._type = SocketType.ANGULAR;
				this._socket.on('play', (name) => this.emit('play', name));
				this._socket.on('pause', (name) => this.emit('pause', name));
				this._socket.on('stop', (name) => this.emit('stop', name));
				this._socket.on('shutdown', (name) => this.emit('shutdown', name));
				this._socket.on('reboot', (name) => this.emit('reboot', name));
				this._socket.on('playlist', (playlist) => this.emit('playlist', playlist));
				this.emit('new_angular');
				break ;
			case 'raspberry':
				this._type = SocketType.RASPBERRY;
				this._socket.on('whoareyou', (name) => this.emit('whoareyou', name));
				this._socket.on('status', (status) => this.emit('status', status));
				this.emit('new_raspberry');
				break ;
		}
	}
}
