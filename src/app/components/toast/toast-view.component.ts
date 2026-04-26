import { Component, inject } from '@angular/core';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
      @for (toast of toastService.toasts(); track toast.id) {
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
  toastService = inject(ToastService);
}