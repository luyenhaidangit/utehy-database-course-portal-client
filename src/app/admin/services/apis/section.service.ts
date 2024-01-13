import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTeacherLoadingService } from 'src/app/shared/services/https/http-teacher-loading.service';
import { HttpTeacherNotLoadingService } from 'src/app/shared/services/https/http-teacher-not-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class SectionService {
  constructor(private http: HttpTeacherLoadingService) { }

  getSections(request: any = null): Observable<any> {
    return this.http.get('section/get', request);
  }
}

