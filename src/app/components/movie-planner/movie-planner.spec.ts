import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePlanner } from './movie-planner';

describe('MoviePlanner', () => {
  let component: MoviePlanner;
  let fixture: ComponentFixture<MoviePlanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePlanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePlanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
