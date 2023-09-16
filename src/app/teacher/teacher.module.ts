import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { TeacherComponent } from './teacher.component';


@NgModule({
  declarations: [LayoutComponent, TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
