import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpTeacherLoadingService } from 'src/app/shared/services/https/http-teacher-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class QuestionService {
  constructor(private http: HttpTeacherLoadingService) { }

  getQuestions(): Observable<any> {
    return this.http.get('question/get', {});
  }
}
