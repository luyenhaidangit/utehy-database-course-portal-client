import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { GroupModuleRoutingModule } from './group-module-routing.module';
import { ListGroupModuleComponent } from './list-group-module/list-group-module.component';
import { StudentGroupModuleComponent } from './student-group-module/student-group-module.component';


@NgModule({
  declarations: [
    ListGroupModuleComponent,
    StudentGroupModuleComponent
  ],
  imports: [
    CommonModule,
    GroupModuleRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ]
})
export class GroupModuleModule { }
