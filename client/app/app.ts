import * as io from 'socket.io-client';
import { SockTypeInterface } from './socket.interface';
import { PiStatusInterface } from './pi.interface';
import Player from "./player.class";
import FileSystem from './fs.class';

let socket = io(process.env.SOCKET_URL);
let player = new Player(process.env.PI_NAME, socket);
let fs = new FileSystem(process.env.VIDEOS_PATH);
let status: PiStatusInterface = {
	name: process.env.PI_NAME,
	connected: true,
	playing: false
};

/**
 * On socket connection.
 */
socket.on('connect', () => {
	if (process.env.NODE_ENV == "development") console.log("socket connected");
});

/**
 * When server ask who am i.
 */
socket.on('whoareyou', () => {
	let me: SockTypeInterface = {
		type: "pi",
		name: process.env.PI_NAME
	};

	socket.emit('iam', me);
	socket.emit('status', status);
	socket.emit('videos', fs.videos);
});

/**
 * Response to server when asking for videos list.
 */
socket.on('videos', () => { socket.emit('videos', fs.videos); });

/**
 * Player callback to change status.
 */
let stopPlayingStatus = () => {
	status.playing = false;
	socket.emit('status', status);
}

player.pause = stopPlayingStatus;
player.stop = stopPlayingStatus;
player.play = () => {
	status.playing = true;
	socket.emit('status', status);
}
