import { TestBed } from '@angular/core/testing';
import { DecorativeMagnetsService } from './decorative-magnets.service';
import { describe, beforeEach, it, expect } from 'vitest';

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