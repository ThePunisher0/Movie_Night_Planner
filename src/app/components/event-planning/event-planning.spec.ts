import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanning } from './event-planning';

describe('EventPlanning', () => {
  let component: EventPlanning;
  let fixture: ComponentFixture<EventPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
