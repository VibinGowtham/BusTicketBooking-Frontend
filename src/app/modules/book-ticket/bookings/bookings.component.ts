import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/bookServices/booking.service';
import { StateService } from 'src/app/services/stateServices/state.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  date: any
  userId: any
  totalBooking: any;
  bookings: any
  constructor(private bookingService: BookingService, private stateService: StateService) { }

  ngOnInit(): void {
    this.totalBooking = 0
    this.date = new Date().toDateString()
    if (this.stateService.getUserId() != '') {
      this.bookingService.post('getBookings', { userId: this.stateService.getUserId() }).subscribe(data => {
        console.log("bookings");
        
        console.log(data);
        this.totalBooking = data.total;
        this.bookings = data.filteredResults;
        console.log(this.totalBooking);
        console.log(this.bookings);
      })
    }
  }

}
