import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
date:any
  constructor() { }

  ngOnInit(): void {
    this.date=new Date().toDateString()
  }

}
