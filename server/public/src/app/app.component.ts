import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { SocketService } from './socket/socket.service';
import { PlaylistComponent } from './playlist/playlist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Escape Pi';

  constructor(private socket: SocketService, public dialog: MdDialog) {}

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
}
