import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  imports: [NgFor, NgIf,NgClass]
})
export class RequestsComponent implements OnInit {

  requests: any[] = [];  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRequests(); 
  }

  loadRequests(): void {
    this.requests = [
      {
        transactionId: 1,
        memberId: 101,
        memberName: 'John Doe',
        bookId: 201,
        bookName: 'Angular for Beginners',
        status: 'pending' 
      },
      {
        transactionId: 2,
        memberId: 102,
        memberName: 'Jane Smith',
        bookId: 202,
        bookName: 'Mastering TypeScript',
        status: 'pending' 
      },
      {
        transactionId: 3,
        memberId: 103,
        memberName: 'Michael Johnson',
        bookId: 203,
        bookName: 'Reactive Programming in JavaScript',
        status: 'pending' 
      }
    ];

  }

  acceptRequest(requestId: number): void {
    console.log(`Accepted request with ID: ${requestId}`);
    const request = this.requests.find(r => r.transactionId === requestId);
    if (request) {
      request.status = 'accepted';
    }
    alert('Request accepted');
  }

  rejectRequest(requestId: number): void {
    console.log(`Rejected request with ID: ${requestId}`);
    const request = this.requests.find(r => r.transactionId === requestId);
    if (request) {
      request.status = 'rejected';
    }
    alert('Request rejected');
  }
}
