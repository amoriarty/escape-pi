import * as fs from 'fs';

export default class FileSystem {
	constructor(private path: String) { }

	get videos(): String[] {
		let videos: String[] = [];
		let fsout = fs.readdirSync(this.path as string);

		for (let item of fsout) {
			let ext = item.split('.')[item.split('.').length - 1].toLowerCase();

			if (ext == "mkv" || ext == "mp4")
				videos.push(item);
		}
		return videos;
	}
}
