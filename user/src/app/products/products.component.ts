import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isHeartActive: boolean = false;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchProductData();
  }

  fetchProductData() {
    this.productService.getProductData().subscribe(
      (data: any[]) => {
        console.log('Product data:', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  openProductDetails(product: any) {
    this.dialog.open(ProductDetailComponent, {
      data: { product},
      width:'400px',
      height:'470px'
    });
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

  addToWishlist(product: any) {
    const userId = localStorage.getItem('id');
    if (userId) {
      const payload = {
        user_id: userId,
        productName: product.productName,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        imagePath: product.imagePath
      };
  
      this.productService.getWishlist(userId).subscribe(
        (wishlistItems: any[]) => {
          const existingProduct = wishlistItems.find(
            (item) => item.productName === product.productName
          );
          if (existingProduct) {
            alert('Product already in your Wishlist!');
          } else {
            this.productService.addToWishlist(payload).subscribe(
              () => {
                alert('Product added to your Wishlist.');
              },
              (error) => {
                console.error('Error adding product to Wishlist:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching Wishlist data:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  
}
