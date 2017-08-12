import * as fs from 'fs';
import Debug from '../tools/debug.class';

export default class FileSystem {
	/**
	 * Will get you list of all mkv/mp4 on given path.
	 * @param path Paht where are located videos
	 */
	public static videos(path: String): String[] {
		let videos: String[] = [];
		let fsout: String[];

		try { fsout = fs.readdirSync(path as string); }
		catch (error) {
			Debug.error('Error while making videos list: ' + error);
			return [];
		}
		for (let item of fsout) {
			let ext = item.split('.')[item.split('.').length - 1].toLowerCase();

			if (ext == "mkv" || ext == "mp4")
				videos.push(item);
		}
		return videos;
	}
}
