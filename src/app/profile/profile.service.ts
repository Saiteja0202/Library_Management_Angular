import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:4321';

  constructor(private http: HttpClient) {}

  private getMemberId(): string | null {
    return localStorage.getItem('memberId');
  }

  updateProfile(profileData: any): Observable<any> {
    const memberId = this.getMemberId();
    if (!memberId) throw new Error('Member ID not found in localStorage');
    return this.http.put(`${this.baseUrl}/member/${memberId}/update`, profileData);
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    const memberId = this.getMemberId();
    console.log(memberId);
    
    if (!memberId) throw new Error('Member ID not found in localStorage');
    const payload = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return this.http.put(`${this.baseUrl}/member/${memberId}/update-password`, payload);
    
  }

  getProfile(): Observable<any> {
    const memberId = this.getMemberId();
    console.log(memberId);
    
    if (!memberId) throw new Error('Member ID not found in localStorage');
    return this.http.get(`${this.baseUrl}/member/${memberId}/profile`);
  }
}
