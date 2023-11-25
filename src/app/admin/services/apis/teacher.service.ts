import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTeacherNotLoadingService } from 'src/app/shared/services/https/http-teacher-not-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class TeacherService {
  constructor(private http: HttpTeacherNotLoadingService) { }

  getTeachers(request: any = null): Observable<any> {
    return this.http.get('teacher/get', request);
  }
}
