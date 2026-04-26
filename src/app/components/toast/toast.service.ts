import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  private id = 0;

  show(message: string, type: Toast['type'] = 'success'): void {
    const id = ++this.id;
    this.toasts.update(current => [...current, { id, message, type }]);
    setTimeout(() => this.remove(id), 3000);
  }

  private remove(id: number): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}