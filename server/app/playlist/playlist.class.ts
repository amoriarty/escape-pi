import * as Events from 'events';
import * as mongodb from 'mongodb';
import Environment from '../tools/environment.class';
import Debug from '../tools/debug.class';
import { PlaylistInterface } from './playlist.interface';

export default class Playlist {
	private _collection: mongodb.Collection;
	private _playlists: PlaylistInterface[];

	constructor() {
		new mongodb.MongoClient().connect(Environment.mongodb_url as string, (err, db) => {
			if (!err) {
				Debug.log('mongodb connected')
				this._collection = db.collection('playlist');
				this._collection.find({})
				.toArray((err, result) => this._playlists = result);
			}
			else throw err;
		});
	}

	/**
	 * Accessor for all playlists.
	 */
	public get playlists(): PlaylistInterface[] {
		return this._playlists || null;
	}

	/**
	 * @param playlist Playlist to save.
	 */
	public set playlist(playlist: PlaylistInterface) {
		this._collection.insertOne(playlist, (err, result) => {
			if (err)
				Debug.error('playlist wasn\'t saved: ' + err);
			else {
				this._playlists.push(playlist);
				Debug.log('playlist ' + playlist.name + ' succesfully saved');
			}
		});
	}
}

// export default class Playlist extends Socket {
// 	private playlists: PlaylistInterface[] = [];
// 	private MongoClient = new mongodb.MongoClient();
// 	private collection: mongodb.Collection;

// 	constructor(socket) {
// 		super(socket);
// 		this.MongoClient.connect(Environment.mongodb_url as string, (err, db) => {
// 			if (!err) {
// 				Debug.log("mongodb connected");
// 				this.collection = db.collection('playlist');
// 				this.getDatabasePlaylists();
// 			}
// 			else Debug.error(err);
// 		});
// 		this.socket.on('playlist', (playlist: PlaylistInterface) => {
// 			this.savePlaylist(playlist);
// 		});
// 	}

// 	private savePlaylist(playlist: PlaylistInterface) {
// 		this.collection.insertOne(playlist, (err, result) => {
// 			if (!err) {
// 				Debug.log('playlist saved:', playlist);
// 				this.playlists.push(playlist);
// 				this.emitPlaylists();
// 			}
// 			else Debug.error(err);
// 		});
// 	}

// 	private emitPlaylists() {
// 		this.socket.emit('playlist', this.playlists);
// 	}

// 	private getDatabasePlaylists() {
// 		this.collection.find({}).toArray((err, docs) => {
// 			if (!err) {
// 				this.playlists = docs;
// 				this.emitPlaylists();
// 			}
// 			else Debug.error(err);
// 		});
// 	}
// }
