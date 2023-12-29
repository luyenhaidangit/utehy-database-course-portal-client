import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { LearningComponent } from './components/learning/learning.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./components/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'learning-path',
    loadChildren: () =>
      import('./components/learning-path/learning-path.module').then(
        (m) => m.LearningPathModule
      ),
  },
  {
    path: 'course/:slug',
    component: CourseComponent,
  },
  {
    path: 'learning/:slug',
    component: LearningComponent,
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./shared/components/error/error.module').then(
        (m) => m.ErrorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
