import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { Error404Component } from './student/shared/components/error/error404/error404.component';
import { Error400Component } from './student/shared/components/error/error400/error400.component';
import { Error500Component } from './student/shared/components/error/error500/error500.component';
import { Error503Component } from './student/shared/components/error/error503/error503.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    loadChildren: () =>
      import('./teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'errors', component: Error400Component },
  { path: 'not-found', component: Error404Component },
  { path: 'server-error', component: Error500Component },
  { path: 'server-maintenance', component: Error503Component },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
