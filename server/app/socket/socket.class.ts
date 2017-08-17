import 'socket.io';
import { EventEmitter } from "events";
import Debug from '../tools/debug.class';
import Client from '../client/client.class';
import Projector from '../projector/projector.class';
import { SocketType } from './socket.interface';

/**
 * This class manage a unique socket connection.
 */
export default class Socket extends EventEmitter {
	private _type: SocketType;

	constructor(private _socket: SocketIO.Socket) {
		super();
		this._socket.on('disconnect', () => this.emit('disconnect'));
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
	 * This will trigger class to listen client instance.
	 */
	public set client(instance: Client) {
		instance.on('playlists', (playlists) => this._socket.emit('playlists', playlists));
		instance.on('status', (status) => this._socket.emit('status', status));
		instance.on('videos', (videos) => this._socket.emit('videos', videos));
	}

	/**
	 * This will trigger class to listen projector instances.
	 */
	public set projector(instance: Projector) {
		instance.on('play', () => this._socket.emit('play'));
		instance.on('pause', () => this._socket.emit('pause'));
		instance.on('stop', () => this._socket.emit('stop'));
		instance.on('shutdown', () => this._socket.emit('shutdown'));
		instance.on('reboot', () => this._socket.emit('reboot'));
		instance.on('select', (video: String) => this._socket.emit('select', video));
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
				this._socket.on('select', (video) => this.emit('select', video));
				this.emit('new_angular');
				break ;
			case 'raspberry':
				this._type = SocketType.RASPBERRY;
				this._socket.on('whoareyou', (name) => this.emit('whoareyou', name));
				this._socket.on('status', (status) => this.emit('status', status));
				this._socket.on('videos', (videos) => this.emit('videos', videos));
				this._socket.on('loaded', (loaded) => this.emit('loaded', loaded));
				this.emit('new_raspberry');
				break ;
		}
	}
}
