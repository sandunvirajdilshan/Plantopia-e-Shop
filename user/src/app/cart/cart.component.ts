import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ohsGYRDKKybnbj: any[] = [];
  total: number = 0;
  isEmptyCart: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductServiceService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.getCart();
    }
  }

  getCart() {
    const userId = localStorage.getItem('id');
    this.productService.getCart(userId!).subscribe(
      (data) => {
        this.ohsGYRDKKybnbj = data.map(item => ({
          ...item,
          quantity: 1
        }));
        this.calculateTotal();
        this.checkCartEmpty();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateTotal() {
    this.total = this.ohsGYRDKKybnbj.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);
  }

  removeItem(id: string) {
    this.productService.deleteCartItem(id).subscribe(() => {
      this.getCart();
    });
  }

  updateQuantity() {
    this.calculateTotal();
  }

  validateInput(event: any) {
    const inputValue = event.target.value;
    if (inputValue < 0) {
      event.target.value = '0';
    } else {
      const item = event.target.dataset.item;
      if (item) {
        this.ohsGYRDKKybnbj[item].quantity = parseInt(inputValue, 10);
        this.calculateTotal();
      }
    }
  }

  disableTyping(event: any) {
    event.preventDefault();
  }

  checkout() {
    this.router.navigate(['/buy'], {
      queryParams: {
        ohsGYRDKKybnbj: btoa(JSON.stringify(this.ohsGYRDKKybnbj)),
        total: this.total
      }
    });
    
  }

  checkCartEmpty() {
    this.isEmptyCart = this.ohsGYRDKKybnbj.length === 0;
  }
}
