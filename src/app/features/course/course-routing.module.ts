import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from 'src/app/core/enums/page.enum';
import { ManageInfoCourseComponent } from './manage-info-course/manage-info-course.component';
import { ManageListSectionComponent } from './manage-list-section/manage-list-section.component';

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
    path: 'section',
    component: ManageListSectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
