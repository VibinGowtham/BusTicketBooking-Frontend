import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { SeatService } from 'src/app/services/seatServices/seat.service';
import { StateService } from 'src/app/services/stateServices/state.service';
import { UserserviceService } from "../../../services/userServices/userservice.service";


@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})

export class SeatlayoutComponent implements OnInit {
  paymentHandler:any
  status:any
  message:any
  userId: any
  selectedSeat: any
  selectedSeats: any
  busId!: string
  iterations: any
  seats: any;
  availability: any
  price: any
  totalAmount:any
  paymentMode: any

  bookSeats(): any {
    let dialogRef= this.dialog.open(LoadingComponent, { disableClose: true })
        
    this.selectedSeats.length > 3 ? this.paymentMode = 'Card' : this.paymentMode = 'Upi'

    let body = {
      userId: this.stateService.getUserId(),
      busId: this.stateService.getBusId(),
      price: this.totalAmount,
      seats: this.selectedSeats,
      bookedDate: new Date().toDateString(),
      paymentMode: this.paymentMode
    }
    this.stateService.setBusId('')
    this.seatService.post('updateAvailability', body)
      .subscribe(data => {
        console.log(data)
        this.status=data.status
        this.message=data.message
        dialogRef.close()
        this.router.navigateByUrl('book/bookings')
      }
      )
  }


  toggleSelection(id: any): any {
    this.selectedSeat = id.target.attributes.id.nodeValue
    document.getElementById(this.selectedSeat)?.classList.toggle("selected")

    if (this.selectedSeats.length == 0) this.selectedSeats.push(this.selectedSeat);
    else if (this.selectedSeats.includes(this.selectedSeat) == false) this.selectedSeats.push(this.selectedSeat);
    else this.selectedSeats.splice(this.selectedSeats.indexOf(this.selectedSeat), 1)

    this.totalAmount=this.selectedSeats.length*this.price

  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L2UUPSCtz67dN3OlUhkNVfTqTWnoSvSt6Sk02EWaQq8kqfks2Sv1VgMCVAdYUMIfiwncEmgCc3BEvDBCYzuVOGR004XEZrDz7',
      locale: 'auto',
      token: (stripeToken: any)=> {
        console.log({stripeToken})
        this.bookSeats()
      }
    });
  
    paymentHandler.open({
      name:"Enter Your Card Details",
      amount: amount*100
    });
  }
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.setAttribute('data-currency','inr'),
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }
  constructor( private dialog:MatDialog,private seatService: SeatService, private stateService: StateService, private router: Router, private userService: UserserviceService) {
    this.selectedSeats = []
    this.seats = [];
    this.iterations = [];
    this.availability = []
  }

  ngOnInit(): void {   
    this.invokeStripe()
    // this.stateService.setBusId('62834d66440bf862d703acc6')
    this.totalAmount=0
    if (this.stateService.busId != '') {
      this.seatService
        .post('getSeats', { id: this.stateService.getBusId() })
        .subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            this.seats[i] = data[i].seatNumber
            this.availability[i] = data[i].availability;
          }
 
          for (let i = 0; i < this.seats.length; i += 2) {
            this.iterations.push(i)
          }
          console.log(this.iterations);

        })
      this.userService.post('bus/getBus', { id: this.stateService.getBusId() }).subscribe(data => {
        this.price = data.price
      })



    }
  }
}
