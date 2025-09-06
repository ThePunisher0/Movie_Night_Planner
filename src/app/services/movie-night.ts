// src/app/services/movie-night.service.ts
import { Injectable } from '@angular/core';
import { MovieNight } from '../model/interface-movie-night';

@Injectable({
  providedIn: 'root',
})
export class MovieNightService {
  private savedEvents: MovieNight[] = [];
  private storageKey = 'movieNightEvents';

  constructor() {
    this.loadEventsFromStorage();
  }

  getSavedEvents(): MovieNight[] {
    return this.savedEvents;
  }

  saveMovieNight(movieNight: MovieNight): void {
    const newEvent: MovieNight = {
      ...movieNight,
      id: Date.now(),
      date: new Date(movieNight.date),
      movies: [...movieNight.movies],
      attendees: [...movieNight.attendees],
      snacks: [...movieNight.snacks],
    };

    this.savedEvents.push(newEvent);
    this.saveEventsToStorage();
  }

  deleteEvent(eventId: number): void {
    this.savedEvents = this.savedEvents.filter((event) => event.id !== eventId);
    this.saveEventsToStorage();
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

  getEventById(eventId: number): MovieNight | undefined {
    return this.savedEvents.find((event) => event.id === eventId);
  }

  updateEvent(updatedEvent: MovieNight): void {
    const index = this.savedEvents.findIndex((event) => event.id === updatedEvent.id);
    if (index !== -1) {
      this.savedEvents[index] = { ...updatedEvent };
      this.saveEventsToStorage();
    }
  }

  private loadEventsFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.savedEvents = parsed.map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }));
      } catch (error) {
        console.error('Error loading events from storage:', error);
        this.savedEvents = [];
      }
    }
  }

  private saveEventsToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.savedEvents));
    } catch (error) {
      console.error('Error saving events to storage:', error);
    }
  }
}
