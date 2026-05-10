import { Routes } from '@angular/router';
import { EventDetail } from './event-detail/event-detail';
import { EventForm } from './event-form/event-form';
import { EventList } from './event-list/event-list';

export const routes: Routes = [
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'events', component: EventList },
    { path: 'events/new', component: EventForm },
    { path: 'events/edit/:id', component: EventForm },
    { path: 'events/:id', component: EventDetail },
];