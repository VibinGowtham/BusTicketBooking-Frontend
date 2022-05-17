import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  SERVER_URL: any
  constructor(private http: HttpClient) {
    this.SERVER_URL = "http://localhost:3000/booking"
  }

  post(route:string,body:Object):Observable<any>{
    return this.http.post<any>(`${this.SERVER_URL}/${route}`,body)
  }

}
