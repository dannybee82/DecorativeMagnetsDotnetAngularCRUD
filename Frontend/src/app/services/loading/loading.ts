import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class Loading {
  
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}