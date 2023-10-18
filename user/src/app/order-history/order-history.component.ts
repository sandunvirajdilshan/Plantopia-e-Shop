import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})


export class OrderHistoryComponent implements OnInit {
  orderData: any[] = [];

  constructor(private productService: ProductServiceService) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.getOrder();
    }
  }

  getOrder() {
    const user_id = localStorage.getItem('id');
    this.productService.getOrder(user_id!).subscribe(
      (data) => {
        this.orderData = data.map((order) => ({
          ...order,
        })).reverse(); // Reverse the order of the array
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  updateOrder(order_id: string) {
    const user_id = localStorage.getItem('id');
    const status = 'Delivered';
    this.productService.updateOrder(user_id!, order_id, status!).subscribe(
      (response) => {
        console.log(response);
        this.getOrder();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteOrder(id: string) {
    this.productService.deleteOrder(id).subscribe(() => {
      this.getOrder();
    });
  }
}