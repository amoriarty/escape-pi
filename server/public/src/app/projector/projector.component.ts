import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketService } from '../socket/socket.service';
import { PiStatusInterface } from './projector.interface';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss']
})
export class ProjectorComponent implements OnInit, OnDestroy {
  @Input() name: String;
  subscription: Subscription;
  status: PiStatusInterface = null;

  constructor(private socketService: SocketService) {
    this.status = {
      name: this.name,
      connected: false,
      playing: false
    };
  }

  /**
   * Will ask for his pi status observable.
   */
  ngOnInit() {
    this.subscription = this.socketService
    .getPiStatue(this.name)
    .subscribe((status: PiStatusInterface) => { this.status = status; });
  }

  /**
   * Unsuscibre from SocketService
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
