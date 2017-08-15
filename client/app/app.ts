import Environment from './tools/environment.class';
import Debug from './tools/debug.class';
import Socket from './socket/socket.class';
import Player from "./player/player.class";
import Power from "./power/power.class";
import FileSystem from './fs/fs.class';
import { ProjectorStatusInterface } from './projector.interface';

let player: Player;
let socket: Socket;
let power: Power;
let status: ProjectorStatusInterface;

/**
 * Check if environment variables are missing.
 */
if (!Environment.check()) {
	Debug.error("Some environment variables aren't defined.");
	process.exit(-1);
}
Debug.log("All environment variables are set.");

/**
 * Socket initialization.
 * Player initialization.
 * Status initialization.
 */
socket = new Socket();
player = new Player();
status = {
	name: Environment.pi_name,
	connected: false,
	playing: false
};

/**
 * Once socket is connected.
 */
socket.on('connect', () => {
	status.connected = true;
	socket.status = status;
	socket.videos = {
		name: Environment.pi_name,
		videos: FileSystem.videos(Environment.videos_path)
	};
});

/**
 * When received play command.
 */
socket.on('play', () => {
	Debug.log('server ask to play');
	player.play();
});

/**
 * When received pause command.
 */
socket.on('pause', () => {
	Debug.log('server ask to pause');
	player.pause();
});

/**
 * When received stop command.
 */
socket.on('stop', () => {
	Debug.log('server ask to stop');
	player.stop();
});

/**
 * When received shutdown command.
 */
socket.on('shutdown', () => {
	Debug.log('server ask to shutdown');
});

/**
 * When received reboot command.
 */
socket.on('reboot', () => {
	Debug.log('server ask to reboot');
});

/**
 * When received a video selection to load.
 */
socket.on('select', (video: String) => {
	Debug.log('server ask to load ' + video);
});
