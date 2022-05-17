import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // SERVER_URL: any
  constructor(private http: HttpClient) {
    // this.SERVER_URL = "http://localhost:3000/admin"
  }

  post(route: string, body: Object): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/admin/${route}`, body)
  }

  get(route: string): Observable<any> {
    return this.http.get<any>(`${SERVER_URL}/admin/${route}`)
  }

}
