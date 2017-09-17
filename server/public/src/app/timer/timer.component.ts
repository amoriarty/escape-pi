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
  private _interval;
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
    if (this._running === true) {
      this._running = false;
    } else {
      this._interval = setInterval(() => this.handler(), 1000);
    }
  }

  pause() {
    this._running = true;
  }

  stop() {
    clearInterval(this._interval);
    this._count = this.start_count;
  }

  private handler() {
    if (this._running === true) {
      this._count += 1;
      if (this._count === 0) {
        this.zero.emit();
      }
    }
  }
}
