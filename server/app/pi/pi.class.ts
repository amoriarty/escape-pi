export default class Pi {
	/**
	 * @param pi_name Name of the raspberry, used as unique identifier.
	 * @param socket Socket connection.
	 */
	constructor(private pi_name, private socket) {
	}

	/**
	 * Getter for pi name.
	 */
	get name() {
		return this.pi_name;
	}
}
