import { SockTypeInterface } from './socket.interface';
import { PiStatusInterface } from '../pi/pi.interface';
import FileSystem from '../fs/fs.class';
import Player from '../player/player.class';

export default class Socket {
	fs = new FileSystem(process.env.VIDEOS_PATH);
	on = false;

	/**
	 * Trigger socket listener
	 * @param socket socket.io-client instance.
	 * @param player Player instance.
	 */
	constructor(private socket, private player: Player) {
		this.socket.on('connect', () => { this.connect(); });
		this.socket.on('disconnect', (reason) => { this.disconnect(); });
		this.socket.on('whoareyou', () => { this.iAm(); });
		this.socket.on('videos', () => { this.onVideos(); })
		this.socket.on('selected', (selected: String) => { this.onSelected(selected); });
		this.socket.on('play', () => { this.onPlay(); });
		this.socket.on('pause', () => { this.onPause(); });
		this.socket.on('stop', () => { this.onStop(); });
	}

	get connected(): Boolean {
		return this.on;
	}

	/**
	 * Function to send current pi status.
	 */
	sendStatus() {
		this.socket.emit('status', {
			name: process.env.PI_NAME,
			connected: this.connected,
			playing: this.player.running
		});
	}

	/**
	 * On socket connection.
	 */
	private connect() {
		if (process.env.NODE_ENV == "development")
			console.log("socket", process.env.PI_NAME, "connected");
		this.on = true;
	}

	/**
	 * Function called at disconnection.
	 */
	private disconnect() {
		if (process.env.NODE_ENV == "development")
			console.log("socket", process.env.PI_NAME, "connected");
		this.on = false;
	}

	/**
	 * When server ask who am i.
	 */
	private iAm() {
		let me: SockTypeInterface = {
			type: "pi",
			name: process.env.PI_NAME
		};

		this.socket.emit('iam', me);
		this.socket.emit('videos', this.fs.videos);
		this.sendStatus();
	}

	/**
	 * Response to server when asking for videos list.
	 */
	private onVideos() {
		this.socket.emit('videos', this.fs.videos);
	}

	/**
	 * Client selection video received
	 * @param selected Selected videos to load.
	 */
	private onSelected(selected: String) {
		this.player.source = process.env.VIDEOS_PATH + '/' + selected;
		this.sendStatus();
	}

	private onPlay() {
		this.player.play();
		this.sendStatus();
	}

	private onPause() {
		this.player.pause();
		this.sendStatus();
	}

	private onStop() {
		this.player.stop();
		this.sendStatus();
	}
}
