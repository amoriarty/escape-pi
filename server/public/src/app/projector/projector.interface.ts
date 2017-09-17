/**
 * Type interface of projector status.
 */
export interface ProjectorStatusInterface {
  name: string;
  connected: boolean;
  playing: boolean;
}

/**
 * Type interface for received list of raspberry videos.
 */
export interface ProjectorVideosInterface {
  name: string;
  videos: string[];
}
