import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { token } from 'src/app/models/Token/token';
import { StateService } from 'src/app/services/stateServices/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  classToggle() {
    const navs = document.querySelectorAll('.nav-items')
    navs.forEach(nav => nav.classList.toggle('nav-items-hide'));
  }

  constructor(public stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.stateService.getToken()){
      let token=this.stateService.getToken()
      if(token!==null){
        let decodedValue=jwtDecode<token>(token)

        this.stateService.setSignedIn(true)
        this.stateService.setIsAdmin(decodedValue.isAdmin)
        this.stateService.setUserId(decodedValue.id)
        // 
        
      }
    }

  }

}
