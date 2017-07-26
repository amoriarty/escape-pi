import { SockTypeInterface } from '../socket/socket.interface';
import Client from '../client/client.class';
import Pi from '../pi/pi.class';

/**
 * Configure and manage socket.io transaction.
 */
export default class IO {
	client: Client = null;
	pis: Pi[] = [];

	/**
	 * @param io An socket.io instance.
	 */
	constructor(private io) {
		io.on('connection', (socket) => { this.connection(socket); })
	}

	/**
	 * This function handle a websocket connection.
	 * @param socket New socket connected.
	 */
	private connection(socket) {
		socket.emit('whoareyou');
		socket.on('iam', (data: SockTypeInterface) => {
			if (data.type == "client") {
				this.client = new Client(socket);
				this.client.disconnect = (instance) => { this.clientDisconnect(instance as Client); };
			}
			else if (data.type == "pi") {
				let pi = new Pi(data.name, socket);
				
				pi.disconnect = (instance) => { this.piDisconnect(instance as Pi); };
				pi.statusChange = (instance) => { this.piStatusChange(instance); };
				this.pis.push(pi);
			}
		});
	}

	/**
	 * Function called when client socket is closed.
	 * @param instance Client instance.
	 */
	private clientDisconnect(instance: Client) {
		if (process.env.NODE_ENV == "development")
			console.log("client disconnect");
		delete this.client;
		this.client = null;
	}

	/**
	 * Function called when pi socket is closed.
	 * @param instance Pi instance.
	 */
	private piDisconnect(instance: Pi) {
		let index = this.pis.indexOf(instance);

		if (process.env.NODE_ENV == "development")
			console.log("pi " + instance.name + " disconnect");
		delete this.pis[index];
	}

	/**
	 * Function call when a raspberry pi change his status.
	 * @param instance Pi instance called when 
	 */
	private piStatusChange(instance: Pi) {
		if (process.env.NODE_ENV == "development")
			console.log(instance.name, "change his status");
		if (this.client)
			this.client.piStatusChange(instance);
	}
}
