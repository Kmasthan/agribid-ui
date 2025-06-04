import { TestBed } from '@angular/core/testing';

import { UserLoginPageModelService } from './user-login-page-model.service';

describe('UserLoginPageModelService', () => {
  let service: UserLoginPageModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginPageModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
