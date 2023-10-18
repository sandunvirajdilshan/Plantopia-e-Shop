import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  private apiUrl = 'http://localhost:3000';
  email: string = '';
  otp: string = '';
  isEmailValid: boolean = false;
  isOtpValid: boolean = false;
  showOtpInput: boolean = false;
  generatedOtp: string = '';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
    ) {}

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isEmailValid = emailPattern.test(this.email);
  }

  generateOtp() {
    if (this.isEmailValid) {
      this.http.get(`${this.apiUrl}/listUserByEmail/${this.email}`).subscribe(
        (response: any) => {
          if (response && response.email === this.email) {
            this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Generated OTP:', this.generatedOtp);
            this.showOtpInput = true;
          } else {
            alert('Account not found. Please check the email address!');
          }
        },
        (error: any) => {
          alert('Account not found. Please check the email address!');
        }
      );
    } else {
      console.log('Invalid Email');
    }
  }
  

  validateOtp() {
    const otpPattern = /^[0-9]{6}$/;
    this.isOtpValid = otpPattern.test(this.otp);
  }

  verifyOtp() {
    if (this.otp === this.generatedOtp) {
      const dialogRef = this.dialog.open(ResetPasswordComponent, {
        data: { email: this.email }
      });
    } else {
      alert('Incorrect OTP code');
    }
  }
}
