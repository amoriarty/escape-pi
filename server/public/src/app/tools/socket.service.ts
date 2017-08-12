import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Emitter } from "event-kit";

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
  private _emitter = new Emitter();

  /**
   * Will authenticated itself to server.
   */
  constructor() {
    this._socket.on('playlists', (playlist) => this._emitter.emit('playlists', playlist));
    this._socket.on('status', (status) => this._emitter.emit('status', status));
    this._socket.on('videos', (videos) => this._emitter.emit('videos', videos));
    this._socket.emit('whatareyou', 'angular');
  }

  /**
   * Accessor for other service to emit events via socket.
   */
  public send(event: EventsEnum, ...args: any[]) {
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
      case EventsEnum.PLAYLIST:
        this._socket.emit('playlist', args[0]);
        break ;
      case EventsEnum.REBOOT:
        this._socket.emit('reboot', args[0]);
        break ;
      case EventsEnum.SHUTDOWN:
        this._socket.emit('shutdown', args[0]);
        break ;
      case EventsEnum.SELECT:
        this._socket.emit('select', args[0]);
        break ;
    }
  }

  /**
   * Getter to event emitter.
   */
  public get emitter() {
    return this._emitter;
  }
}
