/**
 * Response interface from sever concerning Pi status.
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
