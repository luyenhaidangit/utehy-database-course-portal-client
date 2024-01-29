import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/student/services/api/auth.service';
import { UserService } from 'src/app/student/services/api/user.service';
import permissionConstant from '../../../../shared/constants/permisson.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Init
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ngxToastr: NgxToastrService,
    private router:Router
  ) 
  { }

  ngOnInit() {

  }

  //Login
  public loginForm: any = {
    email: '',
    password: '',
    rememberMe: false
  }

  public handleOnSubmitLogin(){
    this.authService.loginEmail(this.loginForm).subscribe(response => {
      if(response.status){
        localStorage.setItem('user', JSON.stringify({ token: response.data }));

        this.userService.getUserInfo().subscribe(responseUser => {
          if(response.status){
            this.authService.setAuthData(responseUser.data);

            if(this.authService.hasPermisson(permissionConstant.teacher)){
              this.router.navigate(['/teacher/dashboard']);
            }
            else{
              this.router.navigate(['/admin/dashboard']);
            }

          }
        })
        // this.router.navigate(['/admin/dashboard']);

      }else{
        this.ngxToastr.error("Đăng nhập không hợp lệ",'',{
          progressBar: true
        });
      }
    },error => {
      this.ngxToastr.error("Đăng nhập không hợp lệ",'',{
        progressBar: true
      });
    });
  }
}
