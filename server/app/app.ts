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
import { SocketType } from './socket/socket.interface';

let app = express();
let server = http.createServer(app);
let io: IO;
let angular: Client;
let projectors = new List<Projector>();

/**
 * Check for undefined environment variables.
 */
if (!Environment.check()) {
	Debug.error('all environment variables aren\'t set');
	process.exit(-1);
}
Debug.log('all environment variables are set');

/**
 * Initialiaze IO class.
 * Initialiaze Socket connections.
 */
io = new IO(server);
io.on('new', (socket: Socket) => {
	/**
	 * Angular client connection.
	 */
	socket.on('new_angular', () => {
		angular = new Client(socket);

		angular.on('shutdown', (name) => {
			let projector = projectors.find(Projector.validator(name))

			Debug.log('angular ask ' + name + ' to shutdown');
			if (projector)
				projector.shutdown();
		});
		angular.on('reboot', (name) => {
			let projector = projectors.find(Projector.validator(name));

			Debug.log('angular ask ' + name + ' to reboot');
			if (projector)
				projector.reboot();
		});
		angular.on('play', (name) => {
			Debug.log('angular ask ' + name + ' to play');
			if (name == 'all')
				Debug.log('DEBUG: SEND PLAY TO ALL');
			else {
				let projector = projectors.find(Projector.validator(name));

				if (projector)
					projector.play();
			}
		});
		angular.on('pause', (name) => {
			Debug.log('angular ask ' + name + ' to pause');
			if (name == 'all')
				Debug.log('DEBUG: SEND PAUSE TO ALL');
			else {
				let projector = projectors.find(Projector.validator(name));

				if (projector)
					projector.pause();
			}
		});
		angular.on('stop', (name) => {
			Debug.log('angular ask ' + name + ' to stop');
			if (name == 'all')
				Debug.log('DEBUG: SEND STOP TO ALL');
			else {
				let projector = projectors.find(Projector.validator(name));

				if (projector)
					projector.stop();
			}
		});
		angular.on('playlist', (playlist) => {
			Debug.log('DEBUG: Playist received from angular');
		});
		for (let projector of projectors.items) {
			angular.status = projector.status;
			angular.videos = projector.videos;
		}
	});

	/**
	 * Raspberry client connection.
	 */
	socket.on('new_raspberry', () => {
		let projector = new Projector(socket);

		projectors.add = projector;
		projector.on('status', (status) => {
			if (angular)
				angular.status = status;
		});
		projector.on('videos', (videos) => {
			if (angular)
				angular.videos = videos;
		});
	});
});

/**
 * Express configuration for serving angular application.
 */
app.use(express.static(__dirname + '/../public/dist'));
server.listen(Environment.port || 8080, () => {
	Debug.log("server listening on port " + Environment.port);
});
