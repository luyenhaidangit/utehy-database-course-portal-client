import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent as StudentLayoutComponent } from './student/shared/components/layout/layout.component';
import { LayoutComponent as AdminLayoutComponent } from './admin/shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
