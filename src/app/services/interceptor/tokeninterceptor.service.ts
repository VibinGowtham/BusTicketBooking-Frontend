import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Router } from '@angular/router';
import { catchError, observable, Observable, switchMap, throwError } from 'rxjs';
import { StateService } from '../stateServices/state.service';
import { UserserviceService } from '../userServices/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private stateService: StateService, private userService: UserserviceService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtToken = this.addTokenHeader(req, this.stateService.getToken())
    return next.handle(jwtToken)
      .pipe(
        catchError(err => {
          // console.log("CErr " +err);

          if (err.status === 401) {
            // console.log("Inn");
            return this.handleRefreshToken(req, next)
          }
          return throwError(err)
        })
      )
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {

    return this.userService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        // console.log("Inrefresh");
        // console.log(data);
        this.stateService.setToken(data.accessToken)
        return next.handle(this.addTokenHeader(req, data.accessToken))
      }),
      catchError(err => {
        console.log("In renew tokem error");
        this.stateService.logout()
        return throwError(err)
        // return throwError("hiii")
      })
    )
  }

  addTokenHeader(req: HttpRequest<any>, token: any) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

  }
}
