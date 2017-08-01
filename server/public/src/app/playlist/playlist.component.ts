import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
  ngOnInit() { }

  savePlaylist() {
    this.dialog.closeAll();
  }
}
