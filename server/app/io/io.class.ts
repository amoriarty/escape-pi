import * as io from 'socket.io';
import * as http from 'http';
import { EventEmitter } from 'events';
import Socket from '../socket/socket.class';
import Debug from '../tools/debug.class';
import List from '../tools/list.class';
import { SocketType } from '../socket/socket.interface';

/**
 * Class where is socket.io is instanciate and manage.
 */
export default class IO extends EventEmitter {
	private _socket: SocketIO.Server;
	private _sockets = new List<Socket>();

	/**
	 * Instanciate an IO class, with the socket.io server.
	 * @param server Instance of express server.
	 */
	constructor(server: http.Server) {
		super();
		this._socket = io(server, { serveClient: false });
		this._socket.on('connection', (socket) => this._connection(socket));
		Debug.log('now waiting for sockets connections.');
	}

	/**
	 * Public accessor to add event listeners.
	 */
	public get listen() {
		return this._socket.on;
	}

	/**
	 * Accessor to sockets objects.
	 */
	public get sockets() {
		return this._sockets.items;
	}

	/**
	 * Function called when a new socket is connected.
	 * @param socket New open socket.
	 */
	private _connection(socket: SocketIO.Socket) {
		let sock = new Socket(socket);

		this._sockets.add = sock;
		this.emit('new', sock);
		Debug.log('new socket connection');
	}
}

// import { SockTypeInterface } from '../socket/socket.interface';
// import { SelectedInterface } from '../pi/pi.interface';
// import Client from '../client/client.class';
// import Pi from '../pi/pi.class';
// import Playlist from '../playlist/playlist.class';
// import Debug from '../tools/debug.class';

// /**
//  * Configure and manage socket.io transaction.
//  */
// export default class IO {
// 	private client: Client = null;
// 	private pis: Pi[] = [];
// 	private playlist: Playlist;

// 	/**
// 	 * @param io An socket.io instance.
// 	 */
// 	constructor(private io) {
// 		io.on('connection', (socket) => {
// 			this.connection(socket);
// 		});
// 	}

// 	/**
// 	 * This function handle a websocket connection.
// 	 * @param socket New socket connected.
// 	 */
// 	private connection(socket) {
// 		socket.emit('whoareyou');
// 		socket.on('iam', (data: SockTypeInterface) => {
// 			if (data.type == "client") {
// 				this.playlist = new Playlist(socket);
// 				this.client = new Client(socket);
// 				this.client.disconnect = (instance) => {
// 					this.clientDisconnect(instance as Client);
// 				};
// 				this.client.playerCommand = (name, command) => {
// 					this.onPlayerCommand(name, command);
// 				};
// 				this.client.select = (selected) => {
// 					this.onSelection(selected);
// 				};
// 				this.client.shutdown = (name) => {
// 					this.onShutdown(name);
// 				};
// 				this.client.reboot = (name) => {
// 					this.onReboot(name);
// 				};
// 				this.pis.forEach((item: Pi) => {
// 					this.piStatusChange(item);
// 					this.onVideosChange(item);
// 				});
// 				Debug.log("cilent connected");
// 			}
// 			else if (data.type == "pi") {
// 				let pi = new Pi(data.name, socket);
				
// 				pi.disconnect = (instance) => {
// 					this.piDisconnect(instance as Pi);
// 				};
// 				pi.statusChange = (instance) => {
// 					this.piStatusChange(instance);
// 				};
// 				pi.videosCallback = (instance) => {
// 					this.onVideosChange(instance);
// 				};
// 				this.pis.push(pi);
// 				Debug.log("pi", pi.name, "connected");
// 			}
// 		});
// 	}

// 	/**
// 	 * Function called when client socket is closed.
// 	 * @param instance Client instance.
// 	 */
// 	private clientDisconnect(instance: Client) {
// 		Debug.log("client disconnect");
// 		delete this.client;
// 		this.client = null;
// 	}

// 	/**
// 	 * Function called when pi socket is closed.
// 	 * @param instance Pi instance.
// 	 */
// 	private piDisconnect(instance: Pi) {
// 		let index = this.pis.indexOf(instance);

// 		Debug.log("pi " + instance.name + " disconnect");
// 		delete this.pis[index];
// 	}

// 	/**
// 	 * Function call when a raspberry pi change his status.
// 	 * @param instance Pi instance called when 
// 	 */
// 	private piStatusChange(instance: Pi) {
// 		Debug.log(instance.name, "change his status");
// 		if (this.client)
// 			this.client.piStatusChange(instance);
// 	}

// 	/**
// 	 * Function called when client received a command.
// 	 * @param name Name of pi or "all"
// 	 * @param command Command to execute on raspberry.
// 	 */
// 	private onPlayerCommand(name: String, command: String) {
// 		Debug.log("client ask", name, "to", command);
// 		if (name == "all")
// 			this.io.emit(command);
// 		else {
// 			for (let pi of this.pis) {
// 				if (pi == undefined) continue ;
// 				if (pi.name == name) {
// 					pi.send(command);
// 					break ;
// 				}
// 			}
// 		}
// 	}

// 	/**
// 	 * Function called when a pi send his list of videos.
// 	 * @param instance Pi instance.
// 	 */
// 	private onVideosChange(instance: Pi) {
// 		if (this.client)
// 			this.client.sendVideos(instance);
// 	}

// 	/**
// 	 * Function call when app select a video for a pi.
// 	 * @param selected Selected pi and videos.
// 	 */
// 	private onSelection(selected: SelectedInterface) {
// 		for (let pi of this.pis) {
// 			if (pi == undefined) continue;
// 			if (pi.name == selected.name) {
// 				pi.sendSelected(selected.video);
// 				break;
// 			}
// 		}
// 	}

// 	private onShutdown(name: String) {
// 		Debug.log("client ask", name, "to shutdown");
// 		if (name == "all")
// 			this.io.emit('shutdown');
// 		else {
// 			for (let pi of this.pis) {
// 				if (pi == undefined) continue ;
// 				if (pi.name == name) {
// 					pi.send('shutdown');
// 					break ;
// 				}
// 			}
// 		}
// 	}

// 	private onReboot(name: String) {
// 		Debug.log("client ask", name, "to reboot");
// 		if (name == "all")
// 			this.io.emit('reboot');
// 		else {
// 			for (let pi of this.pis) {
// 				if (pi == undefined) continue ;
// 				if (pi.name == name) {
// 					pi.send('reboot');
// 					break ;
// 				}
// 			}
// 		}
// 	}
// }
