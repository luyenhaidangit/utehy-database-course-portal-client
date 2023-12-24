import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCourseComponent } from './list-course/list-course.component';
import { InfoCourseComponent } from './info-course/info-course.component';
import { ContentCourseComponent } from './content-course/content-course.component';
import { ContentLessonComponent } from './content-lesson/content-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: ListCourseComponent
  },
  {
    path: 'info',
    component: InfoCourseComponent
  },
  {
    path: 'lesson',
    component: ContentCourseComponent
  },
  {
    path: 'lesson/:id',
    component: ContentLessonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
