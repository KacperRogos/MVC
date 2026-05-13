import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-event-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  events: Event[] = [];
  searchText: string = '';

  constructor(private eventService: EventService, public authService: AuthService) {}

  ngOnInit(): void {
    this.events = this.eventService.getAll();
  }

  filteredEvents(): Event[] {
    return this.events.filter(e =>
      e.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  delete(id: number): void {
    this.eventService.delete(id);
    this.events = this.eventService.getAll();
  }
}