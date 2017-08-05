import Socket from '../socket/socket.class';
import Pi from '../pi/pi.class';
import { VideosListInterface, SelectedInterface } from '../pi/pi.interface';

/**
 * Client class handle every action concerning interaction with angular application.
 */
export default class Client extends Socket {
	private playerCallback: (name: String, command: String) => void;
	private selectCallback: (selected: SelectedInterface) => void;
	private rebootCallback: (name: String) => void;
	private shutdownCallback: (name: String) => void;

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
	 * Setter for selected callback.
	 * Call when app select a file for raspberry pi.
	 * @param selectCallback function to call when event is received.
	 */
	set select(selectCallback: (selected: SelectedInterface) => void) {
		this.selectCallback = selectCallback;
		this.socket.on('selected', (selected: SelectedInterface) => {
			this.selectCallback(selected);
		});
	}

	set reboot(rebootCallback: (name: String) => void) {
		this.rebootCallback = rebootCallback;
		this.socket.on('reboot', (name: String) => {
			this.rebootCallback(name);
		});
	}

	set shutdown(shutdownCallback: (name: String) => void) {
		this.shutdownCallback = shutdownCallback;
		this.socket.on('shutdown', (name: String) => {
			this.shutdownCallback(name);
		});
	}

	/**
	 * Send list of videos for a pi to app.
	 * @param instance Instance of pi which send his list of videos.
	 */
	sendVideos(instance: Pi) {
		let res: VideosListInterface = {
			name: instance.name,
			videos: instance.videos
		};

		this.socket.emit('videos', res);
	}

	/**
	 * Function called when the raspberry send a status change.
	 * @param instance Pi instance who change his status.
	 */
	piStatusChange(instance: Pi) {
		this.socket.emit('status', instance.status);
	}
}
