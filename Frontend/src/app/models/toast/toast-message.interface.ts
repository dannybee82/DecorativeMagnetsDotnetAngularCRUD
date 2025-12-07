import { ToastType } from "./toast-type.enum";

export interface ToastMessage {
    message: string,
    type: ToastType,
    position: 'toast-center' | 'toast-start' | 'toast-end' | 'toast-top toast-start' | 'toast-top toast-center' | 'toast-top toast-end' | 'toast-start toast-middle' | 'toast-center toast-middle' | 'toast-end toast-middle'
}