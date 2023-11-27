import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTeacherLoadingService } from 'src/app/shared/services/https/http-teacher-loading.service';
import { HttpTeacherNotLoadingService } from 'src/app/shared/services/https/http-teacher-not-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class TeacherService {
  constructor(private http: HttpTeacherLoadingService) { }

  getTeachers(request: any = null): Observable<any> {
    return this.http.get('teacher/get', request);
  }

  createTeachers(request: any): Observable<any> {
    return this.http.post('teacher/create', request);
  }
}
