import { Component } from '@angular/core';
import { SocketService } from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Escape Pi';

  constructor(private socket: SocketService) {}

  /**
   * Function send to the player.
   * @param input It's a string with value "play", "pause" or "stop"
   */
  playerCommand(input) {
    if (input == "play") this.socket.play("all");
    if (input == "pause") this.socket.pause("all");
    if (input == "stop") this.socket.stop("all");
  }
}
