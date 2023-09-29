import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { HomeComponent } from './home.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListFreeComponent } from './course-list-free/course-list-free.component';
import { PostImpressiveComponent } from './post-impressive/post-impressive.component';
import { VideoOutstandComponent } from './video-outstand/video-outstand.component';

@NgModule({
  declarations: [HomeComponent, SlideShowComponent, CourseListComponent, CourseListFreeComponent, PostImpressiveComponent, VideoOutstandComponent],
  imports: [CommonModule, HomeRoutingModule, CarouselModule.forRoot()],
})
export class HomeModule {}
