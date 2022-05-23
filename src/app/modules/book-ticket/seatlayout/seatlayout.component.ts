import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { SeatService } from 'src/app/services/seatServices/seat.service';
import { StateService } from 'src/app/services/stateServices/state.service';
import { UserserviceService } from "../../../services/userServices/userservice.service";



declare let Razorpay:any

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})

export class SeatlayoutComponent implements OnInit {
  razorpayOptions:any
  userName:any
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
        console.log("Seatlayout Done");
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
   
  initializePayment() {
    this.userService.post('payment/razorpay', {amount:this.totalAmount}).subscribe((data)=>{  
      this.razorpayOptions.key=data.key
      this.razorpayOptions.name=this.userName.toUpperCase()
      this.razorpayOptions.amount=data.value.amount
      this.razorpayOptions.order_id=data.value.id
      let rzpl=new Razorpay(this.razorpayOptions)
      rzpl.open()
    })
  }

  constructor(private zone:NgZone, private dialog:MatDialog,private seatService: SeatService, private stateService: StateService, private router: Router, private userService: UserserviceService) {
    this.selectedSeats = []
    this.seats = [];
    this.iterations = [];
    this.availability = []
  }

  ngOnInit(): void {         
    this.razorpayOptions = {
      'key': '',
      'amount': '',
      'currency': 'INR',
      'name': '',
      'description': `Proceed to Pay`,
      'order_id': '',
      'handler': (res: any) => {
        console.log("In Handler")
        console.log(res);
        this.zone.run(()=>{
          this.bookSeats()
        })
      }
    }

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
 
      this.userService.post('getUserName',{userId:this.stateService.getUserId()}).subscribe(data=>{
        this.userName=data.userName
      })


    }
  }
}
