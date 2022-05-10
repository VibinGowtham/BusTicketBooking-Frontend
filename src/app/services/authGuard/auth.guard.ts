import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../stateServices/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private stateService:StateService,private router:Router){}
  
  canActivate():boolean {
      if(this.stateService.getSignedIn()) return true
      else{
        this.router.navigateByUrl('user/register')
        return false
      }
  }
}
