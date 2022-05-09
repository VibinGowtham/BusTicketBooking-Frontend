import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SeatService } from 'src/app/services/seatServices/seat.service';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  userId:any
  selectedSeat: any
  selectedSeats: any
  busId!: string
  iterations: any
  seats: any;
  availability: any
  price:any


bookSeats():any{
  this.price=this.selectedSeats.length*this.price;
  let body={
    userId:this.userId,
    busId:this.busId,
    price:this.price,
    seats:this.selectedSeats
  }
  this.seatService.post('updateAvailability',body)
  .subscribe(data=>console.log(data)
  )
  this.selectedSeats,this.selectedSeat=[]
  this.price=600
}


  toggleSelection(id: any): any {
    this.selectedSeat = id.target.attributes.id.nodeValue
    document.getElementById(this.selectedSeat)?.classList.toggle("selected")

    console.log(this.selectedSeat);
    console.log(this.selectedSeats);

    if (this.selectedSeats.length == 0) this.selectedSeats.push(this.selectedSeat);
    else if (this.selectedSeats.includes(this.selectedSeat) == false) this.selectedSeats.push(this.selectedSeat);
    else this.selectedSeats.splice(this.selectedSeats.indexOf(this.selectedSeat), 1)
    console.log(this.selectedSeats)

  }
  constructor(private seatService: SeatService) {
    this.price=600
    this.selectedSeats = []
    this.seats = [];
    this.iterations = [];
    this.availability = []
    this.busId = "6277eede9800c8fbfe05582e"
    this.userId="6274b3ff155367b2a2fb542b"
  }

  ngOnInit(): void {

    this.seatService
      .post('getSeats', { id: this.busId })
      .subscribe((data) => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          this.seats[i] = data[i].seatNumber
          this.availability[i] = data[i].availability;
        }
        console.log(this.seats);
        console.log(this.availability);


        for (let i = 0; i < this.seats.length; i += 2) {
          this.iterations.push(i)
        }
        console.log(this.iterations);


      })




    // this.seats = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5", "D1", "D2", "D3", "D4", "D5", "E1", "E2"]
    // this.seats=["A1","A2","A3","A4","A5","B1","B2","B3","B4","B5","C1",""]
    // this.iterations = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
    // this.iterations=[0,2,4,6,8,10]
  }
}
