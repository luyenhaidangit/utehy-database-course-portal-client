import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CourseRoutingModule } from './course-routing.module';
import { ListCourseComponent } from './list-course/list-course.component';
import { InfoCourseComponent } from './info-course/info-course.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    ListCourseComponent,
    InfoCourseComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class CourseModule { }
