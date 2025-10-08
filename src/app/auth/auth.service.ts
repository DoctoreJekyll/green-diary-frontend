import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private userSubject = new BehaviorSubject<any>(this.readUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Llama al backend (gateway) para hacer login
  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, { username, password });
  }

  // Guardamos token + user y emitimos el user por el BehaviorSubject
  setSession(token: string, user?: any) {
    localStorage.setItem(this.tokenKey, token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user ?? this.parseJwt(token));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const t = this.getToken();
    if (!t) return false;
    const p = this.parseJwt(t);
    if (!p) return false;
    // si hay exp en el token, comprobamos expiración (exp es en segundos)
    if (p.exp && Date.now() > p.exp * 1000) {
      return false;
    }
    return true;
  }

  private readUserFromStorage() {
    const u = localStorage.getItem('user');
    if (u) return JSON.parse(u);
    const t = this.getToken();
    return t ? this.parseJwt(t) : null;
  }

  private parseJwt(token: string) {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
}
