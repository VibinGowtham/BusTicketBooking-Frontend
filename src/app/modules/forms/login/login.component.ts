import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

message:any
token:any

isLoggedIn!:boolean
loginForm!:FormGroup

postLoginDetails(){
  // alert("hi")
  let body=this.loginForm.value
  // console.log(body);
  
  this.loginForm.reset()
  this.userService.post('login', body).subscribe(data=>{
    console.log(data);
    
    this.isLoggedIn=true
    this.message=data.message
    this.token=data.token
    let status=data.status
    // console.log(this.response);
    if(status===200) {
      setTimeout(() => {
        this.router.navigateByUrl('book/book-tickets');
      }, 2000);
      // this.router.navigateByUrl('book/book-tickets');
    }
  })
}
  constructor(private userService:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn=false
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z0-9]){8,15}')])
    })
  }

}
