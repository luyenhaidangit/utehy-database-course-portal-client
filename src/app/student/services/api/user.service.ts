import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpGuestNotLoadingService } from 'src/app/shared/services/https/http-guest-not-loading.service';
import { HttpNotLoadingService } from 'src/app/shared/services/https/http-not-loading.service';
import { HttpStudentLoadingService } from 'src/app/shared/services/https/http-student-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class UserService {
  constructor(private http: HttpGuestNotLoadingService) { }

  getUserInfo(): Observable<any> {
    return this.http.get('user/user-info', {});
  }
}
