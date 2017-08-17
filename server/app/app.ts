import 'socket.io';
import * as http from 'http';
import * as express from 'express';
import Debug from './tools/debug.class';
import Environment from './tools/environment.class';
import List from './tools/list.class';
import IO from './io/io.class';
import Socket from './socket/socket.class';
import Client from './client/client.class';
import Projector from './projector/projector.class';
import Playist from './playlist/playlist.class';
import { PlaylistInterface, VideoInterface } from './playlist/playlist.interface';
import { SocketType } from './socket/socket.interface';

let App = express();
let Server = http.createServer(App);
let io: IO;
let Angular: Client;
let Playlists: Playist;
let Projectors = new List<Projector>();

/**
 * Check for undefined environment variables.
 */
if (!Environment.check()) {
	Debug.error('all environment variables aren\'t set');
	process.exit(-1);
}
Debug.log('all environment variables are set');

/**
 * Initialize playlist for connect mongodb as fast as possible.
 */
try { Playlists = new Playist(); }
catch (error) {
	Debug.error('playlist initialization failed');
	Debug.error(error);
	process.exit(-1);
}


/**
 * Initialiaze IO class.
 * Initialiaze Socket connections.
 */
io = new IO(Server);
io.on('new', (socket: Socket) => {
	/**
	 * Angular client connection.
	 */
	socket.on('new_angular', () => {
		Angular = new Client(socket);

		Playlists.on('playlists', () => {
			Angular.playlists = Playlists.playlists;
		});
		Angular.on('disconnect', () => {
			Debug.log('angular disconnect');
			Angular = null;
		});
		Angular.on('shutdown', (name: String) => {
			let projector = Projectors.find(Projector.validator(name))

			Debug.log('angular ask ' + name + ' to shutdown');
			if (projector)
				projector.shutdown();
		});
		Angular.on('reboot', (name: String) => {
			let projector = Projectors.find(Projector.validator(name));

			Debug.log('angular ask ' + name + ' to reboot');
			if (projector)
				projector.reboot();
		});
		Angular.on('play', (name: String) => {
			Debug.log('angular ask ' + name + ' to play');
			if (name == 'all') {
				let interval = setInterval(() => {
					let ready = Projectors.items.filter((projector) => projector.status.loaded == true);

					if (Projectors.items.length == ready.length) {
						Projectors.items.forEach((projector) => projector.emit('play'));
						clearInterval(interval);
					}
				}, 10);
			}
			else {
				let projector = Projectors.find(Projector.validator(name));

				if (projector)
					projector.play();
			}
		});
		Angular.on('pause', (name: String) => {
			Debug.log('angular ask ' + name + ' to pause');
			if (name == 'all') {
				let interval = setInterval(() => {
					let ready = Projectors.items.filter((projector) => projector.status.loaded == true);

					if (Projectors.items.length == ready.length) {
						Projectors.items.forEach((projector) => projector.emit('pause'));
						clearInterval(interval);
					}
				}, 10);
			}
			else {
				let projector = Projectors.find(Projector.validator(name));

				if (projector)
					projector.pause();
			}
		});
		Angular.on('stop', (name: String) => {
			Debug.log('angular ask ' + name + ' to stop');
			if (name == 'all') {
				let interval = setInterval(() => {
					let ready = Projectors.items.filter((projector) => projector.status.loaded == true);

					if (Projectors.items.length == ready.length) {
						Projectors.items.forEach((projector) => projector.emit('stop'));
						clearInterval(interval);
					}
				}, 10);
			}
			else {
				let projector = Projectors.find(Projector.validator(name));

				if (projector)
					projector.stop();
			}
		});
		Angular.on('playlist', (playlist: PlaylistInterface) => {
			Playlists.playlist = playlist;
		});
		Angular.on('select', (video: VideoInterface) => {
			let projector = Projectors.find(Projector.validator(video.name));

			Debug.log('angular ask ' + video.name + ' to load ' + video.title);
			if (projector)
				projector.select = video.title;
		});
		for (let projector of Projectors.items) {
			Angular.status = projector.status;
			Angular.videos = projector.videos;
			Angular.playlists = Playlists.playlists;
		}
	});

	/**
	 * Raspberry client connection.
	 */
	socket.on('new_raspberry', () => {
		let projector = new Projector(socket);

		Projectors.add = projector;
		projector.on('disconnect', () => {
			let status = projector.status;

			Debug.log('projector ' + projector.name + ' disconnect');
			if (Angular) {
				status.connected = false;
				Angular.status = status;
			}
			Projectors.del(projector);
		});
		projector.on('status', (status) => {
			if (Angular)
				Angular.status = status;
		});
		projector.on('videos', (videos) => {
			if (Angular)
				Angular.videos = videos;
		});
	});
});

/**
 * Express configuration for serving angular application.
 */
App.use(express.static(__dirname + '/../public/dist'));
Server.listen(Environment.port || 8080, () => {
	Debug.log("server listening on port " + Environment.port);
});
