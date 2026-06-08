import { TestBed } from '@angular/core/testing';
import { Sort } from './sort';
import { describe, beforeEach, it, expect } from 'vitest';

describe('SortService', () => {
  let service: Sort;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sort);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
