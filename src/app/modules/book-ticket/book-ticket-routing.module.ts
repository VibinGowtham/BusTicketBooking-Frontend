import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';

const routes: Routes = [
  {path:'book-tickets',component:BookComponent},
  {path:'seat',component:SeatlayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookTicketRoutingModule { }
