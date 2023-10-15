import {Component,Input,Output,EventEmitter,ViewChild,OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import authConstant from 'src/app/student/constants/auth-constant';
import { phoneCodeCountry } from 'src/app/shared/data/phone.data';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown/countdown.component';
import validationHelper from 'src/app/student/helpers/validation-helpers';
import { AuthService } from 'src/app/student/services/api/auth.service';

@Component({
  selector: 'app-auth-email-phone',
  templateUrl: './auth-email-phone.component.html',
  styleUrls: ['./auth-email-phone.component.css'],
})
export class AuthEmailPhoneComponent {
  @Input() authView!: number;
  @Output() changeViewEvent = new EventEmitter<{title: string; view: number;}>();
  @ViewChild('countdown', { static: false }) countdown!: CountdownComponent;

  validationHelper: any = validationHelper;
  authConstant: any = authConstant;

  countryData: any = phoneCodeCountry;
  countryCurrent: any = phoneCodeCountry.find(item => item.dial_code === authConstant.defaultPhoneCodeCountry);;
  statusViewPhone: number = authConstant.statusViewPhoneNotSendOtp;
  openSelectPhoneCountry: boolean = false;
  requestedSendOtp: boolean = false;
  loginPhoneForm: any = {
    phone: '',
    otp: ''
  }
  numberPhone: string = '';
  otp: string = '';
  email: string = '';
  password: string = '';
  registerPhoneForm: any = {
    name: '',
    phone: '',
    otp: '',

    isNameFocused: false,
  };
  registerEmailForm: any = {
    name: '',
    email: '',
    password: '',
    otp: '',

    isNameFocused: false,
  };
  numberPhoneSearch: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService ) { }

  config: CountdownConfig = {
    leftTime: 60,
    formatDate: ({ date }) => `${date / 1000}`,
  };

  onSearchPhone() {
    this.countryData = this.countryData.map((country: any) => {
      if (
        country.name
          .toLowerCase()
          .includes(this.numberPhoneSearch.toLowerCase()) ||
        country.dial_code
          .toLowerCase()
          .includes(this.numberPhoneSearch.toLowerCase())
      ) {
        return { ...country, enable: true };
      } else {
        return { ...country, enable: false };
      }
    });
  }

  handleRequestLoginSendOtp() {
    if (this.loginPhoneForm.phone.length >= 9 && this.statusViewPhone === authConstant.statusViewPhoneNotSendOtp) {
      this.requestedSendOtp = true;
      this.statusViewPhone = authConstant.statusViewPhoneSendOtp;
      const phone = this.countryCurrent.dial_code + this.loginPhoneForm.phone;
      this.authService.getOtpLoginPhone(phone).subscribe(response => {
        if(response.status){
         
        }else{
          this.toastr.error(response.message,'',{
            progressBar: true
          });
        }
      },error => {
        console.log(error);
        if (error.status === 400) {
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
                this.toastr.error(key,  error.error.errors[key][0]);
            }
          }
        }
        if (error.status === 500) {
          this.toastr.error(`Xuất hiện lỗi: ${error.message}`);
        }
      });
    }
  }

  handleRequestSendOtpRegister() {
    if (
      this.registerPhoneForm.name.length >= 6 &&
      this.registerPhoneForm.phone.length >= 9 &&
      this.statusViewPhone === authConstant.statusViewPhoneNotSendOtp
    ) {
      this.requestedSendOtp = true;
      this.statusViewPhone = authConstant.statusViewPhoneSendOtp;
    }
  }

  handleRequestSendOtpEmailRegister() {
    if (
      this.registerEmailForm.name.length >= 6 &&
      this.registerEmailForm.email.length >= 9 &&
      this.statusViewPhone === authConstant.statusViewPhoneNotSendOtp
    ) {
      this.requestedSendOtp = true;
      this.statusViewPhone = authConstant.statusViewPhoneSendOtp;
    }
  }

  handleCountdownEvent(event: any) {
    if (event.status === 3) {
      this.statusViewPhone = authConstant.statusViewPhoneNotSendOtp;
    }
  }

  onSubmitFormLoginPhone() {
    console.log(this.countryCurrent);
  }

  onSubmitFormLoginEmail() {}

  onSubmitFormRegisterPhone() {}

  onSubmitFormRegisterEmail() {}
}
