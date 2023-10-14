import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
} from '@angular/core';
import authConstant from 'src/app/student/constants/auth-constant';
import { phoneCodeCountry } from 'src/app/shared/data/phone.data';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown/countdown.component';
import validationHelper from 'src/app/student/helpers/validation-helpers';

@Component({
  selector: 'app-auth-email-phone',
  templateUrl: './auth-email-phone.component.html',
  styleUrls: ['./auth-email-phone.component.css'],
})
export class AuthEmailPhoneComponent implements OnInit {
  @Input() authView!: number;
  @Output() changeViewEvent = new EventEmitter<{
    title: string;
    view: number;
  }>();
  @ViewChild('countdown', { static: false })
  countdown!: CountdownComponent;

  validationHelper: any = validationHelper;
  authConstant: any = authConstant;

  openSelectPhoneCountry: boolean = false;
  countryData: any;
  countryCurrent: any;
  requestedSendOtp: boolean = false;
  statusViewPhone: number = authConstant.statusViewPhoneNotSendOtp;
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

  ngOnInit() {
    this.countryData = phoneCodeCountry;
    this.countryData.map((country: any) => {
      if (country.dial_code === authConstant.defaultPhoneCodeCountry) {
        this.countryCurrent = country;
      }
    });
  }

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

  handleRequestSendOtp() {
    if (
      this.numberPhone.length >= 9 &&
      this.statusViewPhone === authConstant.statusViewPhoneNotSendOtp
    ) {
      this.requestedSendOtp = true;
      this.statusViewPhone = authConstant.statusViewPhoneSendOtp;
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
