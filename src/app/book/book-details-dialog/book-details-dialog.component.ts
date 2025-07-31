import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service'; // Adjust path as per your auth setup
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details-dialog',
  imports: [CommonModule],
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public book: any, public auth: AuthService, private dialogRef: MatDialogRef<BookDetailsDialogComponent>, private router: Router) {}

  borrowBook() {
    if (!this.auth.isLoggedIn()) {
      Swal.fire('Login Required', 'Please login to borrow a book.', 'warning');
      return;
    }

    // TODO: Call borrow service here
    Swal.fire('Success', `Book "${this.book.bookName}" borrowed successfully!`, 'success');
  }

  redirectToLogin() {
    this.dialogRef.close(); // close the dialog first
    this.router.navigate(['/login']); // navigate to login page
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
