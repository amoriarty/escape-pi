/**
 * Type video interface where name is the projector name
 * and title the name of video.
 */
export interface VideoInterface {
	name: String,
	title: String
}


/**
 * Type playlist interface where name is the name of the playlist.
 */
export interface PlaylistInterface {
	name: String,
	videos: VideoInterface[]
}
