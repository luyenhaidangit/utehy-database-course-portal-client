import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { teacherGuard } from './shared/guards/teacher.guard';

import { RoleEnum } from './core/enums/role.enum';
import { TitleEnum } from './core/enums/title.enum';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: StudentComponent,
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    data : { 
      title: TitleEnum.Dashboard,
      roles: [ RoleEnum.Admin, RoleEnum.Teacher, RoleEnum.Student ],
    },
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
