import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ProjectorStatusInterface, ProjectorVideosInterface } from './projector.interface';
import { SocketService } from '../tools/socket.service';

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

  /**
   * Return an observable with the status of projector.
   * @param name Raspberry pi name
   */
  status(name: String): Observable<ProjectorStatusInterface> {
    let observable = new Observable<ProjectorStatusInterface>(
      (observer: Observer<ProjectorStatusInterface>) => {
        this._socketService.on('status', (status: ProjectorStatusInterface) => {
          if (status.name == name)
            observer.next(status);
        });
      }
    );

    return observable;
  }

  /**
   * Return an observable with all videos reading by the projector.
   * @param name Raspberry pi name.
   */
  videos(name: String): Observable<ProjectorVideosInterface> {
    let observable = new Observable<ProjectorVideosInterface>(
      (observer: Observer<ProjectorVideosInterface>) => {
        this._socketService.on('videos', (videos: ProjectorVideosInterface) => {
          if (videos.name == name)
            observer.next(videos);
        });
      }
    );

    return observable;
  }
}
