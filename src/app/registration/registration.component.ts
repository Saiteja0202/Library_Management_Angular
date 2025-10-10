import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
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
    this.http.post('https://librarybackendtest-production.up.railway.app/member/register', this.member, {
      responseType: 'text'
    })
    
    .subscribe({
      next: () => {
        Swal.fire('Success', 'Registration successful!', 'success');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error || 'Registration failed. Try again.';
        Swal.fire('Error', this.errorMessage, 'error');
      }
    });
  }
}
