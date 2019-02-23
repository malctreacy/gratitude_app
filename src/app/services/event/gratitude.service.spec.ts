import { TestBed } from '@angular/core/testing';

import { GratitudeService } from './gratitude.service';

describe('GratitudeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GratitudeService = TestBed.get(GratitudeService);
    expect(service).toBeTruthy();
  });
});
