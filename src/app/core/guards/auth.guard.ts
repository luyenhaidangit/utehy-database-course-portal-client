import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/identity/auth.service';
import { Page } from '../enums/page.enum';
import { RouteData } from '../models/interfaces/common/route-data.interface';
// import { User, UserCurrent } from '../models/user.model';

/**
* This guard checks user is logged in and has the permission to access the requested page.
*/
@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userCurrent;

    if(user){
      return true;
    }else{

      this.router.navigate([Page.Login]);
      return false;
    }


    // if (user) {
    //   const routeData = route.data as RouteData;
    //   const rolesRouteData = routeData.roles || [];

    //   if (rolesRouteData.length > 0 && !rolesRouteData.some(role => user.roles.includes(role))) {
    //     this.router.navigate(['/auth/login']);
    //     return false;
    //   }
      
    //   return true;
    // } else {
    //   // User is not logged in, redirect to login page
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
