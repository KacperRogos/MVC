import { Injectable } from '@angular/core';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: Users[]=[
    {username: 'admin', password: 'admin'},
    {username: 'guest', password: 'guest'},
  ]

  login(username:string, password:string): boolean{
    const user=this.users.find(u => u.username === username && u.password === password);
    if(user){
      localStorage.setItem('loggedUser', username);
      return true;
    }
    return false;
  }

  logout(): void{
    localStorage.removeItem('loggedUser');
  }
  getLoggedUser(): string | null{
    if (typeof window=='undefined') 
      return null;
    return localStorage.getItem('loggedUser');
  }

  isLoggedIn(): boolean{
    return this.getLoggedUser() !== null;
  }
}
