// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../model/interface-movie';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'The Matrix',
      genre: 'Sci-Fi',
      rating: 8.7,
      duration: 136,
      poster: 'images/movies/the-matrix.jpg',
      selected: false,
    },
    {
      id: 2,
      title: 'Inception',
      genre: 'Sci-Fi',
      rating: 8.8,
      duration: 148,
      poster: 'images/movies/inception.jpg',
      selected: false,
    },
    {
      id: 3,
      title: 'The Avengers',
      genre: 'Action',
      rating: 8.0,
      duration: 143,
      poster: 'images/movies/the-avengers.jpg',
      selected: false,
    },
    {
      id: 4,
      title: 'Parasite',
      genre: 'Drama',
      rating: 8.6,
      duration: 132,
      poster: 'images/movies/parasite.jpg',
      selected: false,
    },
    {
      id: 5,
      title: 'Get Out',
      genre: 'Horror',
      rating: 7.7,
      duration: 104,
      poster: 'images/movies/get-out.jpg',
      selected: false,
    },
    {
      id: 6,
      title: 'Superbad',
      genre: 'Comedy',
      rating: 7.6,
      duration: 113,
      poster: 'images/movies/superbad.jpg',
      selected: false,
    },
  ];
  private selectedMoviesSubject = new BehaviorSubject<Movie[]>([]);
  public selectedMovies$ = this.selectedMoviesSubject.asObservable();
  getMovies(): Movie[] {
    return this.movies;
  }
  getGenres(): string[] {
    const genres = [...new Set(this.movies.map((movie) => movie.genre))];
    return genres;
  }
  toggleMovieSelection(movieId: number): void {
    const movie = this.movies.find((m) => m.id === movieId);
    if (movie) {
      movie.selected = !movie.selected;
      this.updateSelectedMovies();
    }
  }
  getSelectedMovies(): Movie[] {
    return this.movies.filter((movie) => movie.selected);
  }
  clearAllSelections(): void {
    this.movies.forEach((movie) => (movie.selected = false));
    this.updateSelectedMovies();
  }
  getTotalDuration(): number {
    return this.getSelectedMovies().reduce((total, movie) => total + movie.duration, 0);
  }
  private updateSelectedMovies(): void {
    this.selectedMoviesSubject.next(this.getSelectedMovies());
  }
}
