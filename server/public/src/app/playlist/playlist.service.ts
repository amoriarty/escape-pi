import { Injectable } from '@angular/core';

import { PlaylistInterface, VideoInterface } from './playlist.interface';

import { SocketService } from '../tools/socket.service';

@Injectable()
export class PlaylistService {
  private _selection: PlaylistInterface = {
    name: '',
    videos: []
  };

  constructor(private _socket: SocketService) { }

  /**
   * Function to save the current selection.
   */
  save() {
    this._socket.playlist(this._selection);
  }

  /**
   * Accessor for selection name;
   */
  set name(name: string) {
    this._selection.name = name;
  }

  /**
   * Allow projector to modified the current selection.
   * @param video selected video.
   */
  set select(video: VideoInterface) {
    const x = this._selection.videos.find((item) => item.name === video.name);
    if (x) {
      x.title = video.title;
    } else {
      this._selection.videos.push(video);
    }
  }
}
