import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageModule } from '../validation-message/validation-message.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule
  ]
})
export class SharedModule { }
