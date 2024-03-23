import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PrefixApi } from '../../constants/prefix-api.constant';
import { ApiResult } from '../../models/interfaces/common/api-result.interface';
import { Course } from '../../models/course/course.model';
import { ManageListSectionViewModel } from '../../models/interfaces/course/manage-list-section-view-model.interface';

@Injectable({
  providedIn: 'root', 
})
export class CourseService {
    private adminApiPrefix = PrefixApi.admin;

    constructor(private http: HttpClient) { }

    getCourse(): Observable<ApiResult<Course>> {
        return this.http.get<ApiResult<Course>>(`${this.adminApiPrefix}/course/get`);
    }

    getCourseWithSection(): Observable<ApiResult<ManageListSectionViewModel>> {
        return this.http.get<ApiResult<ManageListSectionViewModel>>(`${this.adminApiPrefix}/course/get-course-with-section`);
    }

    editCourse(course: Course): Observable<ApiResult<Course>> {
        return this.http.post<ApiResult<Course>>(`${this.adminApiPrefix}/course/edit`, course);
    }
}
