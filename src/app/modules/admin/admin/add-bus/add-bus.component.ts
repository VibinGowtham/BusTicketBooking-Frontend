import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {
initialFormValues:any
  bus: any
  message: any
  status: any

  close() {
    let main = document.getElementById('mainNav') as HTMLElement
    main.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.getElementById('addBus')!.style.display = 'none'
    }, 500);

  }

  removeEmpty(object: any) {
    for (let key in object) {
      if (object[key] == '' || object[key] === null) delete object[key]
    }
  }

  postData() {
    // console.log(this.bus.value.depatureDate);
    this.bus.value.depatureDate=parseInt(this.bus.value.depatureDate.slice(8))%7
    console.log(this.bus.value.depatureDate);
    
    let body = this.bus.value
    this.removeEmpty(body)
    console.log(body);
    this.adminService.post('addBus', body).subscribe(data => {
      console.log(data);
      this.status = data.status
      this.message = data.message
    })
    setTimeout(() => {
      this.status = 0
    }, 10000)
    this.bus.reset(this.initialFormValues)
    
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.bus = new FormGroup({
      name: new FormControl('', Validators.required),
      busType: new FormControl(''),
      boardingLocation: new FormControl('', Validators.required),
      destinationLocation: new FormControl('', Validators.required),
      pickupLocation: new FormControl('', Validators.required),
      dropLocation: new FormControl('', Validators.required),
      price: new FormControl('', Validators.pattern('[0-9]*$')),
      totalSeats: new FormControl('', Validators.pattern('[0-9]{2}')),
      depatureDate: new FormControl(''),
      rating: new FormControl('', [Validators.min(1.0), Validators.max(5.0)]),
      depatureTime: new FormControl(''),
      arrivalTime: new FormControl(''),
      totalTime: new FormControl('')
    })
    this.initialFormValues= this.bus.value
    
  }

}
