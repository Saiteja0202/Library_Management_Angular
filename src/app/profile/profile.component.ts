import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

interface Profile {
  name: string;
  email: string;
  address?: string;
  phone: string;
  borrowingLimit?: number;
  membershipStatus?: string;
  membershipExpiryDate?: string;
  username?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ProfileComponent implements OnInit {
  isEditMode = false;
  isPasswordUpdateVisible = false;

  profile: Profile = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };
  editableProfile: Profile = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  currentPassword = '';
  newPassword = '';

  readonly onlyAlphabetsPattern = '^[a-zA-Z ]*$';
  readonly passwordPattern = '^.{6,20}$';

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: data => {
        console.log(data);
        this.profile = data;
        data.membershipStatus;
      },
      error: err => console.error('Failed to fetch profile', err)
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.editableProfile = { ...this.profile };
    }
  }

  togglePasswordUpdate(): void {
    this.isPasswordUpdateVisible = true;
  }

  closePasswordModal(): void {
    this.isPasswordUpdateVisible = false;
    this.router.navigate(['/member/profile']);
  }

  closePasswordModal1(): void {
    setTimeout(() => {
      this.isPasswordUpdateVisible = false;
      this.router.navigate(['/member/profile']);
    }, 1000);
  }
  

  submitPasswordUpdate(form: NgForm): void {
    if (form.valid) {
      this.profileService.updatePassword(this.currentPassword, this.newPassword).subscribe({
        next: res => {
          Swal.fire('Success', 'Password updated successfully!', 'success');
          this.closePasswordModal();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            Swal.fire('Error', 'Current password is incorrect.', 'error');
          } else if (err.status === 401) {
            Swal.fire('Unauthorized', 'Please login first.', 'warning');
          } else {
            console.error('Password update failed:', err);
            Swal.fire('Error', 'An error occurred while updating the password.', 'error');
          }
        }
      });
    }
  }

  saveProfile(form: NgForm): void {
    if (form.valid) {
      this.profileService.updateProfile(this.editableProfile).subscribe({
        next: () => {
          console.log('Profile updated successfully');
          this.profile = { ...this.editableProfile };
          this.isEditMode = false;
          Swal.fire('Success', 'Profile updated successfully!', 'success');
        },
        error: err => {
          console.log('error 123');
          console.error('Profile update failed:', err);
        }
      });
    }
  }


  confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete your profile.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteProfile().subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'Your profile has been deleted.',
              'success'
            ).then(() => {
              localStorage.clear();
              this.router.navigate(['/registration']);
            });
          },
          error: (err) => {
            console.error('Deletion failed', err);
            Swal.fire(
              'Error',
              'Failed to delete profile. Please try again later.',
              'error'
            );
          }
        });
      }
    });
  }

  upgradeToPrime(): void {
    Swal.fire({
      title: 'Upgrade to Prime?',
      text: 'Do you want to upgrade to Prime and get +10 borrowing limit?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Upgrade',
      cancelButtonText: 'No',
      confirmButtonColor: '#4e54c8',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.activateMembership(1).subscribe({
          next: (res) => {
            // Refresh profile data
            this.profileService.getProfile().subscribe({
              next: updated => {
                this.profile = updated;
                Swal.fire(
                  'Upgraded!',
                  `You have successfully upgraded to Prime. Your borrowing limit is ${this.profile.borrowingLimit}`,
                  'success'
                );
              },
              error: err => {
                console.error('Failed to refresh profile:', err);
                Swal.fire('Error', 'Upgraded, but failed to fetch new profile data.', 'warning');
              }
            });
          },
          error: err => {
            console.error('Activation failed:', err);
            Swal.fire('Error', 'Failed to upgrade to Prime.', 'error');
          }
        });
      }
    });
  }
  
  
}
