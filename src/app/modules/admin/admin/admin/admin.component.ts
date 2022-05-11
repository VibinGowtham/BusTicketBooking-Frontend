import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showAddBus!: boolean
  showUpdateBus!: boolean
  showAddUser!:boolean
  showUpdateUser!:boolean

  toggleAddBusComponent() {
    this.showAddBus = !this.showAddBus
  }
  toggleUpdateBusComponent() {
    this.showUpdateBus = !this.showUpdateBus
  }
  toggleAddUserComponent(){
    this.showAddUser=!this.showAddUser
  }
  toggleUpdateUserComponent(){
this.showUpdateUser=!this.showUpdateUser
  }


  constructor() { }

  ngOnInit(): void {
    this.showAddBus = false
    this.showAddUser = false
    this.showUpdateBus=false
    this.showUpdateUser=false
  }

}
