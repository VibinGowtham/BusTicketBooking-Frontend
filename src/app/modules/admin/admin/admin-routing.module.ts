import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/services/roleGuard/role.guard';
import { AddBusComponent } from './add-bus/add-bus.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateBusComponent } from './update-bus/update-bus.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {path:'admin',component:AdminComponent,canActivate:[RoleGuard]},
  {path:'admin/add-bus',component:AddBusComponent,canActivate:[RoleGuard]},
  {path:'add-user',component:AddUserComponent,canActivate:[RoleGuard]},
  {path:'update-bus',component:UpdateBusComponent,canActivate:[RoleGuard]},
  {path:'update-user',component:UpdateUserComponent,canActivate:[RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
