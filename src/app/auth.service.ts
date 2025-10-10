import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://librarymanagementsystemlive-production.up.railway.app/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ [key: string]: string }> {
    const body = {
      userName: username,
      userPassword: password
    };
    console.log("yeah");

    return this.http.post<{ [key: string]: string }>(
      'https://librarymanagementsystemlive-production.up.railway.app/login',
      body
    );
  }




  saveToken(username: string, password: string): void {
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('authToken', token);
 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
    
  }

  isLoggedIn(): boolean{
      return this.getToken() != null || this.getToken() != undefined;
  }
}
