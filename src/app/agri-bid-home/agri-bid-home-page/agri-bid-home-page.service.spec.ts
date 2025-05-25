import { TestBed } from '@angular/core/testing';

import { AgriBidHomePageService } from './agri-bid-home-page.service';

describe('AgriBidHomePageService', () => {
  let service: AgriBidHomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgriBidHomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
