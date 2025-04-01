import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  deleteSlider(params:any): Observable<any> {
    let url = this.apiUrl+"cars/delete-slider-info/";
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

  getCars(params: any): Observable<any> {
    const headers = new HttpHeaders({
    });

    const httpParams = new HttpParams({ fromObject: params });

    return this.http.get(`${this.apiUrl}cars/car-list/`, {
      headers,
      params: httpParams,
    });
  }

  getSlider(): Observable<any> {
    return this.http.get(`${this.apiUrl}cars/slider-list/`);
  }

  deleteCar(params:any): Observable<any> {
    let url = this.apiUrl+"cars/delete-car-info/";
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

  getCarById(id: string): Observable<any> {
    console.log(`${this.apiUrl}cars/car-list/${id}` , "-------------------")
    return this.http.get(`${this.apiUrl}cars/car-list/?id=${id}`);
  }

  // updateCars (params:any): Observable<any> {
  //   const token: any = localStorage.getItem('authToken');
  //   let url = this.apiUrl+"cars/update-car-info";
  //   const headers = new HttpHeaders({
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': token,
  //   });
  //   const body = new URLSearchParams();
  //   for (const key in params) {
  //     if (params.hasOwnProperty(key)) {
  //       console.log("KEY", key);
  //       console.log("VALUE", params[key]);
  //       body.set(key, params[key]);
  //     }
  //   }
  //   return this.http.put(url, body.toString(), { headers }).pipe(map((param:any) => param))
  // }
  updateCars(params:any): Observable<any> {
    let url = this.apiUrl+"cars/update-car-info";
    const token: any = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    });
    return this.http.put<RegisterResponse>(url, params, { headers }).pipe(map((param:any) => param))
  }
  deleteCarImage(params:any): Observable<any> {
    let url = this.apiUrl+"cars/delete-car-info-image/";
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
    return this.http.post(url, body.toString(), { headers }).pipe(map((param:any) => param))
  }

}
