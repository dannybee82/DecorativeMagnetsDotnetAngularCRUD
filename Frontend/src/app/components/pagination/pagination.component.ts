import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { PaginationAndPagerService } from '../../services/pagination-and-pager/pagination-and-pager.service';
import { PaginationAndPager } from '../../models/pagination-and-pager/pagination-and-pager.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  public totalPages: WritableSignal<number> = signal(0);

  private _currentPageNumber: WritableSignal<number> = signal(1);
  private _paginationAmount: WritableSignal<number> = signal(3);

  hasPrevious: Signal<boolean> = computed(() => {
    return this._currentPageNumber() - 1 > 0 ? false : true;
  });

  hasNext: Signal<boolean> = computed(() => {
    return this._currentPageNumber() + 1 <= this.totalPages() ? false : true;
  });

	private paginationAndPagerService = inject(PaginationAndPagerService);

  ngOnInit(): void {
    this.paginationAndPagerService.paginationAndPager.subscribe((pagination: PaginationAndPager) => {
      this._currentPageNumber.set(pagination.pageNumber);
      this.totalPages.set(pagination.totalPages);
    });
  }

  getPagination() : string[] {
    let start: number = (this._currentPageNumber() < 1) ? 1 : this._currentPageNumber();
    let end: number = (start + this._paginationAmount() < this.totalPages()) ? start + this._paginationAmount() : this.totalPages();

    if(start + this._paginationAmount() > this.totalPages() && start > 1) {
      start -= 1;
    }    

    let arr: string[] = [];
    
    for(let i = start; i <= end; i++) {
      arr.push((i) + "");
    }

    return arr;
  }

  isCurrentPageIndex(value: string) : boolean {
    let parsed: number = parseInt(value);
    return (parsed === this._currentPageNumber()) ? true : false;
  }

  setPageIndex(value: string) : void {
    let parsed: number = parseInt(value);
    this._currentPageNumber.set(parsed);
    this.paginationAndPagerService.updatePagination(this._currentPageNumber());
  }

  previousPage() : void {
    if(this._currentPageNumber() - 1 > 0) {
      this._currentPageNumber.set(this._currentPageNumber() - 1);
      this.paginationAndPagerService.updatePagination(this._currentPageNumber());
    }
  }

  nextPage() : void {
    if(this._currentPageNumber() + 1 <= this.totalPages()) {
      this._currentPageNumber.set(this._currentPageNumber() + 1);
      this.paginationAndPagerService.updatePagination(this._currentPageNumber());
    }
  }

}