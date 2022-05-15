import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../stateServices/state.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor(private stateService:StateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let jwtToken=req.clone({
        setHeaders:{
          Authorization:`Bearer ${this.stateService.getToken()}`
        }
      })
      return next.handle(jwtToken)
  }
}
