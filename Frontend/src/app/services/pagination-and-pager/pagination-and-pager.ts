import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationAndPagerInterface } from '../../models/pagination-and-pager/pagination-and-pager.interface';

@Service()
export class PaginationAndPager {
  
  private _defaultPaginationAndPager: PaginationAndPagerInterface = {
    pageNumber: 1,
    pageSize: 8,
    totalPages: 0
  }

  paginationAndPager: BehaviorSubject<PaginationAndPagerInterface> = new BehaviorSubject<PaginationAndPagerInterface>(structuredClone(this._defaultPaginationAndPager));

  updatePagination(pageNumber: number): void {
    const data: PaginationAndPagerInterface = this.paginationAndPager.getValue();
    data.pageNumber = pageNumber;
    this.paginationAndPager.next(data);
  }

  updatePager(pageSize: number): void {
    const data: PaginationAndPagerInterface = this.paginationAndPager.getValue();
    data.pageSize = pageSize;
    data.pageNumber = 1;
    this.paginationAndPager.next(data);
  }

  updateTotalPages(totalPages: number): void {
    const data: PaginationAndPagerInterface = this.paginationAndPager.getValue();
    data.totalPages = totalPages;
    this.paginationAndPager.next(data);
  }

  reset(): void {
    this.paginationAndPager.next(structuredClone(this._defaultPaginationAndPager));
  }

}