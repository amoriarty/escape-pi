import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { PlaylistComponent } from '../playlist/playlist.component';
import { PlaylistService } from '../playlist/playlist.service';
import { PlaylistInterface } from '../playlist/playlist.interface';
import { PlayerService } from '../player/player.service';
import { PlayerCommand } from '../player/player.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Escape Pi';
  playlist: PlaylistInterface;
  playlists: PlaylistInterface[] = [];

  /**
   * Subscribe to server playlists.
   */
  constructor(
    public dialog: MdDialog,
    private _playlistsService: PlaylistService,
    private _playerService: PlayerService
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
    let result = [];

    for (let playlist of this.playlists)
      result.push(playlist.name);
    return result;
  }

  /**
   * Function send to the player.
   * @param input It's a PlayerCommand with value PLAY, PAUSE or STOP
   */
  playerCommand(input: PlayerCommand) {
    switch (input) {
      case PlayerCommand.PLAY:
        this._playerService.play('all');
        break ;
      case PlayerCommand.PAUSE:
        this._playerService.pause('all');
        break ;
      case PlayerCommand.STOP:
        this._playerService.stop('all');
        break ;
    }
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
    for (let playlist of this.playlists) {
      if (playlist.name == name) {
        this.playlist = playlist;
        break ;
      }
    }
  }
}
