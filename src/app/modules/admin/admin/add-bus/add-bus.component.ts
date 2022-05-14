import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {

  bus: any
  message:any
  status:any

close(){
  let main=document.getElementById('mainNav') as HTMLElement
  main.scrollIntoView({behavior:'smooth'})
  setTimeout(() => {
    document.getElementById('addBus')!.style.display='none'
  }, 500);
 
}

  removeEmpty(object: any) {
    for (let key in object) {
      if (object[key] == '') delete object[key]
    }
  }

  postData() {
      // console.log(this.bus.value);
    let body=this.bus.value
    this.removeEmpty(body)
    this.adminService.post('addBus', body).subscribe(data => {
      console.log(data);
      this.status=data.status
      this.message=data.message
    })
    setTimeout(()=>{
      this.status=0
    },10000)
    this.bus.reset()
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // this.message="User Successfully registered"
    // this.status=200
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
