import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/student/services/api/user.service';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/services/identity/auth.service';
import { RoleType } from 'src/app/core/constants/role-type.constant';
import { LoginRequest } from 'src/app/core/models/interfaces/auth/login-request.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Core
  Page = Page;
  RoleType = RoleType;

  //State
  loginForm: FormGroup;
  validationMessages = {
    username: [
      { type: 'required', message: 'Tên người dùng không được để trống' },
    ],
    password: [
      { type: 'required', message: 'Mật khẩu không được để trống' },
    ],
  };

  //Init
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router,private messageService: MessageService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.email]],
      rememberMe: [true, Validators.required],
      type: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });
  }

  ngOnInit() {}

  public handleOnSubmitLogin(){
    const request: LoginRequest = this.loginForm.value;
    this.authService.loginByUsername(request).subscribe(
      (res) => {
        if(res.status){
          this.authService.setAuthTokenLocalStorage(res.data);
          this.getAndSetUserCurrent();
          this.router.navigate(['/']);
        }
      },
      (exception) => {
        console.log(exception?.error.Message);
      }
    );
  }

  private getAndSetUserCurrent(){
    this.authService.getUserCurrent().subscribe(responseUser => {
      if(responseUser.status){
        this.authService.setUserCurrent(responseUser.data);
      }
    })
  }
}
