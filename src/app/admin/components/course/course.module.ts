import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ListCourseComponent } from './list-course/list-course.component';


@NgModule({
  declarations: [
    ListCourseComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
