import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  @Input() list: String[];
  @Input() placeholder: String;
  @Output() selected = new EventEmitter<String>();

  constructor() { }
  ngOnInit() { }

  /**
   * Function call on selection.
   * @param item Selected item
   */
  selection(item) {
    this.selected.emit(item);
  }
}
