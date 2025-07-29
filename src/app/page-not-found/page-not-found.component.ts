import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [CommonModule, RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(private router: Router, private authService: AuthService) {}

  handleBackClick() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/member/book-lists']);
    } else {
      this.router.navigate(['']);
    }
  }

}
