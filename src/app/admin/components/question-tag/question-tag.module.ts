import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionTagRoutingModule } from './question-tag-routing.module';
import { QuestionTagComponent } from './question-tag.component';


@NgModule({
  declarations: [
    QuestionTagComponent
  ],
  imports: [
    CommonModule,
    QuestionTagRoutingModule
  ]
})
export class QuestionTagModule { }
