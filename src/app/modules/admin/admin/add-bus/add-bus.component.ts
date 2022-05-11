import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {

  bus: any

  showData(){
    console.log(this.bus.value);
  }

  constructor() { }

  ngOnInit(): void {
    this.bus = new FormGroup({
        name:new FormControl(''),
        busType:new FormControl(''),
        boardingLocation:new FormControl(''),
        destinationLocation:new FormControl(''),
        pickUpLocation:new FormControl(''),
        dropLocation:new FormControl(''),
        price:new FormControl(''),
        totalSeats:new FormControl(''),
        depatureDate:new FormControl(''),
        rating:new FormControl(''),
        depatureTime:new FormControl(''),
        arrivalTime:new FormControl(''),
        totalTime:new FormControl('')
    })
  }

}
