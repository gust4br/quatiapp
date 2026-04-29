import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../types/TodoItem.dto';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { ToastService } from '../../components/toast/toast.service';
import { Router } from '@angular/router';
import { TodoFormComponent } from "../../components/todo-form/todo-form.component";
import { ResumeComponent } from "../../components/resume/resume.component";

@Component({
  selector: 'app-main',
  imports: [TodoItemComponent, TodoFormComponent, ResumeComponent],
  templateUrl: './main.page.html',
})
export class MainPage implements OnInit {
  private readonly router = inject(Router);
  private readonly todoService = inject(TodoService);
  private readonly toast = inject(ToastService);
  todos = signal<TodoItem[]>([]);
  value: string = '';

  onInputChange(value: string): void {
    this.value = value;
  }

  onSubmit(todo: TodoItem): void {
    const label = todo.label || 'Tarefa';
    this.todoService.create(todo).subscribe({
      next: () => {
        this.loadTodos();
        this.toast.show(`✅ "${label}" adicionada à lista!`);
      },
      error: () => {
        this.toast.show('❌ Falha ao salvar', 'error');
      }
    });
  }

  onCheckboxChange(id: string): void {
    const todo = this.todos().find(t => t.id === id);
    const wasAlreadyCompleted = todo?.completed;
    const label = todo?.label || 'Tarefa';
    const emoji = wasAlreadyCompleted ? '↩️' : '✅';
    const message = wasAlreadyCompleted ? `${emoji} "${label}" desmarcado!` : `${emoji} "${label}" concluído!`;

    const previousTodos = this.todos();
    this.todos.update(current =>
      current.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );

    this.todoService.complete(id).subscribe({
      next: () => this.toast.show(message),
      error: () => {
        this.todos.set(previousTodos);
        this.toast.show('❌ Falha ao atualizar', 'error');
      }
    });
  }

  onDelete(id: string): void {
    const todo = this.todos().find(t => t.id === id);
    const label = todo?.label || 'Tarefa';
    const previousTodos = this.todos();
    this.todos.update(current => current.filter(t => t.id !== id));

    this.todoService.remove(id).subscribe({
      next: () => this.toast.show(`🗑️ "${label}" removido!`),
      error: () => {
        this.todos.set(previousTodos);
        this.toast.show('❌ Falha ao remover', 'error');
      }
    });
  }

  onUpdateTodo(newTodo: TodoItem): void {
    if (!newTodo.id) return;
    const label = newTodo.label || 'Tarefa';
    const previousTodos = this.todos();
    this.todos.update(current =>
      current.map(t => t.id === newTodo.id ? { ...t, ...newTodo } : t)
    );

    this.todoService.update(newTodo.id, newTodo).subscribe({
      next: () => this.toast.show(`✏️ "${label}" atualizada!`),
      error: () => {
        this.todos.set(previousTodos);
        this.toast.show('❌ Falha ao atualizar', 'error');
      }
    });
  }

  private loadTodos(): void {
    this.todoService.getAll().subscribe(todos => {
      this.todos.set(todos);

      if (todos.length === 0) {
        this.router.navigate(['/get-started']);
      }
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }
}