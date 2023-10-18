import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router, 
    private dialog:MatDialog,
    ) {}

  ngOnInit() {}
  
  addForm () {}

  deleteForm () {}
   

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
