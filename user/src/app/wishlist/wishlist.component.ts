import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ProductServiceService } from '../services/product-service.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})


export class WishlistComponent implements OnInit {
  wishlistData: any[] = [];
  isEmptyWishlist: boolean = true;

  constructor(
    private productService: ProductServiceService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.productService.getWishlist(userId).subscribe(
        (wishlistItems: any[]) => {
          this.wishlistData = wishlistItems;
          this.isEmptyWishlist = wishlistItems.length === 0;
        },
        (error) => {
          console.error('Error fetching wishlist data:', error);
        }
      );
    }
  }

  removeItem(id: string) {
    this.productService.deleteWishlistItem(id).subscribe(
      () => {
        this.wishlistData = this.wishlistData.filter((item) => item.id !== id);
        this.isEmptyWishlist = this.wishlistData.length === 0;
        alert('Item removed from wishlist.');
      },
      (error) => {
        console.error('Error removing item from wishlist:', error);
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
}
