import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  events: Event[]=[];
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getAll();
  }

  delete(id: number): void {
    this.eventService.delete(id);
    this.events = this.eventService.getAll();
  }

}
