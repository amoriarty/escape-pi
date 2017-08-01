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

  constructor(public dialog: MdDialog, private playlist: PlaylistService) { }
  ngOnInit() { }

  savePlaylist() {
    if (this.name == "")
      return ;
    this.playlist.name = this.name;
    this.playlist.save();
    this.dialog.closeAll();
  }
}
