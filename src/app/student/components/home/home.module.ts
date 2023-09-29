import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CourseProComponent } from './course-pro/course-pro.component';

import { HomeRoutingModule } from './home-routing.module';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { HomeComponent } from './home.component';
import { CourseFreeComponent } from './course-free/course-free.component';
import { FeaturedPostComponent } from './featured-post/featured-post.component';
import { FeaturedVideoComponent } from './featured-video/featured-video.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListFreeComponent } from './course-list-free/course-list-free.component';
import { PostImpressiveComponent } from './post-impressive/post-impressive.component';
import { VideoOutstandComponent } from './video-outstand/video-outstand.component';

@NgModule({
  declarations: [
    HomeComponent,
    SlideShowComponent,
    CourseProComponent,
    CourseFreeComponent,
    FeaturedPostComponent,
    FeaturedVideoComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, CarouselModule.forRoot()],
})
export class HomeModule {}
