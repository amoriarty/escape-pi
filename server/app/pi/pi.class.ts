export default class Pi {
	/**
	 * @param pi_name Name of the raspberry, used as unique identifier.
	 * @param socket Socket connection.
	 * @param disconnect Callback to used at socket disconnection.
	 */
	constructor(private pi_name, private socket, private disconnection: (pi_name) => void) {
		socket.on('disconnect', (reason) => { this.disconnect(reason); });
	}

	/**
	 * This function will finaly call callback gave in constructor.
	 * @param reason Reason gave by socket.io concerning socket disconnection.
	 */
	private disconnect(reason) {
		this.disconnection(this.name);
	}

	/**
	 * Getter for pi name.
	 */
	get name() {
		return this.pi_name;
	}
}
