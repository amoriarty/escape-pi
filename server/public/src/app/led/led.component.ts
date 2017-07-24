import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  @Input() on: Boolean = false;

  constructor() { }
  ngOnInit() { }

  /**
   * Computed function to make led green or light if on is true or false.
   */
  get computedColor(): String {
    return (this.on == true) ? "green" : "red";
  }
}
