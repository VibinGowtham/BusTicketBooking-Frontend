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
  total: any
  date!: any
  busDetails!: any
  cities!: any
  city!: FormGroup
  initialValues:any

  getBusId(event: any) {
    this.stateServive.setBusId(event.target.attributes.id.nodeValue.slice(5))
    console.log(this.stateServive.getBusId());
    console.log(this.stateServive.getUserId());
    this.router.navigateByUrl('book/seat')
  }


  sendData(): any {
    // const { boardingLocation, destinationLocation, depatureDate } = this.city.value
    // if (boardingLocation === destinationLocation || depatureDate === undefined || depatureDate === '') {
    //   console.log("City In");
    //   console.log(this.city.value);
    //   this.city.reset(this.initialValues)
    //   return
    // }
    // this.city.value.depatureDate = parseInt(depatureDate.slice(8)) % 7
    
  this.city.value.depatureDate=0
    console.log("City");
    console.log(this.city.value);
    

    this.locationService.post('bus/filterBus', this.city.value).subscribe(data => {
      this.total = data.length
      this.busDetails = data
      this.date = new Date().toLocaleTimeString().slice(0, 5)
    })

    setTimeout(() => {
      let element=document.getElementById('busPropertiesContainer') as HTMLElement
      console.log(element);  
      if(element!==null) element.scrollIntoView({behavior:'smooth'})
    }, 1000);
    
    
    
  }

  constructor(private locationService: LocationService, private stateServive: StateService,private router:Router) { }

  ngOnInit(): void {
    this.cities = []
    this.city = new FormGroup({
      boardingLocation: new FormControl('Coimbatore', Validators.required),
      destinationLocation: new FormControl('Chennai', Validators.required),
      depatureDate: new FormControl('', Validators.required),
    })

    this.initialValues=this.city.value

    console.log(this.city.value);

    this.locationService.get('city/getAllCities').subscribe(data => {
      for (let i = 0; i < data.totalCities; i++) {
        this.cities.push(data.cities[i].city)
      }

    })
  }

}
