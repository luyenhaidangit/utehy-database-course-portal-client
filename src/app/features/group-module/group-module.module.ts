import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CountdownModule } from 'ngx-countdown';
import { GroupModuleRoutingModule } from './group-module-routing.module';
import { ListGroupModuleComponent } from './list-group-module/list-group-module.component';
import { StudentGroupModuleComponent } from './student-group-module/student-group-module.component';
import { SharedModule } from '../../core/modules/shared/shared.module'
import { ToastrService ,ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    ListGroupModuleComponent,
    StudentGroupModuleComponent
  ],
  imports: [
    CommonModule,
    ToastrModule,
    GroupModuleRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    CountdownModule,
    SharedModule
  ],
  providers: [
    ToastrService // Cung cấp ToastrService
  ]
})
export class GroupModuleModule { }
