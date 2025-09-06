// src/app/components/movie-planner/movie-planner.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieSelectionComponent } from '../movie-selection/movie-selection.component';
// import { EventPlanningComponent } from '../event-planning/event-planning.component';
import { EventSummaryComponent } from '../event-summary/event-summary.component';
import { SavedEventsComponent } from '../saved-events/saved-events.component';
import { MovieNight } from '../../model/interface-movie-night';
import { MovieService } from '../../services/movie';
import { MovieNightService } from '../../services/movie-night';
import { EventPlanningComponent } from "../event-planning/event-planning";

@Component({
  selector: 'app-movie-planner',
  standalone: true,
  imports: [
    CommonModule,
    MovieSelectionComponent,
    // EventPlanningComponent,
    EventSummaryComponent,
    SavedEventsComponent,
    EventPlanningComponent
],
  templateUrl: './movie-planner.html',
  styleUrls: ['./movie-planner.scss']
})
export class MoviePlannerComponent implements OnInit {
  currentEvent!: MovieNight;
  savedEvents: MovieNight[] = [];

  constructor(
    private movieService: MovieService,
    private movieNightService: MovieNightService
  ) {}

  ngOnInit(): void {
    this.currentEvent = this.movieNightService.createEmptyEvent();
    this.savedEvents = this.movieNightService.getSavedEvents();
  }

  onEventChange(event: MovieNight): void {
    this.currentEvent = event;
  }

  onSaveEvent(): void {
    const selectedMovies = this.movieService.getSelectedMovies();
    this.currentEvent.movies = [...selectedMovies];
    
    this.movieNightService.saveMovieNight(this.currentEvent);
    this.savedEvents = this.movieNightService.getSavedEvents();
    this.onClearAll();
    alert('Movie night saved successfully!');
  }

  onDeleteEvent(eventId: number): void {
    this.movieNightService.deleteEvent(eventId);
    this.savedEvents = this.movieNightService.getSavedEvents();
  }

  onClearAll(): void {
    this.movieService.clearAllSelections();
    this.currentEvent = this.movieNightService.createEmptyEvent();
  }
}