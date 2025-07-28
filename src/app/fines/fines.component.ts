// fines.component.ts
import { Component, OnInit } from '@angular/core';
import { Fine, FinesServicesService } from './fines-services.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.css'],
  imports:[NgIf,NgFor,CurrencyPipe]
})
export class FinesComponent implements OnInit {
  fines: Fine[] = [];

  constructor(private finesService: FinesServicesService) {}

  ngOnInit(): void {
    const memberId = Number(localStorage.getItem('memberId'));
    if (memberId) {
      this.finesService.getFinesByMemberId(memberId).subscribe(data => {
        this.fines = data;
      });
    } else {
      alert('Member ID not found in localStorage.');
    }
  }

  payFine(fineId: number) {
    this.finesService.payFine(fineId).subscribe({
      next: () => {
        alert('Fine paid successfully.');

        this.ngOnInit();
      },
      error: err => {
        alert(err.error.message || 'Error paying fine.');
      }
    });
  }
}
