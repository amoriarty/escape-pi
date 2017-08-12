import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerCommand } from "./player.interface";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Output() onCommand: EventEmitter<PlayerCommand> = new EventEmitter();

  constructor() { }
  ngOnInit() { }

  /**
   * Simply send corresponding event for parent component.
   */
  play(): void { this.onCommand.emit(PlayerCommand.PLAY); }
  pause(): void { this.onCommand.emit(PlayerCommand.PAUSE); }
  stop(): void { this.onCommand.emit(PlayerCommand.STOP); }
}
