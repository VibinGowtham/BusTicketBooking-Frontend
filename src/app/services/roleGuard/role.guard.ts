import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { StateService } from '../stateServices/state.service';
import { UserserviceService } from '../userServices/userservice.service';
import { token } from "../../models/Token/token";

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  token: any

  constructor(private stateService: StateService, private router: Router, private userService: UserserviceService) { }

  canActivate(): any {
    let result: any
    // console.log(localStorage.getItem('token'));
    // console.log(!!localStorage.getItem('token'));

    if (!!this.stateService.getToken()) {
      this.token = this.stateService.getToken()?.slice(7)
      try {
        let result = jwtDecode<token>(this.token)
        console.log(result);
        if(result.isAdmin) return true
        throw new Error("");
      }
      catch (err) {
        alert("Unauthorized")
        this.router.navigateByUrl('user/register')
        return false
      }
    }   
    else {
      alert("Restricted")
      this.router.navigateByUrl('user/register')
    }
  }
  
}
