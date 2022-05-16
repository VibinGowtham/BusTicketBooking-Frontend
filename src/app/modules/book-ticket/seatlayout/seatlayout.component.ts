import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatService } from 'src/app/services/seatServices/seat.service';
import { StateService } from 'src/app/services/stateServices/state.service';
import { UserserviceService } from "../../../services/userServices/userservice.service";
@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  userId: any
  selectedSeat: any
  selectedSeats: any
  busId!: string
  iterations: any
  seats: any;
  availability: any
  price: any
  paymentMode: any

  bookSeats(): any {
    console.log(this.price);
    
    this.selectedSeats.length > 3 ? this.paymentMode = 'Card' : this.paymentMode = 'Upi'
    console.log(this.paymentMode);

    this.price = this.selectedSeats.length * this.price;

    console.log(this.price);
    
    console.log(this.stateService.getUserId() + " " + this.stateService.getBusId());

    let body = {
      userId: this.stateService.getUserId(),
      busId: this.stateService.getBusId(),
      price: this.price,
      seats: this.selectedSeats,
      bookedDate: new Date().toDateString(),
      paymentMode: this.paymentMode
    }
    this.seatService.post('updateAvailability', body)
      .subscribe(data => console.log(data)
      )
    this.selectedSeats = [], this.selectedSeat = []

    setTimeout(() => {
      this.router.navigateByUrl('book/bookings')
    }, 1000);
    
  }


  toggleSelection(id: any): any {
    this.selectedSeat = id.target.attributes.id.nodeValue
    document.getElementById(this.selectedSeat)?.classList.toggle("selected")

    if (this.selectedSeats.length == 0) this.selectedSeats.push(this.selectedSeat);
    else if (this.selectedSeats.includes(this.selectedSeat) == false) this.selectedSeats.push(this.selectedSeat);
    else this.selectedSeats.splice(this.selectedSeats.indexOf(this.selectedSeat), 1)
    // console.log(this.selectedSeats)

  }
  constructor(private seatService: SeatService, private stateService: StateService, private router: Router, private userService: UserserviceService) {
    this.selectedSeats = []
    this.seats = [];
    this.iterations = [];
    this.availability = []
  }

  ngOnInit(): void {
    if (this.stateService.busId != '') {
      this.seatService
        .post('getSeats', { id: this.stateService.getBusId() })
        .subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            this.seats[i] = data[i].seatNumber
            this.availability[i] = data[i].availability;
          }
          // console.log(this.seats);
          // console.log(this.availability);

          for (let i = 0; i < this.seats.length; i += 2) {
            this.iterations.push(i)
          }
          console.log(this.iterations);

        })
      this.userService.post('admin/getBus', { id: this.stateService.getBusId() }).subscribe(data => {
        console.log(data);
        this.price = data.price
      })



    }





    // this.seats = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5", "D1", "D2", "D3", "D4", "D5", "E1", "E2"]
    // this.seats=["A1","A2","A3","A4","A5","B1","B2","B3","B4","B5","C1",""]
    // this.iterations = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
    // this.iterations=[0,2,4,6,8,10]
  }
}
