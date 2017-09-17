import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ProjectorService } from './projector.service';
import { ProjectorStatusInterface } from './projector.interface';
import { PlaylistService } from '../playlist/playlist.service';
import { PlayerCommand } from '../player/player.interface';
import { PlayerService } from '../player/player.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss'],
})
export class ProjectorComponent implements OnInit {
  @ViewChild(TimerComponent) private _timer: TimerComponent;
  @Input() name: String;
  status: ProjectorStatusInterface = {
    name: this.name,
    connected: false,
    playing: false
  };
  videos: String[] = [];
  video: String;
  private _paused = true;

  constructor(private _playerService: PlayerService,
              private _projectorService: ProjectorService,
              private _playlistService: PlaylistService) {}

  /**
   * Subscribe to status and videos.
   */
  ngOnInit() {
    this._playlistService.projector = this;
    this._projectorService.status(this.name)
    .subscribe((status) => this._onStatusChange(status));
    this._projectorService.videos(this.name)
    .subscribe((videos) => this.videos = videos.videos);
  }

  private _onStatusChange(status) {
    this.status = status;
    if (this.status.playing === false && this._paused === false) {
      this._timer.stop();
    }
  }

  timerZero() {
    this._playerService.play(this.name);
  }

  /**
   * Received reboot input and ask to projector service.
   */
  reboot() {
    this._projectorService.reboot(this.name);
  }

  /**
   * Received shutdown input and ask to projector service.
   */
  shutdown() {
    this._projectorService.shutdown(this.name);
  }

  /**
   * Recieved input from player component.
   * @param input PlayerCommand
   */
  playerCommand(input: PlayerCommand) {
    switch (input) {
      case PlayerCommand.PLAY:
        this._timer.start();
        this._paused = false;
        // this._playerService.play(this.name);
        break;
      case PlayerCommand.PAUSE:
        this._playerService.pause(this.name);
        this._paused = true;
        this._timer.pause();
        break;
      case PlayerCommand.STOP:
        this._playerService.stop(this.name);
        this._paused = false;
        this._timer.stop();
        break;
    }
  }

  /**
   * Function call by app-selector.
   * @param item Selected video.
   */
  select(item: String) {
    this.video = item;
    this._playlistService.selected = {
      name: this.name,
      title: this.video
    };
  }
}
