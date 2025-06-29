import { TestBed } from '@angular/core/testing';

import { QuickChatService } from './quick-chat.service';

describe('QuickChatService', () => {
  let service: QuickChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
