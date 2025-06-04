import { TestBed } from '@angular/core/testing';

import { CropListingsService } from './crop-listings.service';

describe('CropListingsService', () => {
  let service: CropListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
