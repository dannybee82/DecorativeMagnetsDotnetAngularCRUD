import { TestBed } from '@angular/core/testing';

import { DecorativeMagnetsService } from './decorative-magnets.service';

describe('DecorativeMagnetsService', () => {
  let service: DecorativeMagnetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecorativeMagnetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
