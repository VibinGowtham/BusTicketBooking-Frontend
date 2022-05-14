import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  bus!:any
  disabled!: boolean

  toggle(event: any) {
    this.disabled = !this.disabled
  }
  constructor() { }

  ngOnInit(): void {
    this.disabled = false
 

}
}
