import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Output() onCommand: EventEmitter<String> = new EventEmitter();

  constructor() { }
  ngOnInit() { }

  play(): void { this.onCommand.emit("play"); }
  pause(): void { this.onCommand.emit("pause"); }
  stop(): void { this.onCommand.emit("stop"); }
}
