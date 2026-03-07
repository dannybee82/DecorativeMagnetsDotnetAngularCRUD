import { Injectable } from '@angular/core';
import { SortAlphabetically } from '../../models/sort/sort.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  
  private _defaultSort: SortAlphabetically = {
    sort: 'DEFAULT'
  }

  sortState: BehaviorSubject<SortAlphabetically> = new BehaviorSubject<SortAlphabetically>(this._defaultSort);

}
