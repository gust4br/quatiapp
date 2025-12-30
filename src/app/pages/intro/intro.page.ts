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
export class IntroPage implements OnInit{
  private readonly todoService = inject(TodoService);
  private readonly router = inject(Router);

  options: TodoItem[] = [
    { id: crypto.randomUUID(), label: 'Exercise', completed: false },
    { id: crypto.randomUUID(), label: 'Read a book', completed: false },
    { id: crypto.randomUUID(), label: 'Meditate', completed: false },
    { id: crypto.randomUUID(), label: 'Cook a meal', completed: false },
    { id: crypto.randomUUID(), label: 'Watch a movie', completed: false },
    { id: crypto.randomUUID(), label: 'Learn a new skill', completed: false },
    { id: crypto.randomUUID(), label: 'Call a friend', completed: false },
    { id: crypto.randomUUID(), label: 'Go for a walk', completed: false },
    { id: crypto.randomUUID(), label: 'Review goals', completed: false },
    { id: crypto.randomUUID(), label: 'Plan your day', completed: false },
    { id: crypto.randomUUID(), label: 'Practice a hobby', completed: false },
    { id: crypto.randomUUID(), label: 'Organize your space', completed: false },
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
