import { TestBed } from '@angular/core/testing';

import { MovieNight } from './movie-night';

describe('MovieNight', () => {
  let service: MovieNight;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieNight);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
