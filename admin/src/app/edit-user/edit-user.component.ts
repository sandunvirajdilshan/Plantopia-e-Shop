import { Component, Inject } from '@angular/core';
import { ProductServiceService } from '../services/product.service';
import { Router } from '@angular/router';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})


export class EditUserComponent {

  ID!:string;
  firstName!:string;
  lastName!:string;
  email!:string;
  date!: string;
  time!: string;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {
    this.ID = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.setDefaultValues();
  }

  setDefaultValues() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().substr(0, 10);

    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    this.time = `${currentHour}:${currentMinute}`;
  }

  editUser(): void {
    const payload = {
      id: this.ID,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      date: this.date,
      time: this.time,
    };
  
    this.productService.editUser(this.ID,payload).subscribe(response => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

}
