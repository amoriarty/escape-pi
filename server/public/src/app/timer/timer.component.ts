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
  private _pause = false;

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

  start() {
    if (this._pause === true) {
      this._pause = false;
      return ;
    }
    this._interval = setInterval(() => {
      if (this._pause === false) {
        this._count += 1;
        if (this._count === 0) {
          this.zero.emit();
        }
      }
    }, 1000);
  }

  pause() {
    this._pause = true;
  }

  stop() {
    clearInterval(this._interval);
    this._count = this.start_count;
  }

}
