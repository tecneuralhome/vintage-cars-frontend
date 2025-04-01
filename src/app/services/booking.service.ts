import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  booking (params:any): Observable<any> {
    const token: any = localStorage.getItem('authToken');
    let url = this.apiUrl+"cars/booking";
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
    return this.http.post(url, body.toString(), { headers }).pipe(map((param:any) => param))
  }

    getBookingList(params: any): Observable<any> {
       const token: any = localStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token,
      });
  
      const httpParams = new HttpParams({ fromObject: params });
  
      return this.http.get(`${this.apiUrl}cars/booking-list/`, {
        headers,
        params: httpParams,
      });
    }
}
