import { Injectable } from '@angular/core';

interface Reservation {
  username: string;
  eventId: number;
  snapshotName: string;
  snapshotDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private storageKey = 'reservations';

  private load(): Reservation[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private save(reservations: Reservation[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(reservations));
  }

  add(username: string, eventId: number, snapshotName: string, snapshotDate: string): void {
    const reservations = this.load();
    reservations.push({ username, eventId, snapshotName, snapshotDate });
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

  getSnapshot(username: string, eventId: number): { name: string; date: string } | null {
    const r = this.load().find(r => r.username === username && r.eventId === eventId);
    return r ? { name: r.snapshotName, date: r.snapshotDate } : null;
  }

  remove(username: string, eventId: number): void {
    const reservations = this.load();
    const index = reservations.findIndex(r => r.username === username && r.eventId === eventId);
    if (index !== -1) reservations.splice(index, 1);
    this.save(reservations);
  }

  acknowledgeChanges(username: string, eventId: number, currentName: string, currentDate: string): void {
  const reservations = this.load();
  reservations
    .filter(r => r.username === username && r.eventId === eventId)
    .forEach(r => {
      r.snapshotName = currentName;
      r.snapshotDate = currentDate;
    });
  this.save(reservations);
}
}