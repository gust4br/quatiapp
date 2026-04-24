import { Component, input } from '@angular/core';
import { TodoItem } from '../../types/TodoItem.dto';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
})
export class ResumeComponent {
  todos = input.required<TodoItem[]>();

  formatNumberToBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  getUnselectedTotal(): string {
    const items = this.todos();
    const total = items
      .filter(item => !item.completed)
      .reduce((sum, item) => sum + (item.value * item.quantity), 0);
    if (isNaN(total)) return 'R$ 0,00';
    return this.formatNumberToBRL(total);
  }

  getSelectedTotal(): string {
    const items = this.todos();
    const total = items
      .filter(item => item.completed)
      .reduce((sum, item) => sum + (item.value * item.quantity), 0);
    if (isNaN(total)) return 'R$ 0,00';
    return this.formatNumberToBRL(total);
  }

  getGrandTotal(): string {
    const items = this.todos();
    const total = items.reduce((sum, item) => sum + (item.value * item.quantity), 0);
    if (isNaN(total)) return 'R$ 0,00';
    return this.formatNumberToBRL(total);
  }
}