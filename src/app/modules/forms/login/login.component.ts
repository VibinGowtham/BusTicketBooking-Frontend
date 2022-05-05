import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

response!:{
message:'',
token:''
}
isLoggedIn!:boolean
loginForm!:FormGroup

postLoginDetails(){
  let body=this.loginForm.value
  this.loginForm.reset()
  this.userService.post('login', body).subscribe(data=>{
    this.isLoggedIn=true
    this.response=data
    console.log(data);
    
  })
}
  constructor(private userService:UserserviceService) { }

  ngOnInit(): void {
    this.isLoggedIn=false
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z0-9]){8,15}')])
    })
  }

}
