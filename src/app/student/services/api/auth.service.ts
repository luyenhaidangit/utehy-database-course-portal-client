import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentApiService } from '../configs/student-api.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userData: any = null;

  constructor(private http: StudentApiService) { }

  setAuthData(data: any): void {
    this.isAuthenticated = true;
    this.userData = data;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userData = null;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserData(): any {
    return this.userData;
  }

  getOtpLoginPhone(phone: string): Observable<any> {
    const encodedPhone = encodeURIComponent(phone);
    return this.http.post(`auth/send-otp-login-numberphone?numberphone=${encodedPhone}`, {});
  }

  loginEmail(request: any): Observable<any> {
    return this.http.post(`auth/login-by-email`, request);
  }
}
