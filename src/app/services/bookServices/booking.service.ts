import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
SERVER_URL:any
  constructor(private http:HttpClient) { 
this.SERVER_URL="http://localhost:3000/seat/"
  }

}
