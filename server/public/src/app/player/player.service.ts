import { Injectable } from '@angular/core';
import { SocketService } from '../tools/socket.service';

@Injectable()
export class PlayerService {
  constructor(private _socketService: SocketService) { }

  play(name: String) { this._socketService.emit('play', name); }
  pause(name: String) { this._socketService.emit('pause', name); }
  stop(name: String) { this._socketService.emit('stop', name); }
}
