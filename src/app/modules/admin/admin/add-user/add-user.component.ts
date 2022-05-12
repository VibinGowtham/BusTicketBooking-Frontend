import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
user:any
  constructor() { }

  ngOnInit(): void {
    this.user=new FormGroup({
       name:new FormControl(''),
       contactNo:new FormControl(''),
       email:new FormControl(''),
       password:new FormControl(''),
       isAdmin:new FormControl('')
    })
}
}
