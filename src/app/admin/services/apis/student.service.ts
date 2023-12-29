import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpStudentLoadingService } from 'src/app/shared/services/https/http-student-loading.service';
import { HttpStudentNotLoadingService } from 'src/app/shared/services/https/http-student-not-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class StudentService {
  constructor(private http: HttpStudentLoadingService) { }

  getStudents(request: any = null): Observable<any> {
    return this.http.getN('student/get', request);
  }

  createStudents(request: any): Observable<any> {
    return this.http.post('student/create', request);
  }

  getStudentById(request: any): Observable<any> {
    return this.http.getN(`student/get-by-id?id=${request.id}`,{});
  }

  editStudent(request: any): Observable<any> {
    return this.http.post('student/edit', request);
  }

  deleteStudent(request: any): Observable<any> {
    return this.http.post('student/delete', request);
  }

  deleteMultipleStudent(request: any): Observable<any> {
    return this.http.post('student/delete-multiple', request);
  }
}
