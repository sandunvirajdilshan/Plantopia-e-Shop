import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';

@Component({
  selector: 'app-navbar-order',
  templateUrl: './navbar-order.component.html',
  styleUrls: ['./navbar-order.component.css']
})
export class NavbarOrderComponent implements OnInit{

  constructor(
    private router: Router, 
    private dialog:MatDialog,
    ) {}

    ngOnInit() {}

    deleteForm () {
      this.dialog.open (DeleteOrderComponent)
    }
    
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

}
