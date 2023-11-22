import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: ListTeacherComponent
  },
  {
    path: 'add',
    component: AddTeacherComponent
  },
  {
    path: 'edit/:id',
    component: EditTeacherComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
