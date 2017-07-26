/**
 * Socket class handle every transaction that as to be done via socket.
 */
export default class Socket {
	protected callbackDisconnect: (instance: Socket) => void;

	/**
	 * @param socket An instance of io from socket.io
	 */
	constructor(protected socket) { }

	/**
	 * Setter for disconnect callback.
	 */
	set disconnect(callback: (instance: Socket) => void) {
		this.callbackDisconnect = callback;
		this.socket.on('disconnect', (reason) => { this.callbackDisconnect(this); });
	}
}
