// src/app/components/saved-events/saved-events.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieNight } from '../../model/interface-movie-night';
@Component({
  selector: 'app-saved-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.scss'],
})
export class SavedEventsComponent {
  @Input() savedEvents: MovieNight[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  onDeleteEvent(eventId: number): void {
    this.deleteEvent.emit(eventId);
  }
}
