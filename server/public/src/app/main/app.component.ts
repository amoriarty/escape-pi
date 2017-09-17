import { Component, ViewChildren, QueryList } from '@angular/core';
import { MdDialog } from '@angular/material';

import { PlayerCommandInterface } from '../player/player.interface';

import { PlaylistComponent } from '../playlist/playlist.component';
import { ProjectorComponent } from '../projector/projector.component';
import { PlaylistService } from '../playlist/playlist.service';
import { PlaylistInterface } from '../playlist/playlist.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren(ProjectorComponent)
  private _projectors: QueryList<ProjectorComponent>;
  private _playlist: PlaylistInterface;
  playlists: PlaylistInterface[] = [];

  /**
   * Subscribe to server playlists.
   */
  constructor(
    public dialog: MdDialog,
    private _playlistsService: PlaylistService,
  ) {
    this._playlistsService.playlists
    .subscribe((playlists: PlaylistInterface[]) => {
      this.playlists = playlists;
    });
  }

  /**
   * To pass a String array to app-selector
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
  playerCommand(input: PlayerCommandInterface) {
    this._projectors.forEach((item) => {
      item.playerCommand(input);
    });
  }

  /**
   * Will launch playlist component as popup.
   */
  playlistPopup() {
    this.dialog.open(PlaylistComponent);
  }

  /**
   * Function call when a selection is done on app-selector.
   * @param name Name of selected playlist
   */
  select(name: String) {
    for (const playlist of this.playlists) {
      if (playlist.name === name) {
        this._playlist = playlist;
        break ;
      }
    }
    this._playlistsService.playlist = this._playlist;
  }
}
