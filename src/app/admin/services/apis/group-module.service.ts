import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAdminLoadingService } from 'src/app/shared/services/https/http-admin-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class GroupModuleService {
  constructor(private httpAdminLoading: HttpAdminLoadingService, private http: HttpClient) { }

  getGroupModules(request: any): Observable<any> {
    return this.httpAdminLoading.get('group-module/get', request);
  }

  createGroupModules(request: any): Observable<any> {
    return this.httpAdminLoading.post('group-module/create', request);
  }

  editGroupModules(request: any): Observable<any> {
    return this.httpAdminLoading.post('group-module/edit', request);
  }

  hideGroupModules(request: any): Observable<any> {
    return this.httpAdminLoading.post('group-module/hide', request);
  }
  
  deleteGroupModule(request: any): Observable<any> {
    return this.httpAdminLoading.post('group-module/delete', request);
  }

  getStudentsGroupModule(request: any): Observable<any> {
    return this.httpAdminLoading.get('group-module/get-students', request);
  }

  getGroupModule(request: any): Observable<any> {
    return this.httpAdminLoading.get('group-module/get-by-id', request);
  }

  exportExcelStudents(request: any): Observable<any> {
    return this.httpAdminLoading.getBlob('group-module/export-excel-students', request);
    // return this.http.get(`https://localhost:7038/api/admin/group-module/export-excel-students`, {
    //   responseType: 'blob', // Set responseType to 'blob' to handle binary data
    //   params: request,      // Pass any query parameters if needed
    // });
  }
}
