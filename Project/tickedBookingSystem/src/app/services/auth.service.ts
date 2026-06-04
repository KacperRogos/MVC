import { Injectable } from '@angular/core';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'users';

  private load(): Users[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private save(users: Users[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  register(username: string, password: string): boolean {
    const users = this.load();
    const exists = users.find(u => u.username === username);
    if (exists) return false;
    users.push({ username, password });
    this.save(users);
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.load();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedUser', username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  getLoggedUser(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('loggedUser');
  }

  isLoggedIn(): boolean {
    return this.getLoggedUser() !== null;
  }
}