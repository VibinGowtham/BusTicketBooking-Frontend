import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  initialValues: any
  status: any
  message: any
  users: any
  user: any
  userId: any



  toggleUpdateForm() {
    let element = document.getElementById("updateFormContainer") as HTMLElement
    element.style.display = 'grid'
    element.scrollIntoView({ behavior: 'smooth' })
  }

  getUpdatedUsers() {
    this.adminService.get('getAllUsers').subscribe(data => {
      console.log(data);
      this.users = data
    })
  }

  getUserDetails(event: any) {
    this.toggleUpdateForm()
    let userId = event.target.attributes.id.nodeValue;
    this.userId = userId
    this.adminService.post('getUser', { userId }).subscribe(data => {
      console.log(data);

      this.user = new FormGroup({
        name: new FormControl(data.name, [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
        email: new FormControl(data.email, [Validators.required, Validators.email]),
        contactNo: new FormControl(data.contactNo, [Validators.required, Validators.pattern('[0-9]{10}')]),
        password: new FormControl(data.password.slice(0, 10), [Validators.required, Validators.pattern('([a-zA-Z0-9!@#$%^&*]){8,15}')]),
        isAdmin: new FormControl(data.isAdmin == true ? 'Yes' : 'No')
      })
    })
  }

  changeToBoolean(value: string) {
    return value === 'Yes'
  }

  removeEmpty(object: any) {
    for (let key in object) {
      let value = object[key]
      if (value.toString().startsWith('$')) delete object[key]
    }
  }

  postData() {
    const { name, email, password, contactNo, isAdmin } = this.user.value

    let body = {
      id: this.userId,
      name,
      email,
      password,
      contactNo,
      isAdmin: this.changeToBoolean(isAdmin)
    }
    console.log("remove empty");

    this.removeEmpty(body)
    console.log(body);
    this.adminService.post('updateUser', body).subscribe(data => {
      if (data.status == 200) this.getUpdatedUsers()
      this.status = data.status
      this.message = data.message
      setTimeout(() => {
        this.status = 0
      }, 5000);
    })
  }

  deleteUser(event: any) {
    let busId = event.target.attributes.id.nodeValue
    this.adminService.post('deleteUser', { busId }).subscribe(data => {
      console.log(data);
      if (data.status == 200) this.getUpdatedUsers()
      this.status = data.status
      this.message = data.message
      setTimeout(() => {
        this.status = 0
      }, 5000);
    })

  }

  closeForm() {
    let main = document.getElementById('updateTableContainer') as HTMLElement
    main.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.getElementById('updateFormContainer')!.style.display = 'none'
    }, 500);
  }

  close() {
    let main = document.getElementById('mainNav') as HTMLElement
    main.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.getElementById('updateUser')!.style.display = 'none'
    }, 500);
  }


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUpdatedUsers()
    this.user = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z0-9!@#$%^&*]){8,15}')]),
      isAdmin: new FormControl('')
    })
    this.initialValues = this.user.value

  }
}
