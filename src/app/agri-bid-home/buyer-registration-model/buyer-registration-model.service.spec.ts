import { TestBed } from '@angular/core/testing';

import { BuyerRegistrationModelService } from './buyer-registration-model.service';

describe('BuyerRegistrationModelService', () => {
  let service: BuyerRegistrationModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerRegistrationModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
