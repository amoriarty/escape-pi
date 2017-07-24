import { SockTypeInterface } from './socket.interface';
import Client from '../client/client.class';

/**
 * Socket class handle every transaction that as to be done via socket.
 */
export default class Socket {
	client: Client;
	pis = [];

	/**
	 * @param io An instance of io from socket.io
	 */
	constructor(io) {
		io.on('connection', this.connection);
	}

	/**
	 * This function handle a websocket connection.
	 * @param socket New socket connected.
	 */
	private connection(socket) {
		socket.emit('whoareyou');
		socket.on('iam', (data: SockTypeInterface) => {
			if (data.type == "client") this.client = new Client(socket);
			else if (data.type == "pi") this.pis.push(socket);
		});
	}
}