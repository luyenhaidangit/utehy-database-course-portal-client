import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { StudentComponent } from './student.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthEmailPhoneComponent } from './components/auth/auth-email-phone/auth-email-phone.component';
import { AuthGoogleComponent } from './components/auth/auth-google/auth-google.component';
import { AuthFacebookComponent } from './components/auth/auth-facebook/auth-facebook.component';
import { AuthGithubComponent } from './components/auth/auth-github/auth-github.component';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, StudentComponent, AuthComponent, AuthEmailPhoneComponent, AuthGoogleComponent, AuthFacebookComponent, AuthGithubComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
