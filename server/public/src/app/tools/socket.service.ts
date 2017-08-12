import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

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
   * Accessor for other service to listen events from socket.
   */
  public get on() {
    return this._socket.on;
  }

  /**
   * Accessor for other service to emit events via socket.
   */
  public get emit() {
    return this._socket.emit;
  }
}
