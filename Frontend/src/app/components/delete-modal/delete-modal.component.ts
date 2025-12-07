import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {

  title: InputSignal<string> = input.required();
  message: InputSignal<string> = input.required();
  additionalText: InputSignal<string> = input.required();
  cancelText: InputSignal<string> = input.required();
  deleteText: InputSignal<string> = input.required();

  delete: OutputEmitterRef<boolean> = output<boolean>();
  
}