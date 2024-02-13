import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { ToastrModule } from 'ngx-toastr';

import { SocialLoginModule } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialAuthConfig } from './student/configs/social-auth.config';

import { NgxSpinnerModule } from 'ngx-spinner';
// import { LoadingUiModule } from './shared/components/loading-ui/loading-ui.module';
import { LoadingUiModule } from './core/modules/loading-ui/loading-ui.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { HttpInterceptor } from './core/interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
    SocialLoginModule,
    NgxSpinnerModule,
    LoadingUiModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    { provide: 'SocialAuthServiceConfig', useValue: SocialAuthConfig },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
