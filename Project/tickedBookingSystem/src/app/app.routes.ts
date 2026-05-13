import { Routes } from '@angular/router';
import { EventDetail } from './event-detail/event-detail';
import { EventForm } from './event-form/event-form';
import { EventList } from './event-list/event-list';
import { Home } from './home/home';
import { Login } from './login/login';
import { MyReservations } from './my-reservations/my-reservations';
import { Register } from './register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'events', component: EventList },
    { path: 'events/new', component: EventForm, canActivate: [authGuard]},
    { path: 'events/edit/:id', component: EventForm, canActivate: [authGuard] },
    { path: 'events/:id', component: EventDetail },
    { path: 'home', component: Home},
    { path: 'login', component: Login},
    { path: 'myReservations', component: MyReservations, canActivate: [authGuard]},
    { path: 'register', component: Register}

];