import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../../material/material.module';
import { AddBusComponent } from './add-bus/add-bus.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateBusComponent } from './update-bus/update-bus.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AddBusComponent,
    AddUserComponent,
    UpdateBusComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
