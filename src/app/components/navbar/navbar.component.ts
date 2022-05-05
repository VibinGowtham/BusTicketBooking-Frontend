import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn!:boolean;

  update(){
    this.isLoggedIn=!this.isLoggedIn
  }
   classToggle() {
    const navs = document.querySelectorAll('.nav-items')
    navs.forEach(nav => nav.classList.toggle('nav-items-hide'));
  }

  constructor() { }

  ngOnInit(): void {
   
    
  }

}
