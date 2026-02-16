import { Component, EventEmitter, input, model, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  active = input(false);
  @Output() check = new EventEmitter<boolean>();

  handleCheckboxChange() {
    this.check.emit(this.active());
  }

}
