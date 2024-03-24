import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ManageInfoCourseComponent } from './manage-info-course/manage-info-course.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/core/modules/shared/shared.module';
import { ManageListSectionComponent } from './manage-list-section/manage-list-section.component';


@NgModule({
  declarations: [
    ManageInfoCourseComponent,
    ManageListSectionComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    CKEditorModule,
  ]
})
export class CourseModule { }
