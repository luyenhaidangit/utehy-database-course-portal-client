import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';
import { PaginationHelperService } from 'src/app/admin/services/helpers/pagination-helper.service';
import { defaultPerPage } from 'src/app/admin/configs/paging.config';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  public teachers: any;
  public selectedItems: number[] = [];
  public currentPage: any;
  public pageSize: any;
  public totalPages: any;
  public config: { [key: string]: any, defaultPerPage: any[]  } = { defaultPerPage };

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.getTeachers({});
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

      const request = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }

      this.getTeachers(request);
    }
  }
}
