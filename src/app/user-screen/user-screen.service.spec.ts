import { TestBed } from '@angular/core/testing';

import { UserScreenService } from './user-screen.service';

describe('UserScreenService', () => {
  let service: UserScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
