import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../global';
import { StateService } from '../stateServices/state.service';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // SERVER_URL

  // SERVER_URL!: String

  constructor(private http: HttpClient,private stateService:StateService) {
    // this.SERVER_URL = "http://localhost:3000"
  }

  generateRefreshToken(){
    return this.http.post<any>(`${SERVER_URL}/renewToken`,{refreshToken:this.stateService.getRefreshToken()})
  }

  get(route: string): Observable<any> {
    return this.http.get<any>(`${SERVER_URL}/${route}`)
  }

  post(route: string, body: Object): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/${route}`, body)
  }
}
