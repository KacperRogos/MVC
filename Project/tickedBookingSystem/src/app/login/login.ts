import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username="";
  password="";
  error="";

  constructor(private authService: AuthService, private router: Router){}

  login(): void{
    const success = this.authService.login(this.username, this.password);
    if(success){
      this.router.navigate(['/events']);
    }else{
      this.error="Nieprawidłowa nazwa użytkownika lub hasło";
    }
  }
}
