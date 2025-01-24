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
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  signIn (params:any): Observable<any> {
    let url = this.apiUrl+"user/login";
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        body.set(key, params[key]);
      }
    }
    return this.http.post<LoginResponse>(url, body.toString(), { headers }).pipe(map((param:any) => param))
  }
  signUp (params:any): Observable<any> {
    let url = this.apiUrl+"user/register";
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        body.set(key, params[key]);
      }
    }
    return this.http.post<RegisterResponse>(url, body.toString(), { headers }).pipe(map((param:any) => param))
  }

  otp (params:any): Observable<any> {
    console.log("otp api call")
    let url = this.apiUrl+"user/generate-otp";
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        body.set(key, params[key]);
      }
    }
    return this.http.post<RegisterResponse>(url, body.toString(), { headers }).pipe(map((param:any) => param))
  } 

}
