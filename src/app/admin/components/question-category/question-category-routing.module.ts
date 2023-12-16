import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionCategoryComponent } from './question-category.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionCategoryRoutingModule { }
