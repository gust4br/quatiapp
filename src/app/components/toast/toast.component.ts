import { Component, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-toast',
  template: `
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
      @for (toast of toasts(); track toast.id) {
        <div
          class="px-4 py-2 rounded-lg shadow-lg text-white text-sm"
          [class.bg-green-600]="toast.type === 'success'"
          [class.bg-red-600]="toast.type === 'error'"
        >
          {{ toast.message }}
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
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