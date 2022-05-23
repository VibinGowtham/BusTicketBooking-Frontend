import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/stateServices/state.service';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';
import jwtDecode from 'jwt-decode';
import { token } from '../../../models/Token/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

message:any
status:any

loginForm!:FormGroup

postLoginDetails(){
  let body=this.loginForm.value
  // this.loginForm.reset()
  this.userService.post('login', body).subscribe(data=>{
    console.log("In login");
    console.log(data);
    let decodedValue:any
    try{
       decodedValue=jwtDecode<token>(data.AccessToken)
    }catch(err){
      this.message=data.message
      this.status=data.status
      return
    }
    this.stateService.setUserId(decodedValue.id)
    this.stateService.setToken(data.AccessToken)
    this.stateService.setRefreshToken(data.RefreshToken)

    this.message=data.message
    this.status=data.status

    if(this.status===200) {
      this.stateService.isSignedIn=true
      this.stateService.isAdmin=decodedValue.isAdmin
      setTimeout(() => {
        this.router.navigateByUrl('book/book-tickets');
      }, 500);
    }
  })
}
  constructor(private userService:UserserviceService,private router:Router,public stateService:StateService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z0-9]){8,15}')])
    })
  }

}
