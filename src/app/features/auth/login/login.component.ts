import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/student/services/api/user.service';
import permissionConstant from 'src/app/shared/constants/permisson.constant';
import roleConstant from 'src/app/admin/constants/role.constant';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/services/identity/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Core
  Page = Page;

  //Init
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ngxToastr: NgxToastrService,
    private router:Router
  ) 
  { }

  ngOnInit() {
    this.handleOnSubmitLogin();
    this.loginForm.type = 1; 

  }

  roleContant: any = roleConstant;

  public validateFormSuccess: any = {
    touchSection: false,
    touchDiff: false
  }
  //Login
  public loginForm: any = {
    // email: '',
    password: '',
    rememberMe: false,

    //new
    username:'',
    type:0,
  }

  public handleOnSubmitLogin(){
    // this.authService.loginUserName(this.loginForm).subscribe(response => {
    //   if(response.status){
    //     localStorage.setItem('user', JSON.stringify({ token: response.data.token }));

    //     this.userService.getUserInfo().subscribe(responseUser => {
    //       if(response.status){
    //         this.authService.setAuthData(responseUser.data);

    //         if(this.authService.hasPermisson(permissionConstant.teacher)){
    //           this.router.navigate(['/teacher/dashboard']);
    //         }
    //         else{
    //           this.router.navigate(['/admin/dashboard']);
    //         }

    //       }
    //     })
    //     // this.router.navigate(['/admin/dashboard']);

    //   }else{
    //     this.ngxToastr.error("Đăng nhập không hợp lệ",'',{
    //       progressBar: true
    //     });
    //   }
    // },error => {
    //   this.ngxToastr.error("Đăng nhập không hợp lệ",'',{
    //     progressBar: true
    //   });
    // });

    this.authService.getUserCurrent().subscribe(
      (user: any) => {
        console.log('Thông tin người dùng hiện tại:', user);
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }
}
