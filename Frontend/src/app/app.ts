import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent, ToastComponent],
  template: `
    <router-outlet />
    <app-spinner />
    <app-toast />
  `
})
export class App {
  protected readonly title = signal('DecorativeMagnetsFrontend');
}
