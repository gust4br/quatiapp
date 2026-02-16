import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
})
export class ResumeComponent {
  readonly todoService = inject(TodoService);

  formatNumberToBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  getUnselectedTotal(): string {
    const items = this.todoService.getAll();
    const total = items
      .filter(item => !item.completed)
      .reduce((sum, item) => sum + (item.value * item.quantity), 0);
    if (isNaN(total)) return 'R$ 0,00';
    return this.formatNumberToBRL(total);
  }

  getSelectedTotal(): string {
    const items = this.todoService.getAll();
    const total = items
      .filter(item => item.completed)
      .reduce((sum, item) => sum + (item.value * item.quantity), 0);
    if (isNaN(total)) return 'R$ 0,00';
    return this.formatNumberToBRL(total);
  }

  getGrandTotal(): string {
    const items = this.todoService.getAll();
    const total = items.reduce((sum, item) => sum + (item.value * item.quantity), 0);
    if (isNaN(total)) return 'R$ 0,00';
    return this.formatNumberToBRL(total);
  }
}
