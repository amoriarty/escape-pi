import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

export enum EventsEnum {
  PLAY,
  PAUSE,
  STOP,
  PLAYLIST,
  SELECT,
  SHUTDOWN,
  REBOOT
}

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
  public emit(event: EventsEnum, ...args: any[]) {
    switch (event) {
      case EventsEnum.PLAY:
        this._socket.emit('play', args[0]);
        break ;
      case EventsEnum.PAUSE:
        this._socket.emit('pause', args[0]);
        break ;
      case EventsEnum.STOP:
        this._socket.emit('stop', args[0]);
        break ;
    }
  }
}
