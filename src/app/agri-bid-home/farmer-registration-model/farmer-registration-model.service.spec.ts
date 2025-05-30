import { TestBed } from '@angular/core/testing';

import { FarmerRegistrationModelService } from './farmer-registration-model.service';

describe('FarmerRegistrationModelService', () => {
  let service: FarmerRegistrationModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerRegistrationModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
