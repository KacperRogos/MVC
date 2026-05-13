import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-my-reservations',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css',
})
export class MyReservations implements OnInit {
  events: Event[] = [];

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getLoggedUser();
    if (username) {
      const ids = this.reservationService.getByUser(username);
      this.events = ids
        .map(id => this.eventService.getById(id))
        .filter(e => e !== undefined) as Event[];
    }
  }

  cancel(eventId: number): void {
    const username = this.authService.getLoggedUser();
    if (username) {
      const count = this.reservationService.getCountByUser(username, eventId);
      for (let i = 0; i < count; i++) {
        this.reservationService.remove(username, eventId);
        this.eventService.cancelReservation(eventId);
      }
      this.events = this.events.filter(e => e.id !== eventId);
    }
  }
  getCount(eventId: number): number {
    const username = this.authService.getLoggedUser();
    if (!username) 
      return 0;
      return this.reservationService.getCountByUser(username, eventId);
  }
}