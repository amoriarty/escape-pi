/**
 * Type interface of projector status.
 */
export interface ProjectorStatusInterface {
	name: String,
	connected: Boolean,
	playing: Boolean,
	loaded: Boolean
}

/**
 * Type interface for received list of raspberry videos.
 */
export interface ProjectorVideosInterface {
	name: String,
	videos: String[]
}
