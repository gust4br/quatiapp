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
    this.todoService.create(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  onCheckboxChange(id: string): void {
    this.todoService.complete(id).subscribe(() => {
      this.loadTodos();
    });
  }

  onDelete(id: string): void {
    this.todoService.remove(id).subscribe(() => {
      this.loadTodos();
    });
  }

  onUpdateTodo(newTodo: TodoItem): void {
    if (!newTodo.id) return;
    this.todoService.update(newTodo.id, newTodo).subscribe(() => {
      this.loadTodos();
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