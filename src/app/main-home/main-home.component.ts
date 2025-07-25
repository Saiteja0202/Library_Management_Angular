import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookListComponent } from "../book/book-list/book-list.component";
import { BookDetailsDialogComponent } from "../book/book-details-dialog/book-details-dialog.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-home',
  imports: [RouterOutlet,RouterLink,NgIf],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.css'
})
export class MainHomeComponent {

  isBookLinkEnabled: boolean = false;

  ngOnInit(): void {
    // Simulate some logic to enable the "Books" link after initialization
    // This can be an API call, user authentication check, etc.
    setTimeout(() => {
      this.isBookLinkEnabled = true;  // Enable the link after 2 seconds (or based on your logic)
    }, 2000); // You can change the delay or the condition based on your needs.
  }

}
