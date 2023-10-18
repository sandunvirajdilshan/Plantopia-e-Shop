import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';


@Component({
  selector: 'app-navbar-product',
  templateUrl: './navbar-product.component.html',
  styleUrls: ['./navbar-product.component.css']
})


export class NavbarProductComponent implements OnInit {

  constructor(
    private router: Router, 
    private dialog:MatDialog,
    ) {}

  ngOnInit() {}

  addForm () {
    this.dialog.open (AddProductComponent)
  }

  deleteForm () {
    this.dialog.open (DeleteProductComponent)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
