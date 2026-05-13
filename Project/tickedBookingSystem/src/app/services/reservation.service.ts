import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private storageKey = 'reservations';

  private load(): { username: string; eventId: number }[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private save(reservations: { username: string; eventId: number }[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(reservations));
  }

  add(username: string, eventId: number): void {
    const reservations = this.load();
    reservations.push({ username, eventId });
    this.save(reservations);
  }

  getByUser(username: string): number[] {
  const ids = this.load()
    .filter(r => r.username === username)
    .map(r => r.eventId);
    return [...new Set(ids)];
  }
  getCountByUser(username: string, eventId: number): number {
  return this.load().filter(r => r.username === username && r.eventId === eventId).length;
}

  remove(username: string, eventId: number): void {
  const reservations = this.load();
  const index = reservations.findIndex(r => r.username === username && r.eventId === eventId);
  if (index !== -1) reservations.splice(index, 1);
  this.save(reservations);
}
}