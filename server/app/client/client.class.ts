import Socket from '../socket/socket.class';
import Pi from '../pi/pi.class';

/**
 * Client class handle every action concerning interaction with angular application.
 */
export default class Client extends Socket {
	playerCallback: (name: String, command: String) => void;

	/**
	 * @param socket Instance of socket.io socket of the angular client.
	 */
	constructor(socket) {
		super(socket);
	}

	/**
	 * Set callback function of player comamnd.
	 * Event won't be listening if that function isn't set.
	 * @param playerCallback Function to launch when event is received.
	 */
	set playerCommand(playerCallback: (name: String, command: String) => void) {
		this.playerCallback = playerCallback;
		this.socket.on('play', (name: String) => { this.playerCallback(name, 'play') });
		this.socket.on('pause', (name: String) => { this.playerCallback(name, 'pause') });
		this.socket.on('stop', (name: String) => { this.playerCallback(name, 'stop') });
	}

	/**
	 * Function called when the raspberry send a status change.
	 * @param instance Pi instance who change his status.
	 */
	piStatusChange(instance: Pi) {
		this.socket.emit('status', instance.status);
	}
}
