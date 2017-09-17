import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerCommandInterface } from "./player.interface";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Output() onCommand: EventEmitter<PlayerCommandInterface> = new EventEmitter();

  constructor() { }
  ngOnInit() { }

  /**
   * Simply send corresponding event for parent component.
   */
  play(): void { this.onCommand.emit(PlayerCommandInterface.PLAY); }
  pause(): void { this.onCommand.emit(PlayerCommandInterface.PAUSE); }
  stop(): void { this.onCommand.emit(PlayerCommandInterface.STOP); }
}
