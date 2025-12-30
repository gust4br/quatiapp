import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() value: string = '';
  @Output() valueEmit: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueEmit.emit(input.value);
  }
}
