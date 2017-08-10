import * as ioPkg from 'socket.io-client';
import Environment from './tools/environment.class';
import Debug from './tools/debug.class';
import Socket from './socket/socket.class';
import Player from "./player/player.class";
import Power from "./power/power.class";

let io: SocketIOClient.Socket;
let player: Player;
let socket: Socket;
let power: Power;

/**
 * Check if environment variables are missing.
 */
if (!Environment.check()) {
	Debug.error("Some environment variables aren't defined.");
	process.exit(-1);
}
Debug.log("All environment variables are set.");

io = ioPkg(Environment.socket_url as any);
player = new Player();
socket = new Socket(io, player);
power = new Power();
