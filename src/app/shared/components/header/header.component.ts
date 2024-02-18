import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import systemConfig from 'src/app/admin/configs/system.config';
import { app } from 'src/app/core/configs/app.config';
import { Page } from 'src/app/core/enums/page.enum';
import { UserCurrent } from 'src/app/core/models/interfaces/user/user-current.interface';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //Core
  App = app;
  Page = Page;

  //State
  userCurrent: UserCurrent;

  //Init
  constructor(public authService: AuthService,private router: Router) {
    this.userCurrent = this.authService.getUserCurrent() as UserCurrent;
  }

  ngOnInit() {}

  public config: any = {
    baseUrl: systemConfig.baseUrl
  }

  //User
  public isShowDropdownUser: boolean = false;

  @HostListener('document:click', ['$event'])
  public toggleDropdownUser(event: any): void{
    const targetElement = event.target as HTMLElement;

    if (targetElement.classList.contains('logout-button')) {
      this.handleOnLogout();
      return;
    }

    if (targetElement.classList.contains('user-dropdown-item')) {
      this.isShowDropdownUser = true;
    } else {
      this.isShowDropdownUser = false;
    }
  }
  
  public handleOnLogout(){
    // this.authService.logout();

    this.router.navigate(['/admin/auth/login']);
  }
}
