// src/app/models/movie.model.ts
export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: number;
  poster: string;
  selected: boolean;
}
