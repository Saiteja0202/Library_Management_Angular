import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'



export interface BorrowingTransaction {
  transactionId: number;
  borrowDate: string;
  returnDate: string;
  status: string;
  book: { bookId: number ,bookName:string} | null;
 
  memberId:number;
  memberName:string;
}

@Injectable({
  providedIn: 'root'
})

export class BorrowingHistoryServiceService {
  private apiUrl = 'http://localhost:4321/member'; 
  private apiUrl1 = 'http://localhost:4321/books'; 
  constructor(private http: HttpClient) {}

  getTransactionsByMemberId(memberId: number): Observable<BorrowingTransaction[]> {
    return this.http.get<BorrowingTransaction[]>(`${this.apiUrl}/transactions/${memberId}`);
  }
  getAllTransactions(): Observable<BorrowingTransaction[]> {
    return this.http.get<BorrowingTransaction[]>(`${this.apiUrl1}/borrowing-transactions`);
  }
  getMemberById(memberId: number): Observable<any> {
    return this.http.get(`/member/${memberId}/profile`);
  }
}
