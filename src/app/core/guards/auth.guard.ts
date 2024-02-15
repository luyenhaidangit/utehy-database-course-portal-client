import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/identity/auth.service';
import { Page } from '../enums/page.enum';
import { UserCurrent } from '../models/interfaces/user/user-current.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // const user: UserCurrent | null | undefined = this.authService.getUserCurrent();

    // if(user){
    //   return true;
    // }else{
    //   this.router.navigate([Page.Login]);
    //   return false;
    // }
    return this.authService.isInitAuth$.pipe(
      map(isInit => {
        if(isInit){
          if(this.authService.getUserCurrent()){
            return true;
          }else{
            this.router.navigate([Page.Login]);
            return false;
          }
        }else{
          this.router.navigate([Page.Login]);
          return false;
        }
      })
    )
  }
}
