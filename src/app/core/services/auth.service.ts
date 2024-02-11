import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserCurrent } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userCurrent: UserCurrent | undefined;
  private readonly apiUrl = 'https://api.example.com/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      username,
      password,
    };
    return this.http.post<User>(`${this.apiUrl}/login`, body, { headers });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null);
  }

//   currentUser(): Observable<UserCurrent | null> {
//     const user = localStorage.getItem('currentUser');
//     if (user) {
//       return of(JSON.parse(user) as UserCurrent);
//     } else {
//       return of(null);
//     }
//   }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
