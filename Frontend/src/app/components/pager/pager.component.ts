import { AfterViewInit, Component, ElementRef, OnInit, Signal, inject, viewChild, WritableSignal, signal } from '@angular/core';
import { PaginationAndPagerService } from '../../services/pagination-and-pager/pagination-and-pager.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})

export class PagerComponent implements OnInit, AfterViewInit {

  public productsPerPage?: number;
  public selectElement: Signal<ElementRef | undefined> = viewChild('selectEl');

  protected options: WritableSignal<number[]> = signal([4, 8, 16, 32, 64, 128]);

	private paginationAndPagerService = inject(PaginationAndPagerService);

  ngOnInit() : void {
    
  }

  ngAfterViewInit(): void {
    if(this.selectElement()) {
      let selectEl: HTMLSelectElement | undefined = this.selectElement()?.nativeElement;

      if(selectEl) {
        selectEl.value = this.productsPerPage != undefined ? this.productsPerPage.toString() !== '' ? this.productsPerPage?.toString()  : "8" : '8';
      }
    }
  }

  changePageSize($event: Event) {
    if($event.target instanceof HTMLSelectElement) {
      const el: HTMLSelectElement = $event.target as HTMLSelectElement;

      let parsed = parseInt(el.value);

      if(this.productsPerPage != parsed) {
        this.productsPerPage = parsed;
        this.paginationAndPagerService.updatePager(this.productsPerPage);
      }  
    }  
  }

}