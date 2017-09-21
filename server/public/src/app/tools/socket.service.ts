import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { PlaylistInterface, VideoInterface } from '../playlist/playlist.interface';
import { ProjectorStatusInterface, ProjectorVideosInterface } from "../projector/projector.interface";

@Injectable()
export class SocketService {
  private _socket = io(environment.socket_url);

  /**
   * Will authenticated itself to server.
   */
  constructor() {
    this._socket.emit('whatareyou', 'angular');
  }

  /**
   * Observable of playlists.
   * @returns {Observable<PlaylistInterface>}
   */
  get playlists(): Observable<PlaylistInterface[]> {
    return new Observable<PlaylistInterface[]>((observer) => {
      this._socket.on('playlists', (playlists: PlaylistInterface[]) => {
        observer.next(playlists);
      });
    });
  }

  status(name: string): Observable<ProjectorStatusInterface> {
    return new Observable<ProjectorStatusInterface>((observer) => {
      this._socket.on('status', (status: ProjectorStatusInterface) => {
        if (status.name === name) {
          observer.next(status);
        }
      });
    });
  }

  videos(name: string): Observable<ProjectorVideosInterface> {
    return new Observable<ProjectorVideosInterface>((observer) => {
      this._socket.on('videos', (videos: ProjectorVideosInterface) => {
        if (videos.name === name) {
          observer.next(videos);
        }
      });
    });
  }

  play(name: string) {
    this._socket.emit('play', name);
  }

  pause(name: string) {
    this._socket.emit('pause', name);
  }

  stop(name: string) {
    this._socket.emit('stop', name);
  }

  select(video: VideoInterface) {
    this._socket.emit('select', video);
  }

  playlist(playlist: PlaylistInterface) {
    this._socket.emit('playlist', playlist);
  }

  remove(playlist: PlaylistInterface) {
    this._socket.emit('delete', playlist);
  }

  reboot(name: string) {
    this._socket.emit('reboot', name);
  }

  shutdown(name: string) {
    this._socket.emit('shutdown', name);
  }
}
