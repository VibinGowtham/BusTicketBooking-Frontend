import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { BookingService } from 'src/app/services/bookServices/booking.service';
import { SeatService } from 'src/app/services/seatServices/seat.service';
import { StateService } from 'src/app/services/stateServices/state.service';
import { UserserviceService } from 'src/app/services/userServices/userservice.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  status:any
  message:any
  date: any
  userId: any
  totalBooking: any;
  bookings: any
  bookingId:any
  constructor(private dialog:MatDialog,private bookingService: BookingService, private stateService: StateService, private userService: UserserviceService,private seatService:SeatService) { }

 
  getUpdatedBookings=()=>{
    this.bookingService.post('getBookings', { userId: this.stateService.getUserId() }).subscribe(data => {
      console.log("In bookings");

      console.log(data);
      this.totalBooking = data.total;
      this.bookings = data.filteredResults;

    })
  } 

  cancelBooking(event: any) {
    let dialogRef= this.dialog.open(LoadingComponent, { disableClose: true })
   let id = event.currentTarget.attributes.id.nodeValue
    let splittedArray = id.split(" ")
    console.log(splittedArray);
    let busId = splittedArray[0]
    let bookingId = splittedArray[1]
    this.bookingId=bookingId
    let seats = splittedArray[2].toString().split(",")
    console.log("BusId" + busId);
    console.log("Booking" + bookingId);
    console.log("seats" +seats);

   this.seatService.post('releaseSeats',{busId,bookingId,seats}).subscribe(data=>{
     dialogRef.close()
     console.log(data);
     if(data.status==200){
       this.status=data.status
       this.message=data.message
       setTimeout(() => {
         this.status=0
       }, 8000);
       this.getUpdatedBookings()
     }
   })


  }

  ngOnInit(): void {
    // this.status=200
    // this.message="Booking Cancelled Successfully"
    // this.bookingId="627d179efeb1d424c1f6828b"
    this.totalBooking = 0
    this.date = new Date().toDateString()
    if (this.stateService.getUserId() != '') {
      console.log(this.stateService.getUserId());
      
      this.bookingService.post('getBookings', { userId: this.stateService.getUserId() }).subscribe(data => {
        console.log("In bookings");

        console.log(data);
        this.totalBooking = data.total;
        this.bookings = data.filteredResults;
  
      })
    }
  }

}
