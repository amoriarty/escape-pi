import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.scss']
})
export class ProjectorComponent implements OnInit {
  @Input() name: String;

  constructor() { }
  ngOnInit() { }
}
