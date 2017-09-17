import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProjectorStatusInterface } from './projector.interface';
import { PlayerCommandInterface } from '../player/player.interface';
import { SocketService } from '../tools/socket.service';
import { PlaylistService } from '../playlist/playlist.service';
import { TimerComponent } from '../timer/timer.component';


@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss'],
})
export class ProjectorComponent implements OnInit, OnDestroy {
  @ViewChild(TimerComponent) private _timer: TimerComponent;
  @Input() name: string;
  private _subscriptions: Subscription[] = [];
  status: ProjectorStatusInterface = {
    name: this.name,
    connected: false,
    playing: false
  };
  videos: string[] = [];
  video: string;

  constructor(private _socket: SocketService, private _playlist: PlaylistService) {}

  /**
   * Subscribe to status and videos.
   */
  ngOnInit() {
    this._subscriptions.push(this._socket.status(this.name)
      .subscribe((status) => this._onStatusChange(status)));
    this._subscriptions.push(this._socket.videos(this.name)
      .subscribe((videos) => this.videos = videos.videos));
  }

  /**
   * Unsubscribe from all subscription
   */
  ngOnDestroy() {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * When timer countdown is zero, launch send videos play signal.
   */
  zero() {
    this._socket.play(this.name);
  }

  /**
   * Received reboot input and ask to projector service.
   */
  reboot() {
    this._socket.reboot(this.name);
  }

  /**
   * Received shutdown input and ask to projector service.
   */
  shutdown() {
    this._socket.shutdown(this.name);
  }

  /**
   * Recieved input from player component.
   * @param input PlayerCommandInterface
   */
  playerCommand(input: PlayerCommandInterface) {
    if (this.status.connected) {
      switch (input) {
        case PlayerCommandInterface.PLAY:
          this._timer.start();
          break;
        case PlayerCommandInterface.PAUSE:
          this._socket.pause(this.name);
          this._timer.pause();
          break;
        case PlayerCommandInterface.STOP:
          this._socket.stop(this.name);
          this._timer.stop();
          break;
      }
    }
  }

  /**
   * Function call by app-selector.
   * @param item Selected video.
   */
  select(item: string) {
    const inter = {
      name: this.name,
      title: item
    };

    this.video = item;
    this._playlist.select = inter;
    this._socket.select(inter);
  }

  /**
   * Assigne status to class.
   * Also stop timer when playing status was set to false by client.
   * @param status
   * @private
   */
  private _onStatusChange(status) {
    this.status = status;
    if (this.status.playing === false && this._timer.running === true) {
      this._timer.stop();
    }
  }
}
