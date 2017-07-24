import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = "http://localhost:8080"
  private socket;

  constructor() {
    this.socket = io(this.url);
    this.socket.on('whoareyou', () => {
      console.log("whoareyou");
      this.socket.emit('iam', {
        type: 'client'
      });
    });
  }

  getPiStatue(name: String) {
    let observable = new Observable(observer => {
      this.socket.on('pi_status', (data) => {
        console.log("data ", data);
      });
    });

    return observable;
  }
}
