import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {
  isEditMode: boolean = false;
  name: string = '';
  date: string = '';
  totalSeats: number = 0;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private eventService:EventService
  ){}

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode=true;
      const event=this.eventService.getById(Number(id));
      if(event){
        this.name=event.name
        this.date=event.date
        this.totalSeats=event.totalSeats
      }
    }
  }
  save(): void{
    if(this.name!="" && this.date!="" && this.totalSeats){
      if(this.isEditMode){
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.eventService.update({ id, name: this.name, date: this.date, totalSeats: this.totalSeats, takenSeats: 0 });
    }else{
      this.eventService.add({ name: this.name, date: this.date, totalSeats: this.totalSeats, takenSeats: 0 });
    }
    this.router.navigate(['/events']);
    }
    
  }
}

