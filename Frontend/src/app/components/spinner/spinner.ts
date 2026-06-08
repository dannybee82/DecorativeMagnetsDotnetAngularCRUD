import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Loading } from '../../services/loading/loading';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner implements OnInit {

  protected showSpinner: WritableSignal<boolean> = signal(false);

  private loadingService = inject(Loading);

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((isLoading: boolean) => {
      this.showSpinner.set(isLoading);
    });
  }

}