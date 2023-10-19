import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpStudentLoadingService } from 'src/app/shared/services/https/http-student-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  public isAuthenticated: boolean = false;
  public userData: any = null;

  constructor(private http: HttpStudentLoadingService) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user?.token){
      this.getUserInfo().subscribe(res => {
        if(res.status){
          this.setAuthData(res.data);
        }
      })
    }
  }

  setAuthData(data: any): void {
    this.isAuthenticated = true;
    this.userData = data;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userData = null;
  }

  getUserInfo(): Observable<any> {
    return this.http.get('user/user-info');
  }

  getOtpLoginPhone(phone: string): Observable<any> {
    const encodedPhone = encodeURIComponent(phone);
    return this.http.post(`auth/send-otp-login-numberphone?numberphone=${encodedPhone}`, {});
  }

  loginEmail(request: any): Observable<any> {
    return this.http.post(`auth/login-by-email`, request);
  }
}
