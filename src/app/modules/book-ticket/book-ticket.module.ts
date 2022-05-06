import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookTicketRoutingModule } from './book-ticket-routing.module';
import { BookComponent } from './book/book.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    BookTicketRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookTicketModule { }
