import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor as HttpSystemInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { app } from '../configs/app.config';
import { LocalStorage } from '../enums/local-storage.enum';
import { AuthToken } from '../models/interfaces/common/auth-token.interface';
import { LocalStorageService } from '../services/utilities/local-storage.service';

@Injectable()
export class HttpInterceptor implements HttpSystemInterceptor {
  private apiUrl: string = app.apiUrl;

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.getItem(LocalStorage.AuthToken) as AuthToken;

    request = request.clone({
      url: `${this.apiUrl}${request.url}`
    });

    if (authToken?.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken.accessToken}`,
        }
      });
    }

    return next.handle(request);
  }
}
