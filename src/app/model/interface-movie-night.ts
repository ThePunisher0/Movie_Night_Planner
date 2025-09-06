// src/app/models/movie-night.model.ts
import { Movie } from './interface-movie';
export interface MovieNight {
  id: number;
  date: Date;
  movies: Movie[];
  attendees: string[];
  snacks: string[];
  location: string;
}
