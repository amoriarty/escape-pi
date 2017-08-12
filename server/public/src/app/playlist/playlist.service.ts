import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SocketService } from '../tools/socket.service';
import { PlaylistInterface } from './playlist.interface';

@Injectable()
export class PlaylistService {
  private _selection: PlaylistInterface = {
    name: "",
    videos: []
  }

  constructor(private _socket: SocketService) { }

  /**
   * Function to save the current selection.
   */
  public save() {
    if (this._selection.name == "" || this._selection.videos.length == 0)
      return ;
    this._socket.emit('playlist', this._selection);
  }

  /**
   * Accessor for selection name;
   */
  public set name(name: String) {
    this._selection.name = name;
  }

  /**
   * Accessor to playlists observable.
   */
  public get playlists(): Observable<PlaylistInterface[]> {
    let observable = new Observable((observer: Observer<PlaylistInterface[]>) => {
      this._socket.on('playlist', (data: PlaylistInterface[]) => {
        observer.next(data);
      });
    });

    return observable;
  }

  setSelected(pi_name: String, selected: String) {
    for (let item of this._selection.videos) {
      if (item.name == pi_name) {
        item.video = selected;
        return ;
      }
    }
    this._selection.videos.push({ name: pi_name, video: selected });
  }
}
