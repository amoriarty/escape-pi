import { TestBed, inject } from '@angular/core/testing';

import { ProjectorService } from './projector.service';

describe('ProjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectorService]
    });
  });

  it('should be created', inject([ProjectorService], (service: ProjectorService) => {
    expect(service).toBeTruthy();
  }));
});
