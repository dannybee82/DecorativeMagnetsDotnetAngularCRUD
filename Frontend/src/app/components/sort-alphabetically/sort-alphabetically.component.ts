import { Component, inject, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { SortAlphabetically } from '../../models/sort/sort.interface';
import { SortService } from '../../services/sort/sort.service';

@Component({
  selector: 'app-sort-alphabetically',
  imports: [],
  templateUrl: './sort-alphabetically.component.html',
  styleUrl: './sort-alphabetically.component.scss',
})
export class SortAlphabeticallyComponent implements OnInit {

  isAscending: WritableSignal<boolean> = signal(false);
  isDescending: WritableSignal<boolean> = signal(false);

  private sortService = inject(SortService);

  ngOnInit(): void {
    this.sortService.sortState.subscribe((data: SortAlphabetically) => {
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
    const sort: SortAlphabetically = {
      sort: this.isAscending() ? 'ASC' : this.isDescending() ? 'DESC' : undefined
    };

    this.sortService.sortState.next(sort);
  }

}