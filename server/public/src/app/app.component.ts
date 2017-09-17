import { Component, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { PlayerCommandInterface } from './player/player.interface';

import { SocketService } from './tools/socket.service';

import { PlaylistComponent } from './playlist/playlist.component';
import { ProjectorComponent } from './projector/projector.component';
import { PlaylistInterface } from './playlist/playlist.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChildren(ProjectorComponent)
  private _projectors: QueryList<ProjectorComponent>;
  private _subscription: Subscription;
  playlists: PlaylistInterface[] = [];

  constructor(public dialog: MdDialog, private _socket: SocketService) {
  }

  /**
   * Subscribe to server playlists.
   */
  ngOnInit() {
    this._subscription = this._socket.playlists.subscribe((playlists) => this.playlists = playlists);
  }

  /**
   * Unsubscribe to server playlists.
   */
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * To pass a string array to app-selector
   */
  get names() {
    const result = [];

    for (const playlist of this.playlists) {
      result.push(playlist.name);
    }
    return result;
  }

  /**
   * Function send to the player.
   * @param input It's a PlayerCommandInterface with value PLAY, PAUSE or STOP
   */
  player(input: PlayerCommandInterface) {
    this._projectors.forEach((item) => {
      item.playerCommand(input);
    });
  }

  /**
   * Will launch playlist component as popup.
   */
  add() {
    this.dialog.open(PlaylistComponent);
  }

  /**
   * Function call when a selection is done on app-selector.
   * @param name Name of selected playlist
   */
  select(name: string) {
    const playlist = this.playlists.find((item) => item.name === name);

    this._projectors.forEach((projector) => {
      const video = playlist.videos.find((item) => item.name === projector.name);

      projector.select(video.title);
    });
  }

  /**
   * Reboot all pi
   * Since Yharnam as to be reboot after other, we reverse array order.
   */
  reboot() {
    this._projectors.toArray()
      .reverse()
      .forEach((item) => {
        item.status.connected = false;
        item.reboot();
      });
  }

  /**
   * Shutdown all pi
   * Since Yharnam as to be shutdown after other, we reverse array order.
   */
  shutdown() {
    this._projectors.toArray()
      .reverse()
      .forEach((item) => {
        item.status.connected = false;
        item.shutdown();
      });
  }
}
