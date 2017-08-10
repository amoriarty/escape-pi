import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

import { SockTypeInterface } from './socket.interface';
import { PlaylistInterface } from '../playlist/playlist.interface';
import {
  PiStatusInterface,
  VideosListInterface,
  SelectedInterface
} from '../projector/projector.interface';

@Injectable()
export class SocketService {
  private _socket;

  /**
   * Make websocket connection.
   * It also configure event handling.
   */
  constructor() {
    this._socket = io(environment.socket_url);
    this._socket.emit('whatareyou', 'angular');
  }

  /**
   * This function make from websocket data an observable concerning
   * pis projector status.
   * @param name Name of pi projector.
   */
  getPiStatue(name: String): Observable<PiStatusInterface> {
    let observable = new Observable((observer: Observer<PiStatusInterface>) => {
      this._socket.on('status', (data: PiStatusInterface) => {
        if (data.name == name)
          observer.next(data);
      });
    });

    return observable;
  }

  /**
   * This function make from websocket data an observable concerning
   * pi videos list.
   * @param name Name of pi projector.
   */
  getVideos(name: String): Observable<String[]> {
    let observable = new Observable((observer: Observer<String[]>) => {
      this._socket.on('videos', (data: VideosListInterface) => {
        if (data.name == name)
          observer.next(data.videos);
      });
    });

    return observable;
  }

  getPlaylists(): Observable<PlaylistInterface[]> {
    let observable = new Observable((observer: Observer<PlaylistInterface[]>) => {
      this._socket.on('playlist', (data: PlaylistInterface[]) => {
        observer.next(data);
      });
    });

    return observable;
  }

  /**
   * Function will emit 'selected' events to server.
   * @param name Name of pi.
   * @param video Selected videos.
   */
  sendSelected(name: String, video: String) {
    let selected: SelectedInterface = {
      name: name,
      video: video
    }

    this._socket.emit('selected', selected);
  }

  sendPlaylist(playlist: PlaylistInterface) {
    this._socket.emit('playlist', playlist);
  }

  /**
   * Player command emmiters.
   * @param name Name of pi or "all"
   */
  play(name: String) { this._socket.emit('play', name); }
  pause(name: String) { this._socket.emit('pause', name); }
  stop(name: String) { this._socket.emit('stop', name); }

  /**
   * Power command emitters.
   * @param name Name of pi or "all"
   */
  shutdown(name: String) { this._socket.emit('shutdown', name); }
  reboot(name: String) { this._socket.emit('reboot', name); }
}
