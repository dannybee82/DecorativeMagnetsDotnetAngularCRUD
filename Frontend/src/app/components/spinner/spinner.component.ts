import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {

  protected showSpinner: WritableSignal<boolean> = signal(false);

  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((isLoading: boolean) => {
      this.showSpinner.set(isLoading);
    });
  }

}
