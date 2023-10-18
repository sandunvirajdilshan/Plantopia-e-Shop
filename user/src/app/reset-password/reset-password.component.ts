import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  email!: string;
  newPassword!: string;
  cNewPassword!: string;
  isReadOnlyP = true;

  private apiUrl = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.email = data.email;
  }

  ngOnInit() { }


  toggleEditP() {
    this.isReadOnlyP = !this.isReadOnlyP;
  }

  cancelEditP() {
    this.isReadOnlyP = true;
  }

  updatePassword() {
    if (!this.newPassword || !this.cNewPassword) {
      alert('Please fill in all the password fields');
      return;
    }

    if (this.newPassword !== this.cNewPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    const passwordData = {
      email: this.email,
      newPassword: this.newPassword
    };

    this.httpClient.put<any>(`${this.apiUrl}/update-password`, passwordData)
      .subscribe(
        response => {
          if (response.success) {
            console.log('Password updated successfully');
            alert('Password Updated Successfully..,')
            this.clearPasswordFields();
            this.router.navigate(['/login']);
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
    this.newPassword = '';
    this.cNewPassword = '';
  }

}
