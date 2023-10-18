import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { ProductServiceService } from '../services/product.service';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  productID!: string;

  constructor(private productService: ProductServiceService,
    private router: Router,
    private _dialogRef: DialogRef
  ) { }

  deleteProduct(): void {
    const payload = {
      id: this.productID
    };

    this.productService.deleteProduct(payload).subscribe(response => {
      this._dialogRef.close();
      window.location.reload();
    });
  }

}
