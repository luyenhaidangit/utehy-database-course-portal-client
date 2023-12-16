import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionCategoryRoutingModule } from './question-category-routing.module';
import { QuestionCategoryComponent } from './question-category.component';


@NgModule({
  declarations: [
    QuestionCategoryComponent
  ],
  imports: [
    CommonModule,
    QuestionCategoryRoutingModule
  ]
})
export class QuestionCategoryModule { }
