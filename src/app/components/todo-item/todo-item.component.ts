import { CdkDragEnd, CdkDragMove, CdkDragStart, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild, ElementRef } from '@angular/core';
import { TodoItem } from '../../types/TodoItem.dto';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-todo-item',
  imports: [CheckboxComponent, DragDropModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {
  @Input({ required: true}) todo!: TodoItem;
  @Input({required: true}) index: number = 0;
  @Output() check = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<TodoItem>();
  @ViewChild('dragContainer') dragContainer!: ElementRef;

  quantity = signal(0);
  value = signal<string>('0,00');

  showDeleteBackdrop = false;
  showCompleteBackdrop = false;

  DELETE_THRESHOLD = -200;
  COMPLETE_THRESHOLD = 200;
  
  // Variáveis para detectar direção do gesto
  private startY = 0;
  private startX = 0;
  private isDraggingHorizontally = false;
  private readonly DIRECTION_LOCK_THRESHOLD = 10; // pixels antes de decidir a direção

  formatNumberToBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  formatBRLToNumber(value: string): number {
    return parseFloat(value.replace(/\s/g, '').replace(',', '.'));
  }

  formatNumberToBRLString(value: number): string {
    return String(value).replace('.', ',');
  }

  getTotalValue(): string {
    const item = this.todo;
    if (!item) return 'R$ 0,00';
    
    const total = item.value * item.quantity;
    
    if (isNaN(total)) return 'R$ 0,00';
    
    return this.formatNumberToBRL(total);
  }

  changeQuantity(change: number) {
    const item = this.todo;
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return;

    this.quantity.set(newQuantity);
    this.emitNewTodo();
  }

  changeValue(newValue: string) {
    const item = this.todo;
    if (!item) return;

    const numValue = this.formatBRLToNumber(newValue);
    if (isNaN(numValue) || numValue < 0) return;

    this.value.set(newValue);
    this.emitNewTodo();
  }

  onDragStarted(event: CdkDragStart) {
    this.startX = event.source.getFreeDragPosition().x;
    this.startY = 0;
    this.isDraggingHorizontally = false;
  }

  onDragMoved(event: CdkDragMove) {
    const currentX = event.source.getFreeDragPosition().x;
    const currentY = event.source.getFreeDragPosition().y || 0;
    
    // Calcula o deslocamento
    const deltaX = Math.abs(currentX - this.startX);
    const deltaY = Math.abs(currentY - this.startY);
    
    // Se ainda não decidiu a direção e o movimento é significativo
    if (!this.isDraggingHorizontally && (deltaX > this.DIRECTION_LOCK_THRESHOLD || deltaY > this.DIRECTION_LOCK_THRESHOLD)) {
      // Se movimento vertical é muito maior que horizontal, não permite drag
      if (deltaY > deltaX * 1.5) {
        event.source.reset();
        return;
      }
      this.isDraggingHorizontally = true;
    }
    
    // Se está fazendo drag horizontal, mostra os backdrops
    if (this.isDraggingHorizontally) {
      const x = currentX;
      if (x < 0) {
        this.showDeleteBackdrop = true;
        this.showCompleteBackdrop = false;
      } else if (x > 0) {
        this.showCompleteBackdrop = true;
        this.showDeleteBackdrop = false;
      } else {
        this.showDeleteBackdrop = false;
        this.showCompleteBackdrop = false;
      }
    } else {
      this.showDeleteBackdrop = false;
      this.showCompleteBackdrop = false;
    }
  }

  onDragEnd(event: CdkDragEnd) {
    if (!this.isDraggingHorizontally) {
      event.source.reset();
      return;
    }

    const x = event.source.getFreeDragPosition().x;

    if (x < this.DELETE_THRESHOLD) {
      this.delete.emit(this.todo.id);
    } else if (x > this.COMPLETE_THRESHOLD) {
      this.check.emit(this.todo.id);
    }
    
    event.source.reset();
  }

  onCheckboxChange() {
    if (!this.todo) return;

    this.check.emit(this.todo.id);
  }

  emitNewTodo() {
    const newTodo = {
      ...this.todo,
      quantity: this.quantity(),
      value: this.formatBRLToNumber(this.value())
    }

    this.updateTodo.emit(newTodo);
  }

  ngOnInit(): void {
    this.quantity.set(this.todo.quantity);
    this.value.set(this.formatNumberToBRLString(this.todo.value));
  }
}
