import Socket from '../socket/socket.class';
import Pi from '../pi/pi.class';

/**
 * Client class handle every action concerning interaction with angular application.
 */
export default class Client extends Socket {
	/**
	 * @param socket Instance of socket.io socket of the angular client.
	 */
	constructor(socket) {
		super(socket);
	}

	/**
	 * Function called when the raspberry send a status change.
	 * @param instance Pi instance who change his status.
	 */
	piStatusChange(instance: Pi) {
		this.socket.emit('status', instance.status);
	}
}
