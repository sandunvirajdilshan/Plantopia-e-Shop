import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

import { ProductServiceService } from '../services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productName!: string;
  productPrice!: string;
  productDescription!: string;
  imagePath!:string;
  date!: string;
  time!: string;

  constructor(private productService: ProductServiceService,
    private router: Router,
    private _dialogRef: DialogRef
  ) {
    this.setDefaultValues();
  }

  setDefaultValues() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().substr(0, 10);

    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    this.time = `${currentHour}:${currentMinute}`;
  }

  addProduct(): void {
    const payload = {
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription,
      imagePath: this.imagePath,
      date: this.date,
      time: this.time
    };

    this.productService.addProduct(payload).subscribe(response => {
      this._dialogRef.close();
      window.location.reload();
    });
  }
}
