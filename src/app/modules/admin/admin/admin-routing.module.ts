import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/services/roleGuard/role.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'admin',component:AdminComponent,canActivate:[RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
