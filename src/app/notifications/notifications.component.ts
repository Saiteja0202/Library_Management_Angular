import { Component, OnInit } from '@angular/core';
import { NotificationsService, LibraryNotification } from './notifications-services.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports:[NgIf,NgFor]
})
export class NotificationsComponent implements OnInit {
  memberId: number = 0;
  notifications: LibraryNotification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('memberId');
    if (storedId) {
      this.memberId = +storedId;
      this.loadNotifications();
    } else {
      console.warn('No memberId found in localStorage');
    }
  }

  loadNotifications(): void {
    this.notificationsService.getNotificationsByMemberId(this.memberId).subscribe({
      next: (data) => {
        console.log('Notifications received:', data);
        this.notifications = data;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }

  getMessageType(fullMessage: string): string {
    if (fullMessage.startsWith("Urgent Reminder:")) {
      return "Urgent Reminder";
    } else if (fullMessage.startsWith("Reminder:")) {
      return "Reminder";
    } else if (fullMessage.startsWith("Overdue:")) {
      return "Overdue";
    } else if (fullMessage.startsWith("Fine Paid & Book Returned:")) {
      return "Fine Paid & Book Returned";
    } else {
      return "Library Notification";
    }
  }

  getMessageContent(fullMessage: string): string {
    const separatorIndex = fullMessage.indexOf(":");
    if (separatorIndex !== -1) {
      return fullMessage.slice(separatorIndex + 1).trim();
    }
    return fullMessage;
  }
}
