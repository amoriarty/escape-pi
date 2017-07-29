import * as io from 'socket.io-client';
import { SockTypeInterface } from './socket.interface';
import { PiStatusInterface } from './pi.interface';

let socket = io(process.env.SOCKET_URL);
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
});

socket.on('play', () => {
	console.log(status.name, 'play');
});

socket.on('pause', () => {
	console.log(status.name, 'pause');
});

socket.on('stop', () => {
	console.log(status.name, 'stop');
});
