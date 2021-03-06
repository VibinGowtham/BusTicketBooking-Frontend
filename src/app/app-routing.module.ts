import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'user',loadChildren:()=>import('./modules/forms/forms-routing.module').then(mod=>mod.FormsRoutingModule)},
  {path:'book',loadChildren:()=>import('./modules/book-ticket/book-ticket-routing.module').then(mod=>mod.BookTicketRoutingModule)},
  {path:'admin',loadChildren:()=>import('./modules/admin/admin/admin-routing.module').then(mod=>mod.AdminRoutingModule)},
  {path:'',redirectTo:'user/login',pathMatch:'full'},
  {path:'**',redirectTo:'user/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
