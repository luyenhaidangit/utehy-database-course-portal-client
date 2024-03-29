import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { teacherGuard } from './shared/guards/teacher.guard';

import { Role } from './core/enums/role.enum';
import { Title } from './core/enums/title.enum';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './features/error/components/not-found/not-found.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { UpdateAccountComponent } from './teacher/components/account/update-account/update-account.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UpdateAccountComponent,
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    data : { 
      title: Title.Dashboard,
      roles: [ Role.Admin, Role.Teacher, Role.Student ],
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  }, 
  {
    path: 'test',
    component: LoginComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    loadChildren: () =>
      import('./teacher/teacher.module').then((m) => m.TeacherModule),
    canActivate: [teacherGuard],

  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/auth',
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
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
