import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  imports: [],
  templateUrl: './fullscreen.component.html',
  styleUrl: './fullscreen.component.scss',
})
export class FullscreenComponent {

  name: InputSignal<string | undefined> = input.required<string | undefined>(); 
  image: InputSignal<string | undefined> = input.required<string | undefined>();

  close: OutputEmitterRef<boolean> = output<boolean>();

}