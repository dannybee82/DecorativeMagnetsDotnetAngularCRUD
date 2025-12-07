import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from '../../models/toast/toast-message.interface';
import { ToastType } from '../../models/toast/toast-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private _position: 'toast-center' | 'toast-start' | 'toast-end' | 'toast-top toast-start' | 'toast-top toast-center' | 'toast-top toast-end' | 'toast-start toast-middle' | 'toast-center toast-middle' | 'toast-end toast-middle' = 'toast-center';

  private _defaultToast: ToastMessage = {
    message: '',
    type: ToastType.NONE,
    position: this._position
  };

  toastState: BehaviorSubject<ToastMessage> = new BehaviorSubject<ToastMessage>(this._defaultToast);

  success(message: string): void {
    this.toastState.next({
      message: message,
      type: ToastType.SUCCESS,
      position: this._position
    });
  }

  warning(message: string): void {
    this.toastState.next({
      message: message,
      type: ToastType.WARNING,
      position: this._position
    });
  }

  error(message: string): void {
    this.toastState.next({
      message: message,
      type: ToastType.ERROR,
      position: this._position
    });
  }

}
