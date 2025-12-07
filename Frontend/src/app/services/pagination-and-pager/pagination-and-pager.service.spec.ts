import { TestBed } from '@angular/core/testing';

import { PaginationAndPagerService } from './pagination-and-pager.service';

describe('PaginationAndPagerService', () => {
  let service: PaginationAndPagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationAndPagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
