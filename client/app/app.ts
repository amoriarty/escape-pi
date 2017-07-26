import * as io from 'socket.io-client';
import { SockTypeInterface } from './socket.interface';
import { PiStatusInterface } from './pi.interface';

let socket = io(process.env.SOCKET_URL);
let status: PiStatusInterface = {
	name: 'yharnam',
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
