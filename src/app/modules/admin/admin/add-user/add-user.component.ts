import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  initialValues:any
  user: any
  status: any
  message: any


  close(){
    let main=document.getElementById('mainNav') as HTMLElement
    main.scrollIntoView({behavior:'smooth'})
    setTimeout(() => {
      document.getElementById('addUser')!.style.display='none'
    }, 500);
   
  }

  changeToBoolean(value: string) {
    return value === 'Yes'
  }

  postData() {
    const {name,email,password,contactNo,isAdmin}=this.user.value
    let body = {
       name,
       email,
       password,
       contactNo,
       isAdmin:this.changeToBoolean(isAdmin)
    }
    console.log(body);
    this.userService.post('register',body).subscribe(data=>{
        this.status=data.status
        this.message=data.message
        setTimeout(() => {
          this.status=0
        }, 5000);  
    })
    this.user.reset(this.initialValues)
  }

  constructor(private userService:UserserviceService) { }

  ngOnInit(): void {
    // this.status = 200
    // this.message = "User Successfully Added"
    this.user = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z0-9!@#$%^&*]){8,15}')]),
      isAdmin: new FormControl('')
    })
    this.initialValues=this.user.value
  }
}
