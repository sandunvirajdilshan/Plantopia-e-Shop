import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email!: string;
  password!: string;
  loginError!: string;

  private apiUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient, private router: Router) {}

  login() {
    this.httpClient.post<any>(`${this.apiUrl}/user-login-detail`, { email: this.email, password: this.password })
      .subscribe(
        response => {
          if (response.success) {
            this.getuserIdByEmail(this.email);
          } else {
            this.loginError = 'Invalid email or password';
          }
        },
        error => {
          console.error(error);
          this.loginError = 'Invalid Email or Password. Please try again.!';
        }
      );
  }

  getuserIdByEmail(email: string) {
    this.httpClient.get<any>(`${this.apiUrl}/user-id/${email}`)
      .subscribe(
        response => {
          if (response.success) {
            const id = response.id;
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', id);
            this.router.navigate(['']);

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