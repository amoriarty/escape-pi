import Socket from '../socket/socket.class';

/**
 * Pi class handle Raspberry Pis connection.
 */
export default class Pi extends Socket {
	/**
	 * @param pi_name Name of the raspberry, used as unique identifier.
	 * @param socket Socket connection.
	 * @param disconnect Callback to used at socket disconnection.
	 */
	constructor(private pi_name, socket, disconnect) {
		super(socket, disconnect);
	}

	/**
	 * Getter for pi name.
	 */
	get name() {
		return this.pi_name;
	}
}
