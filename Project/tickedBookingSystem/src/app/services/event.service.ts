import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private storageKey = 'events';

  private defaultEvents: Event[] = [
    { id: 1, name: "Koncert szopina", date: '2026-04-15', totalSeats: 100, takenSeats: 10 },
    { id: 2, name: "Koncert Bambi", date: '2026-09-10', totalSeats: 100, takenSeats: 60 },
    { id: 3, name: "Koncert Jasia Kapeli", date: '2026-11-02', totalSeats: 100, takenSeats: 0 },
  ];

  private load(): Event[] {
    if (typeof window === 'undefined') 
      return this.defaultEvents;

    const data = localStorage.getItem(this.storageKey);

    if (data) 
      return JSON.parse(data);

    this.save(this.defaultEvents);
    return this.defaultEvents;
  }

  private save(events: Event[]): void {
    if (typeof window === 'undefined') 
      return;
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }

  private getNextId(events: Event[]): number {
    return events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
  }

  getAll(): Event[] {
    const events = this.load().filter(e => new Date(e.date) >= new Date());
    this.save(events);
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getById(id: number): Event | undefined {
    return this.load().find(e => e.id === id);
  }

  add(event: Omit<Event, 'id'>): void {
    const events = this.load();
    events.push({ ...event, id: this.getNextId(events) });
    this.save(events);
  }

  update(updated: Event): void {
    const events = this.load();
    const index = events.findIndex(e => e.id === updated.id);
    if (index !== -1) 
      events[index] = updated;

    this.save(events);
  }

  delete(id: number): void {
    this.save(this.load().filter(e => e.id !== id));
  }

  reserve(id: number): boolean {
    const events = this.load();
    const event = events.find(e => e.id === id);
    if (!event) 
      return false;
    if(new Date(event.date)<new Date()) 
      return false;
    if (event.takenSeats >= event.totalSeats) 
      return false;
    
    event.takenSeats++;
    this.save(events);
    return true;
  }
  cancelReservation(id: number): void {
    const events = this.load();
    const event = events.find(e => e.id === id);
    if (event && event.takenSeats > 0) {
      event.takenSeats--;
      this.save(events);
    }
}
}