import { Component, OnInit } from '@angular/core';
import { Fine, FinesServicesService } from './fines-services.service';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.css'],
  imports: [CommonModule, CurrencyPipe]
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
        Swal.fire('Error', 'Error fetching fines for admin.', 'error');
      });
    } else if (this.role === 'MEMBER' && this.memberId) {
      // Fetch fines for a specific member if role is MEMBER
      this.finesService.getFinesByMemberId(this.memberId).subscribe(data => {
        this.fines = data;
      }, error => {
        Swal.fire('Error', 'Error fetching fines for member.', 'error');
      });
    } else {
      Swal.fire('Error', 'Role or member ID not found.', 'error');
    }
  }

  payFine(fineId: number): void {
    this.finesService.payFine(fineId).subscribe({
      next: () => {
        Swal.fire('Success', 'Fine paid successfully.', 'success');
        this.ngOnInit();  // Refresh fines list after payment
      },
      error: (err) => {
        Swal.fire('Error', err.error.message || 'Error paying fine.', 'error');
      }
    });
  }
}
