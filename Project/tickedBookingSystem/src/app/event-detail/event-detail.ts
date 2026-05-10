import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
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
    private eventService: EventService){
    };

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.eventService.getById(id);
  }

  reserve(): void{
    if(this.event){
      let success=this.eventService.reserve(this.event.id);
      if(success){
        this.message="Zarezerwowano bilet!";
      }else{
        this.message="Brak wolnych miejsc";
      }
    }
  }
}
