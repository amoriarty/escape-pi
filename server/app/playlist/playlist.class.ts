import * as mongodb from 'mongodb';

import Socket from '../socket/socket.class';
import { PlaylistInterface } from './playlist.interface';

export default class Playlist extends Socket {
	private playlists: PlaylistInterface[] = [];
	private MongoClient = new mongodb.MongoClient();
	private collection: mongodb.Collection;

	constructor(socket) {
		super(socket);
		this.MongoClient.connect(process.env.MONGODB_URL, (err, db) => {
			if (process.env.NODE_ENV == "development" && err)
				console.error(err);
			if (process.env.NODE_ENV == "development")
				console.log("mongodb connected");
			this.collection = db.collection('playlist');
			this.getDatabasePlaylists();
		});
		this.socket.on('playlist', (playlist: PlaylistInterface) => {
			this.savePlaylist(playlist);
		});
	}

	private savePlaylist(playlist: PlaylistInterface) {
		this.collection.insertOne(playlist, (err, result) => {
			if (process.env.NODE_ENV == "development") {
				if (err) console.error(err);
				else console.log("playlist saved:", playlist);
			}
			if (!err) {
				this.playlists.push(playlist);
				this.emitPlaylists();
			}
		});
	}

	private emitPlaylists() {
		this.socket.emit('playlist', this.playlists);
	}

	private getDatabasePlaylists() {
		this.collection.find({}).toArray((err, docs) => {
			if (process.env.NODE_ENV == "development" && err)
				console.log(err);
			this.playlists = docs;
			this.emitPlaylists();
		});
	}
}
