// import { SockTypeInterface } from './socket.interface';
// import { PiStatusInterface } from '../pi/pi.interface';
// import FileSystem from '../fs/fs.class';
// import Player from '../player/player.class';
// import Power from '../power/power.class';

import * as io from 'socket.io-client';
import Debug from '../tools/debug.class';
import Environment from '../tools/environment.class';

export default class Socket {
	private _socket = io(Environment.socket_url as any);
	private _connected: Boolean = false;

	/**
	 * Fundamental socket events are listen here.
	 */
	constructor() {
		this._socket.on('connect', () => { this._connect(); });
		this._socket.on('disconnect', () => { this._disconnect(); });
	}

	/**
	 * Function call on 'connect' events.
	 */
	private _connect() {
		this._connected = true;
		this._socket.emit('whatareyou', 'raspberry')
		Debug.log('socket connected');
	}

	/**
	 * Function call on 'disconnect' events.
	 */
	private _disconnect() {
		this._connected = false;
		Debug.log('socket disconnected');
	}

	/**
	 * This getter allow class user to add a socket listener.
	 */
	public get listen() {
		return this._socket.on;
	}
}

// export default class Socket {
// 	fs = new FileSystem(Environment.videos_path);
// 	power = new Power();
// 	on = false;

// 	/**
// 	 * Trigger socket listener
// 	 * @param socket socket.io-client instance.
// 	 * @param player Player instance.
// 	 */
// 	constructor(private socket, private player: Player) {
// 		this.socket.on('connect', () => { this.connect(); });
// 		this.socket.on('disconnect', (reason) => { this.disconnect(); });
// 		this.socket.on('whoareyou', () => { this.iAm(); });
// 		this.socket.on('videos', () => { this.onVideos(); })
// 		this.socket.on('selected', (selected: String) => { this.onSelected(selected); });
// 		this.socket.on('play', () => { this.player.play(); });
// 		this.socket.on('pause', () => { this.player.pause(); });
// 		this.socket.on('stop', () => { this.player.stop(); });
// 		this.socket.on('shutdown', () => { this.onShutdown(); });
// 		this.socket.on('reboot', () => { this.onReboot(); });
// 		this.player.onStatusChange = () => { this.sendStatus(); };
// 	}

// 	get connected(): Boolean {
// 		return this.on;
// 	}

// 	/**
// 	 * Function to send current pi status.
// 	 */
// 	sendStatus() {
// 		this.socket.emit('status', {
// 			name: Environment.pi_name,
// 			connected: this.connected,
// 			playing: this.player.running
// 		});
// 	}

// 	/**
// 	 * On socket connection.
// 	 */
// 	private connect() {
// 		Debug.log("socket connected");
// 		this.on = true;
// 	}

// 	/**
// 	 * Function called at disconnection.
// 	 */
// 	private disconnect() {
// 		Debug.log("socket disconnected");
// 		this.on = false;
// 	}

// 	/**
// 	 * When server ask who am i.
// 	 */
// 	private iAm() {
// 		let me: SockTypeInterface = {
// 			type: "pi",
// 			name: Environment.pi_name
// 		};

// 		this.socket.emit('iam', me);
// 		this.socket.emit('videos', this.fs.videos);
// 		this.sendStatus();
// 	}

// 	/**
// 	 * Response to server when asking for videos list.
// 	 */
// 	private onVideos() {
// 		this.socket.emit('videos', this.fs.videos);
// 	}

// 	/**
// 	 * Client selection video received
// 	 * @param selected Selected videos to load.
// 	 */
// 	private onSelected(selected: String) {
// 		this.player.source = Environment.videos_path + '/' + selected;
// 	}

// 	private onPlay() {
// 		this.player.play();
// 	}

// 	private onPause() {
// 		this.player.pause();
// 	}

// 	private onStop() {
// 		this.player.stop();
// 	}

// 	private onShutdown() {
// 		Debug.log("received shutdown command");
// 		this.power.shutdown();
// 	}

// 	private onReboot() {
// 		Debug.log("received reboot command");
// 		this.power.reboot();
// 	}
// }
