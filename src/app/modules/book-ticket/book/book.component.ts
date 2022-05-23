import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/locationServices/location.service';
import { StateService } from 'src/app/services/stateServices/state.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  status: any
  message: any
  total: any
  date!: any
  busDetails!: any
  cities!: any
  city!: FormGroup
  initialValues: any
  boardingLocations: any
  destinationLocations: any

  getBusId(event: any) {
    this.stateServive.setBusId(event.target.attributes.id.nodeValue.slice(5))
    console.log(this.stateServive.getBusId());
    console.log(this.stateServive.getUserId());
    this.router.navigateByUrl('book/seat')
  }


  sendData(): any {

    const { boardingLocation, destinationLocation, depatureDate } = this.city.value
    if (boardingLocation === destinationLocation) {
      this.status = 403
      this.message = "Boarding and Depature locations cannot be same"
      setTimeout(() => {
        this.status = 0
      }, 2000);
      return
    }

    if (depatureDate === undefined || depatureDate === '') {
      this.status = 403
      this.message = "Depture date cannot be empty"
      setTimeout(() => {
        this.status = 0
      }, 2000);
      return
    }

    this.city.value.boardingLocation = boardingLocation.toLowerCase()
    this.city.value.destinationLocation = destinationLocation.toLowerCase()
    this.city.value.depatureDate = parseInt(depatureDate.slice(8)) % 7

    this.locationService.post('bus/filterBus', this.city.value).subscribe(data => {
      this.total = data.length
      this.busDetails = data
      this.date = new Date().toLocaleTimeString().slice(0, 5)
    })

    setTimeout(() => {
      let element = document.getElementById('busPropertiesContainer') as HTMLElement
      console.log(element);
      if (element !== null) element.scrollIntoView({ behavior: 'smooth' })
    }, 1000);

  }


  convertToCapitalize(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(private locationService: LocationService, private stateServive: StateService, private router: Router) { }

  ngOnInit(): void {

    this.city = new FormGroup({
      boardingLocation: new FormControl('', Validators.required),
      destinationLocation: new FormControl('', Validators.required),
      depatureDate: new FormControl('', Validators.required),
    })

    this.initialValues = this.city.value

    this.locationService.get('bus/getAllLocations').subscribe(data => {

      this.boardingLocations = data.boardinglocations
      this.destinationLocations = data.destinationLocations

      for (let i = 0; i < this.boardingLocations.length; i++) {
        let location = this.boardingLocations[i]
        this.boardingLocations[i] = this.convertToCapitalize(location)
      }

      for (let i = 0; i < this.destinationLocations.length; i++) {
        let location = this.destinationLocations[i]
        this.destinationLocations[i] = this.convertToCapitalize(location)
      }

    })
  }

}
