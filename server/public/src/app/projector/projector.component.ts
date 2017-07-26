import { Component, OnInit, Input } from '@angular/core';

import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss']
})
export class ProjectorComponent implements OnInit {
  @Input() name: String;
  connection;
  status;

  constructor(private socketService: SocketService) { }

  /**
   * Will ask for his pi status observable.
   */
  ngOnInit() {
    this.connection = this.socketService.getPiStatue(this.name).subscribe((status) => {
      this.status = status;
    });
  }
}
