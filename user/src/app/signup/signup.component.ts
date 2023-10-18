import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  firstNameError = false;
  lastNameError = false;
  emailError = false;
  passwordError = false;
  confirmPasswordError: boolean = false;
  firstName!: string;
  lastName!:string;
  email!:string;
  password!:string;
  confirmPassword!: string;
  date!: string;
  time!: string;

  constructor(
    private http: HttpClient, 
    private router: Router
    ) 
    { 
      this.setDefaultValues();
    }

  private apiUrl = 'http://localhost:3000';

  setDefaultValues() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().substr(0, 10);

    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    this.time = `${currentHour}:${currentMinute}`;
  }

  onSubmit() {
    this.firstNameError = !this.validateName(this.firstName);
    this.lastNameError = !this.validateName(this.lastName);
    this.emailError = !this.validateEmail(this.email);
    this.passwordError = !this.validatePassword(this.password);

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password:this.password,
      date: this.date,
      time: this.time 
    }
    
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = true;
    } else {
      this.confirmPasswordError = false;
      if (!this.firstNameError && !this.lastNameError && !this.emailError && !this.passwordError) {
        this.http.post(`${this.apiUrl}/add-user`, payload)
          .subscribe(
            response => {
              console.log('User added successfully:', response);
              alert("User Account Created..!");
              this.router.navigate(['/login']);
            },
            error => {
              alert("Cannot Create User Account..!")
              console.error('Failed to add user:', error);
            }
          );
      }
    }

  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z]*$/;
    return namePattern.test(name) && name.length <= 30;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    return password.length >= 5 && password.length <= 20;
  }
}
