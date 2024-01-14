import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTeacherLoadingService } from 'src/app/shared/services/https/http-teacher-loading.service';


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpTeacherLoadingService) { }

  getSections(request: any = null): Observable<any> {
    return this.http.get('section/get', request);
  }
  createSection(request: any): Observable<any> {
    return this.http.postFormData('section/create', request);
  }
  editSection(request: any): Observable<any> {
    return this.http.postFormData('section/edit', request);
  }
  deleteSection(request: any): Observable<any> {
    return this.http.post('section/delete', request);
  }

  deleteMultipleSection(request: any): Observable<any> {
    return this.http.post('section/delete-multiple', request);
  }
}
