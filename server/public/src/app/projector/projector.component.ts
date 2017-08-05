import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CapitalizePipe } from '../capitalize.pipe';
import { SocketService } from '../socket/socket.service';
import { PlaylistService } from '../playlist/playlist.service';
import { PiStatusInterface } from './projector.interface';
import { ProjectorService } from './projector.service';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss'],
})
export class ProjectorComponent implements OnInit, OnDestroy {
  @Input() name: String;
  statusSub: Subscription;
  videosSub: Subscription;
  status: PiStatusInterface = null;
  videos: String[] = [];
  selected: String;

  constructor(
    private socket: SocketService,
    private playlist: PlaylistService,
    private projector: ProjectorService
  ) {
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
    this.projector.projector = this;

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
    if (input == "play") this.socket.play(this.name);
    if (input == "pause") this.socket.pause(this.name);
    if (input == "stop") this.socket.stop(this.name);
  }

  selection() {
    this.playlist.setSelected(this.name, this.selected);
    this.socket.sendSelected(this.name, this.selected);
  }

  set autoSelect(selected: String) {
    this.selected = selected;
    this.selection();
  }

  shutdown() { this.socket.shutdown(this.name); }
  reboot() { this.socket.reboot(this.name); }
}
