import * as Events from 'events';
import * as mongodb from 'mongodb';
import Environment from '../tools/environment.class';
import Debug from '../tools/debug.class';
import { PlaylistInterface } from './playlist.interface';

export default class Playlist extends Events.EventEmitter {
	private _collection: mongodb.Collection;
	private _playlists: PlaylistInterface[] = [];

	constructor() {
		super();
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
		return this._playlists;
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
				this.emit('playlists');
				Debug.log('playlist ' + playlist.name + ' succesfully saved');
			}
		});
	}

	public deletePlaylist(playlist: PlaylistInterface) {
		this._collection.deleteOne(playlist, (err) => {
			if (err)
				Debug.error('playlist wasn\'t deleted: ' + err);
			else {
				let swap: PlaylistInterface[] = [];

				for (let item of this._playlists) {
					if (playlist.name != item.name)
						swap.push(item);
				}
				this._playlists = swap;
				console.log('new playlists', this._playlists);
				this.emit('playlists');
				Debug.log('playlist ' + playlist.name + ' succesfully deleted');
			}
		});
	}
}

