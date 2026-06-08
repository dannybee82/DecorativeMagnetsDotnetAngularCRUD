import { Service } from '@angular/core';
import { SortAlphabeticallyInterface } from '../../models/sort/sort.interface';
import { BehaviorSubject } from 'rxjs';

@Service()
export class Sort {
  
  private _defaultSort: SortAlphabeticallyInterface = {
    sort: 'DEFAULT'
  }

  sortState: BehaviorSubject<SortAlphabeticallyInterface> = new BehaviorSubject<SortAlphabeticallyInterface>(this._defaultSort);

}