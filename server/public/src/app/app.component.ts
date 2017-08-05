import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SocketService } from './socket/socket.service';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistInterface } from './playlist/playlist.interface';
import { ProjectorComponent } from './projector/projector.component';
import { ProjectorService } from './projector/projector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Escape Pi';
  playlists: PlaylistInterface[] = [];
  selected: PlaylistInterface;

  constructor(
    private socket: SocketService,
    public dialog: MdDialog,
    private projector: ProjectorService
  ) {
    this.socket.getPlaylists()
    .subscribe((playlists: PlaylistInterface[]) => {
      this.playlists = playlists;
    });
  }

  /**
   * Function send to the player.
   * @param input It's a string with value "play", "pause" or "stop"
   */
  playerCommand(input) {
    if (input == "play") this.socket.play("all");
    if (input == "pause") this.socket.pause("all");
    if (input == "stop") this.socket.stop("all");
  }

  savePlaylist() {
    this.dialog.open(PlaylistComponent);
  }

  selection() {
    if (!this.selected)
      return ;
    for (let projector of this.projector.projectors) {
      for (let video of this.selected.videos) {
        if (projector.name == video.name)
          projector.autoSelect = video.video;
      }
    }
  }
}
