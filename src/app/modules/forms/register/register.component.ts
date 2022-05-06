import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

// import { UserserviceService } from 'src/app/services/userServices/userservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegistered!:boolean
  response!:{
    message:''
  }
  registerForm!:FormGroup

 postDetails(){
   let body=this.registerForm.value
   this.registerForm.reset()
   this.userService.post('register', body).subscribe(data=>{
     this.isRegistered=true
     this.response=data     
   })
 }
  constructor(private userService:UserserviceService) { }

  ngOnInit(): void {
    this.isRegistered=false
    this.registerForm=new FormGroup({
      name:new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      email:new FormControl('',[Validators.required,Validators.email]),
      contactNo:new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
      password:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z0-9]){8,15}')])
    })
  }

}
