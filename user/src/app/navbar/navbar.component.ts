import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
  }
}
