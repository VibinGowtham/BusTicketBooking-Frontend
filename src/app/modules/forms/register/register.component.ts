import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

// import { UserserviceService } from 'src/app/services/userServices/userservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegistered!:boolean
    message:any
  registerForm!:FormGroup

 postDetails(){
   let body=this.registerForm.value
   this.registerForm.reset()
   this.userService.post('register', body).subscribe(data=>{
     this.isRegistered=true
     this.message=data.message
     if(data.status===200) {
      setTimeout(() => {
        this.router.navigateByUrl('user/login');
      }, 2000); 
   }
  })
 }
  constructor(private userService:UserserviceService,private router:Router) { }

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
