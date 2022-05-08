import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  iterations: any
  seats: any;

  toggleSelection(id:any):any{
    console.log(id.target.attributes.id);
    
  }
  constructor() { }

  ngOnInit(): void {
    this.seats = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5", "D1", "D2", "D3", "D4", "D5", "E1", "E2"]
    // this.seats=["A1","A2","A3","A4","A5","B1","B2","B3","B4","B5","C1",""]
    this.iterations = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
    // this.iterations=[0,2,4,6,8,10]
  }
}
