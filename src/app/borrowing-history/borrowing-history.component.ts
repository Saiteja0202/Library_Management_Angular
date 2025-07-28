import { Component, OnInit } from '@angular/core';
import { BorrowingHistoryServiceService, BorrowingTransaction } from './borrowing-history-service.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-borrowing-history',
  templateUrl: './borrowing-history.component.html',
  styleUrls: ['./borrowing-history.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class BorrowingHistoryComponent implements OnInit {
  borrowingHistory: BorrowingTransaction[] = [];
  memberId!: number;
  role: string | null = null;

  constructor(private historyService: BorrowingHistoryServiceService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    const storedMemberId = localStorage.getItem('memberId');

    if (this.role === 'ADMIN') {
      this.historyService.getAllTransactions().subscribe({
        next: (data) => {this.borrowingHistory = data;
          console.log(this.borrowingHistory);

        },
        error: (err) => console.error('Failed to load all transactions:', err)
      });
    } else if (this.role === 'MEMBER' && storedMemberId) {
      this.memberId = parseInt(storedMemberId, 10);
      this.historyService.getTransactionsByMemberId(this.memberId).subscribe({
        next: (data) => this.borrowingHistory = data,
        error: (err) => console.error('Failed to load member transactions:', err)
      });
    } else {
      console.error('Invalid role or missing memberId');
    }
  }
}

