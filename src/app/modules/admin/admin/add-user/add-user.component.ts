import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
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
    let dialogRef= this.dialog.open(LoadingComponent, { disableClose: true })
    const {name,email,password,contactNo,isAdmin}=this.user.value
    let body = {
       name,
       email:email.toLowerCase(),
       password,
       contactNo,
       isAdmin:this.changeToBoolean(isAdmin)
    }

    this.userService.post('register',body).subscribe(data=>{
      dialogRef.close()
        this.status=data.status
        this.message=data.message
        setTimeout(() => {
          this.status=0
        }, 5000);  
    })
    this.user.reset(this.initialValues)
  }

  constructor(private dialog:MatDialog,private userService:UserserviceService) { }

  ngOnInit(): void {
      this.user = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z0-9!.@#$%^&*]){8,15}')]),
      isAdmin: new FormControl('')
    })
    this.initialValues=this.user.value
  }
}


