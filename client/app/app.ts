import Environment from './tools/environment.class';
import Debug from './tools/debug.class';
import Socket from './socket/socket.class';
import Player from "./player/player.class";
import Power from "./power/power.class";

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

/**
 * Socket connection.
 */
socket = new Socket();
player = new Player();

/**
 * Example for socket use.
 * Need to update server before.
 */
socket.on('play', () => {
	Debug.log('socket play');
	player.play();
});
