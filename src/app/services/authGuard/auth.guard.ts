import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StateService } from '../stateServices/state.service';
import { UserserviceService } from '../userServices/userservice.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  token: any

  constructor(private stateService: StateService, private router: Router, private userService: UserserviceService) { }

  canActivate(): any {
    let result: any
    // console.log(localStorage.getItem('token'));
    // console.log(!!localStorage.getItem('token'));

    if (!!this.stateService.getToken()) {
      this.token = this.stateService.getToken()?.slice(7)
      try {
        let result = jwtDecode(this.token)
        console.log(result);
        return true
      }
      catch (err) {
        alert("Unauthorized")
        this.stateService.setSignedIn(false)
        this.stateService.setIsAdmin(false)
        this.router.navigateByUrl('user/register')
        return false
      }
    }   
    else {
      alert("Restricted")
      // this.stateService.setSignedIn(false)
      // this.stateService.setIsAdmin(false)
      this.router.navigateByUrl('user/register')
    }
  }

}
