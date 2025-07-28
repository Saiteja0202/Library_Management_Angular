// fines-services.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Fine {
  fineId: number;
  memberId:number;
  bookId?: number;
  amount: number;
  fineStatus: string;
  transactionDate: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class FinesServicesService {

  private baseUrl = 'http://localhost:4321/fines';

  constructor(private http: HttpClient) {}

  getFinesByMemberId(memberId: number): Observable<Fine[]> {
    return this.http.get<Fine[]>(`${this.baseUrl}/${memberId}`);
  }

  payFine(fineId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/pay/${fineId}`, null, {
      responseType: 'text' as const
    });
  }

  getAllFines(): Observable<Fine[]> {
    return this.http.get<Fine[]>(`${this.baseUrl}/all-fines`);
  }

}
