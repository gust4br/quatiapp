import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../types/TodoItem.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './intro.page.html',
})
export class IntroPage implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly router = inject(Router);

  options: TodoItem[] = [
    { label: 'Batata Frita', completed: false, quantity: 0, value: 0 },
    { label: 'Alho', completed: false, quantity: 0, value: 0 },
    { label: 'Arroz', completed: false, quantity: 0, value: 0 },
    { label: 'Coca Cola', completed: false, quantity: 0, value: 0 },
  ];

  selectedOptions: TodoItem[] = [];

  onOptionSelected(option: TodoItem) {
    const index = this.selectedOptions.indexOf(option);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  onSubmit() {
    const todos = this.selectedOptions.map(opt => ({
      label: opt.label,
      quantity: opt.quantity,
      value: opt.value
    }));
    this.todoService.createMany(todos).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    this.todoService.getAll().subscribe(todos => {
      if (todos.length) {
        this.router.navigate(['/']);
      }
    });
  }
}