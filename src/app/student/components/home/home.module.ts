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
