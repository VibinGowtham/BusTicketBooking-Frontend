import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/services/locationServices/location.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  cities!:any
city!:FormGroup

  sendData() {
console.log(this.city.value);

  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.cities=[]
    this.city = new FormGroup({
      boardingLocation: new FormControl(''),
      destinationLocation: new FormControl('')
    })

    this.locationService.get('/getAllCities').subscribe(data=>{
      // this.cities=data;
      // console.log(data);
      
      for(let i=0;i<data.totalCities;i++){
        //  console.log(data.cities[i].city);
         this.cities.push(data.cities[i].city)
         console.log(this.cities);
     }
      
    })
  }

}
