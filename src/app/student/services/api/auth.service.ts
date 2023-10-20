import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpStudentLoadingService } from 'src/app/shared/services/https/http-student-loading.service';
import { HttpStudentNotLoadingService } from 'src/app/shared/services/https/http-student-not-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  public isAuthenticated: any = null;
  public userData: any = null;

  constructor(private httpLoading: HttpStudentLoadingService, private http: HttpStudentNotLoadingService) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user?.token){
      this.getUserInfo().subscribe(res => {
        if(res.status){
          this.setAuthData(res.data);
        }
      })
    }else{
      this.removeAuthData();
    }
  }

  setAuthData(data: any): void {
    this.isAuthenticated = true;
    this.userData = data;
  }

  removeAuthData(): void {
    this.isAuthenticated = false;
    this.userData = null;
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

  loginPhone(request: any): Observable<any> {
    return this.httpLoading.post(`auth/login-by-verify-otp-numberphone?phone=${request.phone}&otp=${request.otp}`, {});
  }

  loginEmail(request: any): Observable<any> {
    return this.httpLoading.post(`auth/login-by-email`, request);
  }
}
