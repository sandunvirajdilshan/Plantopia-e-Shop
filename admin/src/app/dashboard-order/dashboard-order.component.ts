import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductServiceService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.css']
})
export class DashboardOrderComponent implements OnInit {

  @ViewChild('input') input!: ElementRef;
  
  orders!: any[];

  constructor(
    private productService: ProductServiceService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.productService.getOrders().subscribe(
      (response: any[]) => {
        this.orders = response.reverse();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openOrderDetails(order: any) {
    this.dialog.open(OrderDetailsComponent, {
      data: { order },
      disableClose: true
    });
  }

  search() {
    const inputValue = this.input.nativeElement.value.trim().toLowerCase();
    if (inputValue) {
      this.orders = this.orders.filter((order) => {
        return order.order_id.toLowerCase().includes(inputValue) ||
          order.id.toString().toLowerCase().includes(inputValue);
      });
    } else {
      this.getOrders();
    }
  }

}
