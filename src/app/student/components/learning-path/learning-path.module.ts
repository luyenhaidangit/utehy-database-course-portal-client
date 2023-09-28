import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningPathRoutingModule } from './learing-path-routing.module';
import { LearningPathComponent } from './learning-path.component';

@NgModule({
  declarations: [LearningPathComponent],
  imports: [CommonModule, LearningPathRoutingModule],
})
export class LearningPathModule {}
