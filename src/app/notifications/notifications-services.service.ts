import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LibraryNotification {
  notificationId: number;
  dateSent: string;
  message: string;
  overDues: number;
  bookId?: number;
  fineId?: number;
  memberId: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private baseUrl = 'http://localhost:4321/notifications';

  constructor(private http: HttpClient) {}

  getNotificationsByMemberId(memberId: number): Observable<LibraryNotification[]> {
    return this.http.get<LibraryNotification[]>(`${this.baseUrl}/${memberId}`);
  }
  
}
