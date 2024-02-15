import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { UserCurrent } from '../../models/interfaces/user/user-current.interface';
import { LocalStorageService } from '../utilities/local-storage.service';
import { AuthToken } from '../../models/interfaces/common/auth-token.interface';
import { LocalStorage } from '../../enums/local-storage.enum';
import { ApiResult } from '../../models/interfaces/common/api-result.interface';
import { LoginRequest } from '../../models/interfaces/auth/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCurrent: UserCurrent | null | undefined;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  //Auth token
  getAuthTokenLocalStorage(): AuthToken | null{
    const authToken: AuthToken | null = this.localStorageService.getItem(LocalStorage.AuthToken);

    return authToken;
  }

  setAuthTokenLocalStorage(authToken: AuthToken| null){
    this.localStorageService.setItem(LocalStorage.AuthToken,authToken);
  }

  //User
  setUserCurrent(userCurrent: UserCurrent | null){
    this.userCurrent = userCurrent;
  }

  getUserCurrent(): UserCurrent | null | undefined{
    return this.userCurrent;
  }

  fetchUserCurrent(): Observable<ApiResult<UserCurrent>> {
    return this.http.get<ApiResult<UserCurrent>>('/auth/user-current');
  }

  loginByUsername(request: LoginRequest): Observable<ApiResult<AuthToken>> {
    return this.http.post<ApiResult<AuthToken>>('/auth/login', request);
  }

  // loginByUsername(request: LoginRequest): Observable<ApiResult<UserCurrent>>{

  // }

//   logout(): Observable<void> {
//     return this.http.post<void>(`${this.apiUrl}/logout`, null);
//   }

//   refreshToken(): Observable<void> {
//     return this.http.post<void>(`${this.apiUrl}/logout`, null);
//   }

// //   currentUser(): Observable<UserCurrent | null> {
// //     const user = localStorage.getItem('currentUser');
// //     if (user) {
// //       return of(JSON.parse(user) as UserCurrent);
// //     } else {
// //       return of(null);
// //     }
// //   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('currentUser');
//   }
}
