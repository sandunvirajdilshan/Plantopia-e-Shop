import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddUserComponent } from '../add-user/add-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})


export class NavbarUserComponent implements OnInit {

  constructor(
    private router: Router, 
    private dialog:MatDialog,
    ) {}

  ngOnInit() {}

  addForm () {
    this.dialog.open(AddUserComponent);
  }

  deleteForm () {
    this.dialog.open(DeleteUserComponent);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
