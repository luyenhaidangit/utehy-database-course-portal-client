import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  constructor(private http: HttpClient) {}

  getPhoneCodeCountry() {
    return this.http.get('assets/data/phone-code-country.json');
  }
}
