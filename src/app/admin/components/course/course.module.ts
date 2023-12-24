import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CourseRoutingModule } from './course-routing.module';
import { ListCourseComponent } from './list-course/list-course.component';
import { InfoCourseComponent } from './info-course/info-course.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContentCourseComponent } from './content-course/content-course.component';
import { ContentLessonComponent } from './content-lesson/content-lesson.component';

@NgModule({
  declarations: [
    ListCourseComponent,
    InfoCourseComponent,
    ContentCourseComponent,
    ContentLessonComponent
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
