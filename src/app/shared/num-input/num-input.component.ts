import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-num-input',
  standalone: true,
  templateUrl: './num-input.component.html',
  styleUrl: './num-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumInputComponent),
      multi: true,
    },
  ],
})
export class NumInputComponent implements ControlValueAccessor {
  min = input(1);
  quantity = signal(1);
  isDisabled = signal(false);

  onChange: (v: number) => void = () => {
    //placeholder
  };
  onTouched: () => void = () => {
    //placeholder
  };

  writeValue(value: number): void {
    const newValue = value || this.min();
    this.quantity.set(newValue);
    this.onChange(newValue);
  }

  registerOnChange(fn: (v: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  increment() {
    this.quantity.update((q) => q + 1);
    this.onChange(this.quantity());
    this.onTouched();
  }
  decrement() {
    if (this.quantity() > this.min()) {
      this.quantity.update((q) => q - 1);
      this.onChange(this.quantity());
      this.onTouched();
    }
  }
  onInputChange(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    const finalValue = isNaN(value) || value < this.min() ? this.min() : value;
    this.quantity.set(finalValue);
    this.onChange(this.quantity());
  }
}