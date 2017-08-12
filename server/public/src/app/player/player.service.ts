import { Injectable } from '@angular/core';
import { SocketService, EventsEnum } from '../tools/socket.service';

@Injectable()
export class PlayerService {
  constructor(private _socketService: SocketService) { }

  play(name: String) { this._socketService.emit(EventsEnum.PLAY, name); }
  pause(name: String) { this._socketService.emit(EventsEnum.PAUSE, name); }
  stop(name: String) { this._socketService.emit(EventsEnum.STOP, name); }
}
