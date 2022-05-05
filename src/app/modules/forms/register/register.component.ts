import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup

  constructor() { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      name:new FormControl("",[Validators.required,Validators.minLength(5)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      contactNo:new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
      password:new FormControl('',[Validators.required,Validators.pattern('([a-zA-Z0-9]){8,15}')])
    })
  }

}
