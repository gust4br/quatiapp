import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../types/TodoItem.dto';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [TodoItemComponent, InputComponent],
  templateUrl: './main.page.html',
})
export class MainPage implements OnInit {
  private readonly router = inject(Router);
  private readonly todoService = inject(TodoService);
  todos: TodoItem[] = [];
  value: string = '';

  onInputChange(value: string): void {
    this.value = value;
  }

  onSubmit(): void {
    if (!this.value.trim()) {
      return;
    }
    this.todoService.push(this.value);
    this.todos = this.todoService.getAll();
    this.value = '';
  }

  onCheckboxChange(id: string): void {
    this.todoService.complete(id);
    this.todos = this.todoService.getAll();
  }

  onDelete(id: string): void {
    this.todoService.remove(id);
    this.todos = this.todoService.getAll();
  }

  ngOnInit(): void {
    this.todos = this.todoService.getAll();

    if (this.todos.length === 0) {
      this.router.navigate(['/get-started']);
    }
  }
}
