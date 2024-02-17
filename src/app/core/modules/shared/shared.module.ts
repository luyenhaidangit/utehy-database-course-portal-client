import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { LoadingUiModule } from '../loading-ui/loading-ui.module';
import { ToastrModule } from '../toastr/toastr.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    ToastrModule,
    LoadingUiModule
  ],
})
export class SharedModule { }
