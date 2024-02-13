import { Component, ViewEncapsulation } from '@angular/core';
import { AuthToken } from './core/models/interfaces/common/auth-token.interface';
import { AuthService } from './core/services/identity/auth.service';
import { HttpStatus } from './core/enums/http-status.enum';

import { NgxSpinnerService } from "ngx-spinner";
import { defaultSpinner } from './core/configs/spinner.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public isInitialized: boolean = false;
  public defaultSpinner = defaultSpinner;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) {}

  ngOnInit(){
    this.spinner.show();

    const authToken: AuthToken | null = this.authService.getAuthTokenLocalStorage();

    if(authToken?.accessToken){
        this.authService.getUserCurrent().subscribe(res => {
          if(res.status){
            this.authService.setUserCurrent(res.data);
            this.setStatusInitialized(true);
          }
        },
        error => {
          if (error.status === HttpStatus.Unauthorized) {
            
          }

          this.setStatusInitialized(true);
        });
    } else {
      this.authService.setUserCurrent(null);
      this.setStatusInitialized(true);
    }
  }

  private setStatusInitialized(status: boolean){
    if(status){
      this.isInitialized = true;
      this.spinner.hide();
    }
  }
}
