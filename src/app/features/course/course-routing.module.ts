import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInfoCourseComponent } from './manage-info-course/manage-info-course.component';
import { ManageListLessonComponent } from './manage-list-lesson/manage-list-lesson.component';
import { Page } from 'src/app/core/enums/page.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: Page.ManageInfoCourse,
    pathMatch: 'full'
  },
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
