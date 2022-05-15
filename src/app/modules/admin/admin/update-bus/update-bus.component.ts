import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.css']
})
export class UpdateBusComponent implements OnInit {
  date: any
  busId: any
  status: any
  message: any
  buses: any
  bus: any

  getUpdatedBuses() {
    this.adminService.get('getAllBuses').subscribe(data => {
      console.log(data);
      this.buses = data.results
      console.log(this.buses);
    })
  }

  removeEmpty(object: any) {
    for (let key in object) {
      if (object[key] == '') delete object[key]
    }
  }

  toggleUpdateForm() {
    let element = document.getElementById("updateFormContainer") as HTMLElement
    element.style.display = 'grid'
    element.scrollIntoView({ behavior: 'smooth' })
  }

  getBusDetails(event: any) {
    this.date = new Date()
    let year = this.date.getFullYear()
    let day = '0' + this.date.getDate()
    day = day.slice(-2)
    let month = '0' + this.date.getMonth()
    month = month.slice(-2)
    this.toggleUpdateForm()
    this.busId = event.target.attributes.id.nodeValue
    this.adminService.post('getBus', { id: this.busId }).subscribe(data => {
      console.log(data);
      this.bus = new FormGroup({
        name: new FormControl(data.name, Validators.required),
        busType: new FormControl(data.busType),
        boardingLocation: new FormControl(data.boardingLocation, Validators.required),
        destinationLocation: new FormControl(data.destinationLocation, Validators.required),
        pickupLocation: new FormControl(data.pickupLocation, Validators.required),
        dropLocation: new FormControl(data.dropLocation, Validators.required),
        price: new FormControl(data.price, Validators.pattern('[0-9]*$')),
        totalSeats: new FormControl(data.totalSeats, Validators.pattern('[0-9]{2}')),
        depatureDate: new FormControl(`${year}-${month}-${day}`),
        rating: new FormControl(data.rating, [Validators.min(1.0), Validators.max(5.0)]),
        depatureTime: new FormControl(data.depatureTime),
        arrivalTime: new FormControl(data.arrivalTime),
        totalTime: new FormControl(data.totalTime)
      })

    })

  }

  updateData() {
    this.bus.value.depatureDate = parseInt(this.bus.value.depatureDate.slice(8)) % 7
    // console.log(this.bus.value);
    let body = this.bus.value
    body.busId = this.busId
    console.log(body);

    this.adminService.post('updateBus', body).subscribe((data) => {
      console.log(data);
      if (data.status == 200) {
        this.getUpdatedBuses()
      }
      this.status = data.status
      this.message = data.message
      console.log(this.status);
      console.log(this.message);

      setTimeout(() => {
        this.status = 0
      }, 5000);
    })
  }

  deleteBus(event: any) {
    let busId = event.target.attributes.id.nodeValue
    console.log(busId);

    this.adminService.post('deleteBus', { busId: busId }).subscribe(data => {
      console.log(data);
      if (data.status == 200) {
        this.getUpdatedBuses()
      }
      this.status=data.status
      this.message=data.message
      setTimeout(() => {
        this.status=0
      }, 5000);
    })

  }
  closeForm() {
    let main = document.getElementById('tableContainer') as HTMLElement
    main.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.getElementById('updateFormContainer')!.style.display = 'none'
    }, 500);
  }

  close() {
    let main = document.getElementById('mainNav') as HTMLElement
    main.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.getElementById('updateBus')!.style.display = 'none'
    }, 500);
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

    // this.status=200
    // this.message="Bus Successfully deleted"
    this.getUpdatedBuses()

    this.bus = new FormGroup({
      name: new FormControl('', Validators.required),
      busType: new FormControl(''),
      boardingLocation: new FormControl('', Validators.required),
      destinationLocation: new FormControl('', Validators.required),
      pickupLocation: new FormControl('', Validators.required),
      dropLocation: new FormControl('', Validators.required),
      price: new FormControl(''),
      totalSeats: new FormControl(''),
      depatureDate: new FormControl(''),
      rating: new FormControl(''),
      depatureTime: new FormControl(''),
      arrivalTime: new FormControl(''),
      totalTime: new FormControl('')
    })
  }

}
