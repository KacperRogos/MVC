import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[]=[
    {id:1, name:"Koncert szopina", date: '2025-06-15', totalSeats:100, takenSeats:10},
    {id:2, name:"Koncert Bambi", date: '2025-09-10', totalSeats:100, takenSeats:60},
    {id:3, name:"Koncert Jasia Kapeli", date: '2025-11-2', totalSeats:100, takenSeats:0},
  ];
  private nextId=4;
  getAll(): Event[] {
    return this.events;
  }

  getById(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  add(event: Omit<Event, 'id'>): void {
    this.events.push({ ...event, id: this.nextId++ });
  }

  update(updated: Event): void {
    const index = this.events.findIndex(e => e.id === updated.id);
    if (index !== -1) this.events[index] = updated;
  }

  delete(id: number): void {
    this.events = this.events.filter(e => e.id !== id);
  }

  reserve(id: number): boolean {
    const event = this.getById(id);
    if (!event) return false;
    if (event.takenSeats >= event.totalSeats) return false;
    event.takenSeats++;
    return true;
  }
}
