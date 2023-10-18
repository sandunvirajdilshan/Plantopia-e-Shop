import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProductServiceService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  ID!:string;
  productName!:string;
  productPrice!:string;
  productDescription!:string;
  imagePath!:string;
  date!: string;
  time!: string;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
    this.ID = product.id;
    this.productName = product.productName;
    this.productPrice = product.productPrice;
    this.productDescription = product.productDescription;
    this.imagePath = product.imagePath;
    this.setDefaultValues();
  }

  setDefaultValues() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().substr(0, 10);

    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    this.time = `${currentHour}:${currentMinute}`;
  }

  editProduct(): void {
    const payload = {
      id: this.ID,
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription,
      imagePath: this.imagePath,
      date: this.date,
      time: this.time,
    };
  
    this.productService.editProduct(this.ID,payload).subscribe(response => {
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
