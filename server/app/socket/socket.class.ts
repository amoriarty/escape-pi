/**
 * Socket class handle every transaction that as to be done via socket.
 */
export default class Socket {
	/**
	 * @param socket An instance of io from socket.io
	 * @param disconnect Callback that be called at socket disconnection
	 */
	constructor(protected socket, private disconnect: (instance: Socket) => void) {
		socket.on('disconnect', (reason) => { this.disconnect(this); });
	}
}
