import { Injectable } from '@angular/core';
import { SocketService } from '../tools/socket.service';
// import { ProjectorComponent } from './projector.component';

@Injectable()
export class ProjectorService {
  constructor(private _socketService: SocketService) {}

  /**
   * Send via socket shutdown command for a pi.
   * @param name Name of raspberry to shutdown.
   */
  shutdown(name: String) { this._socketService.emit('shutdown', name); }

  /**
   * Send via socket reboot command for a pi.
   * @param name Send via
   */
  reboot(name: String) { this._socketService.emit('reboot', name); }

  // private projectorsArray: ProjectorComponent[] = [];

  // constructor() { }

  // set projector(instance: ProjectorComponent) {
  //   this.projectorsArray.push(instance);
  // }

  // get projectors(): ProjectorComponent[] {
  //   return this.projectorsArray;
  // }
}
