import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoItem } from '../../types/TodoItem.dto';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  @Output() submitForm = new EventEmitter<TodoItem>();
  private readonly formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group({
    label: ['', Validators.required],
    value: ['', [Validators.required, Validators.min(0)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  private formatBRLToNumber(value: string): number {
    return parseFloat(value.replace(/\s/g, '').replace(',', '.'));
  }

  formatNumberToBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  getTotalValue(): string {
    const valueControl = this.form.get('value');
    const quantityControl = this.form.get('quantity');
    
    if (!valueControl || !quantityControl) return 'R$ 0,00';

    let value = valueControl.value;
    
    if (typeof value === 'string') {
      value = this.formatBRLToNumber(value);
    }

    const quantity = quantityControl.value || 1;
    const total = value * quantity;
    
    if (isNaN(total)) return 'R$ 0,00';
    
    return this.formatNumberToBRL(total);
  }

  quantityChange(quantity: number) {
    const newQuantity = this.form.get('quantity')?.value + quantity;
    if (newQuantity < 1) return;

    this.form.get('quantity')?.setValue(newQuantity);
  }

  submit(event: Event){
    event.preventDefault();
    if (!this.form.valid) return;

    const formValue = this.form.value as TodoItem;
    
    if (typeof formValue.value === 'string') {
      formValue.value = this.formatBRLToNumber(formValue.value);
    }

    this.submitForm.emit(formValue);

    this.form.reset();
  }
}
