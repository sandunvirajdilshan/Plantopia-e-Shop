import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id!: string;
  username!: string;
  password!: string;
  loginError!: string;

  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login() {
    this.httpClient.post<any>(`${this.apiUrl}/admin-login-detail`, { username: this.username, password: this.password })
      .subscribe(
        response => {
          if (response.success) {
            this.getAdminIdByUsername(this.username);
          } else {
            this.loginError = 'Invalid username or password';
          }
        },
        error => {
          console.error(error);
          this.loginError = 'Invalid Username or Password. Please try again.!';
        }
      );
  }

  getAdminIdByUsername(username: string) {
    this.httpClient.get<any>(`${this.apiUrl}/admin-id/${username}`)
      .subscribe(
        response => {
          if (response.success) {
            const id = response.id;
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', id);
            this.router.navigate(['/dashboard']);

          } else {
            console.error('Failed to fetch user ID');
          }
        },
        error => {
          console.error(error);
        }
      );
  }
}