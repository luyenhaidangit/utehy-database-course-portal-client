import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouteData } from '../models/route.model';
import { User, UserCurrent } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userCurrent;

    if (user) {
      const routeData = route.data as RouteData;
      const rolesRouteData = routeData.roles || [];

      if (rolesRouteData.length > 0 && !rolesRouteData.some(role => user.roles.includes(role))) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      
      return true;
    } else {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
