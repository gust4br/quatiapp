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
    { id: crypto.randomUUID(), label: 'Batata Frita', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Alho', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Arroz', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Coca Cola', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Watch a movie', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Learn a new skill', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Call a friend', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Go for a walk', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Review goals', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Plan your day', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Practice a hobby', completed: false, quantity: 0, value: 0 },
    { id: crypto.randomUUID(), label: 'Organize your space', completed: false, quantity: 0, value: 0 },
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
    this.todoService.pushMany(this.selectedOptions);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    if (this.todoService.getAll()?.length) {
      this.router.navigate(['/']);
    }
  }
}
