import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
  removing?: boolean;
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

  remove(id: number): void {
    this.toasts.update(current =>
      current.map(t => t.id === id ? { ...t, removing: true } : t)
    );
    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }, 300);
  }
}