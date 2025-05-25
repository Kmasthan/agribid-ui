import { TestBed } from '@angular/core/testing';

import { AgriBidLoginOrSignUpService } from './agri-bid-login-or-sign-up.service';

describe('AgriBidLoginOrSignUpService', () => {
  let service: AgriBidLoginOrSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgriBidLoginOrSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
