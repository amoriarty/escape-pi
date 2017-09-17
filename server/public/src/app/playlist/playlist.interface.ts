/**
 * Type video interface where name is the projector name
 * and title the name of video.
 */
export interface VideoInterface {
  name: string;
  title: string;
}


/**
 * Type playlist interface where name is the name of the playlist.
 */
export interface PlaylistInterface {
  name: string;
  videos: VideoInterface[];
}
