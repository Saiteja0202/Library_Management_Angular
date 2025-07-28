import { Component, OnInit } from '@angular/core';
import { BorrowingHistoryServiceService, BorrowingTransaction } from './borrowing-history-service.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-borrowing-history',
  templateUrl: './borrowing-history.component.html',
  styleUrls: ['./borrowing-history.component.css'],
  imports:[NgFor]
})
export class BorrowingHistoryComponent implements OnInit {
  borrowingHistory: BorrowingTransaction[] = [];
  memberId: number = 2;

  constructor(private historyService: BorrowingHistoryServiceService) {}

  ngOnInit(): void {
    this.historyService.getTransactionsByMemberId(this.memberId).subscribe({
      next: (data) => {this.borrowingHistory = data;
        // console.log('Transactions:', data);

      },
      error: (err) => {console.error('Failed to load transactions:', err);
        console.error('Failed to load transactions:', err);
      }
    });
  }
}
