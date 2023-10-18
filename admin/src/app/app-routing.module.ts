import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-product', component: DashboardProductComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-order', component: DashboardOrderComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
