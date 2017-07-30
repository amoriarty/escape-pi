/**
 * Type responses awaiting by the angular client.
 * It have the same interface in his code.
 */
export interface PiStatusInterface {
	name: String,
	connected: Boolean,
	playing: Boolean
}

export interface VideosListInterface {
	name: String,
	videos: String[]
}

export interface SelectedInterface {
	name: String,
	video: String
}
