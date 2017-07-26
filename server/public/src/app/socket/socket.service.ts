import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { SockTypeInterface } from './socket.interface';
import { PiStatusInterface } from '../projector/projector.interface';

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
  getPiStatue(name: String): Observable<{}> {
    let observable = new Observable(observer => {
      this.socket.on('status', (data: PiStatusInterface) => {
        if (data.name == name)
          observer.next(data);
      });
    });

    return observable;
  }
}
