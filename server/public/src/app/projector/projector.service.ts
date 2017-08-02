import { Injectable } from '@angular/core';
import { ProjectorComponent } from './projector.component';

@Injectable()
export class ProjectorService {
  private projectorsArray: ProjectorComponent[] = [];

  constructor() { }

  set projector(instance: ProjectorComponent) {
    this.projectorsArray.push(instance);
  }

  get projectors(): ProjectorComponent[] {
    return this.projectorsArray;
  }
}
