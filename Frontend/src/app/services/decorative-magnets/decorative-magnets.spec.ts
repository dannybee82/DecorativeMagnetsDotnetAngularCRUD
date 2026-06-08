import { TestBed } from '@angular/core/testing';
import { DecorativeMagnets } from './decorative-magnets';
import { describe, beforeEach, it, expect } from 'vitest';

describe('DecorativeMagnetsService', () => {
  let service: DecorativeMagnets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecorativeMagnets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});