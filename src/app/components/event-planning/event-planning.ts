// src/app/components/event-planning/event-planning.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieNight } from '../../model/interface-movie-night';
@Component({
  selector: 'app-event-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-planning.html',
  styleUrls: ['./event-planning.scss'],
})
export class EventPlanningComponent {
  @Input() currentEvent!: MovieNight;
  @Output() eventChange = new EventEmitter<MovieNight>();
  newAttendee = '';
  newSnack = '';
  onEventChange(): void {
    this.eventChange.emit(this.currentEvent);
  }
  addAttendee(): void {
    if (this.newAttendee.trim()) {
      this.currentEvent.attendees.push(this.newAttendee.trim());
      this.newAttendee = '';
      this.onEventChange();
    }
  }
  removeAttendee(index: number): void {
    this.currentEvent.attendees.splice(index, 1);
    this.onEventChange();
  }
  addSnack(): void {
    if (this.newSnack.trim()) {
      this.currentEvent.snacks.push(this.newSnack.trim());
      this.newSnack = '';
      this.onEventChange();
    }
  }
  removeSnack(index: number): void {
    this.currentEvent.snacks.splice(index, 1);
    this.onEventChange();
  }
}
