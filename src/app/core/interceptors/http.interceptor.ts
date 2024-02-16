import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor as HttpSystemInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';

import { app } from '../configs/app.config';
import { LocalStorage } from '../enums/local-storage.enum';
import { AuthToken } from '../models/interfaces/common/auth-token.interface';
import { LocalStorageService } from '../services/utilities/local-storage.service';
import { LoadingUiService } from '../modules/loading-ui/loading-ui.service';
import { AuthService } from '../services/identity/auth.service';
import { Header } from '../enums/request.enum';
import { HttpStatus } from '../enums/http-status.enum';
import { RefreshTokenRequest } from '../models/interfaces/auth/refresh-token-request.interface';
import { Router } from '@angular/router';
import { Page } from '../enums/page.enum';

@Injectable()
export class HttpInterceptor implements HttpSystemInterceptor {
  private apiUrl: string = app.apiUrl;

  constructor(private localStorageService: LocalStorageService, private loadingService: LoadingUiService, private authService: AuthService,private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has(Header.SkipLoading)) {
      this.loadingService.show();
    } else {
      request = request.clone({
        headers: request.headers.delete(Header.SkipLoading)
      });
    }

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

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken: AuthToken = this.localStorageService.getItem(LocalStorage.AuthToken); 
    const refreshToken = authToken.refreshToken;
    if (!refreshToken) {
      return throwError('Không tồn tại FresheToken hợp lệ!');
    }

    const refreshTokenRequest = {
      refreshToken: refreshToken
    } as RefreshTokenRequest;

    return this.authService.refreshToken(refreshTokenRequest).pipe(
      switchMap((res: any) => {
        this.localStorageService.setItem(LocalStorage.AuthToken, res.data);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.data.accessToken}`,
          }
        });
        return next.handle(request);
      }),
      catchError((error: any) => {
        console.log("log")
        // Handle refresh token failure, probably redirect to login or do logout.
        this.router.navigate([Page.Login]);
        return throwError('AccessToken hoặc RefreshToken không hợp lệ!');
      })
    );
  }
}
