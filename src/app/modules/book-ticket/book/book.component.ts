import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/locationServices/location.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  date!: any
  busDetails!: any
  cities!: any
  city!: FormGroup

  sendData(): any {
     const { boardingLocation, destinationLocation, departureDate } = this.city.value
    if (boardingLocation === destinationLocation || departureDate === undefined) alert("Enter valid locations")
    this.city.value.departureDate = parseInt(departureDate.slice(8)) % 7
    console.log(parseInt(departureDate.slice(8)) % 7);

    this.locationService.post('bus/filterBus', this.city.value).subscribe(data => {

      this.busDetails = data
      this.date=new Date().toDateString()
      console.log(this.busDetails);
    })
  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.cities = []
    this.city = new FormGroup({
      boardingLocation: new FormControl('', Validators.required),
      destinationLocation: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
    })
    console.log(this.city.value);

    this.locationService.get('city/getAllCities').subscribe(data => {
      for (let i = 0; i < data.totalCities; i++) {
        this.cities.push(data.cities[i].city)
      }

    })
  }

}
