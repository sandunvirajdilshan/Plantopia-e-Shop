import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})


export class ProductDetailComponent {
 
  product: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductServiceService,
    private router: Router
  ) {
    this.product = data.product;
  }

  addToCart(product: any) {
    const userId = localStorage.getItem('id');
    if (userId) {
      const payload = {
        user_id: userId,
        productName: product.productName,
        productPrice: product.productPrice
      };
  
      this.productService.getCart(userId).subscribe(
        (cartData: any[]) => {
          const existingProduct = cartData.find(
            (item) => item.productName === product.productName
          );
          if (existingProduct) {
            alert('Product is already in your cart!');
          } else {
            this.productService.addToCart(payload).subscribe(
              () => {
                alert('Product added to your Cart.,');
              },
              (error) => {
                console.error('Error adding product to cart:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching cart data:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

}
