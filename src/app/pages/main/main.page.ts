import { Component, inject, OnInit } from '@angular/core';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { InputComponent } from '../../components/input/input.component';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../types/TodoItem.dto';

@Component({
  selector: 'app-main',
  imports: [CheckboxComponent, InputComponent],
  templateUrl: './main.page.html',
})
export class MainPage implements OnInit {
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

  ngOnInit(): void {
    this.todos = this.todoService.getAll();
  }
}
