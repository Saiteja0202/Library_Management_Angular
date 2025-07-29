import { TestBed } from '@angular/core/testing';

import { BookCrudServiceService } from './book-crud-service.service';

describe('BookCrudServiceService', () => {
  let service: BookCrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
