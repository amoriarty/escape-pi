import 'socket.io';
import * as http from 'http';
import * as express from 'express';
import Debug from './tools/debug.class';
import Environment from './tools/environment.class';
import IO from './io/io.class';
import Socket from './socket/socket.class';
import { SocketType } from './socket/socket.interface';

let app = express();
let server = http.createServer(app);
let io: IO;

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
	socket.on('new_angular', () => {
		Debug.log('DEBUG: new angular');
	});

	socket.on('new_raspberry', () => {
		Debug.log('DEBUG: new raspberry');
	});
});

/**
 * Express configuration for serving angular application.
 */
app.use(express.static(__dirname + '/../public/dist'));
server.listen(Environment.port || 8080, () => {
	Debug.log("server listening on port " + Environment.port);
});
