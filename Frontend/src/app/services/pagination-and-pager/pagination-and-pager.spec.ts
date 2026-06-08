import { TestBed } from '@angular/core/testing';
import { PaginationAndPager } from './pagination-and-pager';
import { describe, beforeEach, it, expect } from 'vitest';

describe('PaginationAndPagerService', () => {
  let service: PaginationAndPager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationAndPager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});