import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    const{boardingLocation,destinationLocation,departureTime}=this.city.value
    if(boardingLocation===destinationLocation) alert("Enter valid locations")
    this.city.value.departureTime=parseInt(departureTime.slice(8))%7

    console.log(boardingLocation);
    console.log(destinationLocation);
    console.log(this.city.value.departureTime);

    this.locationService.post('bus/filterBus',this.city.value).subscribe(data=>{
      console.log(data);
      
    })
  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
   
    
    this.cities=[]
    this.city = new FormGroup({
      boardingLocation: new FormControl('',Validators.required),
      destinationLocation: new FormControl('',Validators.required),
      departureTime:new FormControl('',Validators.required),
    })
    console.log(this.city.value);

    this.locationService.get('city/getAllCities').subscribe(data=>{
      for(let i=0;i<data.totalCities;i++){
         this.cities.push(data.cities[i].city)
     }
      
    })
  }

}
