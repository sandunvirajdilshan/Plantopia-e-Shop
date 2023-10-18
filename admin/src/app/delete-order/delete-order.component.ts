import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { ProductServiceService } from '../services/product.service';


@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})

export class DeleteOrderComponent {

  order_id!: string;

  constructor(private productService: ProductServiceService,
    private router: Router,
    private _dialogRef: DialogRef
  ) { }

  deleteOrder(){
    const payload = {
      id: this.order_id
    };

    this.productService.deleteOrder(payload).subscribe(response => {
      this._dialogRef.close();
      window.location.reload();
    });
  }


}
