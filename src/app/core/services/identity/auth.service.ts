import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { UserCurrent } from '../../models/interfaces/user/user-current.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userCurrent: UserCurrent | undefined;
  private readonly apiUrl = 'https://api.example.com/auth';

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('https://api.example.com/data')
      .subscribe((data: any) => {
        // Xử lý dữ liệu trả về
        console.log(data);
      });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null);
  }

  refreshToken(): Observable<void> {
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
