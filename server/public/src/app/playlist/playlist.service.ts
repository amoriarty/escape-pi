import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { PlaylistInterface } from './playlist.interface';

@Injectable()
export class PlaylistService {
  private playlist: PlaylistInterface = {
    name: "",
    videos: []
  }

  constructor(private socket: SocketService) { }

  set name(name: String) {
    this.playlist.name = name;
  }

  setSelected(pi_name: String, selected: String) {
    for (let item of this.playlist.videos) {
      if (item.name == pi_name) {
        item.video = selected;
        return ;
      }
    }
    this.playlist.videos.push({ name: pi_name, video: selected });
  }

  save() {
    if (this.playlist.name == "" || this.playlist.videos.length == 0)
      return ;
    this.socket.sendPlaylist(this.playlist);
  }
}
