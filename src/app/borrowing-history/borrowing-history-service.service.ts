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
  private apiUrl = 'https://librarymanagementsystemlive-production.up.railway.app/member'; 
  private apiUrl1 = 'https://librarymanagementsystemlive-production.up.railway.app/books'; 
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
