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

  computedColor(): String {
    return (this.on == true) ? "green" : "red";
  }
}
