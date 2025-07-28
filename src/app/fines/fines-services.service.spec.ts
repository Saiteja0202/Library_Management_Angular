import { TestBed } from '@angular/core/testing';

import { FinesServicesService } from './fines-services.service';

describe('FinesServicesService', () => {
  let service: FinesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
