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
    this.todoService.push(todo);
    this.todos.update(todos => [...todos, todo]);
  }

  onCheckboxChange(id: string): void {
    this.todoService.complete(id);
    this.todos.set(this.todoService.getAll());
  }

  onDelete(id: string): void {
    this.todoService.remove(id);
    this.todos.set(this.todoService.getAll());
  }

  onUpdateTodo(newTodo: TodoItem): void {
    this.todoService.update(newTodo);
    this.todos.set(this.todoService.getAll());
  }

  ngOnInit(): void {
    this.todos.set(this.todoService.getAll());
    if (this.todos().length === 0) {
      this.router.navigate(['/get-started']);
    }
  }
}
