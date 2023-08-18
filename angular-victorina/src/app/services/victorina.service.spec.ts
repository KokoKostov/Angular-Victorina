import { TestBed } from '@angular/core/testing';

import { VictorinaService } from './victorina.service';

describe('VictorinaService', () => {
  let service: VictorinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictorinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
