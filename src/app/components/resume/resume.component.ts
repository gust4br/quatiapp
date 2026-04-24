import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../types/TodoItem.dto';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
})
export class ResumeComponent {
  private readonly todoService = inject(TodoService);
  todos: Signal<TodoItem[]> = toSignal(this.todoService.getAll(), { initialValue: [] });

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