import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  // SERVER_URL!:String
  constructor(private http:HttpClient) {
    // this.SERVER_URL="http://localhost:3000/seat"
   }
   post(route:string,body:any):Observable<any>{
    return this.http.post<any>(`${SERVER_URL}/seat/${route}`,body)
  }
}
