import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/authGuard/auth.guard';
import { BookComponent } from './book/book.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';

const routes: Routes = [
  { path: 'book-tickets', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'seat', component: SeatlayoutComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookTicketRoutingModule { }
