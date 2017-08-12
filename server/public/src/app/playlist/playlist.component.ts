import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { PlaylistService } from './playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  name = "";

  constructor(public dialog: MdDialog, private _playlistService: PlaylistService) { }
  ngOnInit() { }

  /**
   * Ask service to save the current selection as a playlist.
   */
  save() {
    if (this.name == "")
      return ;
    this._playlistService.name = this.name;
    this._playlistService.save();
    this.dialog.closeAll();
  }
}
