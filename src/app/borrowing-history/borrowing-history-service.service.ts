import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

export interface BorrowingTransaction {
  transactionId: number;
  borrowDate: string;
  returnDate: string;
  status: string;
  book: { bookId: number } | null;
  member: { memberId: number };
}

@Injectable({
  providedIn: 'root'
})

export class BorrowingHistoryServiceService {
  private apiUrl = 'http://localhost:4321/member'; // Base API URL

  constructor(private http: HttpClient) {}

  getTransactionsByMemberId(memberId: number): Observable<BorrowingTransaction[]> {
    return this.http.get<BorrowingTransaction[]>(`${this.apiUrl}/transactions/${memberId}`);
  }
  
}
