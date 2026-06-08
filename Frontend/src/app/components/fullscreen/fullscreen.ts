import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  imports: [],
  templateUrl: './fullscreen.html',
  styleUrl: './fullscreen.scss',
})
export class Fullscreen {

  name: InputSignal<string | undefined> = input.required<string | undefined>(); 
  image: InputSignal<string | undefined> = input.required<string | undefined>();

  close: OutputEmitterRef<boolean> = output<boolean>();

}