import { TestBed } from '@angular/core/testing';

import { MyCropBidsService } from './my-crop-bids.service';

describe('MyCropBidsService', () => {
  let service: MyCropBidsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCropBidsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
