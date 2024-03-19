import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupModuleComponent } from './list-group-module/list-group-module.component';
import { StudentGroupModuleComponent } from './student-group-module/student-group-module.component';

const routes: Routes = [
  {
    path: '',
    component: ListGroupModuleComponent,
  },
  {
    path: 'student/:id',
    component: StudentGroupModuleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupModuleRoutingModule { }
