import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetisMenu } from 'metismenujs';
import SimpleBar from 'simplebar';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.css']
})
export class VerticalMenuComponent {
  currentUrl: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    new MetisMenu("#side-menu");
    new SimpleBar(document.getElementById('simplebar') as HTMLElement);
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
  }
}
