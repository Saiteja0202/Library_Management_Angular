import { Component, OnInit } from '@angular/core';
import { Fine, FinesServicesService } from './fines-services.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.css'],
  imports: [NgIf, NgFor, CurrencyPipe]
})
export class FinesComponent implements OnInit {
  fines: Fine[] = [];
  role: string | null = null;
  memberId: number | null = null;

  constructor(private finesService: FinesServicesService) {}

  ngOnInit(): void {
    // Get the role and memberId from localStorage
    this.role = localStorage.getItem('role');
    this.memberId = Number(localStorage.getItem('memberId'));

    // Based on the role, fetch fines
    if (this.role === 'ADMIN') {
      // Fetch all fines for ADMIN
      this.finesService.getAllFines().subscribe(data => {
        this.fines = data;
      }, error => {
        alert('Error fetching fines for admin.');
      });
    } else if (this.role === 'MEMBER' && this.memberId) {
      // Fetch fines for a specific member if role is MEMBER
      this.finesService.getFinesByMemberId(this.memberId).subscribe(data => {
        this.fines = data;
      }, error => {
        alert('Error fetching fines for member.');
      });
    } else {
      alert('Role or member ID not found.');
    }
  }

  payFine(fineId: number): void {
    this.finesService.payFine(fineId).subscribe({
      next: () => {
        alert('Fine paid successfully.');
        this.ngOnInit();  // Refresh fines list after payment
      },
      error: (err) => {
        alert(err.error.message || 'Error paying fine.');
      }
    });
  }
}
