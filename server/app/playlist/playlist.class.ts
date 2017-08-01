import Socket from '../socket/socket.class';
import { PlaylistInterface } from './playlist.interface';

export default class Playlist extends Socket {
	private callback: (name: String) => void;
	private playlists: Playlist[] = [];

	constructor(socket) {
		super(socket);
		this.socket.emit('playlist', this.playlists);
		this.socket.on('playlist', (playlist: Playlist) => { this.savePlaylist(playlist); });
	}

	private savePlaylist(playlist: Playlist) {
		console.log(playlist);
	}

	set read(callback) {
		this.callback = callback;
	}
}
