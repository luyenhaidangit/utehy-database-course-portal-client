import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndsWithHtmlGuard } from 'src/app/student/shared/guards/endsWithHtml.guard';
import { LearningPathComponent } from './learning-path.component';

const routes: Routes = [
  {
    path: '',
    component: LearningPathComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningPathRoutingModule {}
