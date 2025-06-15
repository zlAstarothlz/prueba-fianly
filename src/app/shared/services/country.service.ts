import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/lang/spanish?fields=name,flags');
  }
}
