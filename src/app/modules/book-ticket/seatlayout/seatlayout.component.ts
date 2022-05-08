import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SeatService } from 'src/app/services/seatServices/seat.service';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  id!:string
  iterations: any
  seats: any;
  availability:any

  toggleSelection(id:any):any{
    console.log(id.target.attributes.id);
    
  }
  constructor(private seatService:SeatService) { }

  ngOnInit(): void {
    this.seats=[];
    this.iterations=[];
    this.availability=[]
this.id="627769bb80c9242f4b394db3"
    this.seatService
    .post('getSeats',{id:this.id})
    .subscribe((data)=>
    {
      console.log(data)
      for(let i=0;i<data.length;i++){
             this.seats[i]=data[i].seatNumber
             this.availability[i]=data[i].availability;
      }
      console.log(this.seats);
      console.log(this.availability);
      

      for(let i=0;i<this.seats.length;i+=2){
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
