// src/app/components/event-summary/event-summary.component.ts (Complete)
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MovieNight } from '../../model/interface-movie-night';
import { Movie } from '../../model/interface-movie';
import { MovieService } from '../../services/movie';
@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss'],
})
export class EventSummaryComponent implements OnInit, OnDestroy {
  @Input() currentEvent!: MovieNight;
  @Output() saveEvent = new EventEmitter<void>();
  @Output() clearAll = new EventEmitter<void>();
  selectedMovies: Movie[] = [];
  totalDuration = 0;
  private subscription?: Subscription;
  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    // Subscribe to selected movies changes
    this.subscription = this.movieService.selectedMovies$.subscribe((movies) => {
      this.selectedMovies = movies;
      this.totalDuration = this.movieService.getTotalDuration();
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onSaveEvent(): void {
    if (this.selectedMovies.length === 0) {
      alert('Please select at least one movie');
      return;
    }
    this.saveEvent.emit();
  }
  onClearAll(): void {
    this.clearAll.emit();
  }
}
