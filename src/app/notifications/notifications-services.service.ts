import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LibraryNotification {
  notificationId: number;
  dateSent: string;
  message: string;
  overDues: number;
  book: {
    bookId: number;
    bookName: string;
    author: string;
    genre: string;
    yearPublished: number;
  };
  fineId?: number;
  memberId: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private baseUrl = 'https://librarymanagementsystemlive-production.up.railway.app/notifications';

  constructor(private http: HttpClient) {}

  getNotificationsByMemberId(memberId: number): Observable<LibraryNotification[]> {
    return this.http.get<LibraryNotification[]>(`${this.baseUrl}/${memberId}`);
  }

  getAllNotifications(): Observable<LibraryNotification[]> {
    return this.http.get<LibraryNotification[]>(`${this.baseUrl}/get-all`);
  }
  
  
}
