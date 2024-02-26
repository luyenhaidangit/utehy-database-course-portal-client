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
  currentMenu: any;

  menus: any = [
    {
      title: 'Menu',
      className: 'menu-title',
      isArea: true,
      isActive: false,
    },
    {
      title: 'Trang điều khiển',
      routerLink: '/dashboard',
      icon: 'fa-solid fa-house'
    },
    {
      title: 'Khoá học',
      icon: 'fa-solid fa-school',
      class: '',
      children: [
        {
          title: 'Thông tin khoá học',
          routerLink: '/course/info',
          className: 'menu-title',
          isArea: true
        },
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.changeStatusCurrentMenu();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.changeStatusCurrentMenu();
    });
  }

  ngAfterViewInit(){
    new MetisMenu("#side-menu");
    new SimpleBar(document.getElementById('simplebar') as HTMLElement);
  }

  changeStatusCurrentMenu(){
    for (let menu of this.menus) {
      menu.isActive = false;
      menu.isChildActive = false;

      if (menu.routerLink && this.router.url.startsWith(menu.routerLink)) {
        menu.isActive = true;
      }

      if (menu.children) {
        for (let menuChild of menu.children) {
          menuChild.isActive = false;

          if (menuChild.routerLink && this.router.url.startsWith(menuChild.routerLink)) {
            menu.isChildActive = true;
            menuChild.isActive = true;
          }
        }
      }
    }
  }

  findCurrentMenu(menus: any[], url: string): any {
    for (const menu of menus) {
      if (menu.routerLink && url.startsWith(menu.routerLink)) {
        return menu;
      }
      if (menu.children) {
        const foundInChildren = this.findCurrentMenu(menu.children, url);
        if (foundInChildren) {
          menu.active = true;
          return foundInChildren;
        }
      }
    }
    return null;
  }

  isActive(url: string): boolean {
    if(!url){
      return false;
    }
    return this.router.url.startsWith(url);
  }
}
