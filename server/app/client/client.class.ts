/**
 * Client class handle every action concerning interaction with angular application.
 */
export default class Client {
	
	/**
	 * @param socket Instance of socket.io socket of the angular client.
	 */
	constructor(private socket) {
		// Example:
		// this.socket.on('something', this.doSomething);
	}
}
