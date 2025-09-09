import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  isAdmin?: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res: any) => {
          const userObj = res.user || {};
          const payload: User = { id: userObj.id || userObj._id, email: userObj.email, username: userObj.username || userObj.name, isAdmin: userObj.isAdmin, token: res.token };
          localStorage.setItem('currentUser', JSON.stringify(payload));
          this.currentUserSubject.next(payload);
        })
      );
  }

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, { username: name, email, password })
      .pipe(
        tap((res: any) => {
          const userObj = res.user || {};
          const payload: User = { id: userObj.id || userObj._id, email: userObj.email, username: userObj.username || userObj.name, isAdmin: userObj.isAdmin, token: res.token };
          localStorage.setItem('currentUser', JSON.stringify(payload));
          this.currentUserSubject.next(payload);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
