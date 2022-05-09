import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/bookServices/booking.service';

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
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.totalBooking=0
    this.date = new Date().toDateString()
    this.userId = "6279406d9bc61582d3ce3b69"
    this.bookingService.post('getBookings', { userId: this.userId }).subscribe(data => {
      console.log(data);
      this.totalBooking = data.total;
      this.bookings = data.filteredResults;
      console.log(this.totalBooking);
      console.log(this.bookings);
      
      
    })
  }

}
