import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RequestsServiceService } from './requests-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];

  constructor(private requestService: RequestsServiceService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  // Load all borrowing transactions (admin requests)
  loadRequests(): void {
    this.requestService.getAllTransactions().subscribe({
      next: (data) => {
        this.requests = data.map(req => ({ ...req, actionTaken: null }));
        console.log('Borrowing transactions loaded:', this.requests);
      },
      error: (err) => console.error('Failed to load transactions', err)
    });
  }

  // Accept Request
  acceptRequest(requestId: number, memberId: number, bookId: number): void {
    this.requestService.acceptRequest(requestId, memberId, bookId).subscribe({
      next: () => {
        Swal.fire('Success', 'Request accepted successfully.', 'success');
        this.loadRequests();
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'An error occurred.';
        Swal.fire('Error', 'Failed to accept request: ' + errorMessage, 'error');
      }
    });
  }

  // Reject Request
  rejectRequest(requestId: number, memberId: number, bookId: number): void {
    this.requestService.rejectRequest(requestId, memberId, bookId).subscribe({
      next: () => {
        Swal.fire('Success', 'Request rejected successfully.', 'success');
        this.loadRequests();
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'An error occurred.';
        Swal.fire('Error', 'Failed to reject request: ' + errorMessage, 'error');
      }
    });
  }
}
