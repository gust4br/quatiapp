import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../types/TodoItem.dto';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
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
  todos = signal<TodoItem[]>([]);
  value: string = '';

  onInputChange(value: string): void {
    this.value = value;
  }

  onSubmit(todo: TodoItem): void {
    const tempId = crypto.randomUUID();
    const optimisticTodo: TodoItem = { ...todo, id: tempId, completed: false };
    this.todos.update(current => [...current, optimisticTodo]);

    this.todoService.create(todo).subscribe({
      error: () => this.todos.update(current => current.filter(t => t.id !== tempId))
    });
  }

  onCheckboxChange(id: string): void {
    const previousTodos = this.todos();
    this.todos.update(current =>
      current.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );

    this.todoService.complete(id).subscribe({
      error: () => this.todos.set(previousTodos)
    });
  }

  onDelete(id: string): void {
    const previousTodos = this.todos();
    this.todos.update(current => current.filter(t => t.id !== id));

    this.todoService.remove(id).subscribe({
      error: () => this.todos.set(previousTodos)
    });
  }

  onUpdateTodo(newTodo: TodoItem): void {
    if (!newTodo.id) return;
    const previousTodos = this.todos();
    this.todos.update(current =>
      current.map(t => t.id === newTodo.id ? { ...t, ...newTodo } : t)
    );

    this.todoService.update(newTodo.id, newTodo).subscribe({
      error: () => this.todos.set(previousTodos)
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