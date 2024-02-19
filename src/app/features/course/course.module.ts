import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ManageInfoCourseComponent } from './manage-info-course/manage-info-course.component';
import { ManageListLessonComponent } from './manage-list-lesson/manage-list-lesson.component';


@NgModule({
  declarations: [
    ManageInfoCourseComponent,
    ManageListLessonComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
