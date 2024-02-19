import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MetisMenu } from 'metismenujs';
import SimpleBar from 'simplebar';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent {
  currentUrl: string = "";

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
    });
  }

  ngOnInit() {
    new MetisMenu("#side-menu");
    new SimpleBar(document.getElementById('simplebar') as HTMLElement);
    this.currentUrl = this.router.url;
  }

  isActive(url: string): boolean {
    if(!url){
      return false;
    }
    return this.router.url.startsWith(url);
  }
}
