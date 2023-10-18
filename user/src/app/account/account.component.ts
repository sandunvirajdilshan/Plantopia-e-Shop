import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  email!: string;
  date!: string;
  time!: string;
  currentPassword!: string;
  newPassword!: string;
  cNewPassword!: string;
  isReadOnlyA = true;
  isReadOnlyP = true;
  id = localStorage.getItem('id');

  private apiUrl = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute, 
    private httpClient: HttpClient
  ) {
    this.setDefaultValues();
  }

  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.getUserDetails(userId);
    }
  }

  setDefaultValues() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().substr(0, 10);

    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
    this.time = `${currentHour}:${currentMinute}`;
  }

  getUserDetails(id: string) {
    this.httpClient.get<any>(`${this.apiUrl}/user/${id}`)
      .subscribe(
        response => {
          if (response.success) {
            const user = response.user;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
          } else {
            console.error('Failed to fetch user details');
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  toggleEditA() {
    this.isReadOnlyA = !this.isReadOnlyA;
  }

  cancelEditA() {
    this.isReadOnlyA = true;
  }

  toggleEditP() {
    this.isReadOnlyP = !this.isReadOnlyP;
  }

  cancelEditP() {
    this.isReadOnlyP = true;
  }

  saveDetails() {
    const updatedUser = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      date: this.date,
      time: this.time
    };

    this.httpClient.put<any>(`${this.apiUrl}/update-user/${this.id}`, updatedUser)
      .subscribe(
        response => {
          if (response.success) {
            console.log('User details updated successfully');
            alert('Details Updated Successfully..,')
            this.toggleEditA();
          } else {
            console.error('Failed to update user details');
            alert('Details Updated Fail Try Again..,')
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  updatePassword() {
    if (!this.currentPassword || !this.newPassword || !this.cNewPassword) {
      alert('Please fill in all the password fields');
      return;
    }

    if (this.newPassword !== this.cNewPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    const passwordData = {
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.httpClient.put<any>(`${this.apiUrl}/update-password`, passwordData)
      .subscribe(
        response => {
          if (response.success) {
            console.log('Password updated successfully');
            alert('Password Updated Successfully..,')
            this.clearPasswordFields();
            this.cancelEditP();
          } else {
            console.error('Failed to update password');
            alert('Failed to update password. Please check your current password.');
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  clearPasswordFields() {
    this.currentPassword = '';
    this.newPassword = '';
    this.cNewPassword = '';
  }
}
