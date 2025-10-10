// src/app/services/requests-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsServiceService {

  private apiUrl = 'https://librarymanagementsystemlive-production.up.railway.app/admin'; // Base URL for admin APIs

  constructor(private http: HttpClient) { }

  // Fetch all transactions (admin requests view)
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/requests`);
  }


acceptRequest(transactionId: number, memberId: number, bookId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/accept/${transactionId}/${memberId}/${bookId}`, {});
}

rejectRequest(transactionId: number, memberId: number, bookId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/reject/${transactionId}/${memberId}/${bookId}`, {});
}

}
