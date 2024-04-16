import { map } from 'rxjs/operators';
import { HttpStatus } from './../../../core/enums/http-status.enum';
import { student } from './../../../core/models/student/student.model';
import { Component, OnInit } from '@angular/core';
import { GroupModuleService } from 'src/app/admin/services/apis/group-module.service';
import pagingConfig, { DEFAULT_PER_PAGE_OPTIONS } from '../config/group-module.config';
import systemConfig from 'src/app/admin/configs/system.config';
import sortConstant from 'src/app/admin/constants/sortConstant';
import fileConstant from 'src/app/admin/constants/file.constant';
import groupModuleConstant from 'src/app/admin/constants/group-module.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendence-module',
  templateUrl: './attendence-module.component.html',
  styleUrls: ['./attendence-module.component.css']
})
export class AttendenceModuleComponent implements OnInit {

  //Students
  public groupModule: any = {};
  
  public students: any = [];

  public schedules: any = [];

  public attendences: any = [];

  public scheduleSelected: any = null;

  public daySelected: any = null;

  public config: any = {
    paging: pagingConfig.default,
    perPageOptions: DEFAULT_PER_PAGE_OPTIONS,
    baseUrl: systemConfig.baseFileSystemUrl,
  }

  public queryParameters: any = {
    ...this.config.paging,
    place: 0,
    type: 0
  };

  public paging: any = {
    pageIndex: 0,
    pageSize: 0,
    sortBy: '',
    orderBy: '',
    totalPages: 0,
    totalRecords: 0
  }

  public selectedBanners: any = [];
  
  constructor(
    private groupModuleService: GroupModuleService,
    private route: ActivatedRoute,
    private router: Router,
    private ngxToastr: ToastrService,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let request = {};

    this.daySelected = new Date();
    this.route.params.subscribe(params => {
      const id = params['id'];
      request = Object.assign({}, request, { groupModuleId: id });

      this.getStudentGroupModule({id: id});
      this.getSchedules(request);
    });

    this.route.queryParams.subscribe(params => {
      request = Object.assign({}, params, request, {
        pageIndex: params['pageIndex'] ? params['pageIndex'] : this.config.paging.pageIndex,
        pageSize: params['pageSize'] ? params['pageSize'] : this.config.paging.pageSize,
        sortBy: params['sortBy'] ? params['sortBy'] : '',
        orderBy: params['orderBy'] ? params['orderBy'] : '',
        nameOrEmail: params['nameOrEmail'] ? params['nameOrEmail'] : ''
      });

      this.queryParameters = { ...params };
      delete this.queryParameters.groupModuleId;

      this.getStudentsGroupModule(request);      
    });
  }
  
  public getStudentsGroupModule(request: any): void{
    this.groupModuleService.getStudentsGroupModule(request).subscribe((result: any) => {
      if(result.status){
        if(request.pageIndex !== 1 && result.data.items.length === 0){
          this.route.queryParams.subscribe(params => {
            const request = {
              ...params,
              pageIndex: 1,
              pageSize:10
            };
      
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: request,
              queryParamsHandling: 'merge',
            });
          });
        }

        this.students = result.data.items;
        console.log('students: ', this.students)
    
        if(this.students.length === 0){
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = result.data;
        this.paging = paging;

        this.selectedBanners = [];
      }
    });
  }
  
  public getStudentGroupModule(request: any): void{
    this.groupModuleService.getGroupModule(request).subscribe((result: any) => {
      if(result.status){
        this.groupModule = result.data;
      }
    });
  }

  public getSchedules(request: any): void {
    this.groupModuleService.getSchedule(request).subscribe((result: any) => {
      if(result.status){
        this.schedules = result.data.items;

        for(let i = 0; i < this.schedules.length; i++) {
          if(new Date(this.schedules[i].dateSchool).toDateString() == new Date().toDateString()){
            this.scheduleSelected = this.schedules[i];
          }
        }
        if(this.scheduleSelected){
          this.getAttendenceByScheduleId(this.scheduleSelected);
        }
      }
    });
  }

  public submitAttendence(){
    
      var request = this.attendences.map((attendence: any) =>{
        return {
          studentId: attendence.studentId,
          scheduleId: this.scheduleSelected.id,
          attendant: attendence.attendance == "attendant",
          permittedLeave: attendence.attendance == "permittedLeave",
          unpermittedLeave: attendence.attendance == "unpermittedLeave",
          note: attendence.note
        }
      })

      this.groupModuleService.createAttendence(request).subscribe((result: any) => {
        if(result.status){
          this.ngxToastr.success('Điểm danh thành công!');
        }
      })
  }

  getAttendenceByScheduleId(schedule: any) {
    this.scheduleSelected = schedule;
    this.daySelected = schedule.dateSchool;
    
      var request = {
        scheduleId: schedule.id
      }
      this.groupModuleService.getAttendenceByScheduleId(request).subscribe((result) => {
        if(result.status){
          this.attendences = result.data.items;

          if(this.attendences != null && this.attendences.length != 0){
            for(let i = 0; i < this.students.length; i++){

            }
          }
          else{
            this.attendences = this.students.map((student: any, index: number) => {
              var attendence = Object.assign({}, student);
              attendence["index"] = index + 1;
              attendence["attendance"] = false;
              return attendence;
            })
          }
        }
      })
    }
}
