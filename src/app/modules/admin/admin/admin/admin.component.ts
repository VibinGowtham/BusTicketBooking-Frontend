import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateBusComponent } from '../update-bus/update-bus.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(UpdateBusComponent) updateBus!: UpdateBusComponent;

  @ViewChild(UpdateUserComponent) updateUser!: UpdateUserComponent;

  toggle(id: any) {
    const element = document.getElementById(`${id}`) as HTMLElement;
    if (element.style.display == 'none') {
      element.style.display = 'grid'
      element!.scrollIntoView({ behavior: 'smooth' });
    }
    else if (element.style.display == 'grid') {
      let main = document.getElementById('mainNav') as HTMLElement

      main.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        element.style.display = 'none'
      }, 500);
    }
  }

  toggleAddBusComponent() {
    console.log(document.getElementById("addBus")?.style.display);

    this.toggle('addBus')
  }
  toggleUpdateBusComponent() {
    this.updateBus.getUpdatedBuses()
    this.toggle('updateBus')
  }
  toggleAddUserComponent() {
    this.toggle('addUser')
  }
  toggleUpdateUserComponent() {
    this.updateUser.getUpdatedUsers()
    this.toggle('updateUser')
  }


  constructor() { }

  ngOnInit(): void {

  }

}
