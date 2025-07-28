import { Component, OnInit } from '@angular/core';
import { NotificationsService, LibraryNotification } from './notifications-services.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [NgIf, NgFor]
})
export class NotificationsComponent implements OnInit {
  memberId: number = 0;
  role: string = '';
  notifications: LibraryNotification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('memberId');
    const storedRole = localStorage.getItem('role');

    if (storedId) {
      this.memberId = +storedId;
    }

    if (storedRole) {
      this.role = storedRole;
      this.loadNotifications();
    } else {
      console.warn('No role found in localStorage');
    }
  }

  loadNotifications(): void {
    if (this.role === 'ADMIN') {
      this.notificationsService.getAllNotifications().subscribe({
        next: (data) => {
          console.log('All notifications for ADMIN:', data);
          this.notifications = data;
        },
        error: (error) => {
          console.error('Error fetching all notifications:', error);
        }
      });
    } else if (this.role === 'MEMBER') {
      this.notificationsService.getNotificationsByMemberId(this.memberId).subscribe({
        next: (data) => {
          console.log('Member notifications:', data);
          this.notifications = data;
        },
        error: (error) => {
          console.error('Error fetching member notifications:', error);
        }
      });
    } else {
      console.warn('Unknown user role:', this.role);
    }
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
    return separatorIndex !== -1 ? fullMessage.slice(separatorIndex + 1).trim() : fullMessage;
  }
}
