import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service'; // Adjust path as per your auth setup

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public book: any, public auth: AuthService, private dialogRef: MatDialogRef<BookDetailsDialogComponent>) {}

  borrowBook() {
    if (!this.auth.isLoggedIn()) {
      alert('Please login to borrow a book.');
      return;
    }

    // TODO: Call borrow service here
    alert(`Book "${this.book.bookName}" borrowed successfully!`);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
