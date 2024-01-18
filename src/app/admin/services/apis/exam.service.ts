import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTeacherLoadingService } from 'src/app/shared/services/https/http-teacher-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class ExamService {
  constructor(private http: HttpTeacherLoadingService) { }

  getExams(request: any = null): Observable<any> {
    return this.http.get('exam/get', request);
  }
  createExam(request: any): Observable<any> {
    return this.http.postFormData('exam/create', request);
  }
  getExamById(request: any = null): Observable<any> {
    return this.http.get('get-by-id/get', request);
  }
  deleteExam(request: any): Observable<any> {
    return this.http.post('exam/delete', request);
  }

  deleteMultipleExam(request: any): Observable<any> {
    return this.http.post('exam/delete-multiple', request);
  }
}
