import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';
import { DEFAULT_PER_PAGE_OPTIONS, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'src/app/admin/configs/paging.config';
import sortConstant from 'src/app/admin/constants/sortConstant';
import orderConstant from 'src/app/admin/constants/orderConstant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  //Constant
  public sortConstant: any = sortConstant;
  public orderConstant: any = orderConstant;
  //Config
  public config: { [key: string]: any, perPageOptions: any[]  } = { perPageOptions: DEFAULT_PER_PAGE_OPTIONS };
  //Data
  public teachers: any[] = [];
  //Selection
  public selectedItems: number[] = [];
  public selectedSortAndOrder: any = {
    orderBy: "",
    sortBy: ""
  };
  //Paging
  public currentPage: any;
  public pageSize: any;
  public pageIndex: any;
  public totalPages: any;
  public search: any = {};

  constructor(private teacherService: TeacherService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("vzof ham")
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageIndex: params['pageIndex'] ? params['pageIndex'] : DEFAULT_PAGE_INDEX,
        pageSize: params['pageSize'] ? params['pageSize'] : DEFAULT_PAGE_SIZE,
      };

      this.getTeachers(request);
    });
  }

  getTeachers(request: any) {
    this.teacherService.getTeachers(request).subscribe((result: any) => {
      if(result.status){
        this.teachers = result.data.items;
        this.totalPages = result.data.totalPages;
        this.currentPage = result.data.pageIndex;
      }
    });
  }

  selectAllTeachers(event: any): void{
    if (event.target.checked) {
      this.selectedItems = this.teachers.map((teacher: any) => teacher.id);
    } else {
      this.selectedItems = [];
    }
  }

  isSelected(teacherId: number): boolean {
    return this.selectedItems.includes(teacherId);
  }

  toggleSelection(teacherId: number): void {
    if (this.isSelected(teacherId)) {
        this.selectedItems = this.selectedItems.filter((id) => id !== teacherId);
    } else {
        this.selectedItems.push(teacherId);
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      
      this.route.queryParams.subscribe(params => {
        const request = {
          ...params,
          pageIndex: this.currentPage,
        };

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: request,
          queryParamsHandling: 'merge',
        });
      });
    }
  }

  onPerPageChange(event: any) {
    this.pageSize = +event.target.value;

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageSize: this.pageSize,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  onSortAndOrderChange(orderBy: string) {
    if(this.selectedSortAndOrder.orderBy === orderBy){
      this.selectedSortAndOrder.sortBy = this.selectedSortAndOrder.sortBy === sortConstant.asc ? sortConstant.desc: sortConstant.asc;
    }else{
      this.selectedSortAndOrder.sortBy = sortConstant.desc;
    }

    this.selectedSortAndOrder = {
      orderBy: orderBy,
      sortBy: this.selectedSortAndOrder.sortBy
    };

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        orderBy: this.selectedSortAndOrder.orderBy,
        sortBy: this.selectedSortAndOrder.sortBy,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }
}
