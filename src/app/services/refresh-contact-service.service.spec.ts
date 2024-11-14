import { TestBed } from '@angular/core/testing';

import { RefreshContactServiceService } from './refresh-contact-service.service';

describe('RefreshContactServiceService', () => {
  let service: RefreshContactServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshContactServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
