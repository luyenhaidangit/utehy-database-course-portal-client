import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentApiService } from '../configs/student-api.service';

@Injectable({
  providedIn: 'root', 
})
export class UserService {
  constructor(private http: StudentApiService) { }

  getUserInfo(): Observable<any> {
    return this.http.get('user/user-info');
  }
}
