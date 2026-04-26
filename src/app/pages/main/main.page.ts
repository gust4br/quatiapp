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
    this.todoService.create(todo).subscribe({
      next: () => {
        this.loadTodos();
        this.toast.show('Item salvo com sucesso');
      },
      error: () => {
        this.toast.show('Erro ao salvar item', 'error');
      }
    });
  }

  onCheckboxChange(id: string): void {
    const previousTodos = this.todos();
    this.todos.update(current =>
      current.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );

    this.todoService.complete(id).subscribe({
      next: () => this.toast.show('Item atualizado com sucesso'),
      error: () => {
        this.todos.set(previousTodos);
        this.toast.show('Erro ao atualizar item', 'error');
      }
    });
  }

  onDelete(id: string): void {
    const previousTodos = this.todos();
    this.todos.update(current => current.filter(t => t.id !== id));

    this.todoService.remove(id).subscribe({
      next: () => this.toast.show('Item removido com sucesso'),
      error: () => {
        this.todos.set(previousTodos);
        this.toast.show('Erro ao remover item', 'error');
      }
    });
  }

  onUpdateTodo(newTodo: TodoItem): void {
    if (!newTodo.id) return;
    const previousTodos = this.todos();
    this.todos.update(current =>
      current.map(t => t.id === newTodo.id ? { ...t, ...newTodo } : t)
    );

    this.todoService.update(newTodo.id, newTodo).subscribe({
      next: () => this.toast.show('Item atualizado com sucesso'),
      error: () => {
        this.todos.set(previousTodos);
        this.toast.show('Erro ao atualizar item', 'error');
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