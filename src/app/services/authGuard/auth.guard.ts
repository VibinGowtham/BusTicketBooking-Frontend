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


  // async verifyToken(token:any): Promise<any> {
  //    let result = this.userService.post('verify',{token})
  // }

  canActivate(): any {
    let result: any
    console.log(localStorage.getItem('token'));
    console.log(!!localStorage.getItem('token'));

    if (!!localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')?.slice(7)
      try {
        let result = jwtDecode(this.token)
        console.log(result);
        return true
      }
      catch (err) {
        alert("Unauthorized")
        this.router.navigateByUrl('user/register')
        return false
      }


      // let token = localStorage.getItem('token')?.slice(7)

      // console.log(localStorage.getItem('token'));

      // console.log(token);

      // this.userService.post('verify', { token: token }).subscribe(data => {
      //   console.log(typeof data);
      //   console.log("in " + data);
      //   return data
      // })
      // console.log("Res " + result);

      // return result
    }
    else {
      alert("Restricted")
      this.router.navigateByUrl('user/register')
    }
  }

}
