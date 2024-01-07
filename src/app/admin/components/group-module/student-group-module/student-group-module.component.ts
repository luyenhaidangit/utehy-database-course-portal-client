import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pagingConfig, { DEFAULT_PER_PAGE_OPTIONS } from '../../../configs/paging.config';
import animationConstant from '../../../constants/animation.constant';
import orderConstant from 'src/app/admin/constants/orderConstant';
import { GroupModuleService } from 'src/app/admin/services/apis/group-module.service';
import systemConfig from 'src/app/admin/configs/system.config';
import sortConstant from 'src/app/admin/constants/sortConstant';
import fileConstant from 'src/app/admin/constants/file.constant';
import groupModuleConstant from 'src/app/admin/constants/group-module.constant';

@Component({
  selector: 'app-student-group-module',
  templateUrl: './student-group-module.component.html',
  styleUrls: ['./student-group-module.component.css'],
  animations: animationConstant.animations
})
export class StudentGroupModuleComponent {
  //Init
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupModuleService: GroupModuleService
  ) { }

  ngOnInit() {
    let request = {};

    this.route.params.subscribe(params => {
      const id = params['id'];
      request = Object.assign({}, request, { groupModuleId: id });

      this.getStudentGroupModule({id: id});
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

  public config: any = {
    paging: pagingConfig.default,
    perPageOptions: DEFAULT_PER_PAGE_OPTIONS,
    baseUrl: systemConfig.baseFileSystemUrl,
  }

  //Students
  public groupModule: any = {};

  public students: any = [];

  public selectedBanners: any = [];

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

  public constant: any = {
    order: orderConstant,
    sort: sortConstant,
    file: fileConstant,
    groupModule: groupModuleConstant
  }

  public getStudentsGroupModule(request: any): void{
    this.groupModuleService.getStudentsGroupModule(request).subscribe((result: any) => {
      if(result.status){
        if(request.pageIndex !== 1 && result.data.items.length === 0){
          this.route.queryParams.subscribe(params => {
            const request = {
              ...params,
              pageIndex: 1,
            };
      
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: request,
              queryParamsHandling: 'merge',
            });
          });
        }

        this.students = result.data.items;

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

  public selectAllStudents(event: any): void{
    if (event.target.checked) {
      this.selectedBanners = this.students.map((teacher: any) => teacher.id);
    } else {
      this.selectedBanners = [];
    }
  }

  public handleSearchStudents(): void{
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        nameOrEmail: this.queryParameters.nameOrEmail ? this.queryParameters.nameOrEmail : null,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  public handleOnSortAndOrderChange(orderBy: any): void{
    if(this.paging.orderBy === orderBy){
      this.paging.sortBy = this.paging.sortBy === this.constant.sort.asc ? this.constant.sort.desc: this.constant.sort.asc;
    }else{
      this.paging.sortBy = this.constant.sort.desc;
    }

    this.paging = {
      orderBy: orderBy,
      sortBy: this.paging.sortBy
    };

    this.route.queryParams.subscribe(params => {
      console.log('pr',params)

      const request = {
        ...params,
        orderBy: this.paging.orderBy,
        sortBy: this.paging.sortBy,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  public handleSelectItem(id: any): void{
    if (this.isSelected(id)) {
      this.selectedBanners = this.selectedBanners.filter((id: any) => id !== id);
    } else {
      this.selectedBanners.push(id);
    }
  }

  public handleOnChangePage(page: any): void{
    if (page >= 1 && page <= this.paging.totalPages) {
      this.paging.pageIndex = page;
      
      this.route.queryParams.subscribe(params => {
        const request = {
          ...params,
          pageIndex: this.paging.pageIndex,
        };

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: request,
          queryParamsHandling: 'merge',
        });
      });
    }
  }

  public handleOnPerPageChange(event: any): void{
    this.paging.pageSize = +event.target.value;

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageSize: this.paging.pageSize,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  public isSelected(id: number): boolean {
    return this.selectedBanners.includes(id);
  }

  public formatPhoneNumber(phoneNumber: any): string|null {
    if (!phoneNumber || phoneNumber.trim() === "") {
        return null;
    }

    if (phoneNumber.startsWith("+84")) {
        phoneNumber = "0" + phoneNumber.substring(3);
    }

    if (phoneNumber.startsWith("+")) {
        phoneNumber = phoneNumber.substring(1);
    }

    return phoneNumber;
  }

  public exportStudents(): void{
    this.route.params.subscribe(params => {
      const id = params['id'];
      
      this.groupModuleService.exportExcelStudents({id: id}).subscribe((result: Blob) => {
        console.log(result)
        const blob = new Blob([result], { type: this.constant.file.mimes.spreadsheetml });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.constant.groupModule.file.studentsExport;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  }
}
