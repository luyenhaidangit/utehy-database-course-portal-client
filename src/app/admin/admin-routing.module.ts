import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { GroupComponent } from './components/group/group.component';
import { QuestionCategoryComponent } from './components/question-category/question-category.component';
import { ExamComponent } from './components/exam/exam.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'course',
    loadChildren: () => import('./components/course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'teacher',
    loadChildren: () => import('./components/teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'student',
    loadChildren: () => import('./components/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'post',
    loadChildren: () => import('./components/post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'question',
    loadChildren: () => import('./components/question/question.module').then((m) => m.QuestionModule),
  },
  {
    path: 'question-category',
    component: QuestionCategoryComponent
  },
  {
    path: 'question-tag',
    loadChildren: () => import('./components/question-tag/question-tag.module').then((m) => m.QuestionTagModule),
  },
  {
    path: 'banner',
    component: BannerComponent,
  },
  {
    path: 'exam',
    component: ExamComponent,
  },
  {
    path: 'group',
    component: GroupComponent,
  },
  {
    path: 'config',
    loadChildren: () => import('./components/config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'group-module',
    loadChildren: () => import('./components/group-module/group-module.module').then((m) => m.GroupModuleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
