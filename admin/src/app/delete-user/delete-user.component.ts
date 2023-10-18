import { Component } from '@angular/core';
import { ProductServiceService } from '../services/product.service';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})


export class DeleteUserComponent {

  userID!: string;

  constructor(private productService: ProductServiceService,
    private router: Router,
    private dialogRef: DialogRef
  ) { }

  deleteUser(): void {
    const payload = {
      id: this.userID
    };

    this.productService.deleteUser(payload).subscribe(response => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

}
