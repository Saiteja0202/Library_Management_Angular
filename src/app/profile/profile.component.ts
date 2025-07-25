import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[FormsModule, CommonModule]
})
export class ProfileComponent implements OnInit {

  isEditMode: boolean = false;
  isPasswordUpdateVisible: boolean = false;

  profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Cityville',
    phone_number: '1234567890',
    borrowingLimit: 5,
    membershipStatus: 'Prime',  // 'Prime' or 'Standard'
    membershipExpiryDate: '2025-12-31',
    username: 'john123'
  };


  readonly onlyAlphabetsPattern = '^[a-zA-Z ]*$'; // only alphabets and spaces
  readonly passwordPattern = '^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$'; // at least one letter and one digit


  currentPassword = '';
  newPassword = '';
  

  ngOnInit(): void {}

  constructor(private router: Router) {}

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
    }
  }

  togglePasswordUpdate() {
    this.isPasswordUpdateVisible = true;
  }

  closePasswordModal() {
    this.isPasswordUpdateVisible = false;
    this.router.navigate(['/profile']);
  }

  submitPasswordUpdate(passwordForm: NgForm) {
    if (passwordForm.valid) {
      console.log('Password updated:', this.newPassword);
      this.closePasswordModal(); // Close the modal after successful update
    } else {
      console.log('Password form is invalid!');
    }
  }
  saveProfile(profileForm: NgForm) {
    if (profileForm.valid) {
      console.log('Profile saved:', this.profile);
      this.isEditMode = false; // Close the edit form
    } else {
      console.log('Form is invalid!');
    }
  }
}
