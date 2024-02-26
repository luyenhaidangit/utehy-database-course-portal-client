import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInfoCourseComponent } from './manage-info-course/manage-info-course.component';
import { ManageListLessonComponent } from './manage-list-lesson/manage-list-lesson.component';

const routes: Routes = [
  {
    path: 'info',
    component: ManageInfoCourseComponent,
  },
  {
    path: 'lesson',
    component: ManageListLessonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
