// src/app/features/dashboard/dashboard.component.ts (Complete)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieNight } from '../../../model/interface-movie-night';
import { MovieNightService } from '../../../services/movie-night';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  savedEvents: MovieNight[] = [];
  totalMovieNights = 0;
  totalMoviesWatched = 0;
  totalHoursWatched = 0;
  constructor(private movieNightService: MovieNightService) {}
  ngOnInit(): void {
    this.loadDashboardData();
  }
  private loadDashboardData(): void {
    this.savedEvents = this.movieNightService.getSavedEvents();
    this.totalMovieNights = this.savedEvents.length;
    this.totalMoviesWatched = this.savedEvents.reduce(
      (total, event) => total + event.movies.length,
      0
    );
    this.totalHoursWatched = Math.round(
      this.savedEvents.reduce(
        (total, event) =>
          total + event.movies.reduce((movieTotal, movie) => movieTotal + movie.duration, 0),
        0
      ) / 60
    );
  }
}
