import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/stateServices/state.service';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

// import { UserserviceService } from 'src/app/services/userServices/userservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message:any
  registerForm!:FormGroup

 postDetails(){
   let body=this.registerForm.value
   this.registerForm.reset()
   this.userService.post('register', body).subscribe(data=>{
     this.stateService.setIsRegistered(true)
     this.message=data.message
     if(data.status===200) {
      setTimeout(() => {
        this.router.navigateByUrl('user/login');
      }, 500); 
   }
  })
 }
  constructor(private userService:UserserviceService,private router:Router,public stateService:StateService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      name:new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      email:new FormControl('',[Validators.required,Validators.email]),
      contactNo:new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
      password:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z0-9]){8,15}')])
    })
  }

}
