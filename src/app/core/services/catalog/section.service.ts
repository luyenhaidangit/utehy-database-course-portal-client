import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PrefixApi } from '../../constants/prefix-api.constant';

@Injectable({
  providedIn: 'root', 
})
export class SectionService {
    private adminApiPrefix = PrefixApi.admin;

    constructor(private http: HttpClient) { }

    createSection(request: any): Observable<any> {
        return this.http.post<any>(`${this.adminApiPrefix}/section/create`,request);
    }
}
