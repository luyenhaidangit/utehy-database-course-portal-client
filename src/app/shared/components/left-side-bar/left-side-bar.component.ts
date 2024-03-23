import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MetisMenu } from 'metismenujs';
import SimpleBar from 'simplebar';
import { Page } from 'src/app/core/enums/page.enum';
import { NavigateSideBar } from 'src/app/core/configs/navigate-side-bar.config';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent {
  //Core
  Page = Page;
  Menu = NavigateSideBar;

  currentUrl: any = "";

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
    return this.router.url.startsWith(url);
  }
}
