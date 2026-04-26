import { Component, inject } from '@angular/core';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 w-full sm:w-auto px-4 sm:p-0">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="px-4 py-2 rounded-lg shadow-lg text-white text-sm text-center"
          [class.bg-green-600]="toast.type === 'success'"
          [class.bg-red-600]="toast.type === 'error'"
          [class.animate-fade-in]="!toast.removing"
          [class.animate-fade-out]="toast.removing"
        >
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
    .animate-fade-out { animation: fade-out 0.3s ease-out; }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}