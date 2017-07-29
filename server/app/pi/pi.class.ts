import Socket from '../socket/socket.class';
import { PiStatusInterface } from './pi.interface';

/**
 * Pi class handle Raspberry Pis connection.
 */
export default class Pi extends Socket {
	private remote_status: PiStatusInterface = null;
	private callbackChange: (instance: Pi) => void;

	/**
	 * @param pi_name Name of the raspberry, used as unique identifier.
	 * @param socket Socket connection.
	 * @param disconnect Callback to used at socket disconnection.
	 */
	constructor(private pi_name, socket) {
		super(socket);
		this.socket.on('status', (data: PiStatusInterface) => { this.onStatus(data); });
	}

	set disconnect(callback: (instance: Socket) => void) {
		this.callbackDisconnect = callback;
		this.socket.on('disconnect', (reason) => {
			this.status.connected = false;
			this.callbackChange(this);
			this.callbackDisconnect(this);
		});
	}

	/**
	 * Getter for pi name.
	 */
	get name() {
		return this.pi_name;
	}

	/**
	 * Getting status message from raspberry pi.
	 */
	get status(): PiStatusInterface {
		return this.remote_status;
	}

	/**
	 * Setter for status change callback.
	 * @param callback Callback to use when status change.
	 */
	set statusChange(callback: (instance: Pi) => void) {
		this.callbackChange = callback;
	}

	/**
	 * Call when raspberry pi send a change of status.
	 * @param data Data received from raspberry pi.
	 */
	private onStatus(data: PiStatusInterface) {
		this.remote_status = data;
		this.callbackChange(this);
	}

	/**
	 * Emit command via the socket.
	 * @param command Command to emit.
	 */
	send(command: String) { this.socket.emit(command); }
}
