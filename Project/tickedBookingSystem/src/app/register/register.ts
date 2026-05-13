import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.username || !this.password) {
      this.error = 'Wypełnij wszystkie pola!';
      return;
    }
    const success = this.authService.register(this.username, this.password);
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'Użytkownik o takiej nazwie już istnieje!';
    }
  }
}