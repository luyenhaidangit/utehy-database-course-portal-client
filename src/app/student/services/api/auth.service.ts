import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentApiService } from '../configs/student-api.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  constructor(private http: StudentApiService) { }

  getOtpLoginPhone(phone: string): Observable<any> {
    const encodedPhone = encodeURIComponent(phone);
    return this.http.post(`auth/send-otp-login-numberphone?numberphone=${encodedPhone}`, {});
  }
}
