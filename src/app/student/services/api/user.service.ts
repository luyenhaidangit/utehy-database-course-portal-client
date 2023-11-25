import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpStudentLoadingService } from 'src/app/shared/services/https/http-student-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class UserService {
  constructor(private http: HttpStudentLoadingService) { }

  getUserInfo(): Observable<any> {
    return this.http.get('user/user-info');
  }
}
