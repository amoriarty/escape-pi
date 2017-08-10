// import * as mongodb from 'mongodb';
// import Environment from '../tools/environment.class';
// import Debug from '../tools/debug.class';
// import Socket from '../socket/socket.class';
// import { PlaylistInterface } from './playlist.interface';

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
