import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationAndPager } from '../../models/pagination-and-pager/pagination-and-pager.interface';

@Injectable({
  providedIn: 'root',
})
export class PaginationAndPagerService {
  
  private _defaultPaginationAndPager: PaginationAndPager = {
    pageNumber: 1,
    pageSize: 8,
    totalPages: 0
  }

  paginationAndPager: BehaviorSubject<PaginationAndPager> = new BehaviorSubject<PaginationAndPager>(structuredClone(this._defaultPaginationAndPager));

  updatePagination(pageNumber: number): void {
    const data: PaginationAndPager = this.paginationAndPager.getValue();
    data.pageNumber = pageNumber;
    this.paginationAndPager.next(data);
  }

  updatePager(pageSize: number): void {
    const data: PaginationAndPager = this.paginationAndPager.getValue();
    data.pageSize = pageSize;
    data.pageNumber = 1;
    this.paginationAndPager.next(data);
  }

  updateTotalPages(totalPages: number): void {
    const data: PaginationAndPager = this.paginationAndPager.getValue();
    data.totalPages = totalPages;
    this.paginationAndPager.next(data);
  }

  reset(): void {
    this.paginationAndPager.next(structuredClone(this._defaultPaginationAndPager));
  }

}