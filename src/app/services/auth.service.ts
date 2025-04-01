import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login'
import { RegisterResponse } from '../models/register'
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router
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

   getUserList(params: any): Observable<any> {
         const token: any = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token,
        });
    
        const httpParams = new HttpParams({ fromObject: params });
    
        return this.http.get(`${this.apiUrl}user/list/`, {
          headers,
          params: httpParams,
        });
      }

    deleteUser(params:any): Observable<any> {
      let url = this.apiUrl+"user/delete/";
      const token: any = localStorage.getItem('authToken');
      const headers = new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token,
      });
      const body = new URLSearchParams();
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          body.set(key, params[key]);
        }
      }
      return this.http.post<RegisterResponse>(url, body.toString(), { headers }).pipe(map((param:any) => param))
    }
      updateUser (params:any): Observable<any> {
        const token: any = localStorage.getItem('authToken');
        let url = this.apiUrl+"user/update-user-info/";
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token,
        });
        const body = new URLSearchParams();
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            body.set(key, params[key]);
          }
        }
        return this.http.put<LoginResponse>(url, body.toString(), { headers }).pipe(map((param:any) => param))
      }

      updateConact (params:any): Observable<any> {
        const token: any = localStorage.getItem('authToken');
        let url = this.apiUrl+"user/update-contact/";
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token,
        });
        const body = new URLSearchParams();
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            body.set(key, params[key]);
          }
        }
        return this.http.put<LoginResponse>(url, body.toString(), { headers }).pipe(map((param:any) => param))
      }

      isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken'); 
      }

      getUserRole(): string | null {
        return localStorage.getItem('usertype'); 
      }

}
