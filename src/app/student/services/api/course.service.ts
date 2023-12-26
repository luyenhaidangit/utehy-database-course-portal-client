import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpPublicService } from 'src/app/shared/services/https/http-public.service';

@Injectable({
  providedIn: 'root', 
})
export class CourseService {
  constructor(private http: HttpPublicService) {
  }

  getCourseDatabase(): Observable<any> {
    return this.http.get('course/get-database-course');
  }
}
