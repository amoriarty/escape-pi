import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { PlaylistInterface, VideoInterface } from './playlist.interface';
import { SocketService, EventsEnum } from '../tools/socket.service';
import { ProjectorComponent } from '../projector/projector.component';

@Injectable()
export class PlaylistService {
  private _projectors: ProjectorComponent[] = [];
  private _selection: PlaylistInterface = {
    name: "",
    videos: []
  }

  constructor(private _socketService: SocketService) { }

  /**
   * Function to save the current selection.
   */
  save() {
    if (this._selection.name == "" || this._selection.videos.length == 0)
      return ;
    this._socketService.emit(EventsEnum.PLAYLIST, this._selection);
  }

  /**
   * Accessor to playlists observable.
   */
  get playlists(): Observable<PlaylistInterface[]> {
    let observable = new Observable((observer: Observer<PlaylistInterface[]>) => {
      this._socketService.on('playlists', (data: PlaylistInterface[]) => {
        observer.next(data);
      });
    });

    return observable;
  }

  /**
   * Accessor for selection name;
   */
  set name(name: String) {
    this._selection.name = name;
  }

  /**
   * Allow projector to modified the current selection.
   * @param video selected video.
   */
  set selected(video: VideoInterface) {
    for (let item of this._selection.videos) {
      if (item.name == video.name) {
        item.title = video.title;
        return ;
      }
    }
    this._selection.videos.push(video);
    this._socketService.emit(EventsEnum.SELECT, video);
  }

  /**
   * Function to call when a playlist is selected.
   */
  set playlist(selected: PlaylistInterface) {
    this._selection = selected;
    for (let projector of this._projectors) {
      for (let video of this._selection.videos) {
        if (projector.name == video.name) {
          projector.select(video.title);
          break ;
        }
      }
    }
  }

  /**
   * Function to call to register projector and make selection.
   */
  set projector(projector: ProjectorComponent) {
    this._projectors.push(projector);
  }
}
