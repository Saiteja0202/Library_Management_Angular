import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone:false,
  templateUrl: './registration.component.html',
  styleUrl:'./registration.component.css'
})
export class RegistrationComponent {
  member = {
    name: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
  };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.http.post('http://localhost:4321/member/register', this.member,{
      responseType: 'text'  
    })
      .subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']); 
        },
        error: err => {
          console.log(err);
          this.errorMessage = err.error || 'Registration failed. Try again.';
        }
      });
  }
}
