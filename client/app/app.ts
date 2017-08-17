import * as path from 'path';
import Environment from './tools/environment.class';
import Debug from './tools/debug.class';
import Socket from './socket/socket.class';
import Player from "./player/player.class";
import Power from "./power/power.class";
import FileSystem from './fs/fs.class';
import Timer from './timer/timer.class';
import { TriggerInterface } from './timer/timer.interface';
import { ProjectorStatusInterface } from './tools/projector.interface';

let player: Player;
let socket: Socket;
let timer: Timer;
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
	playing: false,
	loaded: false
};

/**
 * If raspberry as to trigger the door,
 * configuring timer.
 */
if (Environment.door_trigger) {
	timer = new Timer();
	timer.trigger = { name: 'door', at: 120 }
	timer.on('trigger', (trigger: TriggerInterface) => {
		Debug.log('trigger ' + trigger.name);
	});
}

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
	if (timer && player.playing)
		timer.start();
	status.loaded = player.loaded;
	status.playing = player.playing;
	socket.status = status;
});

/**
 * When received pause command.
 */
socket.on('pause', () => {
	Debug.log('server ask to pause');
	player.pause();
	if (timer && !player.playing)
		timer.pause();
	status.loaded = player.loaded;
	status.playing = player.playing;
	socket.status = status;
});

/**
 * When received stop command.
 */
socket.on('stop', () => {
	Debug.log('server ask to stop');
	player.stop();
	if (timer && !player.playing)
		timer.stop();
	status.loaded = player.loaded;
	status.playing = player.playing;
	socket.status = status;
});

/**
 * When received shutdown command.
 */
socket.on('shutdown', () => {
	Debug.log('server ask to shutdown');
	Power.shutdown();
});

/**
 * When received reboot command.
 */
socket.on('reboot', () => {
	Debug.log('server ask to reboot');
	Power.reboot();
});

/**
 * When received a video selection to load.
 */
socket.on('select', (video: String) => {
	let complete_path = path.resolve(Environment.videos_path, video);

	Debug.log('server ask to load ' + video);
	player.video = complete_path;
	if (timer && !player.playing)
		timer.stop();
	status.loaded = player.loaded;
	status.playing = player.playing;
	socket.status = status;
});


