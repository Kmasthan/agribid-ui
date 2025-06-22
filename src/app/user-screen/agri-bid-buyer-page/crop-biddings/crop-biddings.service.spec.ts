import { TestBed } from '@angular/core/testing';

import { CropBiddingsService } from './crop-biddings.service';

describe('CropBiddingsService', () => {
  let service: CropBiddingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropBiddingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
