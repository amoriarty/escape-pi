import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as io from 'socket.io-client';

import { SockTypeInterface } from './socket.interface';
import { PiStatusInterface, VideosListInterface, SelectedInterface } from '../projector/projector.interface';

@Injectable()
export class SocketService {
  private url = "http://localhost:8080"; // IT'S ANNOYING.
  private socket;

  /**
   * Make websocket connection.
   * It also configure event handling.
   */
  constructor() {
    this.socket = io(this.url);
    this.socket.on('whoareyou', () => { this.whoAreYou(); });
  }

  /**
   * Respond server who are you asking.
   */
  private whoAreYou() {
    let me: SockTypeInterface = {
      type: "client"
    };

    this.socket.emit('iam', me);
  }

  /**
   * This function make from websocket data an observable concerning
   * pis projector status.
   * @param name Name of pi projector.
   */
  getPiStatue(name: String): Observable<PiStatusInterface> {
    let observable = new Observable((observer: Observer<PiStatusInterface>) => {
      this.socket.on('status', (data: PiStatusInterface) => {
        if (data.name == name.toLowerCase())
          observer.next(data);
      });
    });

    return observable;
  }

  getVideos(name: String): Observable<String[]> {
    let observable = new Observable((observer: Observer<String[]>) => {
      this.socket.on('videos', (data: VideosListInterface) => {
        if (data.name == name.toLowerCase())
          observer.next(data.videos);
      });
    });

    return observable;
  }

  sendSelected(name: String, video: String) {
    let selected: SelectedInterface = {
      name: name,
      video: video
    }

    this.socket.emit('selected', selected);
  }

  /**
   * Player command emmiters.
   * @param name Name of pi or "all"
   */
  play(name: String) { this.socket.emit('play', name); }
  pause(name: String) { this.socket.emit('pause', name); }
  stop(name: String) { this.socket.emit('stop', name); }
}
