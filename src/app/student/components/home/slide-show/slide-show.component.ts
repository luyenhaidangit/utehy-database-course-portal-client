import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SlideShowComponent {
  public slideConfig = {
    itemsPerSlide: 1,
    singleSlideOffset: false,
    noWrap: false,
    cycleInterval: 5000,
    startIndex: 0,
  };

  public slides = [
    { image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_04_2.png' },
    // {
    //   image:
    //     'https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png',
    // },
  ];
}
