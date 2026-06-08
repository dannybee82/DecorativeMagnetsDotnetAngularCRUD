import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Spinner } from './components/spinner/spinner';
import { Toastr } from './components/toast/toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner, Toastr],
  template: `
    <router-outlet />
    <app-spinner />
    <app-toast />
  `
})
export class App {
  protected readonly title = signal('DecorativeMagnetsFrontend');
}