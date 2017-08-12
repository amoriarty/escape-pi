import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ProjectorStatusInterface, ProjectorVideosInterface } from './projector.interface';
import { SocketService, EventsEnum } from '../tools/socket.service';

@Injectable()
export class ProjectorService {
  constructor(private _socketService: SocketService) {}

  /**
   * Send via socket shutdown command for a pi.
   * @param name Name of raspberry to shutdown.
   */
  shutdown(name: String) {
    this._socketService.send(EventsEnum.SHUTDOWN, name);
  }

  /**
   * Send via socket reboot command for a pi.
   * @param name Send via socket.
   */
  reboot(name: String) {
    this._socketService.send(EventsEnum.REBOOT, name);
  }

  /**
   * Return an observable with the status of projector.
   * @param name Raspberry pi name
   */
  status(name: String): Observable<ProjectorStatusInterface> {
    let observable = new Observable<ProjectorStatusInterface>(
      (observer: Observer<ProjectorStatusInterface>) => {
        this._socketService.emitter.on('status', (status: ProjectorStatusInterface) => {
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
        this._socketService.emitter.on('videos', (videos: ProjectorVideosInterface) => {
          if (videos.name == name)
            observer.next(videos);
        });
      }
    );

    return observable;
  }
}
