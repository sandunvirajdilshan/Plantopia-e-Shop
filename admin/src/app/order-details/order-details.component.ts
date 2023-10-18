import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProductServiceService } from '../services/product.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  firstName!: String;
  lastName!: String;
  email!: String;
  order: any;

  constructor(@Inject(MAT_DIALOG_DATA) 
    private data: any,
    private productService: ProductServiceService,
    private dialogRef: DialogRef
  ) {
    this.order = data.order;
    this.getUserDetails();
  }

  updateOrderS(order_id: string) {
    const user_id = this.order.user_id;
    const status = 'Shipped';
    this.productService.updateOrder(user_id!, order_id, status!).subscribe(
      (response) => {
        this.dialogRef.close();
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateOrderP(order_id: string) {
    const user_id = this.order.user_id;
    const status = 'Processing';
    this.productService.updateOrder(user_id!, order_id, status!).subscribe(
      (response) => {
        this.dialogRef.close();
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserDetails() {
    const userId = this.order.user_id;
    this.productService.getUserDetails(userId).subscribe(
      (response) => {
        this.firstName = response.user.firstName;
        this.lastName = response.user.lastName;
        this.email = response.user.email;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

}
