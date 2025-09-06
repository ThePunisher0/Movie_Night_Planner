// src/app/components/movie-selection/movie-selection.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { Movie } from '../../model/interface-movie';

@Component({
  selector: 'app-movie-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.scss'],
})
export class MovieSelectionComponent implements OnInit {
  searchTerm = '';
  selectedGenre = '';
  movies: Movie[] = [];
  genres: string[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.genres = this.movieService.getGenres();
  }

  get filteredMovies(): Movie[] {
    return this.movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGenre = !this.selectedGenre || movie.genre === this.selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }

  toggleMovieSelection(movie: Movie): void {
    this.movieService.toggleMovieSelection(movie.id);
  }

  onImageError(event: any, movie: Movie): void {
    event.target.src = 'images/movies/default-poster.jpg';

    event.target.onerror = () => {
      event.target.src = `https://via.placeholder.com/200x300/333333/FFFFFF?text=${encodeURIComponent(
        movie.title
      )}`;
    };
  }
}
