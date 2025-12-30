import { CdkDragEnd, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { TodoItem } from '../../types/TodoItem.dto';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-todo-item',
  imports: [CheckboxComponent, DragDropModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  todo = input<TodoItem>();
  index = input<number>();
  @Output() check = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  showBackdrop = false;

  DELETE_THRESHOLD = -200;

  onDragMoved(event: CdkDragMove) {
    const x = event.source.getFreeDragPosition().x;
    if (x < 0) this.showBackdrop = true;
    else this.showBackdrop = false;    
  }

  onDragEnd(event: CdkDragEnd) {
    const x = event.source.getFreeDragPosition().x;

    if (x < this.DELETE_THRESHOLD) {
      this.delete.emit(this.todo()!.id);
    }
    
    event.source.reset();
  }

  onCheckboxChange() {
    if (!this.todo()) return;

    this.check.emit(this.todo()?.id);
  }
}
