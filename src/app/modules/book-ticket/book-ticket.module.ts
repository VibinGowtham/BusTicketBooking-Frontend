import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookTicketRoutingModule } from './book-ticket-routing.module';
import { BookComponent } from './book/book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';
import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [
    BookComponent,
    SeatlayoutComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    BookTicketRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class BookTicketModule { }
