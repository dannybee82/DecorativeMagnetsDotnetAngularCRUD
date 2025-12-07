import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { ToastMessage } from '../../models/toast/toast-message.interface';
import { ToastType } from '../../models/toast/toast-type.enum';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {

  toastType: WritableSignal<ToastType> = signal(ToastType.NONE);
  message: WritableSignal<string> = signal('');
  position: WritableSignal<string> = signal('');
  isVisible: WritableSignal<boolean> = signal(false);

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.toastState.subscribe((state: ToastMessage) => {
      this.toastType.set(state.type);
      this.message.set(state.message);
      this.position.set(state.position);
      this.isVisible.set(true);

      setTimeout(() => {
        this.reset();
      }, 5000);
    });
  }

  getEnum(): typeof ToastType {
    return ToastType;
  }

  private reset(): void {
    this.isVisible.set(false);
    this.toastType.set(ToastType.NONE);
    this.message.set('');
    this.position.set('');
  }

}