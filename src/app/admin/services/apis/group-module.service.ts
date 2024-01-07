import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAdminLoadingService } from 'src/app/shared/services/https/http-admin-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class GroupModuleService {
  constructor(private httpAdminLoading: HttpAdminLoadingService) { }

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
}
