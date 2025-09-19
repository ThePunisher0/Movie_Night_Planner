// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieNight } from './model/interface-movie-night';
import { MovieService } from './services/movie';
import { MovieNightService } from './services/movie-night';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavigationComponent,
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  currentEvent!: MovieNight;
  savedEvents: MovieNight[] = [];

  constructor(private movieService: MovieService, private movieNightService: MovieNightService) {}

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
