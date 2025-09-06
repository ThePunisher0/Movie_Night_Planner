// src/app/services/movie-night.service.ts
import { Injectable } from '@angular/core';
import { MovieNight } from '../model/interface-movie-night';
@Injectable({
  providedIn: 'root',
})
export class MovieNightService {
  private savedEvents: MovieNight[] = [];
  getSavedEvents(): MovieNight[] {
    return this.savedEvents;
  }
  saveMovieNight(movieNight: MovieNight): void {
    const newEvent: MovieNight = {
      ...movieNight,
      id: Date.now(),
      date: new Date(movieNight.date),
    };
    this.savedEvents.push(newEvent);
  }
  deleteEvent(eventId: number): void {
    this.savedEvents = this.savedEvents.filter((event) => event.id !== eventId);
  }
  createEmptyEvent(): MovieNight {
    return {
      id: 0,
      date: new Date(),
      movies: [],
      attendees: [],
      snacks: [],
      location: '',
    };
  }
}
