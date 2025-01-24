import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login'
import { RegisterResponse } from '../models/register'
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }
  registerCarInfo(params:any): Observable<any> {
    let url = this.apiUrl+"cars/register-car-info";
    const token: any = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    });
    const body = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        body.set(key, params[key]);
      }
    }
    return this.http.post<RegisterResponse>(url, params, { headers }).pipe(map((param:any) => param))
  }
  registerSliderInfo(params:any): Observable<any> {
    let url = this.apiUrl+"cars/register-slider-info";
    const token: any = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    });
    const body = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        body.set(key, params[key]);
      }
    }
    return this.http.post<RegisterResponse>(url, params, { headers }).pipe(map((param:any) => param))
  }




}
