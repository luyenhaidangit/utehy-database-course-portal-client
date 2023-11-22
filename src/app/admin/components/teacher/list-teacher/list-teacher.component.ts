import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/admin/services/apis/teacher.service';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  public teachers: any;

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe((result: any) => {
      if(result.status){
        this.teachers = result.data.items;
      }
    });
  }
}
