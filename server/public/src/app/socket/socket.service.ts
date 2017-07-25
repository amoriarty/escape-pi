import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { PiStatusInterface } from './socket.interface';

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
    this.socket.on('whoareyou', () => this.whoAreYou());
  }

  /**
   * Respond server who are you asking.
   */
  private whoAreYou() {
    this.socket.emit('iam', {
      type: 'client'
    });
  }

  /**
   * This function make from websocket data an observable concerning
   * pis projector status.
   * @param name Name of pi projector.
   */
  getPiStatue(name: String): Observable<{}> {
    let observable = new Observable(observer => {
      this.socket.on(name, (data: PiStatusInterface) => {
        console.log(name, data); // DEBUG PLEASE DELETE ME
        observer.next(data);
      });
    });

    return observable;
  }
}
