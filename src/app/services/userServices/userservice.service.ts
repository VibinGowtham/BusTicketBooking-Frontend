import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService { 

 SERVER_URL!:String

  constructor(private http:HttpClient) { 
    this.SERVER_URL="http://localhost:3000"
  }

  get(route:string):Observable<any>{
    return this.http.get<any>(`${this.SERVER_URL}/${route}`)
  }

  post(route:string,body:Object):Observable<any>{
    return this.http.post<any>(`${this.SERVER_URL}/${route}`,body)
  }
}
