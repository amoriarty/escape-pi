import Socket from '../socket/socket.class';

/**
 * Client class handle every action concerning interaction with angular application.
 */
export default class Client extends Socket {
	
	/**
	 * @param socket Instance of socket.io socket of the angular client.
	 */
	constructor(socket, disconnect) {
		super(socket, disconnect);
	}
}
