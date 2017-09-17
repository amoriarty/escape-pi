import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() start_count: number = -10;
  @Output() zero = new EventEmitter<null>();
  private _count: number;
  private _interval = null;
  private _running = false;

  constructor() {}

  ngOnInit() {
    this._count = this.start_count;
  }

  ngOnDestroy() {
    this.stop();
  }

  get count() {
    return this._count;
  }

  get running() {
    return this._running;
  }

  start() {
    if (this._interval != null && this._running === false) {
      this._running = true;
      if (this._count >= 0) {
        this.zero.emit();
      }
    } else if (this._interval === null) {
      this._running = true;
      this._interval = setInterval(() => {
        if (this._running === true) {
          this._count += 1;
          if (this._count === 0) {
            this.zero.emit();
          }
        }
      }, 1000);
    }
  }

  pause() {
    this._running = false;
  }

  stop() {
    clearInterval(this._interval);
    this._interval = null;
    this._count = this.start_count;
  }
}
