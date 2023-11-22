import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  public teachers: any;
  public selectedItems: number[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe((result: any) => {
      if(result.status){
        this.teachers = result.data.items;
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
}
