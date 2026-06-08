import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SortAlphabeticallyInterface } from '../../models/sort/sort.interface';
import { Sort } from '../../services/sort/sort';

@Component({
  selector: 'app-sort-alphabetically',
  imports: [],
  templateUrl: './sort-alphabetically.html',
  styleUrl: './sort-alphabetically.scss',
})
export class SortAlphabetically implements OnInit {

  isAscending: WritableSignal<boolean> = signal(false);
  isDescending: WritableSignal<boolean> = signal(false);

  private sortService = inject(Sort);

  ngOnInit(): void {
    this.sortService.sortState.subscribe((data: SortAlphabeticallyInterface) => {
      if(data.sort !== 'DEFAULT') {
        switch(data.sort) {
          case 'ASC':
            this.isAscending.set(true);
            break;
          case 'DESC':
            this.isDescending.set(true);
            break;
        }
      }
    });
  }

  sortAction(): void {
    const sort: SortAlphabeticallyInterface = {
      sort: this.isAscending() ? 'ASC' : this.isDescending() ? 'DESC' : undefined
    };

    this.sortService.sortState.next(sort);
  }

}