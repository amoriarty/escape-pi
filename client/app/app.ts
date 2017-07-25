import * as ioPkg from 'socket.io-client';

let io = ioPkg(process.env.SOCKET_URL);

/**
 * On socket connection.
 */
io.on('connect', () => {
	if (process.env.NODE_ENV == "development") console.log("socket connected");
});

/**
 * When server ask who am i.
 */
io.on('whoareyou', () => {
	io.emit('iam', {
		type: "pi",
		name: process.env.PI_NAME
	})
});
