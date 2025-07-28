import { TestBed } from '@angular/core/testing';

import { BorrowingHistoryServiceService } from './borrowing-history-service.service';

describe('BorrowingHistoryServiceService', () => {
  let service: BorrowingHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowingHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
