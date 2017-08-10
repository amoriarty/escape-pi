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
	 * Accessor for adding events listener.
	 */
	public get listen() {
		return this._socket.on;
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
			case "angular":
				this._type = SocketType.ANGULAR;
				this.emit('new_angular');
				break ;
			case "raspberry":
				this._type = SocketType.RASPBERRY;
				this.emit('new_raspberry');
				break ;
		}
	}
}

// /**
//  * Socket class handle every transaction that as to be done via socket.
//  */
// export default class Socket {
// 	protected callbackDisconnect: (instance: Socket) => void;

// 	/**
// 	 * @param socket An instance of io from socket.io
// 	 */
// 	constructor(protected socket) { }

// 	/**
// 	 * Setter for disconnect callback.
// 	 */
// 	set disconnect(callback: (instance: Socket) => void) {
// 		this.callbackDisconnect = callback;
// 		this.socket.on('disconnect', (reason) => { this.callbackDisconnect(this); });
// 	}
// }
