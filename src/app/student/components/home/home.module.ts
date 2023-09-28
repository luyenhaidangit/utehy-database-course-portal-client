import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, SlideShowComponent],
  imports: [CommonModule, HomeRoutingModule, CarouselModule.forRoot()],
})
export class HomeModule {}
