import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications-services.service';

describe('NotificationsServicesService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
