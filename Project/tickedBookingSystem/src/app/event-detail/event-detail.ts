import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  event: Event | undefined;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.eventService.getById(id);
  }

  reserve(): void {
    if (this.event) {
      const username = this.authService.getLoggedUser();
      if (!username) {
        this.message = 'Musisz być zalogowany aby zarezerwować bilet!';
        return;
      }
      const success = this.eventService.reserve(this.event.id);
      if (success) {
        this.reservationService.add(username, this.event.id);
        this.message = 'Zarezerwowano bilet!';
        this.event = this.eventService.getById(this.event.id);
      } else {
        this.message = 'Brak wolnych miejsc';
      }
    }
  }
}