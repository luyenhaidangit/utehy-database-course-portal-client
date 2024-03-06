import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PrefixApi } from '../../constants/prefix-api.constant';
import { ApiResult } from '../../models/interfaces/common/api-result.interface';
import { Course } from '../../models/interfaces/course/course.interface';

@Injectable({
  providedIn: 'root', 
})
export class CourseService {
    private adminApiPrefix = PrefixApi.admin;

    constructor(private http: HttpClient) { }

    getCourse(): Observable<ApiResult<Course>> {
        return this.http.get<ApiResult<Course>>(`${this.adminApiPrefix}/course/get`);
    }

    editCourse(request: any): Observable<any> {
        return this.http.post(`${this.adminApiPrefix}/course/edit`, request);
    }
}
