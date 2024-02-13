import { Component, ViewEncapsulation } from '@angular/core';
import { AuthToken } from './core/models/interfaces/common/auth-token.interface';
import { AuthService } from './core/services/identity/auth.service';
import { HttpStatus } from './core/enums/http-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public isInitialized: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    const authToken: AuthToken | null = this.authService.getAuthTokenLocalStorage();

    if(authToken?.accessToken){
        this.authService.getUserCurrent().subscribe(res => {
          if(res.status){
            this.authService.setUserCurrent(res.data);
            this.isInitialized = true;
          }
        },
        error => {
          if (error.status === HttpStatus.Unauthorized) {
            
          }

          this.isInitialized = true;
        });
    } else {
      this.authService.setUserCurrent(null);
      this.isInitialized = true;
    }
  }
}
