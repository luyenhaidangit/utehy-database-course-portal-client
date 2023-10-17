import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private http: HttpClient, private toastr: NgxToastrService) {}
    handleErrorResponseWithNotification(error: HttpErrorResponse) {
        if (error.status === 400) {
            for (const key in error.error.errors) {
                if (error.error.errors.hasOwnProperty(key)) {
                  this.toastr.error(error.error.errors[key][0],'',{
                    progressBar: true
                  });
                }
            }
        }
    }

    handleErrorMessageWithNotification(error: string) {
        this.toastr.error(error,'',{
            progressBar: true
        });
    }
}
