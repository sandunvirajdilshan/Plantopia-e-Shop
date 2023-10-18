import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

import { ProductServiceService } from '../services/product.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!:string;
  date!: string;
  time!: string;

  constructor(private productService: ProductServiceService,
    private router: Router,
    private dialogRef: DialogRef
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

  addUser(): void {
    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      date: this.date,
      time: this.time
    };

    this.productService.addUser(payload).subscribe(response => {
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
