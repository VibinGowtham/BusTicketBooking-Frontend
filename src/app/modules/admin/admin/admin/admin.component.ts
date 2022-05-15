import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateBusComponent } from '../update-bus/update-bus.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  @ViewChild(UpdateBusComponent)child!: UpdateBusComponent;

  toggle(id: any) {
    const element = document.getElementById(`${id}`) as HTMLElement;
    if (element.style.display == 'none') element.style.display = 'grid'
    else if (element.style.display == 'grid') element.style.display = 'npne'
    element!.scrollIntoView({ behavior: 'smooth' });
  }

  toggleAddBusComponent() {
    console.log(document.getElementById("addBus")?.style.display);

    this.toggle('addBus')
  }
  toggleUpdateBusComponent() {
    this.child.getUpdatedBuses()
    this.toggle('updateBus')
  }
  toggleAddUserComponent() {
    this.toggle('addUser')
  }
  toggleUpdateUserComponent() {
    this.toggle('updateUser')
  }


  constructor() { }

  ngOnInit(): void {
 
  }

}
