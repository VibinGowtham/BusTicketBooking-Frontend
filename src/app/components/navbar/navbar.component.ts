import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/stateServices/state.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logOut(): any {
    this.stateService.setSignedIn(false)
    this.stateService.setIsAdmin(false)
    localStorage.removeItem('token')
    this.router.navigateByUrl('user/login');
  }

  classToggle() {
    const navs = document.querySelectorAll('.nav-items')
    navs.forEach(nav => nav.classList.toggle('nav-items-hide'));
  }

  constructor(public stateService: StateService, private router: Router) { }

  ngOnInit(): void {


  }

}
