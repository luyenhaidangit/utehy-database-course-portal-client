import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ValidationMessageModule } from '../validation-message/validation-message.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    ToastModule
  ]
})
export class SharedModule { }
