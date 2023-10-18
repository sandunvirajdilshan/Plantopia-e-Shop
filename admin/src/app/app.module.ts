import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarProductComponent } from './navbar-product/navbar-product.component';
import { LoginComponent } from './login/login.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { NavbarOrderComponent } from './navbar-order/navbar-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardProductComponent,
    NavbarProductComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    DashboardComponent,
    DashboardUserComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    NavbarUserComponent,
    NavbarComponent,
    DashboardOrderComponent,
    NavbarOrderComponent,
    OrderDetailsComponent,
    DeleteOrderComponent
  ],
  imports: [
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
