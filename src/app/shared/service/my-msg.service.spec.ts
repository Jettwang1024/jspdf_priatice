import { TestBed } from '@angular/core/testing';

import { MyMsgService } from './my-msg.service';

describe('MyMsgService', () => {
  let service: MyMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
