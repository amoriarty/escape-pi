import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketService } from '../socket/socket.service';
import { PiStatusInterface } from './projector.interface';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss']
})
export class ProjectorComponent implements OnInit, OnDestroy {
  @Input() name: String;
  statusSub: Subscription;
  videosSub: Subscription;
  status: PiStatusInterface = null;
  videos: String[] = [];
  selected: String;

  constructor(private socket: SocketService) {
    this.status = {
      name: this.name,
      connected: false,
      playing: false
    };
  }

  /**
   * Will ask for his pi status observable.
   */
  ngOnInit() {
    this.statusSub = this.socket
    .getPiStatue(this.name)
    .subscribe((status: PiStatusInterface) => { this.status = status; });

    this.videosSub = this.socket
    .getVideos(this.name)
    .subscribe((videos: String[]) => { this.videos = videos; });
  }

  /**
   * Unsuscibre from SocketService
   */
  ngOnDestroy() {
    this.statusSub.unsubscribe();
    this.videosSub.unsubscribe();
  }

  /**
   * Function send to the player.
   * @param input It's a string with value "play", "pause" or "stop"
   */
  playerCommand(input) {
    if (input == "play") this.socket.play(this.name.toLowerCase());
    if (input == "pause") this.socket.pause(this.name.toLowerCase());
    if (input == "stop") this.socket.stop(this.name.toLowerCase());
  }

  selection() {
    this.socket.sendSelected(this.name, this.selected);
  }
}
