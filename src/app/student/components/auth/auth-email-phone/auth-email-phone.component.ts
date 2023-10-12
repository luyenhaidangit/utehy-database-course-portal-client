import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import authConstant from 'src/app/student/constants/auth-constant';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown/countdown.component';
import validationHelper from 'src/app/student/helpers/validation-helpers';

@Component({
  selector: 'app-auth-email-phone',
  templateUrl: './auth-email-phone.component.html',
  styleUrls: ['./auth-email-phone.component.css'],
})
export class AuthEmailPhoneComponent {
  @Input() authView!: number;
  @Output() changeViewEvent = new EventEmitter<{
    title: string;
    view: number;
  }>();
  @ViewChild('countdown', { static: false }) countdown!: CountdownComponent;

  validationHelper: any = validationHelper;
  authConstant: any = authConstant;

  statusViewPhone: number = authConstant.statusViewPhoneNotSendOtp;
  numberPhone: string = '';
  otp: string = '';
  email: string = '';
  password: string = '';

  requestedSendOtp: boolean = false;

  config: CountdownConfig = {
    leftTime: 60,
    formatDate: ({ date }) => `${date / 1000}`,
  };

  handleRequestSendOtp() {
    if (
      this.numberPhone.length >= 9 &&
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

  onSubmitFormLoginPhone() {}

  onSubmitFormLoginEmail() {}
}
