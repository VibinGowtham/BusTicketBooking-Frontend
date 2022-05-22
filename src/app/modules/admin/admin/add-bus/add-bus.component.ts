import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {
  initialFormValues: any
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

  convertToLowerCase(string:String){
      return string.toLowerCase()
  }

  postData() {
    let dialogRef = this.dialog.open(LoadingComponent, { disableClose: true })
    let body = this.bus.value
    this.removeEmpty(body)
    if( this.bus.value.depatureDate) this.bus.value.depatureDate = parseInt(this.bus.value.depatureDate.slice(8)) % 7
    this.bus.value.name=this.convertToLowerCase(this.bus.value.name)
    this.bus.value.boardingLocation=this.convertToLowerCase(this.bus.value.boardingLocation)
    this.bus.value.destinationLocation=this.convertToLowerCase(this.bus.value.destinationLocation)
  
    this.adminService.post('addBus', body).subscribe(data => {
      this.bus.reset(this.initialFormValues);
      dialogRef.close();
      console.log(data);
      this.status = data.status
      this.message = data.message
    })

    setTimeout(() => {
      this.status = 0
    }, 10000)

  }

  constructor(private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.bus = new FormGroup({
      name: new FormControl('', Validators.required),
      busType: new FormControl(''),
      boardingLocation: new FormControl('', Validators.required),
      destinationLocation: new FormControl('', Validators.required),
      pickupLocation: new FormControl('', Validators.required),
      dropLocation: new FormControl('', Validators.required),
      price: new FormControl('', Validators.pattern('[0-9]{2,4}')),
      totalSeats: new FormControl('', [Validators.pattern('[0-9]{2}'), Validators.min(12), Validators.max(24)]),
      depatureDate: new FormControl(''),
      rating: new FormControl('', [Validators.pattern('[0-9]{1}.[0-9]{1}'), Validators.min(1), Validators.max(5)]),
      depatureTime: new FormControl(''),
      arrivalTime: new FormControl(''),
      totalTime: new FormControl('')
    })
  }
}
