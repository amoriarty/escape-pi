// import * as ioPkg from 'socket.io-client';
// import Socket from './socket/socket.class';
// import Player from "./player/player.class";
// import Power from "./power/power.class";

// let io = ioPkg(process.env.SOCKET_URL);
// let player = new Player();
// let socket = new Socket(io, player);
// let power = new Power();

import Environment from './tools/environment.class';
import Debug from './tools/debug.class';

/**
 * Check if environment variables are missing.
 */
if (!Environment.check()) {
	Debug.error("Some environment variables aren't defined.");
	process.exit(-1);
}
Debug.log("All environment variables are set.");
