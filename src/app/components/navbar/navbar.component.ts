import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  classToggle=()=> {

    const navs = document.querySelectorAll('.navbar')
    console.log(navs);
    const navItems = document.querySelectorAll('.nav-items')
    navItems.forEach(nav => nav.classList.remove('.nav-items'));
    navs.forEach(nav => nav.classList.toggle('.nav-show'));
  }

  constructor() { }

  ngOnInit(): void {
   
    
  }

}
