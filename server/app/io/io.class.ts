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
				this.client.playerCommand = (name, command) => { this.onPlayerCommand(name, command); };
				this.pis.forEach((item: Pi) => { this.piStatusChange(item); });
				if (process.env.NODE_ENV == "development")
					console.log("cilent connected");
			}
			else if (data.type == "pi") {
				let pi = new Pi(data.name, socket);
				
				pi.disconnect = (instance) => { this.piDisconnect(instance as Pi); };
				pi.statusChange = (instance) => { this.piStatusChange(instance); };
				pi.videosCallback = (instance) => { this.onVideosChange(instance); };
				// pi.askVideos();
				this.pis.push(pi);
				if (process.env.NODE_ENV == "development")
					console.log("pi", pi.name, "connected");
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

	/**
	 * Function called when client received a command.
	 * @param name Name of pi or "all"
	 * @param command Command to execute on raspberry.
	 */
	private onPlayerCommand(name: String, command: String) {
		if (process.env.NODE_ENV == "development")
			console.log("client ask", name, "to", command);
		if (name == "all")
			this.io.emit(command);
		else {
			for (let pi of this.pis) {
				if (pi == undefined) continue ;
				if (pi.name == name) {
					pi.send(command);
					break ;
				}
			}
		}
	}

	private onVideosChange(instance: Pi) {
		if (this.client) this.client.sendVideos(instance);
	}
}
