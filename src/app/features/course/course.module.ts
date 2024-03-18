import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ManageInfoCourseComponent } from './manage-info-course/manage-info-course.component';
import { ManageListLessonComponent } from './manage-list-lesson/manage-list-lesson.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/core/modules/shared/shared.module';


@NgModule({
  declarations: [
    ManageInfoCourseComponent,
    ManageListLessonComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    CKEditorModule,
  ]
})
export class CourseModule { }
