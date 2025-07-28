import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: 'login.component.css'
})
export class LoginComponent {
  userName = '';
  userPassword = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.userName, this.userPassword).subscribe({
      next: (response: { [key: string]: string }) => {
        localStorage.setItem('authToken', response['token']);
        localStorage.setItem('memberId', response['memberId']);
        localStorage.setItem('role', response['role']); 
  
        if (response['role'] === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/member']);
        }
      },
      error: (err) => {
        console.error("Error occurred:", err);
        this.error = 'Invalid credentials';
      }
    });
  }
  
  
  
  
  
}
  
