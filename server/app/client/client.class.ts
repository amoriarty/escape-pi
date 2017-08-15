import * as Events from 'events';
import Debug from '../tools/debug.class';
import Socket from '../socket/socket.class';
import { PlaylistInterface } from '../playlist/playlist.interface';
import {
	ProjectorStatusInterface,
	ProjectorVideosInterface 
} from '../projector/projector.interface';

/**
 * Manage communication with angular client.
 */
export default class Client extends Events.EventEmitter {
	/**
	 * Will listen all events from angular client.
	 * @param _socket Socket connected to angular app.
	 */
	constructor (private _socket: Socket) {
		super();
		this._socket.client = this;
		this._socket.on('disconnect', (name) => this.emit('disconnect'));
		this._socket.on('play', (name) => this.emit('play', name));
		this._socket.on('pause', (name) => this.emit('pause', name));
		this._socket.on('stop', (name) => this.emit('stop', name));
		this._socket.on('shutdown', (name) => this.emit('shutdown', name));
		this._socket.on('reboot', (name) => this.emit('reboot', name));
		this._socket.on('playlist', (playlist) => this.emit('playlist', playlist));
		Debug.log('angular client connected');
	}

	/**
	 * Function to call when send all playlists.
	 * @param playlists Playlists to send to angular client.
	 */
	public set playlists(playlists: PlaylistInterface[]) {
		if (playlists)
			this.emit('playlists', playlists);
	}

	/**
	 * Function to call when status change.
	 */
	public set status(status: ProjectorStatusInterface) {
		if (status)
			this.emit('status', status);
	}

	/**
	 * Function to call to send all videos of a projector.
	 */
	public set videos(videos: ProjectorVideosInterface) {
		if (videos)
			this.emit('videos', videos);
	}
}
